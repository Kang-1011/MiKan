<template>
  <v-container fluid class="center-content d-flex flex-column">
    <!-- Title Group (Top) -->
    <v-row class="flex-grow-0">
      <v-col cols="12">
        <div class="title-group">
          <div class="d-flex align-end flex-wrap">
            <h2 class="text-h2 font-weight-bold text-black mr-3 mb-0">
              MIKAN AI:
            </h2>
            <h2 class="text-h5 font-weight-medium text-black mb-0">
              FROM AUDIO TO KANBAN
            </h2>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Content Group (Fill Remaining Height) -->
    <v-row class="flex-grow-1">
      <v-col cols="12">
        <div class="content-group">
          <p
            class="text-body-1 font-weight-regular text-black text-center mb-4"
          >
            Transform meeting recordings into actionable minutes and organized
            tasks
          </p>

          <div class="layout-content-container">
            <div
              v-if="!isRecording"
              class="bordered-section d-flex flex-column align-center gap-6 rounded-xl px-6 py-14"
              @dragover.prevent="isDragging = true"
              @dragleave="isDragging = false"
              @drop.prevent="handleDrop"
              :class="{ 'drag-over': isDragging }"
            >
              <div class="text-content d-flex flex-column align-center gap-2">
                <p class="text-h6 font-weight-bold text-center">
                  DRAG & DROP TO UPLOAD AUDIO FILE
                </p>
                <br />
                <p class="text-body-2 text-center">
                  Click the button below to upload your audio file.
                  <br />
                  Once you're done, you can review and edit the meeting minutes.
                </p>
              </div>

              <v-btn
                class="start-recording-button mt-5 px-12"
                height="56"
                rounded="xl"
                @click="triggerFileInput"
              >
                <span class="upload-text truncate mr-2">Upload File</span>
                <v-icon right size="25">mdi-cloud-upload</v-icon>
              </v-btn>
            </div>

            <div v-else>
              <Uploadfile
                :files="uploadedFiles"
                @add-more="triggerFileInput"
                @remove-file="removeFile"
                @convert="convertFiles"
              />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="handleFileSelection"
      multiple
    />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

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
  console.log("Converting files:", uploadedFiles.value);
  router.push("/MinutesHomepage");
};
</script>

<style scoped>
.center-content {
  min-height: calc(100vh - 88px); /* Adjust if your topbar is taller */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-left: 5px;
  padding-right: 5px;
}

.title-group {
  padding-left: 16px;
  margin-bottom: 1.5rem;
}

.content-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Vertical centering */
  align-items: center;
}

.upload-text {
  font-size: 1.1rem;
  font-weight: bold;
}

.layout-content-container {
  max-width: 960px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1; /* Add this line */
  justify-content: center; /* Optional: center internal content if needed */
}

.bordered-section {
  border: 2px dashed #ff3d00;
  background-color: #ff3c0011;
  transition: background-color 0.3s ease;
}

.bordered-section.drag-over {
  background-color: #ffc7b5;
}

.start-recording-button {
  background-color: #ff3d00 !important;
  color: white !important;
  text-transform: none;
  letter-spacing: 0.015em;
  font-weight: bold;
}

.text-content p {
  color: #181411;
}

.text-subtitle-1 {
  font-size: 1rem;
  line-height: 1.5rem;
  letter-spacing: -0.015em;
}

.text-body-2 {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: normal;
}

@media (max-width: 960px) {
  .px-40 {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
}

.v-list-item {
  border: 1px solid #e0e0e0;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.v-list-item:hover {
  background-color: #f5f5f5;
}
</style>
