import { useMutation } from "@tanstack/react-query";
import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import ApiClient from "../../../services/apiClient";
import { AxiosError } from "axios";
import Select from "../../../components/Select";

const Create = () => {
  const title = useRef<HTMLInputElement>(null);
  const count = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);

  const apiCall = new ApiClient("products/upload");

  const postProduct = useMutation({
    mutationFn: (files: FormData) =>
      apiCall.postRequest(files, { "Content-Type": "multipart/form-data" }),
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error: AxiosError) => {
      console.log(error.status);
    },
  });

  const handlePriceInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");

    if (!isNaN(Number(value))) {
      const formattedValue = Number(value).toLocaleString(); // Format with commas
      e.target.value = formattedValue;
    }
  };

  const handleFormRequest = (event: FormEvent) => {
    event.preventDefault();

    if (
      title.current?.value &&
      count.current?.value &&
      price.current?.value &&
      description.current?.value &&
      file.current?.files
    ) {
      const formData = new FormData();
      Array.from(file.current.files).forEach((file) => {
        formData.append("files", file);
      });

      postProduct.mutate(formData);
    }
  };

  return (
    <>
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleFormRequest}
      >
        <div className="flex flex-col gap-6 my-4">
          <div className="flex flex-row gap-4">
            {/* Name Input */}
            <div className="flex flex-col w-1/5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                نام
              </label>
              <input
                type="text"
                ref={title}
                id="name"
                className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                placeholder="عقیق منظره"
              />
            </div>

            <div className="flex flex-col w-1/12">
              <label
                htmlFor="count"
                className="block text-sm font-medium text-gray-900"
              >
                تعداد
              </label>
              <input
                type="number"
                ref={count}
                id="number"
                min={0}
                placeholder="0"
                className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="flex flex-col w-1/5">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-900"
              >
                قیمت (تومان)
              </label>
              <input
                type="text"
                ref={price}
                id="number"
                onChange={handlePriceInput}
                className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="flex flex-col w-1/5">
              <label className="block text-sm font-medium text-gray-900">
                دسته بندی ها
              </label>
              <Select />
            </div>
          </div>

          <div className="flex flex-col w-1/6">
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-gray-900"
            >
              آپلود فایل
            </label>
            <input
              type="file"
              name="file-upload"
              multiple
              ref={file}
              id="file-upload"
              className="mt-1 block w-full cursor-pointer 
            rounded-md border-0 py-1.5
          text-gray-900 ring-1
            ring-inset ring-gray-300
            focus:ring-2 focus:ring-indigo-600
            file:mr-4 file:py-1 file:px-4 
            file:rounded-md file:border-0
          file:bg-indigo-600
          file:text-white file:cursor-pointer
          hover:file:bg-indigo-700"
            />
          </div>

          <div className="flex flex-row gap-4">
            {/* Password Input */}
            <div className="flex flex-col w-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-900"
              >
                توضیحات
              </label>
              <textarea
                name="description"
                ref={description}
                id="description"
                className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                placeholder="******"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="bg-purple-500 text-white py-2 px-5 rounded-lg hover:bg-purple-600 shadow-md transition-all duration-150"
          >
            ثبت محصول
          </button>
        </div>
      </form>
    </>
  );
};

export default Create;
