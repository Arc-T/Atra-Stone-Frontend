import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/admin/Rtl.tsx";
import Home from "./pages/admin/Home";
import CustomerHome from "./pages/user/Home";
import Login from "./pages/admin/auth/Login.tsx";
import List from "./pages/admin/Products/List.tsx";
import ProductIndex from "./pages/admin/Products/Index.tsx";
import CustomerLayout from "./layouts/user/Rtl.tsx";
import CategoryIndex from "./pages/admin/Categories/Index.tsx";
import TagIndex from "./pages/admin/Tags/Index.tsx";
import AttributeIndex from "./pages/admin/Attributes/Index.tsx";
import CheckToken from "./middleware/CheckToken.tsx";
import Create from "./pages/admin/Products/Create.tsx";
import ProductsList from "./pages/user/EconomicProduct/Index.tsx";
import ProductShow from "./pages/user/EconomicProduct/Show.tsx";
import AcademyIndex from "./pages/user/Academy/Index.tsx";
import CustomProductsIndex from "./pages/user/CustomProducts/Index.tsx";
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
        path: "tags",
        element: <TagIndex />,
      },
      {
        path: "attributes",
        element: <AttributeIndex />,
      },
    ],
  },
  {
    path: "/user/login",
    element: <Login />,
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
    ],
  },
]);

export default router;
