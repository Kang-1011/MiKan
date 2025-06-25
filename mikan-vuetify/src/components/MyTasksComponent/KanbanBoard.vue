<template>
    <v-sheet elevation="0" class="kanban-board pa-0">
      <!-- Faux topbar -->
      <v-toolbar density="compact" flat class="kanban-topbar">
        <v-toolbar-title class="text-h6">{{ project.title }}</v-toolbar-title>
        <v-spacer />
        <!-- Future project‑level actions go here -->
      </v-toolbar>
      <v-divider />
  
      <!-- Stages row -->
      <div class="kanban-stages d-flex flex-row overflow-auto pa-2">
        <Stage
          v-for="(stage, sIndex) in project.stages"
          :key="stage.id"
          :stage="stage"
          :boardIndex="0"
          :stageIndex="sIndex"
          :visitorMode="visitorMode"
          :selectedAssignee="null"
          mode="VersionB"
          @add-task="$emit('add-task', sIndex)"
          @rename-stage="$emit('rename-stage', sIndex, $event)"
          @delete-stage="$emit('delete-stage', sIndex)"
          @open-task-dialog="$emit('open-task-dialog', sIndex, $event)"
        />
      </div>
    </v-sheet>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'
  import Stage from './Stage2-3.vue'
  
  const props = defineProps({
    project: { type: Object, required: true },
    visitorMode: Boolean
  })
  const emit = defineEmits([
    'add-task',
    'rename-stage',
    'delete-stage',
    'open-task-dialog'
  ])
  </script>
  
  <style scoped>
  .kanban-board {
    display: flex;
    flex-direction: column;
    height: 80vh;
    background: #fcfcfc;
  }
  .kanban-topbar {
    background: #ffffff;
    border-bottom: 1px solid #e0e0e0;
  }
  .kanban-stages {
    flex: 1;
    gap: 1rem;
  }
  </style>
  