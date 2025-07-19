<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="0">
          <!-- Attachments Mode -->
          <template v-if="mode === 'attachments'">
            <!-- Hidden file input -->
            <input
              type="file"
              ref="fileInput"
              multiple
              class="d-none"
              @change="handleFileSelection"
            />

            <!-- Dropzone when no files -->
            <v-sheet
              v-if="!isRecording"
              elevation="0"
              class="border-sm rounded-xl d-flex justify-center align-center w-100"
              style="min-height: 64px; cursor: pointer"
              @click="triggerFileInput"
              @dragenter.prevent="isDragging = true"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleDropAndReset"
              :class="{ 'drag-over': isDragging }"
            >
              <p class="text-body-2 text-center mb-0 attachment-manager">
                Drag your attachments here to upload
              </p>
            </v-sheet>

            <!-- List View + Add Button -->
            <div v-else>
              <v-sheet
                elevation="0"
                color="white"
                class="border-sm pa-2 rounded-xl"
                @dragenter.prevent="isDragging = true"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleDropAndReset"
                :class="{ 'drag-over': isDragging }"
              >
                <v-toolbar density="compact" color="white">
                  <v-spacer></v-spacer>
                  <v-btn icon density="compact" class="border-sm mr-3" @click="triggerFileInput">
                    <v-icon  size="20">mdi-plus</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card
                  v-for="(file, index) in uploadedFiles"
                  :key="getKey(file, index)"
                  class="mb-1 rounded-xl border-sm clickable pa-1"
                  elevation="0"
                  @click="openFile(file)"
                >
                  <v-card-text
                    class="d-flex justify-space-between align-center py-1 px-2"
                    style="min-height: 32px"
                  >
                    <div>
                      <span>{{ file.name }}</span>
                      <div class="caption text--secondary">
                        {{ file.size ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : '' }}
                      </div>
                    </div>
                    <v-btn
                      icon
                      elevation="0"
                      class="border-sm"
                      density="compact"
                      @click.stop="removeFile(index)"
                    >
                      <v-icon size="16">mdi-close</v-icon>
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-sheet>
            </div>
          </template>

          <!-- Read-Only Modes ( ai_attachments, autostart) -->
          <template v-else>
            <!-- Empty state -->
            <div v-if="uploadedFiles.length === 0" class="text-center text-body-2 attachment-manager grey--text pa-4 rounded-xl border-sm">
              <span v-if="mode === 'attachments'">No attachments</span>
              <span v-else-if="mode === 'ai_attachments'">No AI suggested items</span>
              <span v-else>No autostart items</span>
            </div>
            <!-- List when files exist -->
            <div v-else>
              <v-sheet elevation="0" color="white" class="border-sm pa-2 rounded-xl">
                <v-card
                  v-for="(file, index) in uploadedFiles"
                  :key="getKey(file, index)"
                  class="mb-1 rounded-xl border-sm pa-1"
                  elevation="0"
                  @click="openFile(file)"
                >
                  <v-card-text
                    class="d-flex justify-space-between align-center py-1 px-2"
                    style="min-height: 32px"
                  >
                    <div>
                      <span>{{ file.name }}</span>
                      <div class="caption text--secondary">
                        {{ file.size ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : '' }}
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-sheet>
            </div>
          </template>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import axios from 'axios'

// Props: modelValue array, mode, and visitorMode boolean
const props = defineProps<{
  modelValue: any[];
  mode: 'attachments' | 'ai_attachments' | 'autostart';
  visitorMode?: boolean;
}>()
const emit = defineEmits(['update:modelValue'])

const isRecording = ref(false)
const isDragging = ref(false)
const uploadedFiles = ref<any[]>([])
const attachmentsToDelete = ref<any[]>([])

// Initialize from parent and mode
watch(
  () => props.modelValue,
  (val) => {
    uploadedFiles.value = Array.isArray(val) ? [...val] : []
    isRecording.value = props.mode === 'attachments' && uploadedFiles.value.length > 0
  },
  { immediate: true }
)

const fileInput = ref<HTMLInputElement | null>(null)

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileSelection(e: Event & { target: HTMLInputElement }) {
  const files = Array.from(e.target.files || [])
  addFiles(files)
  e.target.value = ''
}

function handleDropAndReset(e: DragEvent) {
  isDragging.value = false
  const files = Array.from(e.dataTransfer?.files || [])
  addFiles(files)
}

function addFiles(files: File[]) {
  for (const file of files) {
    const exists = uploadedFiles.value.some(
      (f) => f.name === file.name && f.size === file.size
    )
    if (!exists) {
      uploadedFiles.value.push(file)
    }
  }
  emit('update:modelValue', uploadedFiles.value)
}

function removeFile(index: number) {
  uploadedFiles.value.splice(index, 1)
  emit('update:modelValue', uploadedFiles.value)
  if (uploadedFiles.value.length === 0 && props.mode === 'attachments') {
    isRecording.value = false
    isDragging.value = false
  }
}

function openFile(file: any) {
  if (file.url) window.open(file.url, '_blank')
  else window.open(URL.createObjectURL(file), '_blank')
}

function getKey(file: any, index: number) {
  if (file instanceof File) return file.name + '-' + index
  return (file.name || file.url || '') + '-' + index
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");
.border-sm {
  border: 1px solid #e0e0e0;
}
.drag-over {
  background-color: #f5f5f5;
}
.clickable {
  cursor: pointer;
  color: #272727;
}
.attachment-manager,
.attachment-manager * {
  /* font-family: "Inter", serif !important; */
  /* font-family: "Times New Roman", serif !important */
}
</style>
