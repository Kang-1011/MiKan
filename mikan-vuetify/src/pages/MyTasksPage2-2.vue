<!-- // ========================
// MyTasksPage.vue
// ======================== -->
<template>


  <v-app>
  <Sidebar class="position-fixed" />
  <Topbar title="My Tasks" class="position-fixed" />

    <v-main>
   <!-- SUGGESTION: Replace the fixed container+row with Vuetify App Bar -->
   <v-app-bar app fixed color="white" elevation="2">
        <v-toolbar-title>MyTasks Dev Mode</v-toolbar-title>

        <!-- Board filter -->
        <v-select
          v-model="selectedBoard"
          :items="boardOptions"
          label="Board"
          clearable
          dense
          hide-details
          style="max-width:200px"
        />

        <!-- Assignee filter -->
        <v-select
          v-model="selectedAssignee"
          :items="assigneeOptions"
          label="Assignee"
          clearable
          dense
          hide-details
          style="max-width:200px"
        />

        <v-spacer />

        <v-btn text @click="logData">Log Data</v-btn>
        <v-btn text @click="visitorMode = !visitorMode">
          {{ visitorMode ? 'Exit Visitor Mode' : 'Visitor Mode' }}
        </v-btn>
        <v-btn text @click="allowBoardReordering = !allowBoardReordering">
          {{ allowBoardReordering ? 'Lock Boards' : 'Reorder Boards' }}
        </v-btn>
        <v-btn text @click="allowStageCrossBoard = !allowStageCrossBoard">
          {{ allowStageCrossBoard ? 'Lock Stages' : 'Cross-Board Stages' }}
        </v-btn>
        <v-btn color="primary" @click="addBoard" :disabled="visitorMode">
          <v-icon left>mdi-plus</v-icon> Add Board
        </v-btn>
      </v-app-bar>


      <v-container fluid class="pt-16">
        <!-- No boards at all -->
        <div v-if="boards.length === 0" class="text-center grey--text pa-4">
          No boards defined
        </div>

        <!-- Boards exist but filters removed everything -->
        <div v-else-if="filteredBoards.length === 0" class="text-center grey--text pa-4">
          No stages/tasks match your filters
        </div>

        <!-- 3) Show filtered boards -->
        <!-- SUGGESTION: Bind draggable to real `boards` and filter inside Board2.vue -->
        <draggable
          v-model="boards"
          item-key="id"
          :animation="150"
          
          class="d-flex flex-column"
          :disabled="visitorMode || !allowBoardReordering"
        >
          <template #item="{ element: board, index: bIndex }">
            <Board 
              v-show="!selectedBoard || board.title === selectedBoard"
             :board="selectedAssignee
               ? {
                   ...board,
                   stages: board.stages
                     .map(sg => ({
                       ...sg,
                       tasks: sg.tasks.filter(t => t.assignee === selectedAssignee)
                     }))
                     .filter(sg => sg.tasks.length > 0)
                 }
               : board"
              :boardIndex="bIndex"
              :visitorMode="visitorMode"
              :selectedAssignee="selectedAssignee"
              :allowStageCrossBoard="allowStageCrossBoard"
              @delete-board="deleteBoard"
              @rename-board="renameBoard"
              @add-stage="addStage"
              @add-task="addTask"
              @delete-task="deleteTask"
              @rename-stage="renameStage"
              @delete-stage="deleteStage"
              @open-task-dialog="openTaskDialog"
            />
          </template>
        </draggable>
        
      </v-container>
  </v-main>
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
import { ref,computed, watch } from 'vue'
import draggable from 'vuedraggable'
import Board from '@/components/MyTasksComponent/Board2-2.vue'

let nextId = 1
function genId() { return nextId++ }

// Dynamically pull from existing board titles
// const projectTitles = computed(() => boards.value.map(b => b.title))
// ─── Mock data (already “filtered” for the current user) ───────────────────────
// Placeholder for future assignee support
// const assignees = ref([
//   'Alice',
//   'Bob',
//   'Charlie',
// ])

