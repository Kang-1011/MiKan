<!-- // ========================
// MyTasksPage.vue
// ======================== -->
<template>
  <v-app>
    <v-container fluid>
      <!-- HEADER + CONTROLS -->
      <v-row align="center" class="mb-4">
        <v-col cols="4">
          <h2>My Kanban Boards</h2>
        </v-col>
        <v-col cols="8" class="d-flex justify-end">
          <v-btn text @click="logData" class="mr-2">
            Log Data
          </v-btn>
          <v-btn text @click="visitorMode = !visitorMode" class="mr-2">
            {{ visitorMode ? 'Exit Visitor Mode' : 'Visitor Mode' }}
          </v-btn>
          <v-btn text @click="allowBoardReordering = !allowBoardReordering" class="mr-2">
            {{ allowBoardReordering ? 'Lock Boards' : 'Reorder Boards' }}
          </v-btn>
          <v-btn text @click="allowStageCrossBoard = !allowStageCrossBoard" class="mr-2">
            {{ allowStageCrossBoard ? 'Lock Stages' : 'Cross-Board Stages' }}
          </v-btn>
          <v-btn color="primary" @click="addBoard" :disabled="visitorMode">
            <v-icon left>mdi-plus</v-icon>Add Board
          </v-btn>
        </v-col>
      </v-row>

      <!-- BOARDS -->
      <draggable
        v-model="boards"
        item-key="id"

        :animation="150"
        class="d-flex flex-column"
        :disabled="visitorMode || !allowBoardReordering"
      >
        <template #item="{ element: board, index: bIndex }">
          <Board
            :board="board"
            :boardIndex="bIndex"
  
            :visitorMode="visitorMode"
            :allowStageCrossBoard="allowStageCrossBoard"
            @delete-board="deleteBoard"
            @add-stage="addStage"
            @rename-board="renameBoard"
            @rename-stage="renameStage"
            @delete-stage="deleteStage"
            @add-task="addTask"
            @delete-task="deleteTask"
            @open-task-dialog="openTaskDialog"
            
          />
        </template>
      </draggable>
    </v-container>

    <!-- TASK EDIT DIALOG w/ DELETE -->
    <v-dialog v-model="isTaskDialogOpen" max-width="500">
      <v-card>
        <v-toolbar flat dense color="grey lighten-3">
          <template v-if="!visitorMode">
            <v-toolbar-title>Edit Task</v-toolbar-title>
            <v-spacer />
            <v-btn icon small @click="closeTaskDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-toolbar>

        <v-card-text>
          <v-text-field
            v-model="editedTaskTitle"
            label="Task Title"
            autofocus
            @keyup.enter="saveTaskEdit"
            :disabled="visitorMode"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeTaskDialog">Cancel</v-btn>
          <v-btn color="primary" @click="saveTaskEdit" :disabled="visitorMode">
            Save
          </v-btn>
          <v-btn v-if="!visitorMode" color="red" @click="confirmDeleteTask">
            Delete Task
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DELETE CONFIRMATION -->
    <v-dialog v-model="isDeleteConfirmOpen" max-width="400">
      <v-card>
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text>Are you sure you want to delete this task?</v-card-text>
        <v-card-actions>
          <v-btn text @click="isDeleteConfirmOpen = false">Cancel</v-btn>
          <v-btn color="red" @click="deleteTaskConfirmed">Yes, Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import Board from '@/components/Board2.vue'

let nextId = 1
function genId() { return nextId++ }

const boards = ref([ // initial mock data
  {
    id: genId(), title: 'Project Alpha', stages: [
      { id: genId(), title: 'To Do', tasks: [{ id: genId(), title: 'Task A1' }] },
      { id: genId(), title: 'Done', tasks: [] }
    ]
  }
])
const visitorMode = ref(false)
const allowBoardReordering = ref(false)
const allowStageCrossBoard = ref(false)

// Task dialog state
const isTaskDialogOpen = ref(false)
const isDeleteConfirmOpen = ref(false)
const editingInfo = ref({ boardIndex: null as number | null, stageIndex: null as number | null, taskIndex: null as number | null })
const editedTaskTitle = ref('')

function addBoard() {
  boards.value.push({ id: genId(), title: `New Board ${boards.value.length+1}`, stages: [] })
}
function deleteBoard(boardIndex: number) {
  boards.value.splice(boardIndex, 1)
}
function renameBoard(boardIndex: number, newTitle: string) {
  boards.value[boardIndex].title = newTitle
}
// NEW: renameStage handler
function renameStage(boardIndex: number, stageIndex: number, newTitle: string) {
  boards.value[boardIndex].stages[stageIndex].title = newTitle
}

function addStage(boardIndex: number) {
  boards.value[boardIndex].stages.push({ id: genId(), title: `Stage ${boards.value[boardIndex].stages.length+1}`, tasks: [] })
}
function deleteStage(boardIndex: number, stageIndex: number) {
  boards.value[boardIndex].stages.splice(stageIndex, 1)
}
function addTask(boardIndex: number, stageIndex: number) {
  boards.value[boardIndex].stages[stageIndex].tasks.push({ id: genId(), title: `Task ${boards.value[boardIndex].stages[stageIndex].tasks.length+1}` })
}
function deleteTask(boardIndex: number, stageIndex: number, taskIndex: number) {
  boards.value[boardIndex].stages[stageIndex].tasks.splice(taskIndex, 1)
}
function openTaskDialog(boardIndex: number, stageIndex: number, taskIndex: number) {
  editingInfo.value = { boardIndex, stageIndex, taskIndex }
  editedTaskTitle.value = boards.value[boardIndex].stages[stageIndex].tasks[taskIndex].title
  isTaskDialogOpen.value = true
}
function closeTaskDialog() {
  isTaskDialogOpen.value = false
  editedTaskTitle.value = ''
}
function saveTaskEdit() {
  const { boardIndex, stageIndex, taskIndex } = editingInfo.value
  if (boardIndex!==null && stageIndex!==null && taskIndex!==null) {
    boards.value[boardIndex].stages[stageIndex].tasks[taskIndex].title = editedTaskTitle.value
  }
  closeTaskDialog()
}
function confirmDeleteTask() {
  isTaskDialogOpen.value = false
  isDeleteConfirmOpen.value = true
}
function deleteTaskConfirmed() {
  const { boardIndex, stageIndex, taskIndex } = editingInfo.value
  if (boardIndex!==null && stageIndex!==null && taskIndex!==null) {
    deleteTask(boardIndex, stageIndex, taskIndex)
  }
  isDeleteConfirmOpen.value = false
}
function logData() {
  console.log(JSON.stringify(boards.value, null, 2))
}
</script>