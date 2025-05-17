import { useEffect, useState } from "react";
import { Order } from "../../../../types/admin";
import { getUserOrders } from "../../../../services/userService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const ProfileOrder = () => {
  const [fetchedData, setFetchedData] = useState({ orders: [] as Order[] });

  useEffect(() => {
    getUserOrders()
      .then((response) => setFetchedData({ orders: response }))
      .catch((error: AxiosError) => {
        toast.error("در انحام عملیات خطایی رخ داده است !");
        console.log(error.cause);
        console.log(error.message);
      });
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold border-b pb-2">سفارش‌های من</h2>

      {fetchedData.orders.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          شما هیچ سفارشی ثبت نکرده‌اید.
        </div>
      ) : (
        <div className="space-y-4">
          {fetchedData.orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-2xl p-4 shadow-sm hover:shadow transition"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-gray-500">کد سفارش:</span>{" "}
                    <span className="font-medium">{order.id}</span>
                  </p>
                  <p>
                    <span className="text-gray-500">تاریخ:</span>{" "}
                    {order.created_at}
                  </p>
                  <p>
                    <span className="text-gray-500">وضعیت:</span>{" "}
                    <span className="text-green-600">{order.status}</span>
                  </p>
                  <p>
                    <span className="text-gray-500">مبلغ کل:</span>{" "}
                    {order.price}
                  </p>
                </div>

                <button className="bg-red-500 text-white text-sm px-4 py-2 rounded-xl hover:bg-red-600 transition">
                  مشاهده جزئیات
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileOrder;
