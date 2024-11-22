<script setup lang="ts">
import { useTasksStore } from "@/stores/task"
import type { Category } from "@/types"

const props = defineProps<{
  category: Category
}>()

const tasksStore = useTasksStore()

const filteredTasks = computed(() => tasksStore.tasksByCategory(props.category))
</script>

<template>
  <div class="max-w-3xl mx-auto p-4 bg-background">
    <h1 class="text-2xl font-bold">Category: {{ category }}</h1>
    <div class="space-y-4">
      <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>
