import { useEffect, useState } from "react";
import { Calendar3, CurrencyDollar, PersonCircle } from "react-bootstrap-icons";
import { OrderFullInfo } from "../../../../types/admin";
import { showUserOrder } from "../../../../services/orderService";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PRODUCT_DETAILS_API } from "../../../../types/url";
import { generateUrl } from "../../../../services/general";

const ShowOrderInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [fetchedData, setFetchedData] = useState<OrderFullInfo>();

  useEffect(() => {
    if (id) {
      showUserOrder(id)
        .then((response) => setFetchedData(response))
        .catch(() => toast.error("خطایی رخ داده است !"));
    }
  }, []);

  return (
    <div dir="rtl" className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center">جزئیات سفارش</h1>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <PersonCircle /> اطلاعات کاربر
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <span className="font-bold">نام:</span> {fetchedData?.user.name}
          </p>
          <p>
            <span className="font-bold">شماره:</span> {fetchedData?.user.phone}
          </p>
          <p>
            <span className="font-bold">آدرس:</span> {fetchedData?.user.address}
          </p>
          <p>
            <span className="font-bold">استان:</span>{" "}
            {fetchedData?.user.userProvince.name}
          </p>
          <p>
            <span className="font-bold">جنسیت:</span>{" "}
            {fetchedData?.user.gender === "MALE" ? "مرد" : "زن"}
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">محصولات</h2>
        <div className="grid gap-4">
          {fetchedData &&
            fetchedData.orderDetails.map((detail) => (
              <div
                key={detail.id}
                className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow"
              >
                <img
                  src={generateUrl(PRODUCT_DETAILS_API, {
                    productId: detail.product.id,
                    productName:
                      detail.product.productMedia[0].name || "No Image",
                  })}
                  alt="product"
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <div>
                  <p>
                    <span className="font-bold">تعداد:</span> {detail.quantity}
                  </p>
                  <p>
                    <span className="font-bold">قیمت واحد:</span>{" "}
                    {detail.price.toLocaleString()} تومان
                  </p>
                  <p>
                    <span className="font-bold">قیمت کل:</span>{" "}
                    {(detail.quantity * detail.price).toLocaleString()} تومان
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <CurrencyDollar /> پرداختی‌ها
        </h2>
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-xl overflow-hidden text-sm text-center">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 font-bold">نوع</th>
              <th className="px-6 py-3 font-bold">مبلغ</th>
              <th className="px-6 py-3 font-bold">کد پیگیری</th>
              <th className="px-6 py-3 font-bold">وضعیت</th>
              <th className="px-6 py-3 font-bold">پیام</th>
              <th className="px-6 py-3 font-bold">تاریخ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fetchedData &&
              fetchedData.orderPayments.map((pay) => (
                <tr key={pay.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    {pay.type === "WEB" ? "پرداخت اینترنتی" : pay.type}
                  </td>
                  <td className="px-6 py-4">
                    {pay.price.toLocaleString()} تومان
                  </td>
                  <td className="px-6 py-4">{pay.referenceId}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        pay.status === "PAID" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {pay.status === "PAID" ? "پرداخت شده" : "ناموفق"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{pay.message}</td>
                  <td className="px-6 py-4">{pay.createdAt}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6 text-2xl font-bold text-blue-600">
        <Calendar3 className="inline-block ml-2" />
        تاریخ سفارش: {fetchedData?.created_at} | مبلغ کل:{" "}
        {fetchedData?.sumPrice.toLocaleString()} تومان
      </div>
    </div>
  );
};

export default ShowOrderInfo;
