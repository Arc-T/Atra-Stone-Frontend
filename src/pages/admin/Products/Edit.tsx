import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ApiClient from "../../../services/apiClient";
import {
  AttributeGroup,
  AttributeValue,
  Attributes,
  Category,
  DataResponse,
  ProductMedia,
  // Service,
  Tag,
} from "../../../types/Admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Option,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import FileDropzone from "../../../components/Dropzone";
import Select from "react-tailwindcss-select";
import { Modal } from "../../../components/Modal";
import { formatPrice } from "../../../services/productService";

interface Response {
  details: ProductInfo;
  attributes: AttributeValue[];
  tags: Tag[];
  medias: ProductMedia[];
}

interface ProductInfo {
  id: number;
  title: string;
  price: number;
  count: number;
  name: string;
  categoryId: number;
  serviceGroupId: number;
  description: string;
  createdAt: string;
  attributes: Attributes[];
  tags: number;
}

export default function Edit() {
  const title = useRef<HTMLInputElement>(null);
  const count = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);

  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    files: [] as File[],
    attributes: [] as Attributes[],
    tags: null as SelectValue,
    category: "",
    // service: "",
  });

  const [dataResponse, setDataResponse] = useState<{
    // services: Service[];
    attributesGroup: AttributeGroup[];
    categories: Category[];
    tags: Option[];
  }>({
    // services: [],
    attributesGroup: [],
    categories: [],
    tags: [],
  });

  const [productInfo, setProductInfo] = useState<{
    details: ProductInfo;
    attributes: AttributeValue[];
    medias: ProductMedia[];
  }>({
    details: {} as ProductInfo,
    attributes: [],
    medias: [],
  });

  const { productId } = useParams();
  const [selectedMedia, setSelectedMedia] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiCall = new ApiClient("");

  useEffect(() => {
    if (productId) {
      apiCall
        .setEndpoint(`/products/${productId}/edit`)
        .getRequest<Response>()
        .then((dataResponse) => {
          setProductInfo({
            attributes: dataResponse.attributes,
            details: dataResponse.details,
            medias: dataResponse.medias,
          });

          setFormState((prev) => ({
            ...prev,
            tags: dataResponse.tags.map((tag) => ({
              value: tag.id.toString(),
              label: tag.title,
              isSelected: true,
            })),
          }));
        })
        .catch((error: AxiosError) => {
          toast.error("خطا در دریافت اطلاعات ویرایش!");
          console.log(error);
        });

      apiCall
        .setEndpoint("/products/create")
        .getRequest<DataResponse>()
        .then((dataResponse) => {
          setDataResponse({
            // services: dataResponse.services,
            attributesGroup: dataResponse.attributes_group,
            categories: dataResponse.categories,
            tags: dataResponse.tags.map((tag) => ({
              value: tag.id.toString(),
              label: tag.title,
            })),
          });
        })
        .catch((error: AxiosError) => {
          console.log(error);
          toast.error("خطا در دریافت اطلاعات ایجاد!");
        });
    }
  }, [productId]);

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

  const onModalSubmit = useMutation({
    mutationFn: (productMediaId: number) => {
      apiCall.setEndpoint(`products-media/${productMediaId}/delete`);
      return apiCall.deleteRequest();
    },
    onSuccess: (_, productMediaId) => {
      setProductInfo((prev) => ({
        ...prev,
        medias: prev.medias.filter((media) => media.id !== productMediaId),
      }));
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: true,
      });
      toast.success("عملیات با موفقیت انجام شد!");
    },
    onError: (error: AxiosError) => {
      toast.error("در انجام عملیات خطایی رخ داده است!");
      console.log(error);
    },
  });

  const onUpdateSubmit = useMutation({
    mutationFn: (productMediaId: number) => {
      apiCall.setEndpoint(`products-media/${productMediaId}/update`);
      return apiCall.patchRequest();
    },
    onSuccess: (_, productMediaId: number) => {
      // Update the product info state
      setProductInfo({
        ...productInfo,
        medias: productInfo.medias.map(
          (media) =>
            media.id === productMediaId
              ? { ...media, isHero: true } // Update the target media
              : { ...media, isHero: false } // Ensure others are not marked as hero
        ),
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: true,
      });

      toast.success("عملیات با موفقیت انجام شد!");
    },
    onError: () => {
      toast.error("در انجام عملیات خطایی رخ داده است!");
    },
  });

  const postProductForm = useMutation({
    mutationFn: ({
      formData,
      productId,
    }: {
      formData: FormData;
      productId: string | undefined;
    }) => {
      apiCall.setEndpoint(`products/${productId}/update`);
      return apiCall.putRequest(formData, {
        "Content-type": "multipart/form-data",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: true,
      });
      toast.success("عملیات با موفقیت انجام شد !", {
        bodyClassName: "text-lg font-black",
      });
    },
    onError: () => {
      toast.error("در انجام عملیات خطایی رخ داده است !");
    },
  });

  const constructMetadata = (formData: FormData) => {
    const attributes = formState.attributes.reduce((acc, attr) => {
      const value = formData.get(`attribute_${attr.id}`) || "";
      if (value) acc[attr.id] = value.toString();
      return acc;
    }, {} as Record<string, string>);

    return {
      title: title.current?.value,
      count: count.current?.value,
      price: price.current?.value?.replace(/,/g, ""),
      category: formState.category,
      // service: formState.service,
      description: description.current?.value,
      attributes,
      hero_image: formData.get("hero_image"),
      tags: Array.isArray(formState.tags)
        ? formState.tags.map(({ value }) => value)
        : [],
    };
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const metadata = constructMetadata(formData);

    formState.files.forEach((file) => formData.append("files", file));
    formData.append("metadata", JSON.stringify(metadata));

    postProductForm.mutate({ formData, productId });
  };

  if (!productId)
    return (
      <div className="flex flex-row w-full mt-4">
        <div className="flex flex-col w-full">
          <span className="bg-yellow-200 text-center py-2 px-4 rounded shadow-md font-bold">
            هیچ محصولی انتخاب نشده است !
          </span>
        </div>
      </div>
    );

  return (
    <>
      {isModalOpen && selectedMedia && (
        <Modal
          title="تصویر"
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMedia(null);
          }}
          onSubmit={() => {
            if (selectedMedia) {
              onModalSubmit.mutate(selectedMedia.id);
              setIsModalOpen(false);
            }
          }}
          id={selectedMedia.id}
          name={selectedMedia.name}
        />
      )}
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
              <input
                type="text"
                ref={title}
                className="styled-input"
                defaultValue={productInfo.details.title}
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
                className="styled-input"
                defaultValue={productInfo.details.count}
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
                onChange={formatPrice}
                className="styled-input"
                defaultValue={productInfo.details.price}
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="block text-sm font-medium text-gray-900">
                دسته بندی
              </label>
              <select
                defaultValue={productInfo.details.categoryId || 'انتخاب کنید ...'}
                className="styled-input"
                onChange={(event) =>
                  setFormState({ ...formState, category: event.target.value })
                }
              >
                {dataResponse.categories?.map((category, index) => (
                  <option value={category.id} key={index}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="flex flex-col w-1/3">
              <label className="block text-sm font-medium text-gray-900">
                خدمات
              </label>
              <select
                defaultValue={String(productInfo.details.serviceGroupId)}
                className="styled-input"
                onChange={(event) =>
                  setFormState({ ...formState, service: event.target.value })
                }
              >
                <option value={"0"}>انتخاب کنید ...</option>
                {dataResponse.services?.map((service, index) => (
                  <option value={service.id} key={index}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div> */}
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
                options={dataResponse.tags}
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
                className="styled-input"
                onChange={onAttributeGroupChange}
              >
                <option value={"0"}>انتخاب کنید ...</option>
                {dataResponse.attributesGroup?.map((attributeGroup, index) => (
                  <option value={attributeGroup.id} key={index}>
                    {attributeGroup.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-1/2">
              <label className="block text-sm/6 font-medium text-gray-900">
                ویژگی ها
              </label>
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-red-600 text-white text-lg">
                      <th className="text-right py-1.5 px-6 border-l">ردیف</th>
                      <th className="text-right py-1.5 px-6 border-l">نام</th>
                      <th className="text-right py-1.5 px-6 border-l">مقدار</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formState.attributes.length > 0 ? (
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
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-4 text-gray-700"
                        >
                          هیچ گروه ویژگی انتخاب نشده است!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col w-1/2">
              <label className="block text-sm/6 font-medium text-gray-900">
                ویژگی های ذخیره شده
              </label>
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-red-400 text-white text-lg">
                      <th className="text-right py-1.5 px-6 border-l">ردیف</th>
                      <th className="text-right py-1.5 px-6 border-l">نام</th>
                      <th className="text-right py-1.5 px-6 border-l">مقدار</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productInfo.attributes.map((attr, index) => (
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
                            type="text"
                            className="styled-input"
                            defaultValue={attr.attribute_value}
                            disabled
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
                hasHero={true}
                onFilesChange={(files) => setFormState({ ...formState, files })}
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="block text-sm/6 font-medium text-gray-900">
                عکس های ذخیره شده
              </label>
              <div className="overflow-y-auto border border-gray-300 rounded-lg max-h-[300px]">
                <table className="min-w-full border-collapse bg-white">
                  <thead className="sticky">
                    <tr className="bg-red-400 text-white text-lg">
                      <th className="text-right py-1.5 px-6 border-l">ردیف</th>
                      <th className="text-right py-1.5 px-6 border-l">
                        پس زمینه
                      </th>
                      <th className="text-right py-1.5 px-6 border-l">
                        تاریخ آپلود
                      </th>
                      <th className="text-right py-1.5 px-6 border-l">
                        عملیات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productInfo.medias.map((media, index) => (
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
                          <span
                            className={
                              media.isHero ? "text-green-500" : "text-red-500"
                            }
                          >
                            {media.isHero ? "بله" : "خیر"}
                          </span>
                        </td>
                        <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                          {media.uploadedAt}
                        </td>
                        <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                          <div className="flex justify-center items-center me-2">
                            <a
                              target="_blank"
                              href={`http://localhost:8080/medias/products/${productId}/${media.name}`}
                              className="bg-green-500 text-white me-2 py-2 px-5 rounded-lg hover:bg-green-600 shadow-md transition-all duration-150"
                            >
                              نمایش
                            </a>
                            <button
                              onClick={() => {
                                setSelectedMedia({
                                  id: media.id,
                                  name: media.name,
                                });
                                setIsModalOpen(true);
                              }}
                              type="button"
                              className="bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-600 shadow-md transition-all duration-150 mx-2"
                            >
                              حذف
                            </button>
                            {!media.isHero && (
                              <button
                                onClick={() => {
                                  onUpdateSubmit.mutate(media.id);
                                }}
                                type="button"
                                className="bg-blue-500 text-white py-2 px-5 rounded-lg hover:bg-blue-600 shadow-md transition-all duration-150"
                              >
                                پس زمینه
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-full">
              <label className="block text-sm font-medium text-gray-900">
                توضیحات
              </label>
              <textarea
                ref={description}
                rows={7}
                defaultValue={productInfo.details.description}
                className="styled-input"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-600 shadow-md transition-all duration-150"
          >
            ثبت تغییرات
          </button>
        </div>
      </form>
    </>
  );
}
