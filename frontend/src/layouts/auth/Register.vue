<template>
  <v-container fill-height class="d-flex align-center justify-center">
    <v-card class="pa-4" width="400" elevation="12" rounded="lg">
      <!-- Título -->
      <v-card-title class="text-h5 font-weight-bold text-center mb-4" style="color: #4285F4;">
        Cadastro
      </v-card-title>

      <!-- Formulário -->
      <v-form ref="form" @submit.prevent="handleRegister">
        <v-card-text>
          <v-text-field 
            v-model="name" 
            label="Nome" 
            color="#4285F4" 
            prepend-inner-icon="mdi-account"
            :rules="[rules.required]"
          />
          <v-text-field 
            v-model="cpf" 
            label="CPF" 
            color="#4285F4" 
            prepend-inner-icon="mdi-card-account-details"
            placeholder="000.000.000-00"
            :rules="[rules.required, rules.cpf]"
          />
          <v-text-field 
            v-model="email" 
            label="Email" 
            type="email" 
            color="#4285F4" 
            prepend-inner-icon="mdi-email"
            :rules="[rules.required, rules.email]"
          />
          <v-text-field 
            v-model="password" 
            label="Senha" 
            type="password" 
            color="#4285F4" 
            prepend-inner-icon="mdi-lock"
            :rules="[rules.required, rules.minPassword]"
          />
        </v-card-text>

        <!-- Botões de Ação -->
        <v-card-actions class="d-flex flex-column">
          <v-btn 
            color="#34A853" 
            block 
            dark 
            class="mb-2"
            :loading="loading"
            type="submit"
          >
            Cadastrar
          </v-btn>
          <v-btn 
            text 
            color="#EA4335" 
            class="font-weight-bold"
            @click="$router.push('/login')"
          >
            <v-icon left color="#EA4335">mdi-arrow-left</v-icon>
            Voltar ao Login
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '@/services/auth/authService';
import {useAlertStore} from '@/store/alert'

const router = useRouter();
const form = ref(null);
const alertStore = useAlertStore();

const name = ref('');
const cpf = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);

// Regras de Validação
const rules = {
  required: (value) => !!value || 'Campo obrigatório.',
  email: (value) => /.+@.+\..+/.test(value) || 'E-mail inválido.',
  cpf: (value) =>
    /^\d{11}$/.test(value.replace(/\D/g, '')) || 'CPF inválido.',
  minPassword: (value) =>
    (value && value.length >= 8) || 'A senha deve ter no mínimo 8 caracteres.',
};

async function handleRegister() {
  const isValid = await form.value.validate();

  if (isValid) {
    const payload = {
      name: name.value,
      cpf: cpf.value,
      email: email.value,
      password: password.value,
    };

    try {
      loading.value = true;

      await registerUser(payload);

      alertStore.notifyRegisterSuccess();
      router.push('/login');
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    } finally {
      loading.value = false;
    }
  }
}

</script>

<style scoped>
.v-btn {
  border-radius: 8px;
  text-transform: none;
  font-size: 16px;
}

.v-text-field {
  margin-bottom: 10px;
}
</style>
