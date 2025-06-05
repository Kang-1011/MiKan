<template>
  <v-app>
    <Sidebar class="position-fixed"/>
    <MyAppBar class="position-sticky"/>

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
import MyAppBar from '@/components/NavbarMyTasks.vue'
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
    color: '#f44336',
    boards: [
      {
        name: 'To Do',
        color: '#f44336',
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
        color: '#f44336',
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
        color: '#f44336',
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
    color: '#f44336',
    boards: [
      {
        name: 'To Do',
        color: '#f44336',
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
        color: '#f44336',
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
        color: '#f44336',
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
  },
  {
    id: 3,
    title: 'Italian Brainrot',
    color: '#f44336',
    boards: [
      {
        name: 'Tralalero Tralala',
        color: '#f44336',
        tasks: [
          {
            id: 3001,
            title: 'Design endpoint schema',
            date: '2025-06-05',
            description: 'Decide on REST vs GraphQL'
          }
        ]
      },
      {
        name: 'Bombardino Crocodilo',
        color: '#f44336',
        tasks: [
          {
            id: 3002,
            title: 'Implement authentication',
            date: '2025-05-30',
            description: 'JWT middleware + token refresh'
          }
        ]
      },
      {
        name: 'Tung',
        color: '#f44336',
        tasks: [
          {
            id: 3003,
            title: 'Tung',
            date: '2025-05-20',
            description: 'Tung'
          },
          {
            id: 3003,
            title: 'Tung',
            date: '2025-05-20',
            description: 'Tung'
          },
          {
            id: 3003,
            title: 'Tung',
            date: '2025-05-20',
            description: 'Tung'
          },
          {
            id: 3003,
            title: 'Tung',
            date: '2025-05-20',
            description: 'Tung'
          },
          {
            id: 3003,
            title: 'Tung',
            date: '2025-05-20',
            description: 'Tung'
          },
          {
            id: 3003,
            title: 'Tung',
            date: '2025-05-20',
            description: 'Tung'
          },
          {
            id: 3003,
            title: 'Tung',
            date: '2025-05-20',
            description: 'Tung'
          },
          {
            id: 3003,
            title: 'Tung',
            date: '2025-05-20',
            description: 'Tung'
          },
          {
            id: 3003,
            title: 'Sahur',
            date: '2025-05-20',
            description: ''
          },          
        ]
      },
      {
        name: 'Brr Brr',
        color: '#f44336',
        tasks: [
          {
            id: 3002,
            title: 'Patapim',
            date: '2025-05-30',
            description: 'JWT middleware + token refresh'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Bee Movie Script',
    color: '#f44336',
    boards: [
      {
        name: 'According to all known laws of aviation, there is no way a bee should be able to fly.',
        color: '#f44336',
        tasks: [
          {
            id: 2001,
            title: 'Its wings are too small to get its fat little body off the ground.',
            date: '2025-06-05',
            description: 'Decide on REST vs GraphQL'
          }
        ]
      },
      {
        name: "  The bee, of course, flies anyway because bees don't care what humans think is impossible.  ",
        color: '#f44336',
        tasks: [
          {
            id: 2002,
            title: 'Yellow, black.',
            date: '2025-05-30',
            description: 'JWT middleware + token refresh'
          },
          {
            id: 2002,
            title: 'Yellow, black. ',
            date: '2025-05-30',
            description: 'JWT middleware + token refresh'
          },
          {
            id: 2002,
            title: 'Yellow, black.  ',
            date: '2025-05-30',
            description: 'JWT middleware + token refresh'
          },
          {
            id: 2002,
            title: 'Yellow, black.',
            date: '2025-05-30',
            description: 'JWT middleware + token refresh'
          },
          {
            id: 2002,
            title: 'Ooh, black and yellow! ',
            date: '2025-05-30',
            description: 'JWT middleware + token refresh'
          }


        ]
      },
      {
        name: "Oan you believe this is happening? - I can't. I'll pick you up. Looking sharp. Use the stairs. ",
        color: '#f44336',
        tasks: [

        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Empty Project',
    color: '#f44336',
    boards: [
      
    ]
  }
])
</script>

<style scoped>
/* (No extra styles needed here) */
</style>
