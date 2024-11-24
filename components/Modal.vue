<script setup lang="ts">
defineProps<{
  closable: boolean
}>()

const emits = defineEmits(["close"]);

const close = () => {
  emits("close");
};
</script>

<template>
  <div class="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-black bg-opacity-30 z-10">
    <div class="bg-white shadow-md overflow-x-auto flex flex-col p-4 w-80 motion-preset-expand ">
      <header class="relative border-b-2 border-gray-100 px-2 pb-3 flex justify-between items-center">
        <slot name="header"> This is the default title! </slot>
        <button v-if="closable" type="button" class="border-none font-bold text-lg size-8 cursor-pointer bg-transparent hover:bg-gray-200 rounded-3xl" @click="close">x</button>
      </header>

      <section class="py-5 px-2">
        <slot name="body"> This is the default body! </slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>
