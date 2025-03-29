import { useState } from "react";
import Select from "react-tailwindcss-select";
import { Attribute, Category } from "../types/admin";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateCategory } from "../services/categoryService";
import { toast } from "react-toastify";
import { UPDATE_SUCCESS_MSG } from "../types/messages";
import { AxiosError } from "axios";

interface props {
  onCloseModal: () => void;
  onSubmitModal: () => void;
  inputs: {
    category: Category;
    attributes: Attribute[];
    categoryTitle: string;
  };
}

interface FormValues {
  title: string;
  url: string;
  description: string;
  title_sequence: string;
}

const EditCategoryModal = ({ onCloseModal, onSubmitModal, inputs }: props) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    data.title_sequence =
      multiSelect.selectedCategory.length > 0
        ? multiSelect.selectedCategory.join(",")
        : "";
    updateCategory(inputs.category.id, data)
      .then(() => {
        toast.success(UPDATE_SUCCESS_MSG);
        onSubmitModal();
      })
      .catch((error: AxiosError) => toast.error("ERROR: " + error));
  };

  const [multiSelect, setMultiSelect] = useState({
    categoryOptions: null as SelectValue,
    selectedCategory: [] as string[],
  });

  return (
    <>
      {
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative z-10">
            {/* <!-- Background overlay --> */}
            <div
              className="fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity"
              aria-hidden="true"
            ></div>

            {/* <!-- Modal container --> */}
            <div className="fixed inset-0 flex items-center justify-center px-4 py-6">
              <div className="w-full max-w-lg transform overflow-y-auto overflow-hidden rounded-lg bg-white shadow-xl">
                {/* <!-- Modal content --> */}
                <div className="bg-white px-6 py-5">
                  <div className="flex flex-row gap-4">
                    <div className="mt-3 text-start w-1/2 mb-6">
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        نام دسته بندی
                      </label>
                      <input
                        className="styled-input w-full"
                        defaultValue={inputs.category.title}
                        type="text"
                        {...register("title")}
                        placeholder="مثال: زیور آلات"
                      />
                    </div>

                    <div className="mt-3 text-start w-1/2 mb-6">
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        آدرس مرورگر
                      </label>
                      <input
                        defaultValue={inputs.category.url}
                        className="styled-input w-full"
                        type="text"
                        {...register("url")}
                        placeholder="مثال: زیور آلات"
                      />
                    </div>
                  </div>

                  <div className="mt-3 text-start w-full mb-6">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      عنوان محصول ذخیره شده
                    </label>
                    <input
                      defaultValue={
                        inputs.categoryTitle
                          ? inputs.category.title + " + " + inputs.categoryTitle
                          : "هیچ عنوانی ذخیره نشده !"
                      }
                      className="w-full bg-gray-100 rounded-md border border-gray-300 p-2 text-gray-600"
                      type="text"
                      disabled={true}
                    />
                  </div>

                  <div className="mt-3 text-start w-full mb-6">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      عنوان محصول جدید
                    </label>
                    <Select
                      value={multiSelect.categoryOptions}
                      onChange={(value) => {
                        setMultiSelect({
                          selectedCategory: Array.isArray(value)
                            ? value.map((option) => option.value)
                            : value
                            ? [value.value]
                            : [],
                          categoryOptions: value,
                        });
                      }}
                      options={inputs.attributes.map((item) => ({
                        value: item.id.toString(),
                        label: item.title,
                      }))}
                      primaryColor={"indigo"}
                      isSearchable={true}
                      isMultiple={true}
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

                  <div className="w-full mb-6">
                    <label className="block text-sm font-medium text-gray-900">
                      توضیحات (اختیاری)
                    </label>
                    <textarea
                      {...register("description")}
                      defaultValue={inputs.category.description}
                      rows={3}
                      className="styled-input"
                    ></textarea>
                  </div>
                </div>

                {/* <!-- Actions --> */}
                <div className="bg-gray-100 border-t px-8 py-4 flex justify-end space-x-reverse space-x-2">
                  <button
                    type="button"
                    className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition-colors"
                    onClick={onCloseModal}
                  >
                    بازگشت
                  </button>

                  <button
                    type="submit"
                    className="rounded-md bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
                  >
                    ثبت تغییرات
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      }
    </>
  );
};

export default EditCategoryModal;
