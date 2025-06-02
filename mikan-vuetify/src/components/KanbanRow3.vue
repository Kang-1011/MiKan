<template>
    <div class="board-row mb-12">
      <!-- Project Title Header -->
      <div class="board-header" :style="headerStyle">
        {{ title }}
      </div>
  
      <!-- If there are no boards (or all boards have zero tasks), show placeholder -->
      <div v-if="boards.length === 0" class="pa-4 grey--text text-center">
        No boards available
      </div>
  
      <!-- Slide‐group of boards (Vuetify 3) -->
      <v-slide-group
        v-else
        show-arrows
        class="py-4"
      >
        <v-slide-group-item
          v-for="(board, bIndex) in boards"
          :key="bIndex"
        >
          <v-card class="mr-4" style="width: 240px">
            <!-- Board Header Bar -->
            <v-sheet
              :color="board.color"
              class="pa-2 white--text"
            >
              <div class="font-weight-medium">
                {{ board.name }}
              </div>
            </v-sheet>
  
            <!-- Tasks under this Board -->
            <v-card-text>
              <v-list dense>
                <v-list-item
                  v-for="(task, tIndex) in board.tasks"
                  :key="tIndex"
                  class="pa-2"
                  @click="openTaskModal(task)"
                  style="cursor: pointer;"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ task.title }}</v-list-item-title>
                    <v-list-item-subtitle class="grey--text">
                      {{ task.date }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon size="18">mdi-chevron-right</v-icon>
                  </v-list-item-icon>
                </v-list-item>
  
                <!-- “No tasks” message inside a board -->
                <v-list-item
                  v-if="board.tasks.length === 0"
                  class="pa-2 grey--text text-center"
                >
                  No tasks
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
  
      <!-- Task Modal: only shown when showModal = true -->
      <VuetifyTaskModal6
        v-if="showModal"
        :task="selectedTask"
        @close="closeTaskModal"
      />
    </div>
  </template>
  
  <script lang="ts">
  console.log("KanbanRow3.vue has been called!!!")
  import VuetifyTaskModal6 from '@/components/VuetifyTaskModal6.vue'
  
  export default {
    name: 'KanbanRow',
    components: { VuetifyTaskModal6 },
    props: {
      title: {
        type: String,
        required: true
      },
      boards: {
        type: Array,
        default: () => []
      },
      headerColor: {
        type: String,
        default: '#ff7043'
      }
    },
    data() {
      return {
        selectedTask: null,
        showModal: false
      }
    },
    computed: {
      headerStyle() {
        return {
          background: this.headerColor,
          borderRadius: '8px 0 8px 0'
        }
      }
    },
    methods: {
      openTaskModal(task) {
        this.selectedTask = task
        this.showModal = true
      },
      closeTaskModal() {
        this.showModal = false
        this.selectedTask = null
      }
    },
    mounted() {
      // Quick sanity‐check to ensure `boards` is what we expect:
      console.log(`[KanbanRow] mounted: title="${this.title}", boards=`, this.boards)
    }
  }
  </script>
  
  <style scoped>
  .board-header {
    padding: 12px;
    font-size: 1.25rem;
    color: white;
  }
  </style>
  