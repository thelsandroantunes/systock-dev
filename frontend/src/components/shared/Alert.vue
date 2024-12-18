<template>
  <div v-if="alertStore.text" class="alert-notification">
    <v-alert
      class="animate__animated animate__pulse"
      :type="alertStore.type"
      :text="alertStore.text"
      closable
    ></v-alert>
  </div>
</template>

<script setup>
import 'animate.css';
import { useAlertStore } from '@/store/alert';

// Acesso ao store de alertas
const alertStore = useAlertStore();
</script>

<style scoped>
.alert-notification {
  position: fixed;
  z-index: 1;
  top: 10px; /* Parte superior */
  right: -100%; /* Começa fora da tela à direita */
  width: 100%;
  padding: 10px 35%; /* Ajuste conforme necessário */
  color: white; /* Cor do texto */
  animation: slideIn 1s forwards; /* Animação */
}

/* Define a animação */
@keyframes slideIn {
  from {
    right: -100%; /* Começa fora da tela */
  }
  to {
    right: 0; /* Termina na posição desejada */
  }
}
</style>
