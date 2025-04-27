import { useEffect, useRef, useState } from "react";
import { Category, Tag } from "../../../types/admin";
import { toast } from "react-toastify";
import ApiClient from "../../../services/apiClient";
// import { Modal } from "../../../components/DeleteModal";

interface TagOption {
  id: number;
  title: string;
  isSubmitted?: boolean;
}

export default function Index() {
  const apiCall = new ApiClient("/tags/index");
  const title = useRef<HTMLInputElement>(null);

  const [tagState, setTagState] = useState<{
    fetchedCategories: Tag[];
    newTag: Tag | null;
    editingCategories: TagOption[];
    deleteTag: Tag | null;
  }>({
    fetchedCategories: [],
    editingCategories: [],
    newTag: null,
    deleteTag: null,
  });

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [action, setAction] = useState("");

  useEffect(() => {
    apiCall
      .getRequest<Category[]>()
      .then((categories) => {
        setTagState({ ...tagState, fetchedCategories: categories });
      })
      .catch(() => toast.error("در دریافت اطلاعات خطایی رخ داده است !"));
  }, []);

  // const categoryStore = useMutation({
  //   mutationFn: (title: string) => {
  //     apiCall.setEndpoint("tags/store");
  //     return apiCall.postRequest<number>({ title });
  //   },
  //   onSuccess: (response, requestTitle: string) => {
  //     toast.success("تگ با موفقیت ثبت شد !", {
  //       bodyClassName: "text-lg font-black",
  //     });
  //     setTagState({
  //       ...tagState,
  //       fetchedCategories: [
  //         ...tagState.fetchedCategories,
  //         { id: response, title: requestTitle },
  //       ],
  //       newTag: null,
  //     });
  //   },
  //   onError: (error: AxiosError) => {
  //     toast.error("در عملیات ثبت، خطایی رخ داده است !" + error.code);
  //   },
  // });

  // const categoryUpdate = useMutation({
  //   mutationFn: ({ id, title }: Category) => {
  //     apiCall.setEndpoint(`tags/${id}/update`);
  //     return apiCall.putRequest({ title });
  //   },
  //   onSuccess: (_, { id, title }) => {
  //     toast.success("عملیات با موفقیت انجام شد !", {
  //       bodyClassName: "text-lg font-black",
  //     });
  //     setTagState((prevState) => ({
  //       ...prevState,
  //       editingCategories: prevState.editingCategories.filter(
  //         (edit) => edit.id !== id
  //       ),
  //       fetchedCategories: prevState.fetchedCategories.map((category) =>
  //         category.id === id ? { ...category, title } : category
  //       ),
  //     }));
  //   },
  //   onError: () => {
  //     toast.error("در انجام عملیات خطایی رخ داده است !");
  //   },
  // });

  // const categoryDelete = useMutation({
  //   mutationFn: (id: number) => {
  //     apiCall.setEndpoint(`tags/${id}/delete`);
  //     return apiCall.deleteRequest();
  //   },
  //   onSuccess: (_, id: number) => {
  //     toast.success("دسته بندی با موفقیت حذف شد !", {
  //       bodyClassName: "text-lg font-black",
  //     });

  //     setTagState({
  //       ...tagState,
  //       newTag: null,
  //       fetchedCategories: tagState.fetchedCategories.filter(
  //         (category) => category.id !== id
  //       ),
  //     });
  //   },
  //   onError: () => {
  //     toast.error("در انجام عملیات حذف، خطایی رخ داده است !");
  //   },
  // });

  // const onAddFormSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (title.current?.value)
  //     if (action === "ADD")
  //       categoryStore.mutate(title.current?.value.toString());
  //     else if (action === "EDIT") {
  //       const submittedCategory =
  //         tagState.editingCategories.find((category) => category.isSubmitted) ||
  //         null;
  //       if (submittedCategory)
  //         categoryUpdate.mutate({
  //           id: submittedCategory.id,
  //           title: title.current?.value,
  //         });
  //     }
  // };

  return (
    <>
      {/* {isModalOpen && (
        <Modal
          title="دسته بندی"
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setTagState({
              ...tagState,
              deleteTag: null,
            });
          }}
          onSubmit={() => {
            if (tagState.deleteTag?.id)
              categoryDelete.mutate(tagState.deleteTag?.id);
            setIsModalOpen(false);
          }}
          id={tagState.deleteTag?.id || 0}
          name={tagState.deleteTag?.title || ""}
        />
      )} */}
      <div className="bg-white shadow-md rounded-lg py-4 px-4">
        <div className="overflow-x-auto rounded-lg">
          <form method="POST">
            <table className="min-w-full border-collapse bg-white">
              <thead>
                <tr className="bg-red-700 text-white text-lg">
                  <th className="text-right py-4 px-6 border-l">ردیف</th>
                  <th className="text-right py-4 px-6 border-l">نام</th>
                  <th className="text-right py-4 px-6">عملیات</th>
                </tr>
              </thead>

              <tbody>
                {tagState.fetchedCategories &&
                tagState.fetchedCategories.length > 0 ? (
                  tagState.fetchedCategories.map((category, index) => {
                    const isEditing = tagState.editingCategories.some(
                      (edit) => edit.id === category.id
                    );
                    return (
                      <tr
                        key={category.id}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-100 transition-colors duration-200`}
                      >
                        <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                          {index + 1}
                        </td>
                        <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                          {isEditing ? (
                            <input
                              type="text"
                              className="styled-input border rounded-md px-3 py-2 w-full"
                              placeholder="نام دسته بندی"
                              defaultValue={category.title}
                              ref={title}
                            />
                          ) : (
                            category.title
                          )}
                        </td>
                        <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                          <div className="flex justify-center items-center me-2">
                            <button
                              onClick={() => {
                                if (!isEditing) {
                                  setTagState((prevState) => ({
                                    ...prevState,
                                    editingCategories: [
                                      ...prevState.editingCategories,
                                      {
                                        id: category.id,
                                        title: category.title,
                                      },
                                    ],
                                  }));
                                  // setAction("EDIT");
                                } else {
                                  setTagState((prevState) => ({
                                    ...prevState,
                                    editingCategories: [
                                      ...tagState.editingCategories.filter(
                                        (edit) => edit.id !== category.id
                                      ),
                                    ],
                                  }));
                                }
                              }}
                              type="button"
                              className={`py-2 px-5 rounded-lg shadow-md transition-all duration-150 mx-2 ${
                                isEditing
                                  ? "bg-gray-500 hover:bg-gray-600 text-white"
                                  : "bg-blue-500 hover:bg-blue-600 text-white"
                              }`}
                            >
                              {isEditing ? "بازگشت" : "ویرایش"}
                            </button>

                            {isEditing ? (
                              <button
                                type="submit"
                                onClick={() => {
                                  setTagState((prevState) => ({
                                    ...prevState,
                                    editingCategories:
                                      prevState.editingCategories.map((edit) =>
                                        edit.id === category.id
                                          ? { ...edit, isSubmitted: true }
                                          : edit
                                      ),
                                  }));
                                }}
                                className="py-2 px-5 rounded-lg shadow-md transition-all duration-150 mx-2 bg-yellow-500 hover:bg-yellow-600 text-white"
                              >
                                ثبت تغییرات
                              </button>
                            ) : (
                              <button
                                type="button"
                                // onClick={() => {
                                //   setIsModalOpen(true);
                                //   setTagState((prevState) => ({
                                //     ...prevState,
                                //     deleteTag: {
                                //       id: category.id,
                                //       title: category.title,
                                //     },
                                //   }));
                                // }}
                                className="py-2 px-5 rounded-lg shadow-md transition-all duration-150 mx-2 bg-red-500 hover:bg-red-600 text-white"
                              >
                                حذف
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
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

                {tagState.newTag && (
                  <tr
                    key={tagState.fetchedCategories.length + 1}
                    className="border-b hover:bg-gray-100 transition-colors duration-200"
                  >
                    <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                      {tagState.fetchedCategories.length + 1}
                    </td>
                    <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                      <input
                        type="text"
                        className="styled-input"
                        placeholder="نام تگ جدید"
                        ref={title}
                      />
                    </td>
                    <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                      <div className="flex justify-center items-center me-2">
                        <button
                          type="submit"
                          onClick={() => {
                            setTagState((prevState) => ({
                              ...prevState,
                              newTag: null, // Explicitly setting newTag to null
                            }));
                          }}
                          className="bg-gray-500 text-white py-2 px-5 rounded-lg hover:bg-gray-600 shadow-md transition-all duration-150 mx-2"
                        >
                          بازگشت
                        </button>
                        <button
                          type="submit"
                          onClick={() => {
                            // setAction("ADD");
                          }}
                          className="bg-green-500 text-white py-2 px-5 rounded-lg hover:bg-green-600 shadow-md transition-all duration-150 mx-2"
                        >
                          ذخیره
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </form>
        </div>
        <button
          onClick={() => {
            if (!tagState.newTag)
              setTagState({
                ...tagState,
                newTag: { id: 0, title: "" },
              });
            else {
              toast.warning("فیلد اضافه شده است !");
            }
          }}
          className="bg-green-500 text-white py-4 px-6 rounded-full hover:bg-green-600 shadow-md transition-all duration-150 fixed left-2 bottom-4"
        >
          <span className="text-2xl font-bold">+</span>
        </button>
      </div>
    </>
  );
}
