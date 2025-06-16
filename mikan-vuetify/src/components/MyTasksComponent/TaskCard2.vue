<!-- // ========================
// TaskCard.vue
// ======================== -->
<template>
    <v-card
      class="mb-2"
      outlined
      style="cursor: grab;"
      @click="$emit('click')"

    >
      <v-card-text class="d-flex justify-space-between align-center pa-2">
        <span>{{ task.title }}</span>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({ task: Object, visitorMode: Boolean })
  
  defineEmits(['click'])
  </script>