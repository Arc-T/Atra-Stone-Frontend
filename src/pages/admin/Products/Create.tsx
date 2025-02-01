import { ChangeEvent, useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import {
  Option,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  PRODUCT_COUNT_LABEL,
  PRODUCT_PRICE_LABEL,
  PRODUCT_TITLE_LABEL,
} from "../../../types/html";
import Table from "../../../components/Table";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
  deleteTempMedia,
  getCreateDetails,
  showAttributeGroupAttributes,
  storeProduct,
} from "../../../services/productService";
import {
  DELETE_FAILED_MSG,
  DELETE_SUCCESS_MSG,
  FETCH_FAILED_MSG,
  MULTISELECT_PLACEHOLDER,
  MULTISELECT_SEARCH_PLACEHOLDER,
} from "../../../types/messages";
import UploadModal from "../../../components/UploadModal";
import { AttributeGroup, Category, Attributes } from "../../../types/admin";
import { useFetchMedia } from "../../../hooks/useProducts";
import { ArrowClockwise } from "react-bootstrap-icons";
import { MEDIA_SHOW_URL } from "../../../types/url";
import useModalStore from "../../../contexts/modalStore";
import { DeleteModal } from "../../../components/DeleteModal";

interface FormValues {
  title: string;
  count: number;
  price: number;
  category_id: string;
  tags: string[];
  attribute_group_id: string;
  attribute_values: string[];
  description: string;
}

