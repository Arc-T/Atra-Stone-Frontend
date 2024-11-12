import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../../services/apiClient.ts";
import { Products } from "./productType.ts";

const List = () => {
  const api = new ApiClient("/products/list");

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Products[]>({
    queryKey: ["products"],
    queryFn: () => api.getRequest<Products>(),
  });

  return (
    <>
      <div className="overflow-x-auto rounded-lg my-4">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr className="bg-red-700 text-white text-lg">
              <th className="text-right py-4 px-6 border-l">ردیف</th>
              <th className="text-right py-4 px-6 border-l">عنوان</th>
              <th className="text-right py-4 px-6 border-l">قیمت</th>
              <th className="text-right py-4 px-6 border-l">تعداد</th>
              <th className="text-right py-4 px-6">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={product.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-colors duration-200`}
                >
                  <td className="text-right py-4 px-6 border-l border-gray-200 font-medium text-gray-800">
                    {product.id}
                  </td>
                  <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                    {product.title}
                  </td>
                  <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                    {product.price} تومان
                  </td>
                  <td className="text-right py-4 px-6 border-l border-gray-200 text-gray-700">
                    {product.count} عدد
                  </td>
                  <td className="text-right py-4 px-6 flex gap-2 justify-center items-center">
                    <button className="bg-green-500 text-white py-2 px-5 rounded-lg hover:bg-green-600 shadow-md transition-all duration-150">
                      نمایش
                    </button>
                    <button className="bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-600 shadow-md transition-all duration-150">
                      حذف
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 px-6 text-gray-500">
                  خطایی در دریافت اطلاعات رخ داده است !
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
