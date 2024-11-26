<script setup lang="ts">
import { useTasksStore } from '@/stores/task'
import type { Task } from '@/types'

const tasksStore = useTasksStore()
const categories = ['Work', 'Personal', 'Home']

const task = ref<Partial<Task>>({
  title: '',
  category: '',
})

const modalVisible = ref(false)
const hovered = ref(false)

const modal = ref({
  title: '',
  message: '',
  hasError: false
})

const handleSubmit = async () => {
  const taskForm = document.querySelector('#task-form')
  taskForm?.classList.add('validated')

  if (!task.value.title || !task.value.category) return
  tasksStore.addTask(task.value).then((res) => {
    // @ts-ignore
    if (res?.status === 422) {
      modal.value.title = 'Problem while creating task'
      // @ts-ignore
      modal.value.message = res?.response.data
      modal.value.hasError = true
      modalVisible.value = true
    } else {
      modal.value.title = 'Task created'
      // @ts-ignore
      modal.value.message = `Task "${res?.title}" created successfully`
      modal.value.hasError = false
      modalVisible.value = true
    }
  })

  taskForm?.classList.remove('validated')

  task.value = {
    title: '',
    category: '',
  }

  setTimeout(() => {
    modalVisible.value = false
  }, 3000)
}
</script>

<template>
  <div>
    <form
      id="task-form"
      novalidate
      @submit.prevent="handleSubmit"
      class="space-y-2"
    >
      <div class="flex flex-col sm:flex-row items-end">
        <div class="flex flex-col *:mb-10 sm:*:mb-0 sm:relative w-full">
          <div>
            <label for="title" class="block text-xl mb-3 font-medium"
            >New task</label
            >
            <input
              v-model="task.title"
              id="title"
              type="text"
              :class="{ '!border-t-[#FEED00]': hovered }"
              class="peer w-full py-2 sm:pr-[180px] border-t-2 border-b-2 border-t-black borger-b-gray bg-[#F1F1F2] focus:outline-none [.validated_&]:invalid:border-red-500 [.validated_&]:invalid:bg-red-50 [.validated_&]:invalid:placeholder-red-500"
              placeholder="Type task name"
              required
            />
            <span
              class="absolute hidden text-sm text-red-500 [.validated_&]:peer-invalid:block"
            >
              Task name is required
            </span>
          </div>
          <div class="sm:absolute top-[42px] -right-8 h-9 w-full sm:w-52 sm:border-l-2">
            <select
              v-model="task.category"
              id="category"
              :class="{ '!border-t-[#FEED00]': hovered }"
              class="peer w-full sm:w-auto p-2 bg-[#F1F1F2] border-t-2 border-b-2 border-t-black borger-b-gray sm:border-none focus:outline-none [.validated_&]:invalid:border-red-500 [.validated_&]:invalid:bg-red-50"
              required
            >
              <option value="" disabled selected>Select a category</option>
              <option
                v-for="(category, index) in categories"
                :key="index"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
            <span
              class="absolute hidden text-sm text-red-500 [.validated_&]:peer-invalid:block"
            >
              Category is required
            </span>
          </div>
        </div>
        <button type="submit" class="w-full sm:w-auto py-[0.63rem] px-10 bg-black hover:bg-[#FFED00] text-white hover:text-black" @mouseenter="hovered = true" @mouseleave="hovered = false">
          ADD
        </button>
      </div>
    </form>

    <Modal v-if="modalVisible" :closable="false" class="transition-all ease-in-out delay-150">
      <template #header>
        <b :class="{ 'text-red-500': modal.hasError }" class="text-green-500">{{ modal.title }}</b>
      </template>
      <template #body>
        <span>{{ modal.message }}</span>
      </template>
    </Modal>
  </div>
</template>
