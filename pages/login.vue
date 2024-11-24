<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

definePageMeta({
  layout: false
})

const authStore = useAuthStore()
const router = useRouter()

const credentials = ref({
  email: '',
  password: '',
})

const handleLogin = () => {
  const taskForm = document.querySelector('#login-form')
  taskForm?.classList.add('validated')

  if (!credentials.value.email || !credentials.value.password) return
  authStore.login(credentials.value)
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col justify-center items-center w-screen h-screen bg-[#F1F1F2]">
    <span class="text-3xl mb-20 motion-preset-expand">To-Do App</span>

    <div class="p-8 bg-white shadow rounded space-y-4 w-96 motion-preset-expand">
      <h1 class="text-2xl font-bold">Login</h1>
      <form id="login-form" class="flex flex-col gap-7" novalidate @submit.prevent="handleLogin">
        <div>
          <label for="email" class="block">Email</label>
          <input v-model="credentials.email" type="email" id="email" class="peer w-full p-2 border rounded focus:outline-none [.validated_&]:invalid:border-red-500 [.validated_&]:invalid:bg-red-50" required />
          <span class="absolute hidden text-sm text-red-500 [.validated_&]:peer-invalid:block">
            Email is required
          </span>

        </div>
        <div>
          <label for="password" class="block">Password</label>
          <input v-model="credentials.password" type="password" id="password" class="peer w-full p-2 border rounded focus:outline-none [.validated_&]:invalid:border-red-500 [.validated_&]:invalid:bg-red-50" required />
          <span class="absolute hidden text-sm text-red-500 [.validated_&]:peer-invalid:block">
            Password is required
          </span>
        </div>
        <button type="submit" class="w-full p-2 bg-highlight text-white hover:text-black bg-black hover:bg-[#FEED00]">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

