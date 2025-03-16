import { useEffect, useState } from "react";
import { Category } from "../../../types/admin";
import { toast } from "react-toastify";
import Table from "../../../components/Table";

export default function Index() {
  const [fetchedData, setFetchedData] = useState<{
    fetchedCategories: Category[];
  }>({
    fetchedCategories: [],
  });

  const onMount = () => {};

  useEffect(() => {
    apiCall
      .getRequest<Category[]>()
      .then((categories) => {
        setCategoryState({ ...categoryState, fetchedCategories: categories });
      })
      .catch(() => toast.error("در دریافت اطلاعات خطایی رخ داده است !"));
  }, []);

  return (
    <>
      {/* {isModalOpen && (
        <Modal
          title="دسته بندی"
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCategoryState({
              ...categoryState,
              deleteCategory: null,
            });
          }}
          onSubmit={() => {
            if (categoryState.deleteCategory?.id)
              categoryDelete.mutate(categoryState.deleteCategory?.id);
            setIsModalOpen(false);
          }}
          id={categoryState.deleteCategory?.id || 0}
          name={categoryState.deleteCategory?.title || ""}
        />
      )} */}
      <div className="bg-white shadow-md rounded-lg py-4 px-4">
        <div className="overflow-x-auto rounded-lg">
          <form method="POST" onSubmit={onAddFormSubmit}>
            <Table columns={["ردیف", "نام", "سرگروه", "آدرس مرورگر", "عملیات"]}>
              {isPending ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4 px-6 text-blue-500"
                  >
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
                  <td
                    colSpan={5}
                    className="text-center py-4 px-6 text-gray-500"
                  >
                    هیچ موردی یافت نشد
                  </td>
                </tr>
              )}
            </Table>
          </form>
        </div>
      </div>
    </>
  );
}
