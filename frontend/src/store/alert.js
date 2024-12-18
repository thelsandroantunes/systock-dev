import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    showAlert: false,
    type: "error", // Tipos: error, success, warning, info
    text: "", // Texto da mensagem exibida no alerta
  }),
  actions: {
    /**
     * Exibe o alerta com base no estado atual (type e text).
     */
    notifyAlert() {
      this.showAlert = true;

      // Oculta o alerta após 5 segundos
      setTimeout(() => {
        if (this.showAlert) {
          this.showAlert = false;
          this.text = "";
        }
      }, 3000);
    },
    /**
     * Exibe alerta de sucesso para cadastro.
     */
    notifyRegisterSuccess() {
      this.type = "success";
      this.text = "Cadastro realizado com sucesso!";
      this.notifyAlert();
    },
    /**
     * Exibe alerta de erro para cadastro.
     */
    notifyRegisterError() {
      this.type = "error";
      this.text = "Erro ao realizar cadastro. Tente novamente!";
      this.notifyAlert();
    },
    /**
     * Exibe alerta de sucesso para login.
     */
    notifyLoginSuccess() {
      this.type = "success";
      this.text = "Login realizado com sucesso!";
      this.notifyAlert();
    },
    /**
     * Exibe alerta de erro para login.
     */
    notifyLoginError() {
      this.type = "error";
      this.text = "Erro ao realizar login. Verifique suas credenciais!";
      this.notifyAlert();
    },
    /**
     * Exibe alerta para erros de tempo limite.
     */
    notifyTimeoutError() {
      this.type = "warning";
      this.text = "Tempo limite de resposta excedido. Tente novamente mais tarde.";
      this.notifyAlert();
    },
    /**
     * Exibe alerta dinâmico para mensagens personalizadas de erro.
     */
    notifyDynamicError(message) {
      this.type = "error";
      this.text = message;
      this.notifyAlert();
    },
  },
});
