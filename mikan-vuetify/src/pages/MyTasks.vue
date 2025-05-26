<template>
    <v-app>
      <!-- Sidebar -->
      <v-navigation-drawer app permanent width="200" class="pa-4">
        <!-- Logo / Avatar -->
        <v-sheet class="mb-8" height="100" rounded elevation="2" />
  
        <!-- User / Title -->
        <div class="text-subtitle-1 font-weight-medium mb-6">White Text</div>
  
        <!-- Menu Sections -->
        <div class="text-caption text--secondary mb-2">GRAY SECTION</div>
        <v-list dense nav>
          <v-list-item v-for="(item, i) in menuItems1" :key="i">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text--secondary">{{ item }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
  
        <div class="text-caption text--secondary mt-6 mb-2">GRAY SECTION</div>
        <v-list dense nav>
          <v-list-item v-for="(item, i) in menuItems2" :key="i">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text--secondary">{{ item }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
  
        <!-- FAB / Create Button -->
        <v-spacer />
        <v-btn large color="red darken-1" class="mt-auto" block>
          <v-icon left>mdi-plus</v-icon>Create
        </v-btn>
      </v-navigation-drawer>
  
      <!-- Main Content -->
      <v-app-bar app color="red lighten-1" dark>
        <v-toolbar-title>My Tasks</v-toolbar-title>
        <v-spacer/>
  
        <!-- Controls -->
        <v-btn text>Projects <v-icon right>mdi-menu-down</v-icon></v-btn>
        <v-btn text>Dashboards <v-icon right>mdi-menu-down</v-icon></v-btn>
        <v-btn text>Filter <v-icon right>mdi-menu-down</v-icon></v-btn>
        <v-btn text>Group <v-icon right>mdi-menu-down</v-icon></v-btn>
        <v-btn color="orange" class="ml-4">Create</v-btn>
  
        <v-btn icon class="ml-4"><v-icon>mdi-theme-light-dark</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-account-circle</v-icon></v-btn>
        <v-text-field
          flat
          hide-details
          placeholder="Search..."
          append-inner-icon="mdi-magnify"
          class="mx-4"
          style="max-width: 200px"
        />
      </v-app-bar>
  
      <v-main>
        <v-container fluid class="pa-4">
          <!-- Repeat one row per project -->
          <div
            v-for="project in projects"
            :key="project.id"
            class="mb-12"
          >
            <!-- Project Header -->
            <div class="text-h6 font-weight-bold pa-2" :style="{ background: '#ff7043', borderRadius: '8px 0 8px 0' }">
              {{ project.title }}
            </div>
  
            <!-- Kanban Row (horizontal scroll) -->
            <v-slide-group
              show-arrows
              class="py-4"
              style="overflow-x: auto; white-space: nowrap;"
            >
              <v-slide-item
                v-for="(card, i) in project.cards"
                :key="i"
              >
                <v-card class="mr-4" style="width: 200px;">
                  <v-sheet color="red lighten-1" class="pa-2 white--text">
                    <div class="font-weight-medium">{{ card.header }}</div>
                  </v-sheet>
                  <v-card-text>
                    <div class="text-subtitle-2">{{ card.title }}</div>
                    <div class="text-caption grey--text">{{ card.date }}</div>
                    <div class="text-body-2">{{ card.description }}</div>
                  </v-card-text>
                  <v-divider />
                  <!-- placeholder for items below -->
                  <v-list-item v-for="n in card.items" :key="n" class="pa-2" />
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Sidebar menu mocks
  const menuItems1 = ['Gray text','Gray text','Gray text','Gray text']
  const menuItems2 = ['Gray text','Gray text','Gray text']
  
  // Mock projects & cards
  const projects = ref([
    {
      id: 1,
      title: 'Project 1',
      cards: Array.from({ length: 6 }, () => ({
        header: 'Meeting 1',
        title: 'Meeting 1',
        date: '31/12/2020',
        description: 'Description Description',
        items: 2 // number of empty placeholders
      }))
    },
    {
      id: 2,
      title: 'Project 2',
      cards: [
        {
          header: 'To do',
          title: 'Meeting 1',
          date: '31/12/2020',
          description: 'Description Description',
          items: 0
        },
        ...Array.from({ length: 5 }, () => ({
          header: 'Meeting 1',
          title: 'Meeting 1',
          date: '31/12/2020',
          description: 'Description Description',
          items: 1
        }))
      ]
    }
  ])
  </script>
  
  <style scoped>
  /* hide default slide-group scrollbar on WebKit */
  .v-slide-group__wrapper::-webkit-scrollbar {
    height: 4px;
  }
  .v-slide-group__wrapper::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.2);
    border-radius: 2px;
  }
  </style>
  