<!-- // ========================
// Board.vue
// ======================== -->
<template>
  
  <v-card class="border-sm border-1 page-background rounded-v1 ma-3" elevation="0" style="width:100%" color="white" >

    <v-toolbar density="compact" class="page-background-header"  >
      <template v-if="!isEditing">
        <v-toolbar-title class="text-grey">{{ board.title }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon v-if="!visitorMode" @click="startRename">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn  icon  v-if="!visitorMode" @click="$emit('delete-board', boardIndex)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon v-if="!visitorMode" @click="$emit('add-stage', boardIndex)" >
        <v-icon>mdi-plus</v-icon>
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
    <v-divider class="divider-1"/>


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
import Stage from './Stage2-3.vue'

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

<style>
.card-soft {
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border-radius: 16px;
}
/* .custom-toolbar {
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  min-height: 0px; 
} */
</style>