// const boards = ref([ // initial mock data
//   {
//     id: genId(), title: 'Project Alpha', stages: [
//       { id: genId(), title: 'To Do', tasks: [{ id: genId(), title: 'Task A1' }] },
//       { id: genId(), title: 'Done', tasks: [] }
//     ]
//   }
// ])

// ─── 1. Your mock data as Board→Stage→Task ───────────────────────────
const boards = ref([
  {
    id: genId(),
    title: "Website Redesign",
    stages: [
      {
        id: genId(),
        title: "To Do",
        tasks: [
        // { id: genId(), title: "Wireframes", assignee: "Alice", dueDate: "2025-06-01", priority: "High", description: "There is a lot of stuff that needs to get done here", comments: [], attachments: [], ai_attachments: [], autostart: [], subtasks: [],reporter: "Rohimi" },
          { id: genId(), title: "Wireframes", assignee: "Alice", dueDate: "2025-06-01", priority: "High", comments: [], attachments: [], subtasks: [] },
          { id: genId(), title: "Assets",    assignee: "Bob",   dueDate: "2025-06-02", priority: "Med",  comments: [], attachments: [], subtasks: [] },
        ],
      },
      {
        id: genId(),
        title: "Done",
        tasks: [
          { id: genId(), title: "Audit UI",   assignee: "Charlie", dueDate: "2025-05-20", priority: "Low", comments: [], attachments: [], subtasks: [] }
        ],
      },
    ],
  },
  {
    id: genId(),
    title: "API Integration",
    stages: [
      {
        id: genId(),
        title: "To Do",
        tasks: [
          { id: genId(), title: "Design Schema",   assignee: "Frank",  dueDate: "2025-06-05", priority: "High", comments: [], attachments: [], subtasks: [] }
        ],
      },
      {
        id: genId(),
        title: "In Progress",
        tasks: [
          { id: genId(), title: "Auth Middleware", assignee: "Grace",  dueDate: "2025-05-30", priority: "Critical", comments: [], attachments: [], subtasks: [] }
        ],
      },
    ],
  },
  // …other boards…
])

// ─── 2. Filter state ────────────────────────────────────────────────
const selectedBoard    = ref<string | null>(null)
const selectedAssignee = ref<string | null>(null)

// ─── 3. Dropdown options ──────────────────────────────────────────
// Board titles for the first dropdown
const boardOptions = computed(() => boards.value.map(b => b.title))

// Unique assignees across all tasks
const assigneeOptions = computed(() => {
  const s = new Set<string>()
  boards.value.forEach(b =>
    b.stages.forEach(sg =>
      sg.tasks.forEach(t => t.assignee && s.add(t.assignee))
    )
  )
  return Array.from(s)
})

// ——— 4) COMPUTE FILTERED BOARDS ———
/**
 * We flatten all boards from all (or the selected) projects,
 * then within each board we only keep tasks matching the
 * selectedAssignee (if any).
 */
 const filteredBoards = computed(() => {
  return boards.value
    // 4a) Keep only matching boards (or all if none selected)
    .filter(b => !selectedBoard.value || b.title === selectedBoard.value)
    // 4b) For each kept board, filter its stages & tasks
    .map(b => ({
      ...b,
      stages: b.stages
        // map each stage, filtering tasks by assignee
        .map(sg => ({
          ...sg,
          tasks: selectedAssignee.value
            ? sg.tasks.filter(t => t.assignee === selectedAssignee.value)
            : sg.tasks
        }))
        // then drop any stage with zero tasks
        .filter(sg => sg.tasks.length > 0)
    }))
    // 4c) drop any board where all stages got filtered out
    .filter(b => b.stages.length > 0)
})
// MOCK DATA ENDS HERE

const visitorMode = ref(false)
const allowBoardReordering = ref(false)
const allowStageCrossBoard = ref(false)

// Task dialog state
const isTaskDialogOpen = ref(false)
const isDeleteConfirmOpen = ref(false)
const editingInfo = ref({ boardIndex: null as number | null, stageIndex: null as number | null, taskIndex: null as number | null })
const editedTaskTitle = ref('')

watch(selectedAssignee, assignee => {
  // whenever you pick someone, lock down the UI
  visitorMode.value = assignee !== null
})

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