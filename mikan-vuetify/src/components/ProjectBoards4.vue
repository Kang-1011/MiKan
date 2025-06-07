<template>
  <div>
    <KanbanRow4
      v-for="project in projects"
      :key="project.id"
      :title="project.title"
      :headerColor="project.color"
      :boards="project.boards"
    />
  </div>
</template>

<script setup lang="ts">
import type { Project } from '@/pages/MyTasks4.vue'
import KanbanRow4 from './KanbanRow4.vue'

// Declare props in <script setup>
defineProps<{ projects: Project[] }>()
</script>

<style scoped>
/* (Optional) space the rows slightly */
div > * + * {
  margin-top: 0px;
}
</style>
