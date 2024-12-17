import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ApiClient from "../../../services/apiClient";
import { toast } from "react-toastify";
import { Products } from "../../../types/Admin";


export default function Index() {
  const apiCall = new ApiClient("products/index");
  const [products, setProducts] = useState([] as Products[]);

  const getProducts = useMutation({
    mutationFn: () => {
      return apiCall.getRequest<Products[]>();
    },
    onSuccess: (response) => {
      setProducts(response);
    },
    onError: () => {
      toast.error("در دریافت اطلاعات خطایی رخ داده است !");
    },
  });

  useEffect(() => {
    getProducts.mutate();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2> */}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={`http://localhost:8080/medias/products/${product.id}/${product.name}`}
                className="aspect-square w-full rounded-t-lg bg-gray-100 object-cover group-hover:opacity-80 transition-opacity duration-300 lg:aspect-auto lg:h-80"
              />
              <div className="p-4">
                <div>
                  <h3 className="text-md text-gray-600 truncate">
                    <Link to={`/${product.id}/details`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                </div>
                <div className="flex justify-between items-start mt-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {Number(product.price).toLocaleString()} تومان
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{product.count} عدد</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
