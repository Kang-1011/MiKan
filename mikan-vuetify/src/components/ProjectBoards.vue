<template>
  <div>
    <KanbanRow
      v-for="project in projects"
      :key="project.id"
      :title="project.title"
      :cards="project.cards"
      :headerColor="project.color"
    />
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import KanbanRow from "./KanbanRow.vue";

defineProps({
  projects: Array,
});
</script>
