<template>
    <div class="music__player-core w-[600px] py-2 my-1 rounded-lg">
        <div class="music__player-core_btns flex justify-center my-3 cursor-pointer" @click="play()" v-if="!pauseTrack">
            <icon-base title="play-btn" width="30" height="30"/>
        </div>
        <div class="music__player-core_btns flex justify-center my-3 cursor-pointer" @click="pause()" v-else>
            <icon-base title="pause-btn" width="30" height="30"/>
        </div>
        <div class="music__player-core_volume my-4">
          <label>Громкость:</label>
          <div
            @click="volume($event)"
            ref="volBar"
            class="h-1 bg-grey-dark cursor-pointer rounded-full bg-gray-500 m-auto relative"
            style="width: 100%"
          >
            <div
              class="flex justify-end h-1 bg-gradient-to-r from-yellow-400 to-yellow-900 rounded-full relative"
              :style="{ width: volumeProgress + '%' }"
            ></div>
          </div>
        </div>
        <div class="music__player-core_music-info">
          {{currentAudio}}
        </div>
        <div class="flex items-center">
          <div class="text-sm text-grey-darker w-2/12 md:w-1/12 font-semibold">
            <p>{{ timer }}</p>
          </div>
          <div class="mt-1 relative md:w-10/12">
            <div
              @click="seek($event)"
              ref="progress"
              class="h-1 bg-grey-dark cursor-pointer rounded-full bg-gray-500"
            >
              <div
                class="flex w-full justify-end h-1 bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-full relative"
                :style="{ width: step + '%' }"
              ></div>
            </div>
            <div
              class="flex w-full justify-end h-1 rounded-full relative"
              :style="{ width: step + '%' }"
            >
              <span
                id="progressButtonTimer"
                class="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-yellow-500 to-yellow-700 absolute pin-r pin-b -mb-1 rounded-full shadow"
              ></span>
            </div>
          </div>
          <div class="text-sm text-grey-darker w-2/12 md:w-1/12 font-semibold">
            <p>{{ duration }}</p>
          </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Howl, Howler } from 'howler';
