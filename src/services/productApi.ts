// import { axiosInstance } from "./apiClient.ts";

// class ProductApi {
//   getAllProduct = () => {
//     return axiosInstance
//       .get<Products[]>("products/list", {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         return response.data;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   createProduct = (files: FormData) => {
//     return axiosInstance
//       .post<Products[]>(
//         "products/upload",
//         files,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       )
//       .then((response) => {
//         return response.data;
//       })
//       .catch((error) => {
//         console.error("Error creating product:", error);
//       });
//   };
// }

// export default ProductApi;
//   title: product.title,
//   price: product.price,
//   count: product.count,
//   description: product.description,
