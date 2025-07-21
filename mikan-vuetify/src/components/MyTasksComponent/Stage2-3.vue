<!-- // ========================
// Stage.vue
// ======================== -->
<template>
  
  <v-sheet elevation="0" class="border-sm rounded-v2 ma-2 hover:black" style="min-width: 340px; max-width: 340px; display:flex; flex-direction:column; background:#fcfcfc; ">
    <v-toolbar density="compact" class="rounded-v2" color="#fcfcfc">
      <template v-if="!isEditing">
        <v-toolbar-title  class="text-subtitle-1 my-0 py-0">{{ stage.title }}</v-toolbar-title>
        <v-spacer />
        <v-btn density="compact" icon  v-if="!visitorMode" @click="startRename">
          <v-icon size="20px">mdi-pencil</v-icon>
        </v-btn>
        <v-btn density="compact" icon class="mr-3" v-if="!visitorMode" @click="$emit('delete-stage')">
          <v-icon size="20px">mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-text-field v-model="localTitle" dense @keyup.enter="saveRename" @blur="saveRename" autofocus />
      </template>
    </v-toolbar>

    <draggable
      v-model="stage.tasks"
      :item-key="'id'"
      :animation="150"
      :group="{ name: `tasks-board-${boardIndex}`, pull: true, put: [`tasks-board-${boardIndex}`] }"
      class="pa-2"
      
      style="max-height: 400px; overflow-y:auto"
      :disabled="visitorMode"

    >
      <template #item="{ element: task, index: tIndex }">

        <TaskCard 
        :task="task" 
        :visitorMode="visitorMode" 
        @click="$emit('open-task-dialog', task.id)" 
        />

      </template>
      <!-- <template #footer>
        <div v-if="!stage.tasks.length" class="pa-4 text-center grey--text" style="font-size:.9rem;">No tasks</div>
      </template> -->

      <!-- <template #item="{ element: task, index: tIndex }">

        <div>
        <TaskCard
          v-show="!selectedAssignee || task.assignee === selectedAssignee"
          :task="task"
          :visitorMode="visitorMode"
          @click="$emit('open-task-dialog', tIndex)"
        />
      </div>
      </template> -->
      <template #footer>
        <div v-if="(
            !selectedAssignee
              ? stage.tasks.length === 0
              : stage.tasks.filter(t => t.assignee === selectedAssignee).length === 0
          )" class="pa-4 text-center grey--text" style="font-size:.9rem;">
          No tasks
        </div>
      </template>

    </draggable>
    <!-- <v-divider></v-divider> -->
    <v-card-actions class="pa-0 pt-0 justify-center">
      <!-- <v-btn density="compact" class="rounded-xl border-md ma-auto" @click="$emit('add-task')" :disabled="visitorMode">
        <v-icon>mdi-plus</v-icon>
      </v-btn> -->
    </v-card-actions>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'
import draggable from 'vuedraggable'
import TaskCard from './TaskCard2-3.vue'

// Accept assignee filter
const props = defineProps({
  stage: Object,
  boardIndex: Number,
  stageIndex: Number,
  visitorMode: Boolean,
  selectedAssignee: String
})
const emit = defineEmits(['add-task','delete-stage','open-task-dialog','rename-stage'])

const isEditing = ref(false)
const localTitle = ref(props.stage.title)
function startRename() { isEditing.value = true }
function saveRename() {
  emit('rename-stage', props.stageIndex, localTitle.value)
  isEditing.value = false
}
</script>

<style>

.card-soft {
  background-color: #fff;
  border-radius: 16px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 4px 12px rgba(0, 0, 0, 0.06);  /* Stronger shadow for depth */
  transition: box-shadow 0.2s ease, transform 0.1s ease;
  border: 1px solid #f1f1f1;         /* Subtle border to separate on white bg */
}
</style>