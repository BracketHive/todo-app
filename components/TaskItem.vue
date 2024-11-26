<script setup lang="ts">
import { useTasksStore } from "@/stores/task";
import type { Task } from "@/types";

const props = defineProps<{
  task: Task;
}>();

const modal = ref({
  title: 'Delete task',
  message: `Are you sure that you want to delete "${props.task.title}"?`,
  hasError: false
})

const tasksStore = useTasksStore();
const modalVisible = ref(false)
const closeModal = () => modalVisible.value = false

const toggleStatus = () => {
  tasksStore.toggleTaskStatus(props.task.id).then((res) => {
    // @ts-ignore
    if (res?.status === 422) {
      modal.value.title = 'Problem while updating task'
      // @ts-ignore
      modal.value.message = res?.response.data
      modal.value.hasError = true
    }

    setTimeout(() => {
      modalVisible.value = false
    }, 3000)
  })
}
const deleteTask = () => {
  tasksStore.removeTask(props.task.id).then((res) => {
    // @ts-ignore
    if (res?.status === 422) {
      modal.value.title = 'Problem while deleting task'
      // @ts-ignore
      modal.value.message = res?.response.data
      modal.value.hasError = true
    }

    setTimeout(() => {
      modalVisible.value = false
    }, 3000)
  })

  closeModal()
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between border-b-2 border-gray-300 cursor-pointer hover:bg-gray-200 motion-preset-slide-right ">
      <div class="flex flex-row items-center gap-5 w-full p-4" @click="toggleStatus">
        <div :class="{ 'line-through italic font-bold': task.completed }">
          {{ task.title }}
        </div>
        <div :class="{ 'bg-gray-200': task.completed }" class="rounded-md bg-[#FFED00] py-0.5 px-2.5 border border-transparent text-sm text-black">{{ task.category }}</div>
      </div>
      <button class="pr-4" @click="modalVisible = true">
        <img src="assets/img/x.png" class="size-4">
      </button>
    </div>

    <Modal v-if="modalVisible" :closable="true" class="transition-all ease-in-out delay-150" @close="closeModal">
      <template #header>
        <b class="text-red-500">{{ modal.title }}</b>
      </template>
      <template #body>
        <span>{{ modal.message }}</span>
      </template>
      <template v-if="!modal.hasError" #footer>
        <div class="flex w-full justify-end items-center gap-5">
          <button class="h-10 bg-red-500 text-white px-3 hover:bg-red-700" @click="deleteTask">Delete</button>
          <button class="h-10 bg-gray-200 px-3 hover:bg-gray-300" @click="closeModal">Cancel</button>
        </div>
      </template>
    </Modal>
  </div>
</template>
