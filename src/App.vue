<template>
  <div class="music__player-wrapper w-full h-full">
    <div class="music__player flex flex-col items-center">
      <music-player/>
      <music-list/>
    </div>
  </div>
</template>

<script setup lang="ts">
import MusicList from "./components/MusicList.vue"
import MusicPlayer from "./components/MusicPlayer.vue";
import { useMusicList } from "./store/pinia/MusicList";

const useMusicListPinia= useMusicList();
useMusicListPinia.getMusicList();
</script>
<style lang="scss" scope>
    @import "./assets/scss/main.scss";
</style>