import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "react-bootstrap-icons";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ZARRINPAL_VERIFY } from "../../../types/url";
import ApiClient from "../../../services/apiClient";

type PaymentStatus = "pending" | "success" | "failure";

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("Status");
  const authority = searchParams.get("Authority");

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("pending");

  const verifyResult = (authority: string) => {
    const axiosInstance = new ApiClient(ZARRINPAL_VERIFY);
    axiosInstance
      .postRequest<{ ref_id: string; code: number; message: string }>({
        authority,
        amount: 110000,
      })
      .then((data) => {
        console.log(data);
        toast.success("پرداخت با موفقیت تأیید شد.");
        setPaymentStatus("success");
      })
      .catch((error) => {
        toast.error("خطا در تأیید پرداخت: " + error.message);
        setPaymentStatus("failure");
      });
  };

  useEffect(() => {
    if (status === "OK" && authority) {
      setPaymentStatus("pending");
      verifyResult(authority);
    } else {
      setPaymentStatus("failure");
    }
  }, []);

  const renderContent = () => {
    switch (paymentStatus) {
      case "pending":
        return (
          <>
            <div className="mx-auto w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            <h2 className="text-2xl font-bold text-gray-800">
              در حال بررسی پرداخت
            </h2>
            <p className="text-gray-600">لطفاً منتظر بمانید...</p>
          </>
        );
      case "success":
        return (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-800">پرداخت موفق</h2>
            <p className="text-gray-600">
              با تشکر! پرداخت شما با موفقیت انجام شد.
            </p>
          </>
        );
      case "failure":
        return (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-800">پرداخت ناموفق</h2>
            <p className="text-gray-600">
              متأسفانه پرداخت با مشکل مواجه شد. لطفاً دوباره تلاش کنید.
            </p>
          </>
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center space-y-6">
        {renderContent()}
        <button
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md"
          onClick={() => (window.location.href = "/")}
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
}
