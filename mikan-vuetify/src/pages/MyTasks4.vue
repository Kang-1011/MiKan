<template>
  <v-app>
    <Sidebar />
    <MyAppBar />

    <v-main>
      <v-container fluid class="pa-4">
        <!-- We pass `projects` straight to ProjectBoard4 -->
        <ProjectBoard4 :projects="projects" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import MyAppBar from '@/components/MyAppBar.vue'
import ProjectBoard4 from '@/components/ProjectBoards4.vue'

// ─── Types ────────────────────────────────────────────────────────────────────
// (If you already have a shared `types/kanban.ts`, feel free to import from there instead.)
interface Task {
  id: number
  title: string
  date: string
  description: string
}
interface Board {
  name: string
  color: string
  tasks: Task[]
}
interface Project {
  id: number
  title: string
  color: string
  boards: Board[]
}

// ─── Mock data (already “filtered” for the current user) ───────────────────────
const projects = ref<Project[]>([
  {
    id: 1,
    title: 'Website Redesign',
    color: '#D32F2F',
    boards: [
      {
        name: 'To Do',
        color: 'red lighten-1',
        tasks: [
          {
            id: 1001,
            title: 'Create wireframes',
            date: '2025-06-01',
            description: 'Low-fidelity wireframes for homepage + dashboard'
          },
          {
            id: 1002,
            title: 'Collect brand assets',
            date: '2025-06-02',
            description: 'Logos, fonts, and color palette from design team'
          }
        ]
      },
      {
        name: 'In Progress',
        color: 'blue lighten-1',
        tasks: [
          {
            id: 1003,
            title: 'Build style guide',
            date: '2025-05-28',
            description: 'Create reusable CSS variables & components'
          }
        ]
      },
      {
        name: 'Done',
        color: 'green lighten-1',
        tasks: [
          {
            id: 1004,
            title: 'Audit existing pages',
            date: '2025-05-20',
            description: 'List out outdated UI/UX patterns'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'API Integration',
    color: '#1976D2',
    boards: [
      {
        name: 'To Do',
        color: 'purple lighten-1',
        tasks: [
          {
            id: 2001,
            title: 'Design endpoint schema',
            date: '2025-06-05',
            description: 'Decide on REST vs GraphQL'
          }
        ]
      },
      {
        name: 'In Progress',
        color: 'teal lighten-1',
        tasks: [
          {
            id: 2002,
            title: 'Implement authentication',
            date: '2025-05-30',
            description: 'JWT middleware + token refresh'
          }
        ]
      },
      {
        name: 'Done',
        color: 'orange lighten-1',
        tasks: [
          {
            id: 2003,
            title: 'Write README',
            date: '2025-05-20',
            description: 'Populate project documentation'
          }
        ]
      }
    ]
  }
])
</script>

<style scoped>
/* (No extra styles needed here) */
</style>
