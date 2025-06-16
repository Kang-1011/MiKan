<!-- // ========================
// Stage.vue
// ======================== -->
<template>

  <v-sheet elevation="1" class="ma-2" style="min-width:250px; display:flex; flex-direction:column; background:#f5f5f5; ">

    <v-toolbar flat dense color="grey lighten-2">
      <template v-if="!isEditing">
        <v-toolbar-title class="text-subtitle-1">{{ stage.title }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon small v-if="!visitorMode" @click="startRename">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small v-if="!visitorMode" @click="$emit('delete-stage')">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-text-field v-model="localTitle" dense @keyup.enter="saveRename" @blur="saveRename" autofocus />
      </template>
    </v-toolbar>
    <v-divider />
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
        @click="$emit('open-task-dialog', tIndex)" 
        />
      </template>
      <template #footer>
        <div v-if="!stage.tasks.length" class="pa-4 text-center grey--text" style="font-size:.9rem;">No tasks</div>
      </template>
    </draggable>
    <v-divider />
    <v-card-actions class="pa-2">
      <v-btn small color="primary" class="ma-auto" @click="$emit('add-task')" :disabled="visitorMode">
        <v-icon left small>mdi-plus</v-icon>Add Task
      </v-btn>
    </v-card-actions>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import draggable from 'vuedraggable'
import TaskCard from './TaskCard2.vue'

const props = defineProps({ stage:Object, boardIndex:Number, stageIndex:Number, visitorMode:Boolean })
const emit = defineEmits(['add-task','delete-stage','open-task-dialog','rename-stage'])

const isEditing = ref(false)
const localTitle = ref(props.stage.title)
function startRename() { isEditing.value = true }
function saveRename() {
  emit('rename-stage', props.stageIndex, localTitle.value)
  isEditing.value = false
}
</script>