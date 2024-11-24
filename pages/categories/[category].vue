<script setup lang="ts">
import { useTasksStore } from "@/stores/task"

const route = useRoute()

const category = route.params.category.charAt(0).toUpperCase() + route.params.category.slice(1)

const tasksStore = useTasksStore()
tasksStore.setCategory(category)
tasksStore.fetchTasks()
const filteredTasks = computed(() => tasksStore.loadTasks)
</script>

<template>
  <div class="max-w-3xl mx-auto p-4 bg-background">
    <h1 class="text-xl font-bold">{{ category }}</h1>
    <div class="py-10">
      <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>
