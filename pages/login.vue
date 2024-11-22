<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = () => {
  authStore.login({ email, password })
}
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-background">
    <div class="p-8 bg-white shadow rounded space-y-4">
      <h1 class="text-2xl font-bold">Login</h1>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="email" class="block">Email</label>
          <input v-model="email" type="email" id="email" class="w-full p-2 border rounded" required />
        </div>
        <div>
          <label for="password" class="block">Password</label>
          <input v-model="password" type="password" id="password" class="w-full p-2 border rounded" required />
        </div>
        <button type="submit" class="w-full p-2 bg-highlight text-black font-bold rounded hover:bg-yellow-400">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