const Create = () => {
  const { onOpenModal, isModalOpen, modalProps } = useModalStore();

  const { register, handleSubmit, setValue } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formTags = Array.isArray(formState.tags)
      ? formState.tags.map((item) => item.value)
      : [];
    setValue("tags", formTags);
    data.attribute_values.filter((attr) => attr.trim() !== "");
    storeProduct(data);
  };

  const onDeleteMedia = () =>
    deleteTempMedia(modalProps.id)
      .then(() => {
        fetchMedia();
        toast.success(DELETE_SUCCESS_MSG);
      })
      .catch(() => toast.error(DELETE_FAILED_MSG));

  const {
    mutate: fetchMedia,
    data: medias,
    isPending,
    error: mediaFetchError,
  } = useFetchMedia();

  const [formState, setFormState] = useState({
    attributes: [] as Attributes[],
    tags: null as SelectValue,
  });

  const [responseData, setResponseData] = useState({
    // services: [] as Service[],
    attributesGroup: [] as AttributeGroup[],
    categories: [] as Category[],
    tags: [] as Option[],
  });

  useEffect(() => {
    getCreateDetails()
      .then((dataResponse) => {
        if (dataResponse) {
          setResponseData({
            // services: dataResponse.services,
            attributesGroup: dataResponse.attributes_group,
            categories: dataResponse.categories,
            tags: dataResponse.tags.map((tag) => ({
              value: tag.id.toString(),
              label: tag.title,
            })),
          });
        }
      }) // ____________________________________________________________ NEEDS TO BE REMOVED ____________________________________________________________
      .catch((error: AxiosError) =>
        toast.error(FETCH_FAILED_MSG + error.message)
      );
    fetchMedia();
  }, []);

  const onAttributeGroupChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedGroup = Number(event.target.value);
    showAttributeGroupAttributes(selectedGroup)
      .then((data) =>
        setFormState((prev) => ({ ...prev, attributes: data || [] }))
      )
      .catch((error) => console.error("Error fetching attributes:", error));
  };

  return (
    <>
      <UploadModal onUploadedFiles={() => fetchMedia()} />
      {isModalOpen && <DeleteModal onSubmit={onDeleteMedia} />}
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6 my-4">
          <div className="flex flex-row gap-4">
            {/* TITLE Input */}
            <div className="flex flex-col w-1/5">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-900"
                >
                  {PRODUCT_TITLE_LABEL}
                </label>
                <input
                  id="title"
                  className="styled-input"
                  {...register("title")}
                />
              </div>
            </div>
            {/* COUNT Input */}
            <div className="flex flex-col w-1/12">
              <label
                htmlFor="count"
                className="block text-sm font-medium text-gray-900"
              >
                {PRODUCT_COUNT_LABEL}
              </label>
              <input
                id="count"
                {...register("count")}
                className="styled-input"
                name="count"
                type="number"
                min={0}
                placeholder="0"
              />
            </div>
            {/* PRICE Input */}
            <div className="flex flex-col w-1/5">
              <label
                htmlFor="count"
                className="block text-sm font-medium text-gray-900"
              >
                {PRODUCT_PRICE_LABEL}
              </label>
              <input
                id="count"
                className="styled-input"
                {...register("price")}
                name="price"
                type="number"
                min={0}
              />
            </div>
            {/* CATEGORY Input */}
            <div className="flex flex-col w-full">
              <label className="block text-sm font-medium text-gray-900">
                دسته بندی
              </label>
              <select
                defaultValue={"0"}
                {...register("category_id")}
                className="styled-input"
              >
                <option value={"0"}>{MULTISELECT_PLACEHOLDER}</option>
                {responseData.categories?.map((category, index) => (
                  <option value={category.id} key={index}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-row w-full gap-4">
            <div className="flex flex-col w-1/2">
              <label className="block text-sm font-medium text-gray-900 mt-1">
                تگ ها
              </label>
              <Select
                onChange={(value) => {
                  setFormState({ ...formState, tags: value });
                }}
                value={formState.tags}
                options={responseData.tags}
                primaryColor={"indigo"}
                isSearchable={true}
                placeholder={MULTISELECT_PLACEHOLDER}
                searchInputPlaceholder={MULTISELECT_SEARCH_PLACEHOLDER}
                isMultiple={true}
                classNames={{
                  searchIcon:
                    "absolute w-5 h-5 mt-2.5 pb-0.5 mr-0.5 ml-4 text-gray-500",
                  searchBox:
                    "w-full py-2 pr-6 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none",
                }}
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="block text-sm font-medium text-gray-900">
                گروه ویژگی
              </label>
              <select
                defaultValue={"0"}
                {...register("attribute_group_id")}
                className="styled-input"
                onChange={onAttributeGroupChange}
              >
                <option value={"0"}>{MULTISELECT_PLACEHOLDER}</option>
                {responseData.attributesGroup?.map((attributeGroup, index) => (
                  <option value={attributeGroup.id} key={index}>
                    {attributeGroup.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-1/3">
              <label className="block text-sm/6 font-medium text-gray-900 mt-3">
                ویژگی ها
              </label>
              <Table columns={["ردیف", "نام", "مقدار"]}>
                {formState.attributes.length > 0 ? (
                  formState.attributes.map((attr, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition-colors duration-200`}
                    >
                      <td className="text-right py-4 px-6 border-l border-gray-200 font-medium text-gray-800">
                        {index + 1}
                      </td>
                      <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                        {attr.title}
                      </td>
                      <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                        <input
                          {...register(`attribute_values.${index}`)}
                          placeholder="مقدار را با هر نوع اطلاعات بیشتر پر کنید"
                          type="text"
                          className="styled-input"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b bg-gray-50">
                    <td
                      colSpan={6}
                      className="text-center py-4 px-6 text-gray-500"
                    >
                      هیچ گروه ویژگی انتخاب نشده !
                    </td>
                  </tr>
                )}
              </Table>
            </div>

            <div className="flex flex-col w-3/4">
              <label className="block text-sm/6 font-medium text-gray-900">
                عکس های آپلود شده
                <button
                  type="button"
                  onClick={() => fetchMedia()}
                  className="bg-red-500 text-white py-2 px-2 rounded-full hover:bg-red-600 shadow-md transition-all duration-150 mx-2 mb-1"
                >
                  <ArrowClockwise />
                </button>
              </label>
              <Table
                columns={["نوع فایل", "حجم", "تاریخ آپلود", "عملیات"]}
                error={mediaFetchError}
                loading={isPending}
              >
                {Array.isArray(medias) && medias.length > 0 ? (
                  medias.map((media, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition-colors duration-200`}
                    >
                      <td className="styled-table-cell">{media.extension}</td>
                      <td className="styled-table-cell">
                        {Number(media.size) / (1024 * 1024) > 1
                          ? (Number(media.size) / (1024 * 1024)).toFixed(2) +
                            "Mb"
                          : (Number(media.size) / 1024).toFixed(2) + "Kb"}
                      </td>
                      <td className="styled-table-cell">{media.uploadedAt}</td>
                      <td className="styled-table-cell">
                        <div className="flex justify-center items-center me-2">
                          <a
                            target="_blank"
                            href={`${MEDIA_SHOW_URL}${media.name}`}
                            className="bg-green-500 text-white me-2 py-2 px-5 rounded-lg hover:bg-green-600 shadow-md transition-all duration-150"
                          >
                            نمایش
                          </a>
                          <button
                            onClick={() => {
                              onOpenModal({
                                id: media.name,
                                name: "عکس آپلود شده با فرمت" + media.extension,
                                title: "فایل",
                              });
                            }}
                            type="button"
                            className="bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-600 shadow-md transition-all duration-150 mx-2"
                          >
                            حذف
                          </button>
                          <button
                            type="button"
                            className="bg-blue-500 text-white py-2 px-5 rounded-lg hover:bg-blue-600 shadow-md transition-all duration-150"
                          >
                            پس زمینه
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="styled-table-cell">
                      No media available
                    </td>
                  </tr>
                )}
              </Table>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-full">
              <label className="block text-sm font-medium text-gray-900">
                توضیحات
              </label>
              <textarea
                {...register("description")}
                rows={7}
                className="styled-input"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col w-1/6">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-5 rounded-lg hover:bg-green-600 shadow-md transition-all duration-150"
            >
              ثبت محصول
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Create;
