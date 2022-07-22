<template>
  <div class="music__player-list drop-shadow-md h-full min-h-[100px]">
      <div class="music__player-list-item w-[600px] cursor-pointer py-2 my-1 rounded-lg" @click="selectMusic(index, item)" v-for="(item, index) in listOfMusic" :key="index">
        <span>{{item.artist}} - {{item.songName}}</span>
        <span>{{item.time}}</span>
      </div>
      <div class="music__player-list__upload my-5">
        <label>
          Загрузить Музыку:
          <input type="file" class="music__player-list__upload-input" ref="filesMusic" accept=".mp3" @change="uploadMusic"/>
        </label>
      </div>
  </div>
</template>
<script lang="ts">
import { useMusicList } from '../store/pinia/MusicList'
import { computed, onMounted } from 'vue-demi';
import * as MP3Tag from 'mp3tag.js';
import { useStore } from 'vuex';
import { MusicItem } from '../store/pinia/musicTypes';
import {Howler} from 'howler';

export default {
  name: 'MusicList',
  setup () {
    const useMusicListPinia = useMusicList();
    const store = useStore();
    const selectMusic = (index:number, item:MusicItem) => {
      Howler.unload();
      store.dispatch('setSelectedTrack', {index: index, data: item});
    }

    const uploadMusic = (evt:any) => {
      const file = evt.target.files[0];
      let reader = new FileReader();
      reader.onload = (e:any) => {
        const mp3 = new MP3Tag(e.target.result)
        mp3.read()
        if (mp3.error !== '') throw new Error(mp3.error)
        else {
          const fd = new FormData();
          fd.append('music', file)
          useMusicListPinia.uploadMusic({
              artist: mp3.tags.artist,
              album: mp3.tags.album,
              songName: mp3.tags.title,
              genre: mp3.tags.genre,
              year: mp3.tags.year,
          })
          .then((res:any) => {
            console.log(res)
            useMusicListPinia.uploadMusicFile({payload:fd, id: res.data.insertedId}).then(() => {useMusicListPinia.getMusicList();});
          });
        }
      }
      if (evt.target.files.length > 0) {
        reader.readAsArrayBuffer(file)
      }
    }

    return {
      uploadMusic,
      listOfMusic: computed(() => useMusicListPinia.list),
      selectMusic
    }
  }
}
</script>
<style lang="scss">
  .music {
    &__player-list {
      &-item {
        display: grid;
        grid-template-columns: minmax(100px, 3fr) 1fr;
      }
    }
  }
  // Делал быстро так что пришло дублировать (по красоте нужно было бы сделать в целом переключение тем)
@media (prefers-color-scheme: light) {
  $cardBackgroundColor: darken($color: #ffffff, $amount: 5);
       .music__player-list-item {
          background-color: $cardBackgroundColor;
       }

}
@media (prefers-color-scheme: dark) {
  $cardBackgroundColor:lighten($color: #242424, $amount: 5);
  .music__player-list-item {
    background-color: $cardBackgroundColor;
  }
}


</style>