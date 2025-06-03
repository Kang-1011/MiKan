<template>
  <div class="board-row mb-12">
    <!-- Project title bar -->
    <div class="board-header" :style="headerStyle">
      {{ title }}
    </div>

    <!-- If no boards are present at all -->
    <div v-if="boards.length === 0" class="pa-4 grey--text text-center bg-grey-lighten-2" :style="bodyStyle">
      No boards available
    </div>

    <!-- Horizontally scrollable boards -->
    <v-slide-group v-else show-arrows class="pa-2 bg-grey-lighten-2" :style="bodyStyle">
      <v-slide-group-item
        v-for="(board, bIndex) in boards"
        :key="bIndex"
      >
        <v-card class="mr-4 bg-grey-lighten-4" style="width: 240px">
          <!-- Each board’s colored header -->
          <v-sheet :color="board.color" class="pa-2 white--text">
            <div class="font-weight-medium">{{ board.name }}</div>
          </v-sheet>

          <!-- List out all tasks under this board -->
          <v-card-text>
            <v-list dense class="">
              <v-list-item
                v-for="(task, tIndex) in board.tasks"
                :key="task.id"
                class="pa-2 "
                @click="openTaskModal(task)"
                style="cursor: pointer;"
                
              >
                <v-list-item>
                  <v-list-item-title>{{ task.title }}</v-list-item-title>
                  <v-list-item-subtitle class="grey--text">
                    {{ task.date }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-icon size="18">mdi-chevron-right</v-icon>
                </v-list-item>
              </v-list-item>

              <!-- If this board has no tasks, show a placeholder -->
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

    <!-- Task modal stub: swap `VuetifyTaskModal6` with your own modal component -->
    <VuetifyTaskModal6 v-model="showModal" />

    <!-- <v-dialog v-model="showModal" max-width="600px">
      <v-card>
        <v-card-title>Task Details</v-card-title>
        <v-card-text>
          <div v-if="selectedTask">
            <p><strong>Title:</strong> {{ selectedTask.title }}</p>
            <p><strong>Date:</strong> {{ selectedTask.date }}</p>
            <p><strong>Description:</strong> {{ selectedTask.description }}</p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeTaskModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Board, Task } from '@/pages/MyTasks4.vue' // Adjust path if needed
import VuetifyTaskModal6 from '@/components/VuetifyTaskModal6.vue'

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  title: string
  headerColor: string
  boards: Board[]
}
const props = defineProps<Props>()

// ─── Reactive state for opening/closing the dialog ───────────────────────────
const selectedTask = ref<Task | null>(null)
const showModal = ref(false)

// ─── Computed style for the project header bar ────────────────────────────────
const headerStyle = computed(() => ({
  background: props.headerColor,
  borderRadius: '4px 4px 0 0'
}))

const bodyStyle = computed(() => ({
  borderRadius: '0 0 4px 4px'
}))

// ─── Methods ──────────────────────────────────────────────────────────────────
function openTaskModal(task: Task) {
  selectedTask.value = task
  showModal.value = true
}
function closeTaskModal() {
  showModal.value = false
  selectedTask.value = null
}

// ─── Sanity check in console ───────────────────────────────────────────────────
console.log(`[KanbanRow4] title="${props.title}", boards=`, props.boards)
</script>

<style scoped>
.board-header {
  padding: 12px;
  font-size: 1.25rem;
  color: white;
}
</style>
