import {Navigate} from "react-router-dom";

export default function hasToken(): string | null {

    return localStorage.getItem("token");

}