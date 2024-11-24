<script setup lang="ts">
import { useTasksStore } from "@/stores/task";

const tasksStore = useTasksStore();
tasksStore.fetchTasks()

const tasks = computed(() => tasksStore.tasks)
const filteredTasks = computed(() => tasksStore.loadTasks)
</script>

<template>
  <div class="flex flex-col gap-20 max-w-[800px] mx-auto w-full p-4">
    <TaskForm class="mt-14" />
    <div class="flex flex-col gap-4">
      <div v-if="tasks && tasks.length > 0" class="space-y-4">
        <CategoryFilter class="motion-preset-slide-right" />
        <div v-if="filteredTasks.length > 0">
          <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task" />
        </div>
        <div v-else>
          <span class="flex w-full justify-center mt-10">No tasks for this category</span>
        </div>
      </div>
      <div v-else>
        <span class="flex w-full justify-center mt-10">No tasks created</span>
      </div>
    </div>
  </div>
</template>
