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
  getUploadedMedia,
  storeProduct,
} from "../../../services/productService";
import {
  DELETE_FAILED_MSG,
  DELETE_SUCCESS_MSG,
  MULTISELECT_PLACEHOLDER,
  MULTISELECT_SEARCH_PLACEHOLDER,
} from "../../../types/messages";
import { MEDIA_SHOW_URL } from "../../../types/url";
import UploadModal from "../../../components/UploadModal";
import { Category, Attribute, Tag, Media } from "../../../types/admin";
import { ArrowClockwise, Plus } from "react-bootstrap-icons";
import useModalStore from "../../../contexts/modalStore";
import { DeleteModal } from "../../../components/DeleteModal";
import { fetchCategoryAttributes } from "../../../services/attributeService";
import PreShowProduct, {
  ProductProps,
} from "../../../components/PreShowProduct";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

interface FormValues {
  title: string;
  quantity: number;
  price: number;
  category_id: number;
  media: Media[];
  // tags: number[];
  attributes: { id: number; value: string }[];
  description: string;
}

const Create = () => {
  // ******************** FORM ******************** //
  const queryClient = useQueryClient();
  const { register, reset, handleSubmit } = useForm<FormValues>();

  const [multiSelect, setMultiSelect] = useState({
    attributes: null as SelectValue,
    categoryId: 0,
    // tags: null as SelectValue,
  });

  const processFormData = (formBody: FormValues) => {
    if (fetchedData.medias) formBody.media = fetchedData.medias;

    formBody.attributes = formBody.attributes
      .map((attr, index) => ({
        ...attr,
        id: fetchedData.attributes[index]?.id,
      }))
      .filter((attr) => attr.value.trim() !== "");

    const category = fetchedData.categories?.find(
      (item) => item.id === multiSelect.categoryId
    );

    if (category?.title_sequence) {
      const titleParts = category.title_sequence
        .split(",")
        .map((id) => {
          const trimmedId = Number(id.trim());
          const attr = formBody.attributes.find((a) => a.id === trimmedId);
          const value = attr?.value?.trim();

          if (value) return value;

          const fallback = fetchedData.attributes.find(
            (a) => a.id === trimmedId
          )?.title;
          return fallback ? `[${fallback}]` : "";
        })
        .filter(Boolean);

      formBody.title = `${category.title} ${titleParts.join(" ")}`.trim();
    } else {
      formBody.title = category?.title || "";
    }

    return formBody;
  };

  // This one for preshow
  const onPreShow: SubmitHandler<FormValues> = (formBody) => {
    const processedData = processFormData({ ...formBody });

    setPreShowProductInfo({
      media: fetchedData.medias?.find((item) => item.order === 1) || null,
      title: processedData.title,
      quantity: processedData.quantity,
      price: processedData.price,
    });

    setShouldShowProductConfirm(true);
  };

  const onSubmit: SubmitHandler<FormValues> = (formBody) => {
    // To remove "products" from cache:
    queryClient.removeQueries({ queryKey: ["products"] });
    const processedData = processFormData({ ...formBody });
    storeProduct(processedData)
      .then(() => toast.success("محصول با موفقیت ثبت شد"))
      .catch((error: AxiosError) =>
        toast.error("خطا در انجام عملیات: " + error.message)
      );
  };

  // ******************** MOUNT ******************** //
  const [fetchedData, setFetchedData] = useState({
    attributes: [] as Attribute[],
    categories: [] as Category[],
    medias: [] as Media[],
    // tags: [] as Tag[],
  });

  const [shouldShowProductConfirm, setShouldShowProductConfirm] =
    useState(false);

  const [preShowProductInfo, setPreShowProductInfo] = useState<ProductProps>();

  const fetchMedia = () => {
    getUploadedMedia().then((data) => {
      const newMedias = data.map((media, index) => ({
        id: index,
        name: media.name,
        extension: media.extension,
        order: index === 0 ? 1 : 0,
        uploaded_at: media.uploaded_at,
      }));
      setFetchedData((prevFetchedData) => ({
        ...prevFetchedData,
        medias: newMedias,
      }));
    });
  };

  useEffect(() => {
    fetchMedia();
    getCreateDetails().then((data) => {
      if (data) {
        setFetchedData((prevData) => ({
          ...prevData,
          categories: data.categories,
          // tags: data.tags,
        }));
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

  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <>
      {showUploadModal && (
        <UploadModal
          onUploadedFiles={() => fetchMedia()}
          onClose={() => setShowUploadModal(false)}
        />
      )}
      {shouldShowProductConfirm && preShowProductInfo && (
        <PreShowProduct
          product={preShowProductInfo}
          onClose={() => setShouldShowProductConfirm(false)}
        />
      )}
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
                  setMultiSelect({
                    ...multiSelect,
                    attributes: item,
                    categoryId: Array.isArray(item)
                      ? Number(item[0].value)
                      : Number(item?.value),
                  });
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
            <div className="flex flex-col w-1/3">
              <label className="block text-sm font-medium text-gray-900">
                {PRODUCT_COUNT_LABEL}
              </label>
              <input
                {...register("quantity")}
                className="styled-input"
                type="number"
                min={0}
                placeholder="0"
              />
            </div>
            {/* PRICE Input */}
            <div className="flex flex-col w-1/3">
              <label className="block text-sm font-medium text-gray-900">
                {PRODUCT_PRICE_LABEL} (تومان)
              </label>
              <input
                className="styled-input"
                {...register("price")}
                type="number"
                min={0}
              />
            </div>

            {/* <div className="flex flex-col w-full">
              <label className="block text-sm font-medium text-gray-900 mt-1">
                تگ ها
              </label>
              <Select
                onChange={(item) =>
                  setMultiSelect({ ...multiSelect, tags: item })
                }
                value={multiSelect.tags}
                options={fetchedData.tags.map((tag) => ({
                  value: String(tag.id),
                  label: tag.title,
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
            </div> */}
          </div>

          <div className="flex flex-row gap-4">
            {/* ویژگی ها */}
            <div className="flex-col w-1/3 mt-5">
              <label className="block text-md font-medium text-gray-900 mb-1">
                ویژگی ها
              </label>
              <Table columns={["نام", "مقدار"]}>
                {fetchedData.attributes.length > 0 ? (
                  fetchedData.attributes.map((attr, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition-colors duration-200`}
                    >
                      <td className="py-3 px-4 text-gray-700 border-l border-gray-200">
                        {attr.title}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        <input
                          key={attr.id}
                          {...register(`attributes.${index}.value` as const)}
                          placeholder="مقدار را پر کنید"
                          className="styled-input"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b bg-gray-50">
                    <td
                      colSpan={2}
                      className="text-center py-4 px-4 text-gray-500"
                    >
                      هیچ دسته بندی انتخاب نشده!
                    </td>
                  </tr>
                )}
              </Table>
            </div>

            {/* مدیا */}
            <div className="flex-col w-2/3">
              <div className="flex justify-between items-end mb-2">
                <label className="block text-md font-medium text-gray-900">
                  عکس‌های آپلود شده
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fetchMedia()}
                    className="flex items-center gap-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 shadow-md transition-all duration-150"
                  >
                    بروزرسانی
                    <ArrowClockwise />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(true)}
                    className="flex items-center gap-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 shadow-md transition-all duration-150"
                  >
                    اضافه کردن
                    <Plus />
                  </button>
                </div>
              </div>

              <Table columns={["ردیف", "نوع فایل", "تاریخ آپلود", "عملیات"]}>
                {Array.isArray(fetchedData.medias) &&
                fetchedData.medias.length > 0 ? (
                  fetchedData.medias.map((media, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition-colors duration-200`}
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{media.extension}</td>
                      <td className="py-3 px-4">{media.uploaded_at}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap justify-center gap-2">
                          <a
                            href={`${MEDIA_SHOW_URL}${media.name}`}
                            target="_blank"
                            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 shadow-md transition-all duration-150"
                          >
                            نمایش
                          </a>
                          <button
                            type="button"
                            onClick={() =>
                              onOpenModal({
                                id: media.name,
                                name: `عکس آپلود شده با فرمت ${media.extension}`,
                                title: "فایل",
                              })
                            }
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 shadow-md transition-all duration-150"
                          >
                            حذف
                          </button>
                          {media.order !== 1 && (
                            <button
                              onClick={() => {
                                const updatedMedias = fetchedData.medias.map(
                                  (item) =>
                                    item.id === media.id
                                      ? { ...item, order: 1 }
                                      : { ...item, order: 0 }
                                );
                                setFetchedData({
                                  ...fetchedData,
                                  medias: updatedMedias,
                                });
                              }}
                              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 shadow-md transition-all duration-150"
                            >
                              پس زمینه
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b bg-gray-50">
                    <td
                      colSpan={4}
                      className="text-center py-4 px-4 text-gray-500"
                    >
                      هیچ عکسی ذخیره نشده!
                    </td>
                  </tr>
                )}
              </Table>
            </div>
          </div>

          {/* توضیحات */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              توضیحات
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-700 placeholder-gray-400"
            ></textarea>
          </div>

          <div className="flex flex-row gap-2">
            {/* Preview Button */}
            <button
              type="button" // <--- important! prevent form submit
              onClick={handleSubmit(onPreShow)}
              className="bg-gray-500 text-white py-2 px-5 rounded-lg hover:bg-gray-600 shadow-md transition-all duration-150"
            >
              پیش نمایش
            </button>

            {/* Submit Button */}
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
