import { ChangeEvent, useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import { Option } from "react-tailwindcss-select/dist/components/type";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../../components/Input";
import { PRODUCT_COUNT_LABEL, PRODUCT_PRICE_LABEL } from "../../../types/html";
import Table from "../../../components/Table";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import {
  AttributeGroup,
  Category,
  // Service,
  Attributes,
} from "../../../types/admin";
// import FileDropzone from "../../../components/Dropzone";
import {
  fetchCreateDetails,
  formatPrice,
  showAttributeGroupAttributes,
  uploadMedia,
} from "../../../services/productService";
import {
  FETCH_FAILED_MSG,
  MULTISELECT_PLACEHOLDER,
  MULTISELECT_SEARCH_PLACEHOLDER,
} from "../../../types/messages";


interface FormValues {
  title: string;
  count: number;
  price: number;
  tags: { value: string; label: string }[];
  attributes: string[];
  category: string;
  description: string;
}

const Create = () => {
  const { register, handleSubmit, control } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  const [formState, setFormState] = useState({
    files: [] as File[],
    attributes: [] as Attributes[],
    // tags: null as SelectValue,
    // category: "",
    // service: "",
  });

  const [progress, setProgress] = useState(10);

  const [responseData, setResponseData] = useState({
    // services: [] as Service[],
    attributesGroup: [] as AttributeGroup[],
    categories: [] as Category[],
    tags: [] as Option[],
  });

  useEffect(() => {
    fetchCreateDetails()
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
  }, []);

  const onAttributeGroupChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedGroup = Number(event.target.value);
    showAttributeGroupAttributes(selectedGroup)
      .then((data) =>
        setFormState((prev) => ({ ...prev, attributes: data || [] }))
      )
      .catch((error) => console.error("Error fetching attributes:", error));
  };

  const handleMediaUpload = () => {
    const media = new FormData();
    formState.files.forEach((file) => media.append("files", file));
    uploadMedia(media, (percentage) => {
      setProgress(percentage);
    });
  };

  return (
    <>
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6 my-4">
          <div className="flex flex-row gap-4">
            {/* TITLE Input */}
            <div className="flex flex-col w-1/5">
              <Input
                label={PRODUCT_COUNT_LABEL}
                {...register("title")}
                name="title"
                type="text"
              />
            </div>
            {/* COUNT Input */}
            <div className="flex flex-col w-1/12">
              <Input
                label={PRODUCT_COUNT_LABEL}
                {...register("count")}
                name="count"
                type="number"
                min={0}
                placeholder="0"
              />
            </div>
            {/* PRICE Input */}
            <div className="flex flex-col w-1/5">
              <Input
                label={PRODUCT_PRICE_LABEL}
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
                {...register("category")}
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
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <Select
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
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
                )}
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
            <div className="flex flex-col w-full">
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
                          {...register(`attributes.${index}`)}
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

{
  // const title = useRef<HTMLInputElement>(null);
  // const count = useRef<HTMLInputElement>(null);
  // const price = useRef<HTMLInputElement>(null);
  // const description = useRef<HTMLTextAreaElement>(null);
  /* <Select
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
              /> */
}

//   try {
//     const formData = new FormData(event.currentTarget);

//     const attributes = formState.attributes.reduce((acc, attr) => {
//       const value = formData.get(`attribute_${attr.id}`) || "";
//       if (value) acc[attr.id] = value.toString();
//       return acc;
//     }, {} as { [key: string]: string });

//     const metadata = {
//       // title: title.current?.value,
//       // count: count.current?.value,
//       // price: price.current?.value.replace(/,/g, ""),
//       category: formState.category,
//       // service: formState.service,
//       // description: description.current?.value,
//       attributes: attributes,
//       hero_image: formData.get("hero_image"),
//       tags: Array.isArray(formState.tags)
//         ? formState.tags.map(({ value }) => value)
//         : [],
//     };
//     formData.append("metadata", JSON.stringify(metadata));
//     // postProductForm.mutate(formData);
//   } catch (error) {
//     console.error("Error submitting form:", error);
//   }
{
  /* <div className="flex flex-col w-1/3">
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
            </div> */
}
// const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
// };
