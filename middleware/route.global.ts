import { useAuthStore } from '@/stores/auth'

const allowedPaths = ['/login']

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    if (!allowedPaths.includes(to.path)) {
      return navigateTo('/login')
    }
  }

  if (authStore.isAuthenticated && allowedPaths.includes(to.path)) return navigateTo('/')
})
