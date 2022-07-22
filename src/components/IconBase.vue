<script setup="{ props, context }" lang="ts">
import { computed } from "vue";
import sprite from "@/assets/svg/sprites.svg";

export interface Props {
  title: string;
  width: number | string;
  height: number | string;
}

const props = defineProps<Props>();
const uri = computed(() => `${sprite}#${props.title}`);
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height">
    <use :href="uri"></use>
  </svg>
</template>

<style lang="scss" scoped>
use {
  fill: currentColor;
}
</style>
