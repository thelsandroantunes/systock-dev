<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" class="elevation-4">
      <v-img
        src="https://picsum.photos/1920/1080?random"
        gradient="to top right, rgba(255, 255, 255, 0.8), rgba(66, 133, 244, 0.8)"
        height="100"
        cover
        class="pt-2"
      >
        <div class="d-flex flex-column justify-center align-start px-4">
          <v-list>
            <v-list-item
              prepend-avatar="@/assets/avatar.png"
              :title="userName"
              :subtitle="userMail"
            >
            <span class="logout-link" @click.stop="logout">Logout</span>
            </v-list-item>
          </v-list>
        </div>
      </v-img>

      <v-divider></v-divider>

      <v-list :lines="false" density="compact" nav>
        <router-link v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item :value="item" class="nav-item" color="primary">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="teal darken-4"
      image="https://picsum.photos/1920/1080?random"
      density="prominent"
    >
      <template v-slot:image>
        <v-img gradient="to top right, rgba(255, 255, 255, 0.8), rgba(66, 133, 244, 0.8)">
</v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>CRUD Users</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const drawer = ref(null);
const userName = ref('');
const userMail = ref('');

const items = [
  { text: "Home", icon: "mdi-folder", to: "/" },
];

function loadUserData() {
  const name = localStorage.getItem('userName');
  const mail = localStorage.getItem('userMail');
  userName.value = name || 'Temp';
  userMail.value = mail || '@mail';
}

function logout() {
  localStorage.removeItem('userName');
  localStorage.removeItem('userMail');
  router.push({ name: 'Login' });
}

onMounted(() => {
  loadUserData();
});
</script>

<style scoped>
a {
  text-decoration: none;
  color: #505050;
}

.nav-item {
  transition: background-color 0.3s ease;
  border-radius: 8px;
}

.nav-item:hover {
  background-color: rgba(19, 84, 122, 0.1);
}

.logout-link {
  color: #505050;
  cursor: pointer;
  transition: color 0.2s ease;
  font-weight: bold;
}

.logout-link:hover {
  color: #f50606;
}
</style>
