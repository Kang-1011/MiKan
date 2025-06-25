<template>
  <v-dialog max-width="500px" min-height="400px">
    <v-card class="rounded-xl pa-2">
      <v-card-title class="ml-3">Upload files</v-card-title>

      <v-card-text>
        <v-form ref="taskForm" @submit.prevent="createDraft" lazy-validation>
          <!-- <v-text-field
            clearable
            label="Task Title"
            variant="outlined"
            density="compact"
            v-model="title"
            rounded="lg"
            class="mb-1"
            :rules="[(v) => !!v || 'Task title is required']"
          ></v-text-field> -->
          <div class="px-0">
            <div
              v-if="!isRecording"
              class="upload-area d-flex flex-column align-center justify-center"
              @dragover.prevent="isDragging = true"
              @dragleave="isDragging = false"
              @drop.prevent="handleDrop"
              :class="{ 'drag-over': isDragging }"
            >
              <v-btn
                class="mt-5"
                height="56"
                @click="triggerFileInput"
                variant="solo"
              >
                <span class="truncate"></span>

                <v-icon right size="50">mdi-file-upload-outline</v-icon>
              </v-btn>
              <p>
                Drop your files here,
                <a
                  class=""
                  @click="triggerFileInput"
                  style="text-decoration: underline; cursor: pointer"
                  >or click to browse</a
                >
              </p>
            </div>

            <div v-else>
              <UploadfileCustom
                :files="uploadedFiles"
                @add-more="triggerFileInput"
                @remove-file="removeFile"
                @convert="convertFiles"
              />
            </div>
            <div class="d-flex align-center">
              <!-- <span>&#9432;</span> -->
              <!-- <v-row>
                  <v-col>
                    <span class="d-flex justify-startms-1 text-caption"
                      >Supported files: .pdf, .docx, .txt, .mp3, .m4a</span
                    ></v-col
                  >
                  <v-col>
                    <span class="d-flex justify-end ms-1 text-caption"
                      >Maximum size: 10MB</span
                    >
                  </v-col>
                </v-row> -->

              <div v-if="!isRecording">
                <v-row
                  class="d-flex justify-space-between align-center mt-1 mx-1"
                >
                  <div>
                    <span>&#9432;</span>
                    <span class="ms-1 text-caption">
                      Supported files: .mp3, .wav
                    </span>
                  </div>
                  <div>
                    <span class="justify-end ms-1 text-caption">
                      with maximum size: 10MB
                    </span>
                  </div>
                </v-row>
              </div>
            </div>
          </div>

          <!-- <v-text-field
            clearable
            label="Due Date"
            variant="outlined"
            density="compact"
            v-model="dueDate"
            rounded="lg"
            type="date"
            class="mb-1"
            :rules="[(v) => !!v || 'Due date is required']"
            :min="tomorrowDate"
          ></v-text-field> -->

          <!-- <v-text-field
            clearable
            label="Assignee"
            variant="outlined"
            density="compact"
            v-model="assignee"
            rounded="lg"
            class="mb-1"
            :rules="[(v) => !!v || 'Assignee is required']"
          ></v-text-field> -->

          <!-- <v-text-field
            clearable
            label="Project"
            variant="outlined"
            density="compact"
            v-model="project"
            rounded="lg"
            class="mb-1"
            :rules="[(v) => !!v || 'Project is required']"
          ></v-text-field> -->

          <!-- <v-textarea
            clearable
            label="Task Description"
            variant="outlined"
            density="compact"
            v-model="description"
            rounded="lg"
            rows="3"
            class="mb-0"
            :rules="[(v) => !!v || 'Task description is required']"
          ></v-textarea> -->
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end mb-2">
        <v-btn
          color="black"
          variant="outlined"
          class="text-body-2 mr-2"
          rounded="lg"
          @click="closeThisDialog"
          >Cancel</v-btn
        >

        <v-btn
          color="black"
          variant="flat"
          class="text-body-2 mr-4"
          rounded="lg"
          @click="handleClick"
          >Transcribe</v-btn
        >
      </v-card-actions>
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileSelection"
        multiple
      />
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDraftStore } from "@/stores/drafts";
import UploadfileCustom from "../AudioComponent/UploadfileCustom.vue";

const emit = defineEmits([
  "close-create-task-dialog",
  "addMore",
  "removeFile",
  "convert",
]);

import { useRouter } from "vue-router"; // Import useRouter

const handleClick = () => {
  console.log("ViewKanbanButton clicked");
  emit("action", { type: "viewKanban" });
  router.push("/TranscriptsHomepage");
};

const router = useRouter();
const isDragging = ref(false);
const isRecording = ref(false);
const uploadedFiles = ref([]);
const fileInput = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFiles = (files) => {
  if (files.length > 0) {
    uploadedFiles.value = [...uploadedFiles.value, ...files];
    isRecording.value = true;
  }
};

const handleFileSelection = (event) => {
  const files = Array.from(event.target.files);
  handleFiles(files);
  event.target.value = "";
};

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files);
  handleFiles(files);
  isDragging.value = false;
};

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1);

  if (uploadedFiles.value.length === 0) {
    isRecording.value = false;
    isDragging.value = false;
  }
};

const convertFiles = () => {
  // Add your conversion logic here

  console.log("Converting files:", uploadedFiles.value);

  // Redirect to the Minutes page
  router.push("/MinutesHomepage"); // Use router.push to navigate
};

function closeThisDialog() {
  emit("close-create-task-dialog");
}

async function createDraft() {
  // Validate the form
  const { valid } = await taskForm.value.validate();

  if (valid) {
    const newDraft = {
      title: title.value,
      dueDate: dueDate.value,
      assignee: assignee.value,
      project: project.value,
      description: description.value,
    };

    draftStore.addDraft(newDraft);

    emit("pass-created-task");

    // Reset validation state after successful submission
    if (taskForm.value) {
      taskForm.value.resetValidation();
    }
  }
}
</script>

<style scoped>
.upload-area {
  border: 1px dashed black;
  border-radius: 10px;
  padding: 32px;
  width: 100%;
}
</style>
