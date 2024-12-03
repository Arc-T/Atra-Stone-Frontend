import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../../services/apiClient.ts";
import { useState } from "react";
import { Modal } from "../../../components/Modal.tsx";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Products } from "../../../types/Admin.ts";

const List = () => {
  const api = new ApiClient("/products/list");

  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Products[]>({
    queryKey: ["products"],
    queryFn: () => api.getRequest<Products[]>(),
    staleTime: Infinity,
    refetchOnMount: true,
  });

  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalSubmit = useMutation({
    mutationFn: (productId: number) => {
      api.setEndpoint(`products/${productId}/delete`);
      return api.deleteRequest();
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        exact: true,
      });
      toast.success("عملیات با موفقیت انجام شد !");
    },
    onError: (error: AxiosError) => {
      toast.error("در انجام عملیات خطایی رخ داده است !");
    },
  });

  return (
    <>
      {isModalOpen && selectedProduct && (
        <Modal
          title="کالا"
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          onSubmit={() => {
            if (selectedProduct) {
              onModalSubmit.mutate(selectedProduct.id);
              setIsModalOpen(false);
            }
          }}
          id={selectedProduct.id}
          name={selectedProduct.name}
        />
      )}

      <div className="overflow-x-auto rounded-lg my-4">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr className="bg-red-700 text-white text-lg">
              <th className="text-right py-4 px-6 border-l">ردیف</th>
              <th className="text-right py-4 px-6 border-l">عنوان</th>
              <th className="text-right py-4 px-6 border-l">قیمت</th>
              <th className="text-right py-4 px-6 border-l">تعداد</th>
              <th className="text-right py-4 px-6 border-l">تاریخ ایجاد</th>
              <th className="text-right py-4 px-6">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  <div className="flex justify-center items-center reverse-space-x-2">
                    <div className="ml-2 w-12 h-12 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-gray-500"></div>
                    <span className="text-gray-500">
                      در حال دریافت اطلاعات ...
                    </span>
                  </div>
                </td>
              </tr>
            )}

            {!isLoading && products && products.length > 0
              ? products.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition-colors duration-200`}
                  >
                    <td className="text-right py-4 px-6 border-l border-gray-200 font-medium text-gray-800">
                      {index + 1}
                    </td>
                    <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700 flex items-center justify-start">
                      <img
                        className="w-12 h-12 rounded-full ml-2" // Added margin-right to space between image and text
                        src={`http://localhost:8080/medias/products/${product.id}/${product.name}`}
                      />
                      {product.title}
                    </td>
                    <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                      {Number(product.price).toLocaleString()} تومان
                    </td>
                    <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                      {product.count} عدد
                    </td>
                    <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                      {product.createdAt}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center items-center ms-2">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="bg-green-500 text-white me-2 py-2 px-5 rounded-lg hover:bg-green-600 shadow-md transition-all duration-150">
                          ویرایش
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedProduct({
                              id: product.id,
                              name: product.title,
                            });
                            setIsModalOpen(true);
                          }}
                          className="bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-600 shadow-md transition-all duration-150"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : !isLoading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-4 px-6 text-gray-500"
                    >
                      {error
                        ? "در دریافت اطلاعات خطایی رخ داده است"
                        : "هیچ محصولی یافت نشد"}
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default List;
