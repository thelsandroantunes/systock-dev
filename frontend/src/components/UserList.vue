<template>
  <v-container>
    <!-- Campo de Pesquisa e Botão de Adicionar -->
    <v-row class="mb-4 align-center">
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="search"
          label="Pesquisar Usuários"
          color="#4285F4"
          prepend-inner-icon="mdi-magnify"
        />
      </v-col>
      <v-col cols="12" sm="6" class="text-right">
        <v-btn color="#34A853" dark @click="openAddDialog">
          <v-icon left>mdi-plus</v-icon>Adicionar Usuário
        </v-btn>
      </v-col>
    </v-row>

    <!-- Tabela de Usuários -->
    <v-data-table
      :items="filteredUsers"
      :headers="headers"
      class="elevation-1"
      item-value="id"
      hide-default-footer
    >
      <template v-slot:item.actions="{ item }">
        <v-btn icon color="#4285F4" @click="editUser(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="#EA4335" @click="deleteUser(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Dialog de Adicionar/Editar Usuário -->
    <DialogUserForm
      v-model="isDialogOpen"
      :user="selectedUser"
      @save="handleSave"
    />

    <!-- Dialog de Exclusão -->
    <DialogDelete
      v-model="isDeleteDialogOpen"
      :item-name="selectedUser?.name"
      @confirm="confirmDelete"
    />
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DialogUserForm from "@/components/dialogs/user/DialogUserForm.vue";
import DialogDelete from "@/components/dialogs/user/DialogUserDelete.vue";
import { getAll, destroy, update, create, getId } from '@/services/user/userService';

// Estado da tabela
const users = ref([]); // Inicializa como uma lista vazia
const search = ref("");
const headers = [
  { text: "Nome", value: "name" },
  { text: "CPF", value: "cpf" },
  { text: "Email", value: "email" },
  { text: "Ações", value: "actions", sortable: false },
];

// Estado para diálogos
const isDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);
const selectedUser = ref(null);
const token = localStorage.getItem('token');
console.log(token);

// Função para buscar usuários
const fetchUsers = async () => {
    if (token) {
        try {
            users.value = await getAll(token);
            console.log('Usuários:', users.value);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    } else {
        console.error('Token não encontrado. Usuário não autenticado.');
    }
};

const destroyUser = async (id) => {
    if (token) {
        try {
            await destroy(id, token);
        } catch (error) {
            console.error('Erro ao apagar usuário:', error);
        }
    } else {
        console.error('Token não encontrado. Usuário não autenticado.');
    }
};

const updateUser = async (id, payload) => {
    if (token) {
        try {
            await update(id, payload, token);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    } else {
        console.error('Token não encontrado. Usuário não autenticado.');
    }
};

const createUser = async (payload) => {
    if (token) {
        try {
            await create(payload, token);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    } else {
        console.error('Token não encontrado. Usuário não autenticado.');
    }
};


// Chame a função fetchUsers quando o componente for montado
onMounted(fetchUsers);

// Computed para filtrar usuários
const filteredUsers = computed(() => {
  const term = search.value.toLowerCase();
  return users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(term) ||
      user.cpf.includes(term) ||
      user.email.toLowerCase().includes(term)
  );
});

// Função para abrir o diálogo de adicionar
function openAddDialog() {
  selectedUser.value = null;
  isDialogOpen.value = true;
}

// Função para editar usuário
function editUser(user) {
  selectedUser.value = { ...user };
  isDialogOpen.value = true;
}

// Função para salvar (adicionar/editar)
async function handleSave(newUser) {

  if (newUser.id) {
    console.log(newUser);
    const newUserFilter = {
      name: newUser.name,
      cpf: newUser.cpf,
      email: newUser.email
    };
    console.log(newUserFilter);
    await updateUser(selectedUser.value.id, newUserFilter);

    // Atualiza usuário existente
    const index = users.value.findIndex((u) => u.id === newUser.id);
    if (index !== -1) users.value[index] = newUser;
  } else {
    const newUserPass = {
      name: newUser.name,
      cpf: newUser.cpf,
      email: newUser.email,
      password: '12345678'
    };
    await createUser(newUserPass);
    // Novo usuário
    newUser.id = users.value.length + 1; // Gera um ID mock apenas para a lógica, se necessário
    users.value.push(newUser);
  }
  isDialogOpen.value = false;
}

// Função para abrir o diálogo de exclusão
function deleteUser(id) {
  selectedUser.value = users.value.find((u) => u.id === id);
  isDeleteDialogOpen.value = true;
}

// Confirma a exclusão
async function confirmDelete() {

  await destroyUser(selectedUser.value.id);

  users.value = users.value.filter((u) => u.id !== selectedUser.value.id);
  isDeleteDialogOpen.value = false;
  selectedUser.value = null;

}
</script>