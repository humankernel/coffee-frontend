import { API_BASE } from "@/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 1000,
});
