import axios from "axios";
import {useAlertStore} from '@/store/alert'

const alertStore = useAlertStore();

// Log para verificar as variáveis de ambiente
console.log("VUE_APP_API_URL:", process.env.VUE_APP_API_URL);
console.log("VUE_APP_API_TIMEOUT:", process.env.VUE_APP_API_TIMEOUT);

// Criação da instância do Axios
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:8000/api",
  timeout: process.env.VUE_APP_API_TIMEOUT
    ? parseInt(process.env.VUE_APP_API_TIMEOUT, 10)
    : 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de Resposta para tratamento de erros
instance.interceptors.response.use(

  (response) => response,
  (error) => {
    console.error(
      "Erro na API:",
      error.response?.data?.message || error.message
    );
    console.log("alertStore:", alertStore);
    if (error.code === "ECONNABORTED") {
      // Trata timeout de requisição
      alertStore.notifyTimeoutError();
    } else if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data;
3
      // Verifica o código de status
      if (status === 401) {
        console.error("Não autorizado. Faça login novamente.");
        alertStore.notifyDynamicError("Não autorizado. Faça login novamente.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else if (status === 500) {
        console.error("Erro interno no servidor.");
        alertStore.notifyDynamicError("Erro interno no servidor. Tente novamente mais tarde.");
      } else if (status === 422) {
        // Trata erros de validação
        if (errorData.cpf && Array.isArray(errorData.cpf)) {
          alertStore.notifyDynamicError(errorData.cpf[0]); // Mostra o primeiro erro de CPF
        } else if (errorData.email && Array.isArray(errorData.email)) {
          alertStore.notifyDynamicError(errorData.email[0]); // Mostra o segundo erro de E-mail
        } else if (errorData.message) {
          alertStore.notifyDynamicError(errorData.message); // Mensagem genérica da API
        } else {
          alertStore.notifyDynamicError("Erro inesperado na validação dos dados.");
        }
      } else {
        // Outros erros de resposta
        alertStore.notifyDynamicError(errorData?.message || "Erro inesperado.");
      }
    } else {
      // Fallback para erro genérico
      alertStore.notifyDynamicError("Erro inesperado. Tente novamente mais tarde.");
    }

    return Promise.reject(error);
  }
);


// Interceptor de Requisição para adicionar o Token no Header
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
