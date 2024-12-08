import { createBrowserRouter } from "react-router-dom";
import Rtl from "./layouts/admin/Rtl.tsx";
import Home from "./pages/admin/Home";
import Login from "./pages/admin/auth/Login.tsx";
import List from "./pages/admin/Products/List.tsx";
import ProductIndex from "./pages/admin/Products/Index.tsx";
import CategoryIndex from "./pages/admin/Categories/Index.tsx";
import TagIndex from "./pages/admin/Tags/Index.tsx";
import AttributeIndex from "./pages/admin/Attributes/Index.tsx";
import CheckToken from "./middleware/CheckToken.tsx";
import Create from "./pages/admin/Products/Create.tsx";
import Edit from "./pages/admin/Products/Edit.tsx";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <CheckToken>
        <Rtl />
      </CheckToken>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
        index: true,
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
          {
            path: ":productId?/edit",
            element: <Edit />,
          },
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
    path: "/admin/login",
    element: <Login />,
  },
]);

export default router;
