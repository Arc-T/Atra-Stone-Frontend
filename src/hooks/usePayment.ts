import { AxiosError } from "axios";
import ApiClient from "../services/apiClient";
import { PAYMENT_CREATE_API, ZARRINPAL_GATEWAY } from "../types/url";
import { toast } from "react-toastify";

export const sendToBankGateway = (orderId: number) => {
  const axiosInstance = new ApiClient(PAYMENT_CREATE_API);
  axiosInstance
    .postRequest<{ authority: string; code: number }>({ id: orderId })
    .then((data) => {
      toast.info("در حال انتقال به درگاه...");
      setTimeout(() => {
        window.location.replace(ZARRINPAL_GATEWAY + data.authority);
      }, 500);
    })
    .catch((error: AxiosError) => {
      toast.error("خطایی رخ داده است: " + error.message);
    });
};
