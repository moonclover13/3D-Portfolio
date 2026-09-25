<template>
  <div class="mr-contact">
    <div class="slash" aria-hidden="true"></div>
    <main class="wrap">
      <p class="eyebrow mono">Medical visualisation <b>//</b> XR</p>
      <h1><span class="a">Mufliha</span><span class="b">Rihadini</span></h1>
      <p class="role">Medical Illustrator <span>&amp;</span> XR Developer</p>
      <svg class="ecg" viewBox="0 0 160 28" preserveAspectRatio="none" aria-hidden="true">
        <polyline fill="none" stroke="#E0141E" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"
          points="0,18 56,18 61,14 66,18 72,18 75,21 80,2 85,26 89,18 100,18 107,13 114,18 160,18" />
      </svg>

      <a class="save" href="/mufliha.vcf" download>Save my contact <small>.vcf →</small></a>

      <div class="list">
        <div v-for="item in contacts" :key="item.copy" class="row">
          <div>
            <div class="k mono">{{ item.label }} <i v-if="item.tag">{{ item.tag }}</i></div>
            <a class="v" :href="item.href" target="_blank" rel="noopener">{{ item.display }}</a>
          </div>
          <button class="copy" :class="{ done: copied === item.copy }" @click="copy(item.copy)">
            {{ copied === item.copy ? 'Copied' : 'Copy' }}
          </button>
        </div>
      </div>

      <nav class="links" aria-label="Links">
        <NuxtLink to="/">Portfolio ↗</NuxtLink>
        <a href="https://scholar.google.com/citations?user=hFBZjckAAAAJ" target="_blank" rel="noopener">Google Scholar ↗</a>
      </nav>

      <footer class="mono">
        <span>Anatomy <b>×</b> immersive tech</span>
        <span>07°42′S 110°36′E · Klaten, ID</span>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
// Standalone page: skip the default layout (and its 3D scene) so it loads fast from a QR scan
definePageMeta({ layout: false });

useHead({
  title: 'Contact | Mufliha Rihadini',
  meta: [{ name: 'description', content: 'Contact Mufliha Rihadini, Medical Illustrator & XR Developer.' }],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;600;800&family=Space+Mono:wght@400;700&display=swap' },
  ],
});

const contacts = [
  { label: 'WhatsApp', tag: 'Indonesia', display: '+62 823 2491 5050', href: 'https://wa.me/6282324915050', copy: '+6282324915050' },
  { label: 'WhatsApp', tag: 'UK', display: '+44 7707 903915', href: 'https://wa.me/447707903915', copy: '+447707903915' },
  { label: 'Email', tag: '', display: 'contact@mufliha.design', href: 'mailto:contact@mufliha.design', copy: 'contact@mufliha.design' },
];

const copied = ref<string | null>(null);
const copy = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    copied.value = text;
    setTimeout(() => (copied.value = null), 1600);
  });
};
</script>

<style scoped>
.mr-contact {
  --ink: #0b0b0c; --paper: #f5f3f0; --red: #e0141e; --grey: #8e8884; --line: #2a2a2d;
  min-height: 100vh; background: var(--ink); color: var(--paper);
  font-family: Archivo, 'Helvetica Neue', Arial, sans-serif; overflow-x: hidden; position: relative;
}
.mr-contact * { box-sizing: border-box; margin: 0; padding: 0; }
.wrap { max-width: 560px; margin: 0 auto; padding: 40px 20px 56px; position: relative; z-index: 1; }
.slash { position: fixed; top: -20vh; right: -120px; width: 220px; height: 140vh; background: var(--red); transform: rotate(-24deg); pointer-events: none; }
.slash::after { content: ''; position: absolute; left: -26px; top: 0; width: 12px; height: 100%; background: var(--paper); }
.mono { font-family: 'Space Mono', ui-monospace, Menlo, monospace; text-transform: uppercase; letter-spacing: .1em; }
.eyebrow { font-size: 12px; color: var(--grey); }
.eyebrow b, footer b { color: var(--red); }
h1 { font-family: Anton, Impact, 'Arial Narrow', sans-serif; font-weight: 400; text-transform: uppercase; line-height: .86; margin-top: 28px; }
h1 .a { display: block; font-size: clamp(64px, 19vw, 112px); }
h1 .b { display: block; font-size: clamp(36px, 11vw, 64px); color: transparent; -webkit-text-stroke: 2px var(--red); letter-spacing: .05em; margin-top: 6px; }
.role { margin-top: 22px; font-weight: 800; font-size: 14px; letter-spacing: .16em; text-transform: uppercase; }
.role span { color: var(--red); }
.ecg { display: block; width: 100%; max-width: 320px; height: 28px; margin-top: 14px; }
.ecg polyline { stroke-dasharray: 420; }
@media (prefers-reduced-motion: no-preference) { .ecg polyline { animation: beat 2.4s ease-in-out infinite; } }
@keyframes beat { 0% { stroke-dashoffset: 420; } 60%, 100% { stroke-dashoffset: 0; } }
.save { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 32px; padding: 18px 20px; background: var(--red); color: var(--ink); text-decoration: none; font-family: Anton, Impact, sans-serif; font-size: 24px; letter-spacing: .08em; text-transform: uppercase; }
.save:hover, .save:focus-visible { background: var(--paper); outline: none; }
.save small { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: .1em; }
.list { margin-top: 28px; display: grid; border-top: 1px solid var(--line); }
.row { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 12px; padding: 16px 0; border-bottom: 1px solid var(--line); background: var(--ink); }
.k { font-size: 11px; color: var(--grey); }
.k i { font-style: normal; color: var(--red); }
.v { display: block; margin-top: 4px; font-weight: 600; font-size: 18px; color: var(--paper); text-decoration: none; word-break: break-word; }
a.v:hover, a.v:focus-visible { color: var(--red); outline: none; }
.copy { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: .1em; text-transform: uppercase; background: none; color: var(--paper); border: 1px solid var(--line); padding: 8px 10px; cursor: pointer; min-width: 72px; }
.copy:hover, .copy:focus-visible { border-color: var(--red); color: var(--red); outline: none; }
.copy.done { background: var(--red); border-color: var(--red); color: var(--ink); }
.links { margin-top: 28px; display: flex; flex-wrap: wrap; gap: 8px; }
.links a { font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: var(--paper); text-decoration: none; border: 1px solid var(--paper); padding: 10px 14px; background: var(--ink); }
.links a:hover, .links a:focus-visible { background: var(--paper); color: var(--ink); outline: none; }
footer { margin-top: 40px; display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; font-size: 11px; color: var(--grey); }
@media (max-width: 420px) { .slash { right: -170px; } }
</style>
