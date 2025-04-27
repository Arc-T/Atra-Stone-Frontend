/**
 *! make this file clean by providing method (title_sequence) for edit modal
 */

import { useEffect, useState } from "react";
import { Attribute, Category } from "../../../types/admin";
import Table from "../../../components/Table";
import {
  deleteCategory,
  fetchCategories,
} from "../../../services/categoryService";
import { AxiosError } from "axios";
import { DeleteModal } from "../../../components/DeleteModal";
import useModalStore from "../../../contexts/modalStore";
import { toast } from "react-toastify";
import { DELETE_FAILED_MSG, DELETE_SUCCESS_MSG } from "../../../types/messages";
import Select from "react-tailwindcss-select";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStoreCategory } from "../../../hooks/useCategories";
import { Pen, Trash } from "react-bootstrap-icons";
import EditCategoryModal from "../../../components/EditCategoryModal";

interface FormValues {
  title: string;
  parent_id: number;
  url: string;
  description: string;
  hidden: "parent" | "child";
}

export default function Index() {
  // ******************** FORM ******************** //
  const { register: registerChild, handleSubmit: handleSubmitChild } =
    useForm<FormValues>();
  const { register: registerParent, handleSubmit: handleSubmitParent } =
    useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (form) => {
    form.parent_id = form.hidden === "child" ? fetchedData.selectedCategory : 0;
    storeCategory(form, {
      onSuccess: () => onMount(),
    });
  };
  // ******************** MOUNT ******************** //
  const { mutate: storeCategory } = useStoreCategory();

  const [fetchedData, setFetchedData] = useState({
    attributes: [] as Attribute[],
    categories: [] as Category[],
    categoryOptions: null as SelectValue,
    selectedCategory: 0,
  });

  const [isPending, setIsPending] = useState(false);

  const onMount = () => {
    setIsPending(true);
    fetchCategories()
      .then((data) => {
        setFetchedData({
          ...fetchedData,
          categories: data.categories,
          attributes: data.attributes,
        });
      })
      .catch((error: AxiosError) => console.log(error))
      .finally(() => setIsPending(false));
  };

  // ********************************************** //

  const { onOpenModal, isModalOpen, modalProps } = useModalStore();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const onDeleteCategory = () => {
    deleteCategory(Number(modalProps.id))
      .then(() => {
        toast.success(DELETE_SUCCESS_MSG);
      })
      .catch(() => toast.error(DELETE_FAILED_MSG))
      .finally(() => onMount());
  };

  useEffect(() => {
    onMount();
  }, []);

  const [inputs, setInputs] = useState({
    attributes: [] as Attribute[],
    category: {} as Category,
    categoryTitle: "",
  });

  return (
    <>
      {editModalOpen && (
        <EditCategoryModal
          inputs={{
            attributes: inputs.attributes,
            category: inputs.category,
            categoryTitle: inputs.categoryTitle ? inputs.categoryTitle : "",
          }}
          onSubmitModal={() => {
            onMount();
            setEditModalOpen(false);
          }}
          onCloseModal={() => setEditModalOpen(false)}
        />
      )}
      {isModalOpen && <DeleteModal onSubmit={onDeleteCategory} />}
      <div className="flex flex-row">
        <div className="bg-white w-1/2 shadow-md rounded-lg py-4 px-4 ml-4">
          <p className="text-center text-2xl font-semibold mt-4 mb-8 text-gray-800">
            سرگروه ها
          </p>
          <div className="overflow-x-auto rounded-lg">
            <Table
              columns={[
                "ردیف",
                "نام سرگروه",
                "دسته بندی ها",
                "آدرس مرورگر",
                "عملیات",
              ]}
            >
              {isPending ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4 px-6 text-blue-500"
                  >
                    در حال بارگذاری...
                  </td>
                </tr>
              ) : fetchedData.categories?.length > 0 ? (
                fetchedData.categories
                  .filter((item) => !item.parent_id)
                  .map((item, index) => (
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
                        {item?.title || "نام تعریف نشده"}
                      </td>
                      <td className="text-right py-3 px-4 border-l border-gray-300">
                        {fetchedData.categories
                          .filter((filter) => filter.parent_id === item.id)
                          .map((cat) => (
                            <span
                              key={cat.id}
                              className="inline-flex items-center gap-2 px-4 py-2 m-1 text-sm font-semibold rounded-full
      bg-blue-50 text-blue-800 border border-blue-300 hover:bg-blue-100 transition-colors duration-300 ease-in-out"
                            >
                              {cat.title}
                            </span>
                          ))}
                      </td>

                      <td className="text-right py-3 px-4 border-l border-gray-300 text-gray-700">
                        {item?.url}
                      </td>
                      <td className="text-center py-3 px-4 text-gray-700">
                        <button
                          onClick={() => {
                            onOpenModal({
                              id: item.id.toString(),
                              name: item.title,
                              title: "سرگروه",
                            });
                          }}
                          className="bg-red-500 text-white text-sm px-3 py-2 rounded-md hover:bg-red-600 focus:ring focus:ring-blue-200"
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4 px-6 text-gray-500"
                  >
                    هیچ موردی یافت نشد
                  </td>
                </tr>
              )}
            </Table>
          </div>
        </div>

        <div className="bg-white w-1/2 shadow-md rounded-lg py-4 px-4">
          <p className="text-center text-2xl font-semibold mt-4 mb-8 text-gray-800">
            دسته بندی ها
          </p>
          <div className="overflow-x-auto rounded-lg">
            <Table
              columns={[
                "ردیف",
                "نام دسته بندی",
                "عنوان محصولات",
                "آدرس مرورگر",
                "عملیات",
              ]}
            >
              {isPending ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4 px-6 text-blue-500"
                  >
                    در حال بارگذاری...
                  </td>
                </tr>
              ) : fetchedData.categories?.length > 0 ? (
                fetchedData.categories
                  .filter((item) => item.parent_id)
                  .map((category, index) => (
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
                        {category.title}
                      </td>
                      <td className="text-right py-3 px-4 border-l border-gray-300 text-gray-700">
                        <span
                          className={`inline-flex items-center text-center gap-2 px-4 py-2 m-1 text-sm font-semibold rounded-full border transition-colors duration-300 ease-in-out
                            ${
                              category.title_sequence
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                                : "bg-red-50 text-red-800 border-red-300 hover:bg-red-100"
                            }`}
                        >
                          {category.title_sequence
                            ? category.title_sequence
                                .split(",")
                                .map((id) => {
                                  const matched = fetchedData.attributes.find(
                                    (attr) => String(attr.id) === id.trim()
                                  );
                                  return matched?.title || null;
                                })
                                .filter(Boolean)
                                .join(" + ")
                            : "هیچ ترتیبی اعمال نشده !"}
                        </span>
                      </td>
                      <td className="text-right py-3 px-4 border-l border-gray-300 text-gray-700">
                        {category.url}
                      </td>
                      <td className="text-center py-3 px-4 text-gray-700">
                        <button
                          onClick={() => {
                            onOpenModal({
                              id: category.id.toString(),
                              name: category.title,
                              title: "دسته بندی",
                            });
                          }}
                          className="bg-red-500 text-white text-sm px-3 py-2 rounded-md hover:bg-red-600 focus:ring focus:ring-blue-200"
                        >
                          <Trash />
                        </button>
                        <button
                          onClick={() => {
                            const titleParts = category?.title_sequence
                              ? fetchedData.attributes
                                  .filter((attr) =>
                                    category.title_sequence
                                      ?.split(",")
                                      .some(
                                        (id) => id.trim() === String(attr.id)
                                      )
                                  )
                                  .map((attribute) => attribute.title)
                              : [];

                            setInputs({
                              categoryTitle:
                                titleParts.length > 0
                                  ? titleParts.join(" + ")
                                  : "",
                              category: category,
                              attributes: fetchedData.attributes.filter(
                                (item) => item.category_id === category.id
                              ),
                            });

                            setEditModalOpen(true);

                            setEditModalOpen(true);
                          }}
                          className="bg-emerald-500 text-white text-sm mx-2 my-1 px-3 py-2 rounded-md hover:bg-emerald-600 focus:ring focus:ring-blue-200"
                        >
                          <Pen />
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4 px-6 text-gray-500"
                  >
                    هیچ موردی یافت نشد
                  </td>
                </tr>
              )}
            </Table>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="bg-white shadow-md rounded-lg py-4 px-4 w-1/2 ml-4 mt-4">
          <p className="text-center text-2xl font-semibold mt-4 mb-8 text-gray-800">
            ایجاد سرگروه
          </p>
          <form method="POST" onSubmit={handleSubmitParent(onSubmit)}>
            <div className="flex gap-4 mb-6">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  نام سرگروه
                </label>
                <input
                  className="styled-input w-full"
                  type="text"
                  placeholder="مثال: زیور آلات"
                  {...registerParent("title")}
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  آدرس مرورگر
                </label>
                <input
                  className="styled-input w-full"
                  type="text"
                  placeholder="مثال: نام انگلیسی دسته بندی"
                  {...registerParent("url")}
                />
              </div>
            </div>
            <div className="w-full mb-6">
              <label className="block text-sm font-medium text-gray-900">
                توضیحات (اختیاری)
              </label>
              <textarea
                {...registerParent("description")}
                rows={3}
                className="styled-input"
              ></textarea>
            </div>
            <input
              {...registerParent("hidden", { value: "parent" })}
              type="hidden"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md w-full hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
            >
              ثبت
            </button>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg py-4 px-4 w-1/2 mt-4">
          <p className="text-center text-2xl font-semibold mt-4 mb-8 text-gray-800">
            ایجاد دسته بندی
          </p>
          <form method="POST" onSubmit={handleSubmitChild(onSubmit)}>
            <div className="flex gap-4 mb-6">
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  نام دسته بندی
                </label>
                <input
                  className="styled-input w-full"
                  type="text"
                  placeholder="مثال: انگشتر"
                  {...registerChild("title")}
                />
              </div>
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  آدرس مرورگر
                </label>
                <input
                  className="styled-input w-full"
                  type="text"
                  placeholder="مثال: نام انگلیسی دسته بندی"
                  {...registerChild("url")}
                />
              </div>
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  سرگروه ها
                </label>
                <Select
                  value={fetchedData.categoryOptions}
                  onChange={(value) => {
                    const categoryIds = Array.isArray(value)
                      ? value.map((option) => Number(option.value))
                      : value
                      ? [Number(value.value)]
                      : [];
                    setFetchedData({
                      ...fetchedData,
                      categoryOptions: value,
                      selectedCategory: categoryIds[0],
                    });
                  }}
                  options={fetchedData.categories
                    .filter((item) => !item.parent_id)
                    .map((item) => ({
                      value: item.id.toString(),
                      label: item.title,
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
            </div>
            <div className="w-full mb-6">
              <label className="block text-sm font-medium text-gray-900">
                توضیحات (اختیاری)
              </label>
              <textarea
                {...registerChild("description")}
                rows={3}
                className="styled-input"
              ></textarea>
            </div>
            <input
              {...registerChild("hidden", { value: "child" })}
              type="hidden"
            />
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
