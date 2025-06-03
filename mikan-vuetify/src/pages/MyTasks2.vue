<template>
    <v-app>
      <Sidebar />
      <MyAppBar />
      <v-main>
        <v-container fluid class="pa-4">
          <ProjectBoards :projects="projects" />
        </v-container>
      </v-main>
    </v-app>
  </template>
  <script setup>
  import Sidebar from '../components/Sidebar.vue'
  import MyAppBar from '../components/NavbarKanban.vue'
  import ProjectBoards from '../components/ProjectBoards.vue'
  import { ref } from 'vue'
  
  // mock data
  const projects = ref([
    {
      id:1,
      title:'Project 1',
      color:'#FF5722',
      cards: Array.from({ length:6 },()=>({ header:'Meeting 1', title:'Meeting 1', date:'31/12/2020', description:'Description', items:2, color:'red lighten-1'}))
    },
    {
      id:2,
      title:'Project 2',
      color:'#FF5722',
      cards: [
        { header:'To do', title:'Meeting 1', date:'31/12/2020', description:'Description', items:0, color:'red lighten-1' },
        ...Array.from({ length:5 },()=>({ header:'Meeting 1', title:'Meeting 1', date:'31/12/2020', description:'Description', items:1, color:'red lighten-1'}))
      ]
    }
  ])
  </script>
  