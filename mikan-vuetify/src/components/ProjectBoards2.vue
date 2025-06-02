<template>
    <div>
      <KanbanRow
        v-for="project in filteredProjects"
        :key="project.id"
        :title="project.title"
        :headerColor="project.color"
        :boards="project.boards"
      />
    </div>
  </template>
  
  <script lang="ts">
  console.log("ProjectBoards2.vue has been called!!!")
  import KanbanRow from './KanbanRow3.vue'
  
  export default {
    name: 'ProjectBoards',
    components: { KanbanRow },
    props: {
      projects: {
        type: Array,
        default: () => []
      },
      currentUserId: {
        type: String,
        required: true
      }
    },
    computed: {
      filteredProjects() {
        // For each project, filter each board's tasks by currentUserId.
        return this.projects.map((proj) => {
          const filteredBoards = proj.boards.map((board) => ({
            ...board,
            tasks: board.tasks.filter(
              (task) => task.assignedTo === this.currentUserId
            )
          }))
          return {
            ...proj,
            boards: filteredBoards
          }
        })
      }
    }
  }
  </script>
  