<template>
    <v-app>
      <v-main>
        <v-container class="pa-4">
          <v-btn color="primary" @click="openDialog = true">
            Open Task Editor
          </v-btn>
          
          <!-- Task Editor Modal Component -->
          <TaskEditorModalVuetify v-model="openDialog" />
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import TaskEditorModalVuetify from '../components/VuetifyTaskModal6.vue'
  
  const openDialog = ref(false)
  </script>
  
  <style scoped>
  /* Optional: center content vertically */
  v-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  </style>
  