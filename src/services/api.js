import axios from "axios";

const api = axios.create({
  baseURL: "https://thevirustracker.com/",
  timeout: 10000,
  timeoutErrorMessage: "Tempo de resposta excedido."
});

export default api;
