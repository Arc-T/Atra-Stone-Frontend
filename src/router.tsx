import {createBrowserRouter} from "react-router-dom";
import Rtl from "./layouts/admin/Rtl.tsx";
import Home from "./pages/admin/Home";
import Login from "./pages/admin/auth/Login.tsx";
import CheckToken from "./middlewares/CheckToken.ts";

const router = createBrowserRouter([
    {
        path: "/admin",
        element: <Rtl/> ,
        children: [
            {
                path: "home",
                element: <Home/>,
            },
        ],
    },
    {
        path: "/admin/login",
        element: <Login/>,
    },
]);
export default router;
