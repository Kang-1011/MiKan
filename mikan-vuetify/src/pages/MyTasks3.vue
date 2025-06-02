<template>
    <v-app>
      <!-- <Sidebar /> -->
      <!-- <MyAppBar /> -->

      <v-main>
        <v-container fluid class="pa-4">
          <ProjectBoards
            :projects="projects"
            :currentUserId="currentUserId"
          />
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Sidebar from '../components/Sidebar.vue'
  import MyAppBar from '../components/MyAppBar.vue'
  import ProjectBoards from '../components/ProjectBoards2.vue'
  
  // ─── Mock data ────────────────────────────────────────────────────────────────
  // Each project now has a `boards` array, and each board has a `tasks` array.
  // Each task carries an `assignedTo` so we can filter by currentUserId.
  const projects = ref([
    {
      id: 1,
      title: 'Project 1',
      color: '#FF5722',
      boards: [
        {
          name: 'To Do',
          color: 'red lighten-1',
          tasks: [
            {
              id: 101,
              title: 'Design login page',
              date: '2025-05-30',
              description: 'Create wireframe + prototype',
              assignedTo: 'user-123'
            },
            {
              id: 102,
              title: 'Write unit tests',
              date: '2025-06-01',
              description: 'Cover core services',
              assignedTo: 'user-456'
            }
          ]
        },
        {
          name: 'In Progress',
          color: 'blue lighten-1',
          tasks: [
            {
              id: 103,
              title: 'Implement API client',
              date: '2025-05-28',
              description: 'Axios → Vue service layer',
              assignedTo: 'user-123'
            }
          ]
        },
        {
          name: 'Done',
          color: 'green lighten-1',
          tasks: []
        }
      ]
    },
    {
      id: 2,
      title: 'Project 2',
      color: '#4CAF50',
      boards: [
        {
          name: 'To Do',
          color: 'purple lighten-1',
          tasks: [
            {
              id: 201,
              title: 'Set up CI/CD',
              date: '2025-05-25',
              description: 'Configure GitHub Actions',
              assignedTo: 'user-123'
            }
          ]
        },
        {
          name: 'In Review',
          color: 'teal lighten-1',
          tasks: []
        },
        {
          name: 'Done',
          color: 'orange lighten-1',
          tasks: [
            {
              id: 202,
              title: 'Write README',
              date: '2025-05-20',
              description: 'Populate project documentation',
              assignedTo: 'user-123'
            }
          ]
        }
      ]
    }
  ])
  
  // Example “current user” whose tasks we want to see:
  const currentUserId = ref('user-123')
  </script>
  