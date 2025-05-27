<template>
  <v-container fluid class="fill-height vuetify-background">
    <v-row justify="center" align="start" class="py-5">
      <v-col cols="12" md="8" lg="6">
        <div class="layout-content-container">
          <h2
            class="text-center text-h5 font-weight-bold mb-0 pt-0 pl-0 text-black"
          >
            Audio to Text Converter
          </h2>
          <div class="pa-4">
            <div
              class="bordered-section d-flex flex-column align-center gap-6 rounded-xl px-6 py-14"
              @dragover.prevent="isDragging = true"
              @dragleave="isDragging = false"
              :class="{ 'drag-over': isDragging }"
            >
              <div class="text-content d-flex flex-column align-center gap-2">
                <p class="text-h6 font-weight-bold text-center">
                  DRAG & DROP TO UPLOAD AUDIO
                </p>
                <br />
                <p class="text-body-2 text-center">
                  Click the button below to start recording your audio.
                  <br />
                  Once you're done, you can review and edit the transcription.
                </p>
              </div>
              <v-btn
                class="start-recording-button mt-4"
                height="56"
                rounded="xl"
              >
                <span class="truncate mr-2">Start Recording</span>
                <v-icon right>mdi-cloud-upload</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const isDragging = ref(false);

// Script logic for audio recording and transcription will go here later
// For now, it's just the template structure.
</script>

<style scoped>
.vuetify-background {
  background-color: #ffffff; /* Corresponds to bg-white */
}

.fill-height {
  min-height: 100vh; /* Make container take full viewport height */
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
</style>
