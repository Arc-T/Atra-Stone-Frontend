import { PRODUCT_DETAILS_API } from "../../../types/url.ts";
import { generateUrl } from "../../../services/general.ts";
import Table from "../../../components/Table.tsx";
import { useFetchProducts } from "../../../hooks/useProducts.ts";
import useModalStore from "../../../contexts/modalStore.tsx";
import { DeleteModal } from "../../../components/DeleteModal.tsx";
import { deleteProductById } from "../../../services/productService.ts";
import { toast } from "react-toastify";
import {
  DELETE_FAILED_MSG,
  DELETE_SUCCESS_MSG,
} from "../../../types/messages.ts";
import { AxiosError } from "axios";

const List = () => {
  const tableColumns = [
    "ردیف",
    "عنوان",
    "قیمت",
    "تعداد",
    "تاریخ ایجاد",
    "عملیات",
  ];

  const { onOpenModal, isModalOpen, modalProps } = useModalStore();
  const {
    data: products,
    isLoading,
    error: axiosError,
    refetch: fetchProducts,
  } = useFetchProducts();

  const onDeleteProduct = (id: number) => {
    deleteProductById(id)
      .then(() => {
        fetchProducts();
        toast.success(DELETE_SUCCESS_MSG);
      })
      .catch((error: AxiosError) =>
        toast.error(DELETE_FAILED_MSG + error.message)
      );
  };

  return (
    <>
      {isModalOpen && (
        <DeleteModal onSubmit={() => onDeleteProduct(Number(modalProps.id))} />
      )}
      <Table columns={tableColumns} error={axiosError} loading={isLoading}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product, index) => (
            <tr
              key={index}
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition-colors duration-200`}
            >
              <td className="text-right py-4 px-6 border-l border-gray-200 font-medium text-gray-800">
                {index + 1}
              </td>
              <td className="styled-table-cell flex items-center justify-start">
                <img
                  className="w-12 h-12 rounded-full ml-2"
                  src={generateUrl(PRODUCT_DETAILS_API, {
                    productId: product.id,
                    productName: product.media
                      ? product.media.find((item) => item.order === 1)?.name ??
                        "Default Name"
                      : "Didn't find",
                  })}
                />
                {product.title}
              </td>
              <td className="styled-table-cell">
                {Number(product.price).toLocaleString()} تومان
              </td>
              <td className="styled-table-cell">{product.quantity} عدد</td>
              <td className="styled-table-cell" dir="ltr">{product.created_at}</td>
              <td className="py-4 px-6">
                <div className="flex justify-center items-center ms-2">
                  <button
                    onClick={() => {
                      onOpenModal({
                        id: product.id.toString(),
                        name: product.title,
                        title: "کالا",
                      });
                    }}
                    className="bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-600 shadow-md transition-all duration-150"
                  >
                    حذف
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr className="border-b bg-gray-50">
            <td
              colSpan={tableColumns.length}
              className="text-center py-4 px-6 border-l border-gray-200 font-medium text-gray-800"
            >
              هیچ محصولی وارد نشده!
            </td>
          </tr>
        )}
      </Table>
    </>
  );
};
export default List;
