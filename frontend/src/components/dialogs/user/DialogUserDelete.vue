<template>
  <v-dialog v-model="internalValue" max-width="400">
    <v-card>
      <v-card-title class="text-h5">Confirmação</v-card-title>
      <v-card-text>Você tem certeza que deseja excluir <strong>{{ itemName }}</strong>?</v-card-text>
      <v-card-actions>
        <v-btn text color="#4285F4" @click="cancel">Cancelar</v-btn>
        <v-btn color="#EA4335" dark @click="confirm">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

// Define as props
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
});

// Define os eventos a serem emitidos
const emit = defineEmits(["update:modelValue", "confirm"]);

// Cria uma variável interna para controlar o estado do diálogo
const internalValue = ref(props.modelValue);

// Assista mudanças na prop para sincronizar com o estado interno
watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

// Função para cancelar a exclusão
function cancel() {
  emit("update:modelValue", false); // Fecha o diálogo
}

// Função para confirmar a exclusão
function confirm() {
  emit("confirm"); // Emitir evento de confirmação
  emit("update:modelValue", false); // Fecha o diálogo após confirmação
}
</script>