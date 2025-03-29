import { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";
import { SubmitHandler, useForm } from "react-hook-form";
import { PRODUCT_COUNT_LABEL, PRODUCT_PRICE_LABEL } from "../../../types/html";
import Table from "../../../components/Table";
import { toast } from "react-toastify";
import {
  deleteTempMedia,
  getCreateDetails,
  storeProduct,
} from "../../../services/productService";
import {
  DELETE_FAILED_MSG,
  DELETE_SUCCESS_MSG,
  MULTISELECT_PLACEHOLDER,
  MULTISELECT_SEARCH_PLACEHOLDER,
} from "../../../types/messages";
import UploadModal from "../../../components/UploadModal";
import { Category, Attribute, Tag } from "../../../types/admin";
import { useFetchMedia } from "../../../hooks/useProducts";
import { ArrowClockwise } from "react-bootstrap-icons";
import { MEDIA_SHOW_URL } from "../../../types/url";
import useModalStore from "../../../contexts/modalStore";
import { DeleteModal } from "../../../components/DeleteModal";
import { fetchCategoryAttributes } from "../../../services/attributeService";

interface FormValues {
  title: string;
  count: number;
  price: number;
  category_id: number;
  tags: string[];
  attribute_values: { id: number; value: string }[];
  description: string;
}

const Create = () => {
  // ******************** FORM ******************** //

  const { register, reset, handleSubmit } = useForm<FormValues>();

  const [multiSelect, setMultiSelect] = useState({
    attributes: null as SelectValue,
    tags: null as SelectValue,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // data.tags = Array.isArray(multiSelect.tags)
    //   ? multiSelect.tags.map((item) => item.value)
    //   : [];

    // data.attribute_values = data.attribute_values.filter(
    //   (item) => item.trim().length > 0
    // );

    data.attribute_values = data.attribute_values
      .map((attr, index) => ({
        ...attr,
        id: fetchedData.attributes[index]?.id,
      }))
      .filter((attr) => attr.value.trim() !== "");

    console.log(data.attribute_values);

    // storeProduct(data);
  };
  // ******************** MOUNT ******************** //
  const [fetchedData, setFetchedData] = useState({
    attributes: [] as Attribute[],
    categories: [] as Category[],
    tags: [] as Tag[],
  });

  const {
    mutate: fetchMedia,
    data: medias,
    isPending,
    error: mediaFetchError,
  } = useFetchMedia();

  useEffect(() => {
    getCreateDetails().then((data) => {
      if (data) {
        setFetchedData({
          ...fetchedData,
          categories: data.categories,
          tags: data.tags,
        });
      }
    });
  }, []);

  const { onOpenModal, isModalOpen, modalProps } = useModalStore();

  const onDeleteMedia = () =>
    deleteTempMedia(modalProps.id)
      .then(() => {
        fetchMedia();
        toast.success(DELETE_SUCCESS_MSG);
      })
      .catch(() => toast.error(DELETE_FAILED_MSG));

  const onChangeCategory = (categoryId: string) => {
    fetchCategoryAttributes(categoryId).then((data) => {
      setFetchedData({ ...fetchedData, attributes: data });
    });
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
            {/* CATEGORY Input */}
            <div className="flex flex-col w-1/3">
              <label className="block text-sm font-medium text-gray-900 mb-1">
                دسته بندی
              </label>
              <Select
                onChange={(item) => {
                  onChangeCategory(
                    Array.isArray(item) ? item[0].value : item?.value || ""
                  );
                  setMultiSelect({ ...multiSelect, attributes: item });
                  reset();
                }}
                value={multiSelect.attributes}
                options={fetchedData.categories
                  .filter((item) => !item.parent_id)
                  .map((parent) => ({
                    label: parent.title,
                    options: fetchedData.categories
                      .filter((child) => child.parent_id === parent.id)
                      .map((child) => ({
                        value: String(child.id),
                        label: child.title,
                      })),
                  }))}
                primaryColor={"indigo"}
                isSearchable={true}
                placeholder={MULTISELECT_PLACEHOLDER}
                searchInputPlaceholder={MULTISELECT_SEARCH_PLACEHOLDER}
                isMultiple={false}
                classNames={{
                  searchIcon:
                    "absolute w-5 h-5 mt-2.5 pb-0.5 mr-0.5 ml-4 text-gray-500",
                  searchBox:
                    "w-full py-2 pr-6 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none",
                }}
              />
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

            <div className="flex flex-col w-full">
              <label className="block text-sm font-medium text-gray-900 mt-1">
                تگ ها
              </label>
              <Select
                onChange={(value) =>
                  setMultiSelect({ ...multiSelect, tags: value })
                }
                value={multiSelect.tags}
                options={fetchedData.tags.map((tag) => ({
                  label: tag.title,
                  value: tag.title,
                }))}
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
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-1/3">
              <label className="block text-sm/6 font-medium text-gray-900 mt-3">
                ویژگی ها
              </label>
              <Table columns={["ردیف", "نام", "مقدار"]}>
                {fetchedData.attributes.length > 0 ? (
                  fetchedData.attributes.map((attr, index) => (
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
                        {attr.id}
                      </td>
                      <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                        <input
                          key={attr.id}
                          {...register(
                            `attribute_values.${index}.value` as const
                          )}
                          placeholder="مقدار را با هر نوع اطلاعات بیشتر پر کنید"
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
                      هیچ دسته بندی انتخاب نشده !
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
                      <td className="styled-table-cell">{media.uploaded_at}</td>
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
                  <tr className="border-b bg-gray-50">
                    <td
                      colSpan={4}
                      className="text-center py-4 px-6 text-gray-500"
                    >
                      هیچ عکسی ذخیره نشده !{" "}
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
                rows={3}
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
