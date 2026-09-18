/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { defineStore } from "pinia";
import * as THREE from "three";
import gsap from "gsap";

// Module-scope so the active tweens survive across store actions and can be
// killed explicitly — GSAP can't auto-detect the conflict because the lookAt
// tween targets a fresh local object on every call.
let cameraTimeline: gsap.core.Timeline | null = null;

export const useSceneStore = defineStore("scene", {
  state: () => ({
    currentSection: 0,
    camera: null as THREE.PerspectiveCamera | null,
    controls: null as any,
    cameraPositions: [] as {
      position: { x: number; y: number; z: number };
      target: { x: number; y: number; z: number };
    }[],
  }),

  actions: {
    setCamera(camera: THREE.PerspectiveCamera) {
      this.camera = camera;
    },

    setControls(controls: any) {
      this.controls = controls;
    },

    setCameraPositions(
      positions: {
        position: { x: number; y: number; z: number };
        target: { x: number; y: number; z: number };
      }[]
    ) {
      this.cameraPositions = positions;
    },

    setSection(index: number) {
      if (index < 0 || index >= this.cameraPositions.length) {
        console.warn(`Section ${index} is out of bounds.`);
        return;
      }

      if (index === this.currentSection) {
        console.info(`Already in section ${index}.`);
        return;
      }

      this.currentSection = index;
      this.moveCameraToCurrentSection();
    },

    nextSection() {
      if (this.currentSection < this.cameraPositions.length - 1) {
        this.currentSection++;
        this.moveCameraToCurrentSection();
      } else {
        console.info("Already at last section.");
      }
    },

    prevSection() {
      if (this.currentSection > 0) {
        this.currentSection--;
        this.moveCameraToCurrentSection();
      } else {
        console.info("Already at first section.");
      }
    },

    moveCameraToCurrentSection() {
      if (!this.camera || !this.controls) {
        console.warn("Camera or controls not set yet.");
        return;
      }

      const target = this.cameraPositions[this.currentSection];
      if (!target) {
        console.warn(
          `No camera position found for section ${this.currentSection}`
        );
        return;
      }

      // Kill any in-flight camera animation before starting a new one so
      // rapid section switches can't leave stale tweens fighting each other.
      if (cameraTimeline) {
        cameraTimeline.kill();
        cameraTimeline = null;
      }

      const camera = this.camera;
      const controls = this.controls;
      const lookAt = {
        x: controls.target.x,
        y: controls.target.y,
        z: controls.target.z,
      };

      // Position and lookAt now run on one timeline, same duration, so they
      // finish together instead of drifting apart mid-transition.
      cameraTimeline = gsap.timeline();

      cameraTimeline.to(
        camera.position,
        {
          x: target.position.x,
          y: target.position.y,
          z: target.position.z,
          duration: 2,
          ease: "power2.out",
        },
        0
      );

      cameraTimeline.to(
        lookAt,
        {
          x: target.target.x,
          y: target.target.y,
          z: target.target.z,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            controls.target.set(lookAt.x, lookAt.y, lookAt.z);
          },
        },
        0
      );
    },
  },
});
