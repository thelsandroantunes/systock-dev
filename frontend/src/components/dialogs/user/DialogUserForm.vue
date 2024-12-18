<template>
  <v-dialog v-model="internalModelValue" max-width="500" @close="cancel">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ user?.id ? "Editar Usuário" : "Adicionar Usuário" }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="formData.name"
            label="Nome"
            color="#4285F4"
            prepend-inner-icon="mdi-account"
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="formData.cpf"
            label="CPF"
            color="#4285F4"
            prepend-inner-icon="mdi-card-account-details"
            :rules="[rules.required, rules.cpf]"
          />
          <v-text-field
            v-model="formData.email"
            label="Email"
            type="email"
            color="#4285F4"
            prepend-inner-icon="mdi-email"
            :rules="[rules.required, rules.email]"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="#EA4335" @click="cancel">Cancelar</v-btn>
        <v-btn color="#34A853" dark @click="save">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  user: Object,
});

const emit = defineEmits(["update:modelValue", "save"]);

// Variável interna para controlar o estado do diálogo
const internalModelValue = ref(props.modelValue);

// Objeto para armazenar os dados do formulário
const formData = ref({
  name: "",
  cpf: "",
  email: "",
});

// Regras de validação
const rules = {
  required: (value) => !!value || "Campo obrigatório.",
  email: (value) => /.+@.+\..+/.test(value) || "E-mail inválido.",
  cpf: (value) =>
    /^\d{11}$/.test(value.replace(/\D/g, "")) || "CPF inválido.",
};

// Preenche o formulário ao abrir o diálogo
watch(
  () => props.user,
  (newUser) => {
    formData.value = newUser
      ? { ...newUser }
      : { name: "", cpf: "", email: "" };
  },
  { immediate: true }
);

// Sincroniza o estado do diálogo com a prop modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    internalModelValue.value = newValue;
  }
);

// Função para cancelar
function cancel() {
  emit("update:modelValue", false);
}

// Função para salvar
function save() {
  emit("save", formData.value);
  emit("update:modelValue", false); // Fecha o diálogo após salvar
}
</script>