import { onMounted, ref, reactive, watch, computed } from "@vue/runtime-core";
import { useMusicList } from '../store/pinia/MusicList';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';
    const step = ref(0)
    const nextButton = ref(true)
    const prevButton = ref(true)
    const random = ref(false)
    const repeat = ref(false)
    const index = ref(0)
    const duration = ref("00:00")
    const timer = ref("00:00")
    const pauseTrack = ref(false)
    const progress = ref(<any>null)
    const volBar = ref(<any>null)
    const sliderBtn = ref(0)
    const sliderBtnVol = ref(<any>null)
    const volumeProgress = ref(90)
    const mutePlayer = ref(false)

    const audio = ref(<any>false)
    const toast = useToast()
    const useMusicStore = useMusicList();
    const store = useStore();

    const audios = computed(() => useMusicStore.list);
    const currentAudio = computed(() => !!store.state.player.selectedTrack ? `${store.state.player.selectedTrack.data?.artist} - ${store.state.player.selectedTrack.data?.songName}` : "Выберите трек");

    // Methods
    const formatTime = (secs:number) => {
      let minutes = Math.floor(secs / 60) || 0
      let seconds = Math.floor(secs - minutes * 60) || 0
      return (
        (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds
      )
    } 
    
    const setActiveAudio = (index:number) => {
      audio.value = audios.value[index]?.howl
    }

    const play = () => {
      
      if (!!!store.state.player.selectedTrack?.data){
        toast.warning('Выберите один из предложенных треков или загрузите свой')
        return ''
      }

      let sound:any;
      let music:any;
      if (audios.value.length) music = store.state.player.selectedTrack?.data, audio.value = music
      if (!!music?.howl) {
        sound = music?.howl
      } else {
        sound = music.howl = new Howl({
          src: [import.meta.env.VITE_APP_BASE_API_URL + music.music],
          html5: true, 
          format: ["mp3"],
          onplay: () => {
            pauseTrack.value = true
            nextButton.value = true
            prevButton.value = true
            duration.value = formatTime(sound.duration())
            requestAnimationFrame(stepFunction.bind(this))
          },
          onpause: () => {
            pauseTrack.value = false
          },
          onend: () => {
            next()
          },
          onseek: () => {
            window.requestAnimationFrame(stepFunction.bind(this))
          },
        })
      }
      sound.play()
    }

    const pause = () => {
      if (!!audio.value.howl) {
        audio.value.howl.pause()
        pauseTrack.value = false
      }
    }

    const stepFunction = () => {
      let sound = audio.value.howl
      let seek = sound.seek()
      timer.value = formatTime(Math.round(seek))
      step.value = (seek * 100) / sound.duration()
      sliderBtn.value = progress.value.offsetWidth * (step.value / 100) + progress.value.offsetWidth * 0.05 - 25
      if (sound.playing()) {
        window.requestAnimationFrame(stepFunction.bind(this))
      }
    }

    const seek = (event:any) => {
      let per = event.offsetX / progress.value.clientWidth
      let sound = audio.value.howl
      if (sound) {
        if (sound.playing()) {
          sound.pause()
          sound.seek(sound.duration() * per)
          let barWidth = (per * 100) / 100
          sliderBtn.value =
            progress.value.offsetWidth * barWidth +
            progress.value.offsetWidth * 0.05 -
            25
          sound.play()
        } else {
          sound.seek(sound.duration() * per)
          let barWidth = (per * 100) / 100
          sliderBtn.value =
            progress.value.offsetWidth * barWidth +
            progress.value.offsetWidth * 0.05 -
            25
        }
      }
    }

    const next = () => {
      nextButton.value = false
      let music = audio.value.howl
      mutePlayer.value ? (mutePlayer.value = false) : ""
      music && music.mute(true) ? music.mute(false) : ""
      if (music && audios.value.length - 1 == index.value) {
        music.stop()
        repeat.value
          ? (index.value = index.value)
          : random.value
          ? (index.value = Math.floor(Math.random() * audios.value.length))
          : (index.value = 0)
      } else {
        if (music) {
          music.stop()
        }
        repeat.value
          ? (index.value = index.value)
          : random.value
          ? (index.value = Math.floor(Math.random() * audios.value.length))
          : index.value++
      }
      play()
    }

    const previous = () => {
      let music = audio.value.howl
      prevButton.value = false
      mutePlayer.value ? (mutePlayer.value = false) : ""
      music && music.mute(true) ? music.mute(false) : ""
      if (!music) {
        index.value = audios.value.length - 1
      } else if (music && index.value == 0) {
        music.stop()
        repeat.value
          ? (index.value = index.value)
          : random.value
          ? (index.value = Math.floor(Math.random() * audios.value.length))
          : (index.value = audios.value.length - 1)
      } else if (music) {
        music.stop()
        repeat.value
          ? (index.value = index.value)
          : random.value
          ? (index.value = Math.floor(Math.random() * audios.value.length))
          : index.value--
      }
      play()
    }

    const selectSound = (indexSelected:number) => {
      if (audios.value.length) setActiveAudio(indexSelected)
      else useMusicStore.getMusicList()
      .then(() => setActiveAudio(indexSelected));
      if (audio.value) {
        audio.stop()
      }
      index.value = indexSelected
      
      if (!store.state.isPause) play()
    }
    const volume = (event:any) => {
      let per = event.layerX / parseFloat(volBar.value.scrollWidth)
      let barWidth = (per * 100) / 100
      volumeProgress.value = barWidth * 100
      sliderBtnVol.value =
        volBar.value.offsetWidth * barWidth +
        volBar.value.offsetWidth * 0.05 -
        25
      Howler.volume(per)
    }
    const mute = () => {
      let music = audio.value.howl
      if (music) {
        mutePlayer.value = !mutePlayer.value
        mutePlayer.value ? music.mute(true) : music.mute(false)
      }
    }

    onMounted(() => {
        let sound = audio.value?.howl || false
        let barWidth = (0.9 * 100) / 100
        const sliderBtnVol = ref(volBar.value.offsetWidth * barWidth + volBar.value.offsetWidth * 0.05 - 25)
    })

    watch(() => store.getters.musicPlayerItem,
    (val) => {
        selectSound(val)
    })
</script>