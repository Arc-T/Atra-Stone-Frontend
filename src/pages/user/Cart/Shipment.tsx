import { useEffect, useState } from "react";
import {
  Truck,
  CashStack,
  ChevronUp,
  ChevronDown,
} from "react-bootstrap-icons";
import { createOrder } from "../../../services/orderService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Product, User } from "../../../types/admin";
import { PRODUCT_DETAILS_API } from "../../../types/url";
import { generateUrl } from "../../../services/general";
import { sendToBankGateway } from "../../../hooks/usePayment";

const OrderSummaryContent = () => {
  const [fetchedData, setFetchedData] = useState({
    order_id: 0,
    delivery_cost: 0,
    total_price: 0,
    user_info: {} as User,
    products: [] as Product[],
  });

  const [showProducts, setShowProducts] = useState(false);

  const toggleProducts = () => setShowProducts(!showProducts);

  const productTotal = fetchedData.products.reduce(
    (sum, p) => sum + p.price,
    0
  );

  useEffect(() => {
    const products = localStorage
      .getItem("cart")
      ?.split(",")
      .map((data) => ({
        id: Number(data),
        quantity: 1,
      }));
    const userStringInfo = localStorage.getItem("user");
    if (userStringInfo) {
      const userInfo = JSON.parse(userStringInfo) as User;
      if (products)
        createOrder({
          products: products,
          delivery: 1,
        })
          .then((response) => {
            setFetchedData({
              order_id: response.order_id,
              delivery_cost: response.delivery_cost,
              total_price: response.total_price,
              products: response.products,
              user_info: userInfo,
            });
          })
          .catch((error: AxiosError) => {
            toast.error("در ساخت سفارش خطایی رخ داده است!");
            console.log(error.message);
          });
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">خلاصه سفارش#</h1>

      {/* User Details */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          مشخصات کاربر
        </h2>
        <p className="text-gray-700">
          <span className="font-medium">نام کامل:</span>{" "}
          {fetchedData.user_info.name}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">آدرس:</span>{" "}
          {fetchedData.user_info.address}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">شماره تماس:</span>{" "}
          {fetchedData.user_info.phone}
        </p>
      </div>

      {/* Product Summary */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">مجموع محصولات</h2>
          <span className="text-lg font-bold text-gray-900">
            {productTotal} تومان
          </span>
        </div>
        <button
          onClick={toggleProducts}
          className="flex items-center mt-4 text-blue-600 hover:text-blue-800 transition"
        >
          {showProducts ? "پنهان کردن جزئیات" : "نمایش جزئیات محصولات"}
          {showProducts ? (
            <ChevronUp className="ml-1" />
          ) : (
            <ChevronDown className="ml-1" />
          )}
        </button>

        {showProducts && (
          <ul className="mt-4 space-y-4">
            {fetchedData.products.map((product, index) => (
              <li
                key={index}
                className="flex items-start gap-4 border p-3 rounded-md"
              >
                <img
                  src={generateUrl(PRODUCT_DETAILS_API, {
                    productId: product.id,
                    productName: product.media[0].name,
                  })}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{product.title}</p>
                  <p className="text-gray-500 text-sm">{product.description}</p>
                </div>
                <span className="text-gray-800 font-semibold">
                  {product.price} تومان
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Delivery and Total */}
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-start gap-2">
            <Truck className="text-gray-500 mt-1" />
            <div>
              <p className="text-lg font-medium text-gray-900">پست</p>
              <p className="text-sm text-gray-500">ارسال از طریق شرکت پست</p>
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {fetchedData.delivery_cost} تومان
          </p>
        </div>

        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CashStack className="text-gray-500" />
            <p className="text-lg font-medium text-gray-900">جمع کل</p>
          </div>
          <p className="text-lg font-bold text-gray-900">
            {fetchedData.total_price} تومان
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendToBankGateway(fetchedData.order_id);
        }}
      >
        <div className="mt-6 text-left">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ادامه به پرداخت
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderSummaryContent;
