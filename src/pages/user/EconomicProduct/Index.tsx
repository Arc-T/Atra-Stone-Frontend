import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ApiClient from "../../../services/apiClient";
import { toast } from "react-toastify";
import { Product } from "../../../types/admin";
import { generateUrl } from "../../../services/general";
import { PRODUCT_DETAILS_API } from "../../../types/url";

export default function Index() {
  const apiCall = new ApiClient("products/index");
  const [products, setProducts] = useState([] as Product[]);

  const getProducts = useMutation({
    mutationFn: () => {
      return apiCall.getRequest<Product[]>();
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
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2> */}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-5 xl:gap-x-8">
          {/* Filters Column */}
          <div className="col-span-1 rounded-md border border-gray-300 p-4">
            <div className="mb-6">
              <label htmlFor="category" className="text-emerald-800">
                فیلتر ها
              </label>
              <select id="category" className="border rounded p-2 w-full">
                <option value="all">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="min-price">Price Range</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  name="min"
                  className="border rounded p-2 w-full"
                  placeholder="Min Price"
                />
                <input
                  type="number"
                  name="max"
                  className="border rounded p-2 w-full"
                  placeholder="Max Price"
                />
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div className="col-span-4">
            {/* Filter Section */}
            <div className="flex flex-wrap justify-start items-center gap-4 mb-6">

              <div className="text-lg font-semibold text-gray-800">
                مرتب سازی بر اساس:
              </div>
              <div className="flex space-x-reverse space-x-4">
                {/* Filter Options */}
                <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  پربازدید ترین
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  ارزانترین
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  گرانترین
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  جدیدترین
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={generateUrl(PRODUCT_DETAILS_API, {
                      productId: product.id,
                      productName: product.media
                        ? product.media.find((item) => item.order === 1)
                            ?.name ?? "Default Name"
                        : "Default Name",
                    })}
                    className="aspect-square w-full rounded-t-lg bg-gray-100 object-cover group-hover:opacity-80 transition-opacity duration-300 lg:aspect-auto lg:h-80"
                  />
                  <div className="p-4">
                    <div>
                      <h3 className="text-md text-gray-600 truncate">
                        <Link to={`${product.id}/details`}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </Link>
                      </h3>
                    </div>
                    <div className="flex justify-between items-start mt-4">
                      <p className="text-sm font-semibold text-gray-900">
                        {Number(product.price).toLocaleString()} تومان
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.count} عدد
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
