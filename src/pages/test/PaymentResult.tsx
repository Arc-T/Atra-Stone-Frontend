// import { useEffect, useState } from "react";
// import { CheckCircle, XCircle } from "react-bootstrap-icons";
// import { useSearchParams } from "react-router-dom";
// import ApiClient from "../../services/apiClient";
// import { ZARRINPAL_VERIFY } from "../../types/url";
// import { AxiosError } from "axios";
// import { toast } from "react-toastify";

// export default function PaymentResultPage() {
//   const [searchParams] = useSearchParams();

//   const status = searchParams.get("Status");
//   const authority = searchParams.get("Status");
//   // const authority = searchParams.get("Authority");

//   const [isSuccess, setIsSuccess] = useState(false);

//   const verifyResult = (authority: string) => {
//     const axiosInstance = new ApiClient(ZARRINPAL_VERIFY);
//     axiosInstance
//       .postRequest<{ ref_id: string; code: number; message: string }>({
//         authority: authority,
//         amount: 110000,
//       })
//       .then((data) => {
//         console.log(data);
//         toast.success("Good Job Boy");
//         setIsSuccess(true);
//       })
//       .catch((error: AxiosError) => toast.error("NOT VALID: " + error.message));
//   };

//   useEffect(() => {
//     if (status === "OK" && authority) verifyResult(authority);
//   }, []);

//   //A000000000000000000000000000oxvnr53p

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center space-y-6">
//         {isSuccess ? (
//           <>
//             <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
//             <h2 className="text-2xl font-bold text-gray-800">
//               Payment Successful
//             </h2>
//             <p className="text-gray-600">
//               Thank you! Your payment has been processed.
//             </p>
//           </>
//         ) : (
//           <>
//             <XCircle className="w-16 h-16 text-red-500 mx-auto" />
//             <h2 className="text-2xl font-bold text-gray-800">Payment Failed</h2>
//             <p className="text-gray-600">
//               Oops! Something went wrong. Please try again.
//             </p>
//           </>
//         )}
//         <button
//           className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md"
//           onClick={() => (window.location.href = "/")}
//         >
//           Go Back Home
//         </button>
//         <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md">
//           check
//         </button>
//       </div>
//     </div>
//   );
// }
