import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../../../types/admin";
import { generateUrl } from "../../../services/general";
import { PRODUCT_DETAILS_API } from "../../../types/url";
import { useCategoryUIStore } from "../../../contexts/categoryStore";
import { getProductsByCategory } from "../../../services/productService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function Index() {
  const [products, setProducts] = useState([] as Product[]);
  const { selectedChild } = useCategoryUIStore();
  const { parent, child } = useParams();
  useEffect(() => {
    if (selectedChild)
      getProductsByCategory(selectedChild.id)
        .then((response) => {
          setProducts(response);
          console.log(selectedChild);
        })
        .catch((error: AxiosError) => {
          toast.error(error.message);
        });
  }, [parent, child]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2> */}

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-5 xl:gap-x-8">
        {/* Filters Column */}
        <div className="col-span-1 rounded-md border border-gray-300 p-4">
          <div className="mb-6">
            <label
              htmlFor="category"
              className="text-emerald-800 font-semibold"
            >
              انتخاب دسته‌بندی
            </label>
            <select
              id="category"
              className="border rounded p-2 w-full focus:ring-2 focus:ring-emerald-500 transition-colors mt-2"
            >
              <option value="all">تمام دسته‌ها</option>
              <option value="electronics">الکترونیک</option>
              <option value="fashion">مد و لباس</option>
              <option value="home">خانه و آشپزخانه</option>
              <option value="beauty">آرایشی و بهداشتی</option>
              <option value="sports">ورزش و تناسب اندام</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="min-price"
              className="text-emerald-800 font-semibold"
            >
              محدوده قیمت
            </label>

            <div className="mt-2">
              <input
                type="number"
                name="min"
                id="min-price"
                className="block w-full border rounded p-3 mb-4 focus:ring-2 transition duration-200"
                placeholder="حداقل قیمت"
              />
            </div>

            <div className="mt-4">
              <input
                type="number"
                name="max"
                id="max-price"
                className="block w-full border rounded p-3 focus:ring-2 transition duration-200"
                placeholder="حداکثر قیمت"
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
                    productName:
                      (product.media && product.media[0].name) || "No Image",
                  })}
                  className="aspect-square w-full rounded-t-lg bg-gray-100 object-cover group-hover:opacity-80 transition-opacity duration-300 lg:aspect-auto lg:h-80"
                />
                <div className="p-4">
                  <div>
                    <h3 className="text-md text-gray-600 truncate">
                      <Link to={`${product.id}/details`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </Link>
                    </h3>
                  </div>
                  <div className="flex justify-between items-start mt-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {Number(product.price).toLocaleString()} تومان
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.quantity} عدد
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
