<script setup lang="ts">
import { onMounted } from 'vue';
import { drafts, fetchDrafts } from '@/stores/dummy';
onMounted(() => {
    fetchDrafts();
});
</script>

<template>
  <ul>
    <li v-for="draft in drafts" :key="draft.id">{{ `${draft.title} - ${draft.assignee.name} - ${draft.due_date} - ${draft.description}` }}</li>
  </ul>
</template>
