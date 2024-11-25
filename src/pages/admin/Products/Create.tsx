import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { toast } from "react-toastify";
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

  const apiCall = new ApiClient("products/create");
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    files: [] as File[],
    attributes: [] as Attributes[],
    tags: null as SelectValue,
    category: "",
    service: "",
  });

  const [responseData, setResponseData] = useState({
    services: [] as Service[],
    attributesGroup: [] as AttributeGroup[],
    categories: [] as Category[],
    tags: [] as Option[],
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
    const selectedGroup = event.target.value;
    apiCall
      .setEndpoint(`attributes/${selectedGroup}/show`)
      .getRequest<Attributes[]>()
      .then((data) =>
        setFormState((prev) => ({ ...prev, attributes: data || [] }))
      )
      .catch((error) => console.error("Error fetching attributes:", error));
  };

  const postProductForm = useMutation({
    mutationFn: (formData: FormData) => {
      apiCall.setEndpoint("products/store");
      return apiCall.postRequest(formData, {
        "Content-type": "multipart/form-data",
      });
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: true,
      });
      toast.success("عملیات با موفقیت انجام شد !",
      {bodyClassName:"text-lg font-black"});
    },
    onError: (error: AxiosError) => {
      toast.error("در انجام عملیات خطایی رخ داده است !");
    },
  });

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const attributes = formState.attributes.reduce((acc, attr) => {
        const value = formData.get(`attribute_${attr.id}`) || "";
        if (value) acc[attr.id] = value.toString();
        return acc;
      }, {} as { [key: string]: string });

      formState.files.forEach((file) => formData.append("files", file));

      const metadata = {
        title: title.current?.value,
        count: count.current?.value,
        price: price.current?.value.replace(/,/g, ""),
        category: formState.category,
        service: formState.service,
        description: description.current?.value,
        attributes: attributes,
        hero_image: formData.get("hero_image"),
        tags: Array.isArray(formState.tags)
          ? formState.tags.map(({ value }) => value)
          : [],
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
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col gap-6 my-4">
          <div className="flex flex-row gap-4">
            {/* Name Input */}
            <div className="flex flex-col w-1/5">
              <label className="block text-sm font-medium text-gray-900">
                نام
              </label>
              <input type="text" ref={title} className="styled-input" />
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
                className="styled-input"
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
                className="styled-input"
              />
            </div>

            <div className="flex flex-col w-1/5">
              <label className="block text-sm font-medium text-gray-900">
                دسته بندی
              </label>
              <select
                defaultValue={"0"}
                className="styled-input"
                onChange={(event) =>
                  setFormState({ ...formState, category: event.target.value })
                }
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
                className="styled-input"
                onChange={(event) =>
                  setFormState({ ...formState, service: event.target.value })
                }
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
              <label className="block text-sm font-medium text-gray-900 mt-1">
                تگ ها
              </label>
              <Select
                value={formState.tags}
                onChange={(value) =>
                  setFormState({ ...formState, tags: value })
                }
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
                className="styled-input"
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
                    {formState.attributes.length > 0 &&
                      formState.attributes.map((attr, index) => (
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
                              className="styled-input"
                            />
                          </td>
                        </tr>
                      ))}
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
              <FileDropzone
                onFilesChange={(files) => setFormState({ ...formState, files })}
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="block text-sm font-medium text-gray-900">
                توضیحات
              </label>
              <textarea
                ref={description}
                rows={7}
                className="styled-input"
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
