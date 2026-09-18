<template>
  <div
    ref="rootDiv"
    class="flex flex-row absolute left-0 w-full top-0 h-full justify-center items-center gap-12 duration-500 transition-all"
  >
    <div
      class="flex flex-row w-[100%] mt-[10vh] lg:mt-0 lg:w-[80%] lg:ml-12 h-full lg:h-4/5 items-start justify-center font-aspekta bg-zinc-800/95 backdrop-blur-md rounded-md"
    >
      <div
        class="w-1/3 py-6 hidden md:flex flex-col items-center justify-start"
      >
        <NuxtImg
          src="/images/about-photo.jpg"
          alt="Mufliha"
          width="300"
          height="300"
          class="rounded-md shadow-lg"
          format="webp"
          placeholder
        />
        <div class="w-full text-center mt-8">
        <div class="font-bold text-zinc-100 text-lg">
           Mufliha Rihadini
        </div>
      </div>

        <div class="flex flex-col items-center w-full mt-3 gap-3">
          <div class="flex flex-row items-center justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/mufliha-rihadini/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
              class="flex items-center justify-center text-zinc-200/90 hover:text-zinc-100 hover:scale-110 focus-visible:scale-110 focus-visible:text-zinc-100 outline-none duration-300 transition-all"
            >
              <Icon name="devicon:linkedin" class="text-3xl" />
              <span class="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://docs.google.com/document/d/1LezBlCx5QIrRmYj44fbD9FgXCc_hhVBr/edit?usp=sharing&ouid=103255356827283178506&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
              title="Download CV"
              aria-label="Download CV"
              class="flex items-center justify-center text-zinc-200/90 hover:text-zinc-100 hover:scale-110 focus-visible:scale-110 focus-visible:text-zinc-100 outline-none duration-300 transition-all"
            >
              <Icon name="tabler:file-cv" class="text-3xl" />
              <span class="sr-only">Download CV</span>
            </a>
            <a
              href="https://www.behance.net/mufliharihadini"
              target="_blank"
              rel="noopener noreferrer"
              title="Behance"
              aria-label="Behance"
              class="flex items-center justify-center text-zinc-200/90 hover:text-zinc-100 hover:scale-110 focus-visible:scale-110 focus-visible:text-zinc-100 outline-none duration-300 transition-all"
            >
              <Icon name="mdi:behance" class="text-3xl" />
              <span class="sr-only">Behance</span>
            </a>
          </div>
          <div
            class="self-center w-full mt-1 text-center italic text-xs text-zinc-400/60"
          >
            "Live at the present."
          </div>
          <div
            class="flex flex-col items-center gap-1 self-center w-full text-center text-xs text-zinc-400/80"
          >
            <div>Location — Central Java, Indonesia</div>
            <div>Status — Freelance, open to opportunities</div>
            <div>IMI Professional Member</div>
          </div>
        </div>
      </div>
      <div
        class="w-full md:w-2/3 h-full flex flex-col justify-start px-4 md:px-6 pt-12 pb-10"
      >
        <div
          class="ml-2 md:ml-6 text-2xl md:text-4xl xl:text-7xl font-extrabold mb-4 text-zinc-300/90 text-left"
        >
          About Me
        </div>
        <div class="flex flex-row w-full justify-center">
          <NuxtImg
            src="/images/about-photo.jpg"
            alt="Mufliha"
            width="200"
            height="200"
            class="rounded-md shadow-lg md:hidden"
            format="webp"
            placeholder
          />
        </div>
        <div
          class="ml-2 md:ml-6 mt-2 flex flex-col gap-3 text-zinc-200/70 text-left text-xs md:text-sm lg:text-lg font-normal"
        >
          <div>
            I'm a certified medical illustrator and XR developer based in
            Indonesia. My work sits at the intersection of  3D visualization,
            immersive technology, and clinical education: building anatomically
            accurate models and VR training tools that help medical learners
             actually see what they're trying to understand.
          </div>
          <div>
            I trained in dental medicine at Universitas Gadjah Mada before
             earning an MSc in Medical Visualization and Human Anatomy from
            the Glasgow School of Art. Since then I've worked across Blender,
            ZBrush, Substance Painter, and Unity XR development — on projects
            spanning cardiac simulation to VR outbreak investigation
            training.
          </div>
          <div>
            I'm a Professional Member of the Institute of Medical
            Illustrators, and I'm interested less in the technology itself
            than in when and how immersive tools actually change clinical
            learning.
          </div>
        </div>
        <div
          class="w-full h-full bg-zinc-900/40 mt-4 px-2 md:px-6 flex flex-col gap-4 lg:gap-3 justify-start items-start"
        >
          <div
            class="my-2 w-full flex justify-start items-start flex-col"
          >
            <div class="font-medium text-zinc-200">Tools</div>
            <div class="flex flex-wrap gap-2 mt-2">
              <div
                class="px-3 py-1 rounded-md font-sans font-medium text-xs md:text-sm bg-blue-950/60 text-blue-200/90"
              >
                Blender
              </div>
              <div
                class="px-3 py-1 rounded-md font-sans font-medium text-xs md:text-sm bg-blue-950/60 text-blue-200/90"
              >
                ZBrush
              </div>
              <div
                class="px-3 py-1 rounded-md font-sans font-medium text-xs md:text-sm bg-blue-950/60 text-blue-200/90"
              >
                Substance Painter
              </div>
              <div
                class="px-3 py-1 rounded-md font-sans font-medium text-xs md:text-sm bg-blue-950/60 text-blue-200/90"
              >
                Unity
              </div>
              <div
                class="px-3 py-1 rounded-md font-sans font-medium text-xs md:text-sm bg-blue-950/60 text-blue-200/90"
              >
                3ds Max
              </div>
            </div>
          </div>
          <div
            class="my-2 w-full flex justify-start items-start flex-col"
          >
            <div class="font-medium text-zinc-200">Techniques / Domains</div>
            <div class="flex flex-wrap gap-2 mt-2">
              <div
                class="px-3 py-1 rounded-md font-sans font-medium text-xs md:text-sm bg-emerald-950/60 text-emerald-200/90"
              >
                Anatomical modeling
              </div>
              <div
                class="px-3 py-1 rounded-md font-sans font-medium text-xs md:text-sm bg-emerald-950/60 text-emerald-200/90"
              >
                UI/UX design in VR
              </div>
              <div
                class="px-3 py-1 rounded-md font-sans font-medium text-xs md:text-sm bg-emerald-950/60 text-emerald-200/90"
              >
                VR training simulation
              </div>
              <div
                class="px-3 py-1 rounded-md font-sans font-medium text-xs md:text-sm bg-emerald-950/60 text-emerald-200/90"
              >
                Clinical visualization research
              </div>
              <div
                class="px-3 py-1 rounded-md font-sans font-medium text-xs md:text-sm bg-emerald-950/60 text-emerald-200/90"
              >
                Animation
              </div>
              <div
                class="px-3 py-1 rounded-md font-sans font-medium text-xs md:text-sm bg-emerald-950/60 text-emerald-200/90"
              >
                Tech Art
              </div>
            </div>
          </div>
          <div
            class="my-2 w-full flex justify-start items-start flex-col"
          >
            <div class="font-medium text-zinc-200">
              Currently learning / improving
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <div
                class="px-3 py-1 rounded-md font-sans font-medium text-xs md:text-sm bg-amber-950/60 text-amber-200/90"
              >
                Unreal Engine
              </div>
              <div
                class="px-3 py-1 rounded-md font-sans font-medium text-xs md:text-sm bg-amber-950/60 text-amber-200/90"
              >
                Rigging for organic animation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="lg:flex flex-col hidden lg:w-[20%] h-4/5 items-start justify-start"
    >
      <!-- <img
        src="/images/mingming.png"
        class="mt-8 border-white shadow-xl shadow-black/50 rounded-full"
        alt="MingPV"
        width="300"
        height="300"
        sizes="(max-width: 400px) 100vw, 400px"
        loading="lazy"
        placeholder="blur"
      /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
const rootDiv = ref<HTMLElement | null>(null);

onMounted(() => {
  if (rootDiv.value) {
    // rootDiv.value.classList.add("translate-x-20");
    // rootDiv.value.classList.add("animate-once");
    // function handleAnimationEnd() {
    //   rootDiv.value?.classList.remove("translate-x-20");
    //   rootDiv.value?.classList.remove("animate-once");
    //   rootDiv.value?.removeEventListener("animationend", handleAnimationEnd);
    // }
    // rootDiv.value.addEventListener("animationend", handleAnimationEnd);
  }
});
</script>

<style></style>
