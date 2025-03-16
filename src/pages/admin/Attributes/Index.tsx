import { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import { Attribute, Category } from "../../../types/admin";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";
import Table from "../../../components/Table";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  deleteAttribute,
  fetchAttributeIndex,
} from "../../../services/attributeService";
import { AxiosError } from "axios";
import { useStoreAttribute } from "../../../hooks/useAttributes";
import { DeleteModal } from "../../../components/DeleteModal";
import useModalStore from "../../../contexts/modalStore";
import { toast } from "react-toastify";
import { DELETE_FAILED_MSG, DELETE_SUCCESS_MSG } from "../../../types/messages";

interface FormValues {
  title: string;
  category_id: string;
  type: string;
  is_filterable: boolean;
}

export default function Index() {
  const { register, handleSubmit } = useForm<FormValues>();
  const { mutate: storeAttribute } = useStoreAttribute();

  const onSubmit: SubmitHandler<FormValues> = (form) => {
    form.category_id = fetchedData.selectedCategory;
    storeAttribute(form, {
      onSuccess: () => onMount(),
    });
  };

  const [isPending, setIsPending] = useState(false);

  const onMount = () => {
    fetchAttributeIndex()
      .then((data) => {
        console.log(data);
        setFetchedData((prev) => ({
          ...prev,
          attributes: data.attributes,
          categories: data.categories,
        }));
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
      .finally(() => setIsPending(false));
  };

  useEffect(() => {
    setIsPending(true);
    onMount();
  }, []);

  const { onOpenModal, isModalOpen, modalProps } = useModalStore();

  const onDeleteAttribute = () =>
    deleteAttribute(Number(modalProps.id))
      .then(() => {
        onMount();
        toast.success(DELETE_SUCCESS_MSG);
      })
      .catch(() => toast.error(DELETE_FAILED_MSG));

  const [fetchedData, setFetchedData] = useState({
    attributes: [] as Attribute[],
    categories: [] as Category[],
    selectedCategory: "",
    categoryOptions: null as SelectValue,
  });

  return (
    <>
      {isModalOpen && <DeleteModal onSubmit={onDeleteAttribute} />}
      <div className="flex flex-col gap-4">
        {/* ******************* List Attributes & Attributes Group ******************* */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full">
          <p className="text-center text-2xl font-semibold mt-4 mb-8 text-gray-800">
            ویژگی ها
          </p>
          <Table columns={["ردیف", "نام", "دسته بندی", "فیلتر پذیر", "عملیات"]}>
            {isPending ? (
              <tr>
                <td colSpan={5} className="text-center py-4 px-6 text-blue-500">
                  در حال بارگذاری...
                </td>
              </tr>
            ) : fetchedData.attributes?.length > 0 ? (
              fetchedData.attributes.map((attr, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="text-right py-3 px-4 border-l border-gray-300 text-gray-700">
                    {index + 1}
                  </td>
                  <td className="text-right py-3 px-4 border-l border-gray-300 text-gray-700">
                    {attr?.title || "نام تعریف نشده"}
                  </td>
                  <td className="text-right py-3 px-4 border-l border-gray-300 text-gray-700">
                    {fetchedData.categories.find(
                      (category) => category.id === attr.category_id
                    )?.title || "N/A"}
                  </td>
                  <td className="text-right py-3 px-4 border-l border-gray-300">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                        attr?.is_filterable
                          ? "bg-green-100 text-green-700 border border-green-400"
                          : "bg-red-100 text-red-700 border border-red-400"
                      }`}
                    >
                      {attr?.is_filterable ? "بله" : "خیر"}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4 text-gray-700">
                    <button
                      onClick={() => {
                        onOpenModal({
                          id: attr.id.toString(),
                          name: attr.title,
                          title: "ویژگی",
                        });
                      }}
                      className="bg-red-500 text-white text-sm px-3 py-2 rounded-lg hover:bg-red-600 focus:ring focus:ring-blue-200"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 px-6 text-gray-500">
                  هیچ موردی یافت نشد
                </td>
              </tr>
            )}
          </Table>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full">
          <p className="text-center text-2xl font-semibold mt-4 mb-8 text-gray-800">
            ویژگی جدید
          </p>
          <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-6 mb-6">
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  نام ویژگی جدید
                </label>
                <input
                  {...register("title")}
                  className="styled-input w-full"
                  type="text"
                  placeholder="مثال: جنس سنگ"
                />
              </div>

              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  دسته بندی ها
                </label>
                <Select
                  value={fetchedData.categoryOptions}
                  onChange={(value) => {
                    const categoryIds = Array.isArray(value)
                      ? value.map((option) => option.value)
                      : value
                      ? [value.value]
                      : [];
                    console.log(categoryIds);

                    setFetchedData({
                      ...fetchedData,
                      categoryOptions: value,
                      selectedCategory: categoryIds[0],
                    });
                  }}
                  options={fetchedData.categories.map((category) => ({
                    value: String(category.id),
                    label: category.title,
                  }))}
                  primaryColor={"indigo"}
                  isSearchable={true}
                  isMultiple={false}
                  placeholder={"انتخاب کنید ..."}
                  searchInputPlaceholder={"جستجو ..."}
                  classNames={{
                    searchIcon:
                      "absolute w-5 h-5 mt-2.5 pb-0.5 mr-0.5 ml-4 text-gray-500",
                    searchBox:
                      "w-full py-2 pr-6 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none",
                  }}
                />
              </div>

              <div className="flex flex-col justify-between gap-4">
                <label className="font-semibold text-gray-700">
                  فیلتر پذیر
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      {...register("is_filterable")}
                      value="true"
                      className="w-4 h-4"
                    />
                    بله
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      {...register("is_filterable")}
                      value="false"
                      className="w-4 h-4"
                    />
                    خیر
                  </label>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md w-full hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
            >
              ثبت
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
