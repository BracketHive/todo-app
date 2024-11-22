<script setup lang="ts">
import { useTasksStore } from "@/stores/task";

const tasksStore = useTasksStore();
// tloginasksStore.fetchTasks()

// const tasks = computed(() => tasksStore.loadTasks)
const tasks = [
  {
    id: 234234,
    title: "Testing",
    completed: false,
    category: "Work",
  },
];
</script>

<template>
  <div class="flex flex-col gap-20 max-w-[800px] mx-auto w-full p-4">
    <TaskForm class="mt-14" />
    <div class="flex flex-col gap-4">
      <CategoryFilter />
      <div class="space-y-4">
        <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
      </div>
    </div>
  </div>
</template>
