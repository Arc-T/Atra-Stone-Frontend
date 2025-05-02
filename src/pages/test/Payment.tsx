import { toast } from "react-toastify";
import ApiClient from "../../services/apiClient";
import { PAYMENT_CREATE_API, ZARRINPAL_GATEWAY } from "../../types/url";
import { AxiosError } from "axios";
import { sendToBankGateway } from "../../hooks/usePayment";

const demoItems = [
  { id: 1, name: "Item A", price: "$10" },
  { id: 2, name: "Item B", price: "$15" },
  { id: 3, name: "Item C", price: "$20" },
];

export default function TestPaymentPage() {


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Your Items
          </h2>
          <ul className="divide-y divide-gray-200">
            {demoItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between py-3 text-gray-700"
              >
                <span className="font-medium">{item.name}</span>
                <span className="font-semibold">{item.price}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => sendToBankGateway()}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-xl shadow-md"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
