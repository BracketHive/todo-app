<script setup lang="ts">
import { useTasksStore } from '@/stores/task'
import type { Category } from '@/types'

const tasksStore = useTasksStore()

const categories = ref<Category[]>(['All', 'Work', 'Personal', 'Home'])
const selectedCategory = computed(() => tasksStore.category)

const filterByCategory = (category: Category) => {
  tasksStore.setCategory(category)
}
</script>

<template>
  <div class="flex space-x-4">
    <button
      v-for="category in categories"
      :key="category"
      :class="{ 'font-bold': selectedCategory === category }"
      class="hover:text-highlight"
      @click="filterByCategory(category)"
    >
      {{ category }}
    </button>
  </div>
</template>

