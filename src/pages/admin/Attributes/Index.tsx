import { FormEvent, useEffect, useState } from "react"; 
import ApiClient from "../../../services/apiClient";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { CREATE_FAILED_MSG, FETCH_FAILED_MSG } from "../../../types/messages";
import Select from "react-tailwindcss-select";
import { AttributeGroup, Attributes } from "../../../types/Admin";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";
import { useMutation } from "@tanstack/react-query";
import { Modal } from "../../../components/Modal";

interface IndexResponse {
  attributes: Attributes[];
  groups: AttributeGroup[];
}

export default function Index() {
  const api = new ApiClient("");

  const [attributes, setAttributes] = useState({
    fetchedAttributes: [] as Attributes[],
    selectedAttributes: null as SelectValue,
    fetchedGroups: [] as AttributeGroup[],
    selectedGroups: null as SelectValue,
    deleteOption: {} as { id: number; name: string; type: string } | null,
  });

  const [test, setTest] = useState({ tesging: [] as SelectValue });

  useEffect(() => {
    fetchAttributesGroups();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchGroupAttributes = (id: number) => {
    return api
      .setEndpoint(`/attributes/groups/${id}/show`)
      .getRequest<Attributes[]>()
      .then((response) => {
        if (response) {
          const updatedAttributes =
            response.length > 0
              ? response.map((attr) => ({
                  value: attr.id.toString(),
                  label: attr.title,
                  isSelected: true,
                }))
              : null;
            console.log(updatedAttributes);
            
          setAttributes((prev) => ({
            ...prev,
            selectedAttributes: updatedAttributes,
          }));
        }
      })
      .catch((error: AxiosError) => {
        toast.error(FETCH_FAILED_MSG + error.message);
      });
  };
  const fetchAttributesGroups = () => {
    return api
      .setEndpoint("/attributes/index")
      .getRequest<IndexResponse>()
      .then((response) => {
        setAttributes({
          ...attributes,
          fetchedAttributes: response.attributes,
          fetchedGroups: response.groups,
        });
      })
      .catch((error: AxiosError) => {
        toast.error(FETCH_FAILED_MSG + error.message);
      });
  };
  const deleteAttributeGroups = (id: number) => {
    return api.setEndpoint(`/attributes/groups/${id}/delete`).deleteRequest();
  };
  const deleteAttribute = (id: number) => {
    return api.setEndpoint(`/attributes/${id}/delete`).deleteRequest();
  };
  const attributeStore = (title: string) => {
    return api.setEndpoint("attributes/store").postRequest({ title });
  };
  const storeGroup = (title: string) => {
    return api.setEndpoint("attributes/groups/store").postRequest({ title });
  };
  const groupAttributeStore = (groupId: number, attributeIds: number[]) => {
    return api
      .setEndpoint(`attributes/groups/${groupId}/store`)
      .postRequest({ attributeIds });
  };

  const onGroupDelete = useMutation({
    mutationFn: (id: number) => deleteAttributeGroups(id),
    onSuccess: () => {
      toast.success(" گروه ویژگی با موفقیت ثبت شد !", {
        bodyClassName: "text-lg font-black",
      });
      fetchAttributesGroups();
    },
    onError: (error: AxiosError) => {
      toast.error(CREATE_FAILED_MSG + error.message);
    },
  });

  const onAttributeDelete = useMutation({
    mutationFn: (id: number) => deleteAttribute(id),
    onSuccess: () => {
      toast.success("ویژگی با موفقیت ثبت شد !", {
        bodyClassName: "text-lg font-black",
      });
      fetchAttributesGroups();
    },
    onError: (error: AxiosError) => {
      toast.error(CREATE_FAILED_MSG + error.message);
    },
  });

  const onAttributeStore = useMutation({
    mutationFn: (title: string) => attributeStore(title),
    onSuccess: () => {
      toast.success("ویژگی با موفقیت ثبت شد !", {
        bodyClassName: "text-lg font-black",
      });
      fetchAttributesGroups();
    },
    onError: (error: AxiosError) => {
      toast.error(CREATE_FAILED_MSG + error.message);
    },
  });

  const onGroupStore = useMutation({
    mutationFn: (title: string) => storeGroup(title),
    onSuccess: () => {
      toast.success(" ویژگی با موفقیت ثبت شد !", {
        bodyClassName: "text-lg font-black",
      });
      fetchAttributesGroups();
    },
    onError: (error: AxiosError) => {
      toast.error(CREATE_FAILED_MSG + error.message);
    },
  });

  const onGroupAttributesStore = useMutation({
    mutationFn: ({
      groupId,
      attributeIds,
    }: {
      groupId: number;
      attributeIds: number[];
    }) => groupAttributeStore(groupId, attributeIds),
    onSuccess: () => {
      toast.success(" ویژگی با موفقیت ثبت شد !", {
        bodyClassName: "text-lg font-black",
      });
      fetchAttributesGroups();
    },
    onError: (error: AxiosError) => {
      toast.error(CREATE_FAILED_MSG + error.message);
    },
  });

  //TODO: needs a better place to export
  const convertDataToOptions = (
    entities: Array<Record<string, any>>,
    valueAsId: string,
    labelAsTitle: string
  ) => {
    return entities.map((entity) => ({
      value: entity[valueAsId]?.toString(),
      label: entity[labelAsTitle]?.toString(),
    }));
  };

  const handleAttributeFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onAttributeStore.mutate(form.get("attribute_title")?.toString() || "");
  };

  const handleGroupFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onGroupStore.mutate(form.get("group_title")?.toString() || "");
  };

  const handleAssignFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Array.isArray(attributes.selectedAttributes)) {
      const attributeIds = attributes.selectedAttributes.map((attr) =>
        Number(attr.value)
      );

      if (
        !Array.isArray(attributes.selectedGroups) &&
        attributes.selectedGroups
      ) {
        const groupId = Number(attributes.selectedGroups.value);
        onGroupAttributesStore.mutate({ groupId, attributeIds });
      }
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          title={
            attributes.deleteOption?.type === "ATTRIBUTE"
              ? "ویژگی"
              : "گروه ویژگی"
          }
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setAttributes({
              ...attributes,
              deleteOption: null,
            });
          }}
          onSubmit={() => {
            if (attributes.deleteOption?.type === "GROUP")
              onGroupDelete.mutate(attributes.deleteOption.id);
            else if (attributes.deleteOption?.type === "ATTRIBUTE")
              onAttributeDelete.mutate(attributes.deleteOption.id);

            setIsModalOpen(false);
          }}
          id={attributes.deleteOption?.id || 0}
          name={attributes.deleteOption?.name || ""}
        />
      )}
      <div className="flex flex-col gap-4">
        {/* ******************* List Attributes & Attributes Group ******************* */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
            <p className="text-center text-2xl font-semibold mb-4 text-gray-800">
              گروه ویژگی ها
            </p>
            <div className="overflow-y-auto border border-gray-300 rounded-lg max-h-[300px]">
              <table className="min-w-full border-collapse bg-white">
                <thead className="sticky top-0 bg-red-700 text-white shadow-md">
                  <tr>
                    <th className="text-right py-3 px-4 border-l">ردیف</th>
                    <th className="text-right py-3 px-4 border-l">نام</th>
                    <th className="text-right py-3 px-4">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {attributes.fetchedGroups?.length > 0 ? (
                    attributes.fetchedGroups.map((attr_group, index) => (
                      <tr
                        key={attr_group?.id || index}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-100`}
                      >
                        <td className="text-right py-3 px-4 border-l border-gray-300 text-gray-700">
                          {index + 1}
                        </td>
                        <td className="text-right py-3 px-4 border-l border-gray-300 text-gray-700">
                          {attr_group?.title || "نام تعریف نشده"}
                        </td>
                        <td className="text-center py-3 px-4 text-gray-700">
                          <button
                            type="submit"
                            onClick={() => {
                              setIsModalOpen(true);
                              setAttributes({
                                ...attributes,
                                deleteOption: {
                                  id: attr_group.id,
                                  name: attr_group.title,
                                  type: "GROUP",
                                },
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
                      <td
                        colSpan={3}
                        className="text-center py-4 px-6 text-gray-500"
                      >
                        هیچ موردی یافت نشد
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="text-center text-lg font-medium mt-6 mb-3 text-gray-800">
              گروه ویژگی جدید
            </p>
            <form action="POST" onSubmit={handleGroupFormSubmit}>
              <div className="flex items-center gap-4">
                <input
                  name="group_title"
                  className="styled-input border rounded-lg py-2 px-4 w-full focus:ring focus:ring-green-200"
                  type="text"
                  placeholder="نام گروه ویژگی جدید"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:ring focus:ring-green-200"
                >
                  ثبت
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
            <p className="text-center text-2xl font-semibold mb-4 text-gray-800">
              ویژگی ها
            </p>
            <div className="overflow-y-auto border border-gray-300 rounded-lg max-h-[300px]">
              <table className="min-w-full border-collapse bg-white">
                <thead className="sticky top-0 bg-red-700 text-white shadow-md">
                  <tr>
                    <th className="text-right py-3 px-4 border-l">ردیف</th>
                    <th className="text-right py-3 px-4 border-l">نام</th>
                    <th className="text-right py-3 px-4">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {attributes.fetchedAttributes?.length > 0 ? (
                    attributes.fetchedAttributes.map((attr, index) => (
                      <tr
                        key={attr?.id || index}
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
                        <td className="text-center py-3 px-4 text-gray-700">
                          <button
                            type="submit"
                            onClick={() => {
                              setIsModalOpen(true);
                              setAttributes({
                                ...attributes,
                                deleteOption: {
                                  id: attr.id,
                                  name: attr.title,
                                  type: "ATTRIBUTE",
                                },
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
                      <td
                        colSpan={3}
                        className="text-center py-4 px-6 text-gray-500"
                      >
                        هیچ موردی یافت نشد
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="text-center text-lg font-medium mt-6 mb-3 text-gray-800">
              ویژگی جدید
            </p>
            <form action="POST" onSubmit={handleAttributeFormSubmit}>
              <div className="flex items-center gap-4">
                <input
                  name="attribute_title"
                  className="styled-input border rounded-lg py-2 px-4 w-full focus:ring focus:ring-green-200"
                  type="text"
                  placeholder="نام ویژگی جدید"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:ring focus:ring-green-200"
                >
                  ثبت
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* ******************* Assign Attributes to Attribute Groups ******************* */}
        <div className="bg-white shadow-lg rounded-xl py-6 px-8 w-full">
          <form action="POST" onSubmit={handleAssignFormSubmit}>
            <p className="text-center text-2xl font-extrabold text-gray-800 mb-6">
              اختصاص ویژگی به گروه ویژگی
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  گروه ویژگی ها
                </label>
                <Select
                  value={attributes.selectedGroups}
                  onChange={(option) => {
                    setAttributes({ ...attributes, selectedGroups: option });
                    if (!Array.isArray(option))
                      fetchGroupAttributes(Number(option?.value));
                  }}
                  options={convertDataToOptions(
                    attributes.fetchedGroups,
                    "id",
                    "title"
                  )}
                  primaryColor={"indigo"}
                  isSearchable={true}
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
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  ویژگی ها
                </label>
                <Select
                  value={attributes.selectedAttributes}
                  onChange={(value) =>
                    setAttributes({ ...attributes, selectedAttributes: value })
                  }
                  options={convertDataToOptions(
                    attributes.fetchedAttributes,
                    "id",
                    "title"
                  )}
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
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 focus:ring focus:ring-purple-300 shadow-md"
              >
                ثبت تغییرات
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
