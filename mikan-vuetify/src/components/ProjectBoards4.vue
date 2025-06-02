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

<script lang="ts">
import { defineComponent } from 'vue'
import type { Project } from '@/pages/MyTasks4.vue' // Adjust path if you move your types elsewhere
import KanbanRow4 from './KanbanRow4.vue'

export default defineComponent({
  name: 'ProjectBoard4',
  components: { KanbanRow4 },
  props: {
    projects: {
      type: Array as () => Project[],
      default: () => []
    }
  }
})
</script>

<style scoped>
/* (Optional) space the rows slightly */
div > * + * {
  margin-top: 32px;
}
</style>
