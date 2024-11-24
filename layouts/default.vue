<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="font-body !text-[17px] w-screen h-screen bg-[#F1F1F2]">
    <div>
      <div class="bg-white mx-auto py-10 text-center">
        <h1 class="text-2xl font-bold cursor-pointer" @click="router.push('/')">TO DO LIST</h1>
      </div>

      <slot />
    </div>
  </div>
</template>
