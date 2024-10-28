import { createBrowserRouter } from "react-router-dom";
import Rtl from "./layouts/admin/Rtl.tsx";
import Home from "./pages/admin/Home";

const router = createBrowserRouter([
  {
    path: "/admin/",
    element: <Rtl />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);
export default router;
