import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import ApiClient from "../../../services/apiClient";
import { AxiosError } from "axios";
import Select from "react-tailwindcss-select";
import {
  Option,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";
import {
  AttributeGroup,
  Category,
  Service,
  Tag,
  Attributes,
} from "../../../types/Admin";
import FileDropzone from "../../../components/Dropzone";

interface DataResponse {
  tags: Tag[];
  services: Service[];
  categories: Category[];
  attributes_group: AttributeGroup[];
}

const Create = () => {
  const title = useRef<HTMLInputElement>(null);
  const count = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [attributes, setAttribute] = useState<Attributes[]>([]);
  const [tags, setTags] = useState<SelectValue>(null);
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");

  const apiCall = new ApiClient("products/create");

  const [responseData, setResponseData] = useState<{
    services: Service[];
    attributesGroup: AttributeGroup[];
    categories: Category[];
    tags: Option[];
  }>({
    services: [],
    attributesGroup: [],
    categories: [],
    tags: [],
  });

  useEffect(() => {
    apiCall
      .getRequest<DataResponse>()
      .then((dataResponse) => {
        if (dataResponse) {
          setResponseData({
            services: dataResponse.services,
            attributesGroup: dataResponse.attributes_group,
            categories: dataResponse.categories,
            tags: dataResponse.tags.map((tag) => ({
              value: tag.id.toString(),
              label: tag.title,
            })),
          });
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const onAttributeGroupChange = (event: ChangeEvent<HTMLSelectElement>) => {
    apiCall
      .setEndpoint("attributes/" + event.target?.value + "/show")
      .getRequest<Attributes[]>()
      .then((data) => {
        if (data) {
          setAttribute(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const postProductForm = useMutation({
    mutationFn: (files: FormData) => {
      apiCall.setEndpoint("products/store");
      return apiCall.postRequest(files, {
        "Content-type": "multipart/form-data",
      });
    },
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error: AxiosError) => {
      console.log(error.status);
    },
  });

  const handleFormRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const attributeValues: { [key: string]: string } = {};

      for (const [key, value] of formData.entries()) {
        if (key.startsWith("attribute_")) {
          const newKey = key.replace("attribute_", "");
          attributeValues[newKey] = value.toString();
        }
      }

      files.forEach((file) => {
        formData.append("files", file);
      });
      const heroImage = formData.get("hero_image");
      const tag = Array.isArray(tags) ? tags.map(({ value }) => value) : [];

      const metadata = {
        title: title.current?.value,
        count: count.current?.value,
        price: price.current?.value.replace(/,/g, ""),
        category: category,
        service: service,
        description: description.current?.value,
        attributes: attributeValues,
        hero_image: heroImage,
        tags: tag,
      };

      console.log(metadata);

      formData.append("metadata", JSON.stringify(metadata));

      postProductForm.mutate(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
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
                onChange={(event) => {
                  const value = event.target.value.replace(/,/g, "");
                  if (!isNaN(Number(value))) {
                    event.target.value = Number(value).toLocaleString();
                  }
                }}
                className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="flex flex-col w-1/5">
              <label className="block text-sm font-medium text-gray-900">
                دسته بندی
              </label>
              <select
                defaultValue={"0"}
                className="block mt-1 w-full py-1.5 px-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value={"0"}>انتخاب کنید ...</option>
                {responseData.categories?.map((category, index) => (
                  <option value={category.id} key={index}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-1/3">
              <label className="block text-sm font-medium text-gray-900">
                خدمات
              </label>
              <select
                defaultValue={"0"}
                className="block mt-1 w-full py-1.5 px-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                onChange={(event) => setService(event.target.value)}
              >
                <option value={"0"}>انتخاب کنید ...</option>
                {responseData.services?.map((service, index) => (
                  <option value={service.id} key={index}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-row w-full gap-4">
            <div className="flex flex-col w-1/2">
              <label className="block text-sm font-medium text-gray-900 mb-1">
                تگ ها
              </label>
              <Select
                value={tags}
                onChange={(value: SelectValue) => setTags(value)}
                options={responseData.tags}
                primaryColor={"indigo"}
                isSearchable={true}
                placeholder={"انتخاب کنید ..."}
                searchInputPlaceholder={"جستجو ..."}
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
                className="block mt-1 w-full py-1.5 px-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                onChange={onAttributeGroupChange}
              >
                <option value={"0"}>انتخاب کنید ...</option>
                {responseData.attributesGroup?.map((attributeGroup, index) => (
                  <option value={attributeGroup.id} key={index}>
                    {attributeGroup.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-full">
              <label className="block text-sm/6 font-medium text-gray-900">
                ویژگی ها
              </label>
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-purple-600 text-white text-lg">
                      <th className="text-right py-1.5 px-6 border-l">ردیف</th>
                      <th className="text-right py-1.5 px-6 border-l">نام</th>
                      <th className="text-right py-1.5 px-6 border-l">مقدار</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributes.length > 0 &&
                      attributes.map((attr, index) => (
                        <tr
                          key={index}
                          className={`border-b ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-gray-100 transition-colors duration-200`}
                        >
                          <td className="text-right py-4 px-6 border-l border-gray-200 font-medium text-gray-800">
                            {index}
                          </td>
                          <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                            {attr.title}
                          </td>
                          <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                            <input
                              name={`attribute_${attr.id}`}
                              placeholder="مقدار را با هر نوع اطلاعات بیشتر پر کنید"
                              type="text"
                              className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                            />
                          </td>
                        </tr>
                      ))}
                    {/* <tr>
                        <td
                          colSpan={5}
                          className="text-center py-4 px-6 text-gray-500"
                        >
                          خطایی در دریافت اطلاعات رخ داده است !
                        </td>
                      </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-1/2">
              <label className="block text-sm/6 font-medium text-gray-900">
                تصاویر
              </label>
              <FileDropzone onFilesChange={(event) => setFiles(event)} />
              {/* <div className="text-center">
                <div className="border-2 border-dashed border-purple-400 rounded-lg p-5 cursor-pointer hover:bg-blue-50">
                  <p className="text-5xl text-purple-800">تصاویر / ویدئو ها</p>
                  <input type="file" multiple ref={fileRef} />
                </div>
              </div> */}
            </div>

            <div className="flex flex-col w-1/2">
              <label className="block text-sm font-medium text-gray-900">
                توضیحات
              </label>
              <textarea
                ref={description}
                rows={7}
                className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
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
