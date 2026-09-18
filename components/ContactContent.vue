<template>
  <div class="absolute w-full h-full flex flex-col justify-center items-center">
    <div
      class="flex flex-col w-[90%] md:w-[80%] xl:w-[60%] h-fit py-8 md:py-16 xl:py-24 px-6 md:px-16 xl:px-32 items-center justify-center shadow-lg shadow-black/30 backdrop-blur-md font-aspekta"
    >
      <div
        class="text-zinc-800/70 text-2xl md:text-3xl xl:text-6xl font-extrabold"
      >
        Let's Talk
      </div>
      <div class="text-zinc-700/60 mt-6 text-sm md:text-lg font-normal">
       Open to research collaborations, academic opportunities, 
       and freelance XR/medical illustration work. Feel free to reach out.
      </div>
      <!-- Email -->
      <div class="flex items-center gap-2 mt-6 justify-center">
        <span class="text-zinc-800/70">muflihasanti@gmail.com</span>
      </div>
      <div class="flex flex-row gap-6 mt-8">
        <a
          class="bg-zinc-700/70 px-4 py-2 rounded-md"
          href="mailto:muflihasanti@gmail.com?subject=Hello%20from%20your%20portfolio"
          >Say Hello</a
        >
        <button class="bg-zinc-700/70 px-4 py-2 rounded-md" @click="copyEmail">
          {{ isCopied ? "Copied!" : "Copy Email" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isCopied = ref(false);

const copyEmail = () => {
  const email = "muflihasanti@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  });
};
</script>

<style></style>
