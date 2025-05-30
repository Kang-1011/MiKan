<template>
  <v-container fluid class="fill-height vuetify-background">
    <v-row justify="center" align="start" class="pt-0 pb-0">
      <v-col cols="12" md="8" lg="6">
        <div class="layout-content-container">
          <h2
            class="text-center text-h2 font-weight-bold mb-0 pt-0 pl-0 text-black"
          >
            MIKAN AI:
          </h2>
          <h2 class="text-center text-h5 font-weight-medium text-black mb-4">
            FROM AUDIO TO KANBAN
          </h2>
          <p class="text-center text-body-1 font-weight-regular text-black">
            Transform meeting recordings into actionable minutes and organized
            tasks
          </p>

          <div class="pa-4">
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

            <!-- Uploaded Files View -->

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
  </v-container>

  <input
    type="file"
    ref="fileInput"
    style="display: none"
    @change="handleFileSelection"
    multiple
  />
</template>

<!---------------------------------------------------------------------------------------------------------->

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // Import useRouter

const router = useRouter();
const isDragging = ref(false);
const isRecording = ref(false);
const uploadedFiles = ref([]); // Initialize as empty array
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
  event.target.value = ""; // Allow re-selection
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
</script>

<!---------------------------------------------------------------------------------------------------------->

<style scoped>
.vuetify-background {
  background-color: #ffffff; /* Corresponds to bg-white */
}

.fill-height {
  min-height: 100vh; /* Make container take full viewport height */
}

.upload-text {
  font-size: 1.1rem; /* Increase as needed */
  font-weight: bold;
}

.layout-content-container {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.bordered-section {
  border: 2px dashed #e6e0db;
  background-color: #f5f5f5;
  transition: background-color 0.3s ease; /* Added transition for smooth effect */
}

.bordered-section.drag-over {
  background-color: #f2d8d0; /* Light blue background */
}

.start-recording-button {
  background-color: #ff3d00 !important;
  color: white !important; /* Added to
  text-transform: none; /* Prevent default button uppercase */
  letter-spacing: 0.015em; /* Corresponds to tracking-[0.015em] */
  font-weight: bold; /* Corresponds to font-bold */
}

.text-content p {
  color: #181411; /* Corresponds to text-[#181411] */
}

.text-subtitle-1 {
  font-size: 1rem; /* Corresponds to text-lg */
  line-height: 1.5rem; /* Corresponds to leading-tight */
  letter-spacing: -0.015em; /* Corresponds to tracking-[-0.015em] */
}

.text-body-2 {
  font-size: 0.875rem; /* Corresponds to text-sm */
  line-height: 1.25rem; /* Corresponds to leading-normal */
  font-weight: normal; /* Corresponds to font-normal */
}

/* Adjust padding for smaller screens if needed */
@media (max-width: 960px) {
  .px-40 {
    padding-left: 1rem !important; /* Adjust as needed */
    padding-right: 1rem !important; /* Adjust as needed */
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
