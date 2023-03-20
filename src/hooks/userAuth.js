import { useContext } from "react";
import AuthCon from "../contexts/AuthC";

export default function userAuth() {
  return useContext(AuthCon);
}