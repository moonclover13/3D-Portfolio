<template>
  <div
    ref="rootDiv"
    class="flex flex-row absolute left-0 w-full top-0 h-full justify-center items-center duration-500 transition-all"
  >
    <div class="flex flex-col flex-1 h-4/5 items-start justify-start">
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
    <div
      class="flex flex-col w-[100%] xl:w-[60%] pt-[10vh] xl:pt-0 h-full xl:mt-0 xl:h-4/5 items-center font-aspekta bg-zinc-700/70 backdrop-blur-md rounded-md pb-6"
    >
      <div
        class="w-full my-8 text-xl md:text-3xl text-zinc-200/80 font-extrabold"
      >
        My Work & Contributions
      </div>
      <div class="w-full flex-1 min-h-0 overflow-y-scroll px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="project in projects"
            :key="project.comingSoon ? 'coming-soon' : project.title"
            class="bg-zinc-900/40 flex flex-col rounded-md overflow-hidden"
            :class="
              project.comingSoon
                ? 'border border-dashed border-zinc-600/60 bg-zinc-900/10 items-center justify-center min-h-[320px] p-6 text-center'
                : 'items-start'
            "
          >
            <template v-if="project.comingSoon">
              <Icon
                name="material-symbols:hourglass-top-rounded"
                class="text-3xl text-zinc-500/70"
              />
              <div class="mt-3 font-bold text-zinc-400/80 text-lg">
                Coming soon
              </div>
              <div class="mt-1 text-zinc-500/70 text-sm font-normal">
                New case study in progress.
              </div>
            </template>

            <template v-else>
              <div
                class="relative w-full h-[260px]"
                :style="{ background: project.gradient }"
              >
                <div class="absolute inset-0 flex items-center justify-center">
                  <div
                    class="w-[60px] h-[60px] rounded-full bg-black/40 flex items-center justify-center"
                  >
                    <Icon name="mdi:play" class="text-white text-3xl ml-0.5" />
                  </div>
                </div>
                <div
                  class="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] md:text-xs font-medium"
                >
                  {{ project.mediaLabel }}
                </div>
              </div>

              <div class="flex flex-col gap-2 items-start w-full px-3 pt-3 pb-4">
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="(tag, i) in project.tags"
                    :key="tag"
                    class="px-3 py-1 rounded-md font-sans font-medium text-xs md:text-sm"
                    :class="
                      i % 2 === 0
                        ? 'bg-blue-950/60 text-blue-200/90'
                        : 'bg-emerald-950/60 text-emerald-200/90'
                    "
                  >
                    {{ tag }}
                  </div>
                </div>

                <div class="text-zinc-100 font-bold text-base md:text-lg mt-1">
                  {{ project.title }}
                </div>

                <div class="text-zinc-300/70 text-sm font-normal">
                  {{ project.description }}
                </div>

                <a
                  class="flex flex-row items-center gap-1 mt-1 underline underline-offset-4 text-sm font-sans text-zinc-200 hover:text-white/60"
                  :href="project.href"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ project.linkText }}
                  <Icon
                    name="material-symbols:arrow-right-alt"
                    class="duration-300 transition-all text-xl"
                  />
                </a>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div
      class="xl:flex flex-col hidden w-[5%] h-4/5 justify-center items-center"
    >
      <Icon
        name="hugeicons:vertical-scroll-point"
        class="duration-300 transition-all text-4xl text-zinc-700/70 animate-pulse"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const rootDiv = ref<HTMLElement | null>(null);

interface Project {
  title: string;
  tags: string[];
  description: string;
  linkText: string;
  href: string;
  gradient: string;
  mediaLabel: string;
  comingSoon?: false;
}

interface ComingSoonProject {
  comingSoon: true;
}

const projects: (Project | ComingSoonProject)[] = [
  {
    title: "EpiTrack — VR Outbreak Investigation",
    tags: ["Unity", "VR Training", "Outbreak Simulation"],
    description:
      "A VR anthrax outbreak scenario training epidemiological field reasoning.",
    linkText: "View case study on Behance",
    href: "https://www.behance.net/mufliharihadini",
    gradient: "linear-gradient(135deg, #7f1d1d, #b45309)",
    mediaLabel: "Screen capture · loop",
  },
  {
    title: "HFVisual — Cardiac Simulation",
    tags: ["Blender", "Unity XR", "Cardiac Simulation"],
    description:
      "Reconstructing a beating heart from CCTA scan data for interactive clinical review.",
    linkText: "View case study on Behance",
    href: "https://www.behance.net/mufliharihadini",
    gradient: "linear-gradient(135deg, #831843, #be123c)",
    mediaLabel: "Turntable render · loop",
  },
  {
    title: "3D Parasitology Atlas",
    tags: ["ZBrush", "Substance Painter", "Anatomical Modeling"],
    description:
      "A growing 60-model reference atlas of anatomically accurate parasite models for teaching.",
    linkText: "View case study on Behance",
    href: "https://www.behance.net/mufliharihadini",
    gradient: "linear-gradient(135deg, #14532d, #0f766e)",
    mediaLabel: "Turntable render · loop",
  },
  {
    title: "ScrapAR — AR Dental Instrument Training",
    tags: ["Unity", "ARCore", "MSc Thesis"],
    description:
      "An AR app for dental instrument identification and procedural training, accepted as a Springer book chapter.",
    linkText: "View case study on Behance",
    href: "https://www.behance.net/mufliharihadini",
    gradient: "linear-gradient(135deg, #075985, #0891b2)",
    mediaLabel: "Screen capture · loop",
  },
  {
    title: "DentuLearn — WebGL Oral Health Education",
    tags: ["WebGL", "Accessibility", "Oral Health Education"],
    description:
      "A browser-based collaborative learning app for oral health education, no specialist hardware required.",
    linkText: "View case study on Behance",
    href: "https://www.behance.net/mufliharihadini",
    gradient: "linear-gradient(135deg, #4c1d95, #7c3aed)",
    mediaLabel: "Screen capture · loop",
  },
  {
    comingSoon: true,
  },
];

onMounted(() => {});
</script>

<style></style>
