<!-- // ========================
// Board.vue
// ======================== -->
<template>
  <v-card class="ma-2" elevation="2" style="width:100%" >
    <v-toolbar flat dense color="grey lighten-3">
      <template v-if="!isEditing">
        <v-toolbar-title class="text-h6">{{ board.title }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon small v-if="!visitorMode" @click="startRename">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small v-if="!visitorMode" @click="$emit('delete-board', boardIndex)">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
        <v-btn small color="primary" @click="$emit('add-stage', boardIndex)" :disabled="visitorMode">
        <v-icon left small>mdi-plus</v-icon>Add Stage
      </v-btn>
      </template>
      <template v-else>
        <v-text-field
          v-model="localTitle"
          
          dense
          @keyup.enter="saveRename"
          @blur="saveRename"
          autofocus
        />
      </template>
    </v-toolbar>

    <div v-if="board.stages.length === 0" class="text-center grey--text pa-4">
      No stages assigned
    </div>
    <div v-else>


  
    <draggable
      v-model="board.stages"
      :item-key="'id'"
      :animation="150"
      :group="{ 
        name: 'stages', 
        pull: allowStageCrossBoard, 
        put: allowStageCrossBoard ? ['stages'] : false 
        }"
      class="d-flex flex-row overflow-auto pa-2"
      :disabled="visitorMode"
    >
      <template #item="{ element: stage, index: sIndex }">
        <Stage
          :stage="stage"
          :boardIndex="boardIndex"
          :stageIndex="sIndex"
          :visitorMode="visitorMode"
          :selectedAssignee="props.selectedAssignee"
          @rename-stage="(sIdx, title) => $emit('rename-stage', boardIndex, sIdx, title)"
          @delete-stage="$emit('delete-stage', boardIndex, sIndex)"
          @add-task="$emit('add-task', boardIndex, sIndex)"
          @delete-task="$emit('delete-task', boardIndex, sIndex, $event)"
          @open-task-dialog="$emit('open-task-dialog', boardIndex, sIndex, $event)"
        />
      </template>
    </draggable>
  </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import draggable from 'vuedraggable'
import Stage from './Stage2-2.vue'

const props = defineProps({
  board: Object,
  boardIndex: Number,
  visitorMode: Boolean,
  allowStageCrossBoard: Boolean,
  selectedAssignee: String
})
const emit = defineEmits(['add-stage','delete-board','delete-stage','add-task','delete-task','open-task-dialog','rename-board','rename-stage' ])

const isEditing = ref(false)
const localTitle = ref(props.board.title)
function startRename() { isEditing.value = true }
function saveRename() {
  emit('rename-board', props.boardIndex, localTitle.value)
  isEditing.value = false
}
</script>