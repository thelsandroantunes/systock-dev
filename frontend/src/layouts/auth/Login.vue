<template>
  <v-container fill-height class="d-flex align-center justify-center">
    <v-card class="pa-4" width="400" elevation="12" rounded="lg">
      <!-- Título -->
      <v-card-title class="text-h5 font-weight-bold text-center mb-4" style="color: #4285F4;">
        Login
      </v-card-title>

      <!-- Formulário de Login -->
      <v-form ref="form" @submit.prevent="handleLogin">
        <v-card-text>
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
            :rules="[rules.required]"
          />
        </v-card-text>

        <!-- Botões de Ação -->
        <v-card-actions class="d-flex flex-column">
          <v-btn 
            color="#4285F4" 
            block 
            dark 
            class="mb-2"
            :loading="loading"
            type="submit"
          >
            Entrar
          </v-btn>

          <!-- Botão Cadastro -->
          <v-btn 
            text 
            color="#34A853" 
            class="font-weight-bold"
            @click="$router.push('/register')"
          >
            Cadastre-se
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '@/services/auth/authService';
import { useAlertStore } from '@/store/alert';

const router = useRouter();
const form = ref(null);
const alertStore = useAlertStore();

const email = ref('');
const password = ref('');
const loading = ref(false);

// Regras de Validação
const rules = {
  required: (value) => !!value || 'Campo obrigatório.',
  email: (value) => /.+@.+\..+/.test(value) || 'E-mail inválido.',
};

// Função de Login
async function handleLogin() {
  const isValid = await form.value.validate();

  if (isValid) {
    const payload = {
      email: email.value,
      password: password.value,
    };

    try {
      loading.value = true;


      const response = await loginUser(payload);
      console.log('login response', response);

      localStorage.setItem('token', response.token);
      localStorage.setItem('userName', response.user.name);
      localStorage.setItem('userMail', response.user.email);
      alertStore.notifyLoginSuccess();
      router.push('/');

    } catch (error) {
      console.error("Erro no login:", error);
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
