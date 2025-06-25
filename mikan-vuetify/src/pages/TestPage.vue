<script setup lang="ts">
import { ref, watch } from 'vue'
import {AVLine} from 'vue-audio-visual'
import {AVBars} from 'vue-audio-visual'
import {AVCircle} from 'vue-audio-visual'
import {AVWaveform} from 'vue-audio-visual'
import {AVMedia} from 'vue-audio-visual'
import { useUserMedia } from '@vueuse/core'

const audioSrc = ref('./file_example_MP3_1MG.mp3')
const showMedia = ref(false)
const { stream, enabled } = useUserMedia()

watch(enabled, () => {
  if (showMedia.value) return
  if (enabled) showMedia.value = true
})
</script>

<template>
  <div class="container">

    <div class="row row-cols-2">
      <div class="col">
        <h3><code>&lt;AVMedia&gt;</code></h3>
        <button class="btn btn-primary btn-default" @click="enabled = !enabled" type="submit">
          <i :class="enabled ? 'bi-pause-circle' : 'bi-play-circle'"></i>
          {{ enabled ? 'Pause' : 'Enable' }}
        </button>
        <div v-show="!showMedia" class="card mt-3">
          <div class="card-header text-primary">
            <i class="bi-mic-fill"></i>Microphone media visualization
          </div>
          <div class="card-body">
            To start click "Enable" and allow audio if asked.
          </div>
        </div>
        <div v-show="showMedia" class="row row-cols-2">
          <div class="col">
            <p class="font-monospace text-muted mb-0">type="frequ"</p>
            <AVMedia :media="stream" type="frequ" line-color="red" />

            <p class="font-monospace text-muted text-nowrap mt-3 mb-0">
              type="frequ" frequ-direction="mo"</p>
            <AVMedia :media="stream" type="frequ" frequ-direction="mo" :frequ-lnum="60" line-color="red" :line-width="2"/>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>