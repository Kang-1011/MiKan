<template>
    <v-dialog v-model="isDialogOpen" max-width="1300">
      <v-card class="d-flex flex-column theme--light" style="height: 80vh;">
  
        <!-- Header -->
        <v-toolbar flat dense class="px-4 theme--light" elevation="1">
          <v-text-field
            v-model="projectName"
            variant="plain"
            hide-details
            dense
            style="max-width: 300px;"
          />
          <v-spacer />
          <v-btn icon small @click="close">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider />
  
        <!-- Body: two panes -->
        <v-card-text class="d-flex pa-0" style="flex: 1; overflow: hidden;">
          <!-- Left Pane -->
          <v-container fluid class="pa-2" style="flex: 2; overflow-y: auto;">
  
            <!-- Task Title -->
            <v-text-field
              v-model="taskTitle"
              label="Task Title"
              variant="plain"
              hide-details
              dense
              class="mb-2"
              style="font-size: 0.875rem; max-width: 400px;"
            />
  
            <!-- Description -->
            <v-textarea
              v-model="description"
              label="Description"
              placeholder="Enter description..."
              auto-grow
              dense
              class="mb-2 drop-box"
              @change="onDescriptionChange"
              style="font-size: 0.875rem;"
            />
  
            <!-- Subtasks -->
            <v-textarea
              v-model="subtasks"
              label="Subtasks"
              placeholder="Add subtasks..."
              auto-grow
              dense
              class="mb-2 drop-box"
              style="font-size: 0.875rem;"
            />
  
            <!-- Attachments & AI Suggestions Side-by-Side -->
            <v-row dense class="mb-0">
              <v-col cols="6" class="pa-1">
                <span class="caption">Attachments</span>
              </v-col>
              <v-col cols="6" class="pa-1">
                <div class="d-flex justify-space-between align-center mb-1">
                  <span class="caption">AI Suggested Attachments</span>
                  <v-btn color="orange" small dense @click="onRegenerateAI" style="min-height: 24px;">
                    <v-icon left small>mdi-refresh</v-icon> Regenerate
                  </v-btn>
                </div>

              </v-col>
            </v-row>
            <v-row dense class="mb-2">
              <v-col cols="6" class="pa-1">
                <v-file-input
                  :model-value="attachments"
                  prepend-icon="mdi-paperclip"
                  multiple
                  chips
                  counter
                  dense
                  hide-details
                  show-size
                  variant="outlined"
                  class="mt-0 drop-box"
                  @change="onAttachmentsChange"
                />
              </v-col>
              <v-col cols="6" class="pa-1">
                <v-file-input
                  :model-value="aiAttachments"
                  prepend-icon="mdi-file-search"
                  multiple
                  chips
                  counter
                  variant="outlined"
                  dense
                  hide-details
                  show-size
                  class="mt-0 drop-box"
                  @change="onAiAttachmentsChange"
                />
              </v-col>
            </v-row>

            <!-- Autostart -->
            <div class="d-flex justify-space-between align-center mb-1">
              <span class="caption">Autostart</span>
              <v-btn color="orange" small dense @click="onRegenerateAutostart" style="min-height: 24px;">
                <v-icon left small>mdi-refresh</v-icon> Regenerate
              </v-btn>
            </div>
            <v-file-input
              :model-value="autostartFiles"
              prepend-icon="mdi-autorenew"
              multiple
              chips
            counter
            variant="outlined"
              dense
              hide-details
              show-size
              class="mb-2 drop-box"
              @change="onAutostartChange"
            />
  
          </v-container>
  
          <!-- Vertical Divider -->
          <v-divider vertical />
  
          <!-- Right Pane -->
          <v-container fluid class="pa-2 grey lighten-4" style="flex: 0 0 280px; overflow-y: auto;">
  
            <v-row dense class="align-center mb-2">
              <v-col cols="8"><span class="caption">Assignees</span></v-col>
              <v-col cols="4" class="text-right"><v-btn icon small dense><v-icon small>mdi-plus</v-icon></v-btn></v-col>
            </v-row>
  
            <v-row dense class="align-center mb-2">
              <v-col cols="8"><span class="caption">Due Date</span></v-col>
              <v-col cols="4" class="text-right"><v-chip color="orange" small text-color="white" class="caption">31/8/2025</v-chip></v-col>
            </v-row>
  
            <v-row dense class="align-center mb-2">
              <v-col cols="8"><span class="caption">Priority</span></v-col>
              <v-col cols="4" class="text-right"><v-chip color="orange" small text-color="white" class="caption">Low</v-chip></v-col>
            </v-row>
  
            <v-row dense class="align-center mb-4">
              <v-col cols="8"><span class="caption">Labels</span></v-col>
              <v-col cols="4" class="text-right"><v-btn icon small dense><v-icon small>mdi-plus</v-icon></v-btn></v-col>
            </v-row>
  
            <v-btn color="orange" small dense block class="mb-2">
              <v-icon left small>mdi-check</v-icon>Mark as Complete
            </v-btn>
  
            <v-btn small dense block disabled class="mb-1">Move Task</v-btn>
            <v-btn small dense block disabled class="mb-1">Archive Task</v-btn>
            <v-btn small dense block text color="orange" disabled class="mb-2">Delete Task</v-btn>
  
            <!-- Comments -->
            <v-textarea
              v-model="comment"
              label="Comments"
              placeholder="Write your comments..."
              auto-grow
              dense
              class="mt-2 drop-box"
            />
            <div class="d-flex justify-end mt-2">
              <v-btn color="orange" small dense>Comment</v-btn>
            </div>
  
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue'
  
  const props = defineProps({ modelValue: { type: Boolean, required: true } })
  const emit = defineEmits(['update:modelValue'])
  
  const isDialogOpen = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val)
  })
  
  const projectName     = ref('NProjectame')
  const taskTitle       = ref('Task Title')
  const description     = ref('')
  const subtasks        = ref('')
  const attachments     = ref([])
  const aiAttachments   = ref([])
  const autostartFiles  = ref([])
  const comment         = ref('')
  
  const close = () => isDialogOpen.value = false
  const onRegenerateAI = () => console.log('Regenerate AI attachments')
  const onRegenerateAutostart = () => console.log('Regenerate autostart files')
  
  function onAttachmentsChange(files) {
    attachments.value = [...attachments.value, ...files]
  }
  function onAiAttachmentsChange(files) {
    aiAttachments.value = [...aiAttachments.value, ...files]
  }
  function onAutostartChange(files) {
    autostartFiles.value = [...autostartFiles.value, ...files]
  }
  </script>
  
  <style scoped>
  .project-name .v-field__input {
    font-size: 1rem;
    font-weight: 500;
    color: #000;
  }
  .drop-box .v-input__control {
    border: 2px dashed #ccc !important;
    border-radius: 4px;
    min-height: 40px;
  }
  </style>
  