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
  <script>
  import KanbanRow from './KanbanRow.vue'
  export default {
    name: 'ProjectBoards',
    components: { KanbanRow },
    props: {
      projects: Array
    }
  }
  </script>