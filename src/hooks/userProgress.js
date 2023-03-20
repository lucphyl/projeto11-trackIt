import { useContext } from "react";
import ProgressCon from "../contexts/PercentageC";

export default function useProgress() {
  return useContext(ProgressCon);
}