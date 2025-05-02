import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/admin/Rtl.tsx";
import Home from "./pages/admin/Home";
import CustomerHome from "./pages/user/Home";
import AdminLogin from "./pages/admin/auth/Login.tsx";
import UserLogin from "./pages/user/Auth/Login.tsx";
import List from "./pages/admin/Products/List.tsx";
import ProductIndex from "./pages/admin/Products/Index.tsx";
import CustomerLayout from "./layouts/user/Rtl.tsx";
import CategoryIndex from "./pages/admin/Categories/Index.tsx";
import ServiceIndex from "./pages/admin/Services/Index.tsx";
import AttributeIndex from "./pages/admin/Attributes/Index.tsx";
import CheckToken from "./middleware/CheckToken.tsx";
import Create from "./pages/admin/Products/Create.tsx";
import ProductsList from "./pages/user/EconomicProduct/Index.tsx";
import ProductShow from "./pages/user/EconomicProduct/Show.tsx";
import AcademyIndex from "./pages/user/Academy/Index.tsx";
import CartIndex from "./pages/user/Cart/Index.tsx";
import CustomProductsIndex from "./pages/user/CustomProducts/Index.tsx";
import TestPaymentPage from "./pages/test/Payment.tsx";
import PaymentResultPage from "./pages/test/PaymentResult.tsx";
import Register from "./pages/user/Auth/Register.tsx";
import OrderSummaryContent from "./pages/user/Cart/Shipment.tsx";
// import Edit from "./pages/admin/Products/Edit.tsx";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <CheckToken>
        <AdminLayout />
      </CheckToken>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "products",
        element: <ProductIndex />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "create",
            element: <Create />,
          },
          // {
          //   path: ":productId?/edit",
          //   element: <Edit />,
          // },
        ],
      },
      {
        path: "categories",
        element: <CategoryIndex />,
      },
      {
        path: "services",
        element: <ServiceIndex />,
      },
      {
        path: "attributes",
        element: <AttributeIndex />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/user/login/:backUrl?",
    element: <UserLogin />,
  },
  {
    path: "/user/sign-up/:backUrl?",
    element: <Register />,
  },
  {
    path: "/payment",
    element: <TestPaymentPage />,
  },
  {
    path: "/payment/result/",
    element: <PaymentResultPage />,
  },
  {
    element: <CustomerLayout />,
    children: [
      {
        path: "/",
        element: <CustomerHome />,
      },
      {
        path: "/economic-products",
        element: <ProductsList />,
      },
      {
        path: "/economic-products/:productId/details",
        element: <ProductShow />,
      },
      {
        path: "/custom-products",
        element: <CustomProductsIndex />,
      },
      {
        path: "/academy",
        element: <AcademyIndex />,
      },
      {
        path: "/checkout/cart/",
        element: <CartIndex />,
      },
      {
        path: "/checkout/cart/summary",
        element: <OrderSummaryContent/>,
      },
    ],
  },
]);

export default router;
