<template> 
  <v-container fluid class="fill-height pa-0 ma-0" ref="pdfContent">
    <v-row justify="center" align="stretch" class="fill-height ma-0">
      <v-col cols="12" class="pa-0 d-flex flex-column" style="height: 100%;">
        <v-card class="meeting-display-card"  flat tile light>
           
          <div>
      <v-row no-gutters class="pa-4 pb-0 d-none d-md-flex align-center">
        <v-col class="d-flex justify-end">  

        <h1 
          class="text-h4 font-weight-bold text-black" 
          style="position: absolute; left: 50%; transform: translateX(-50%);"
        >
          {{ transcriptHeaderData.title }}
        </h1>

        <div class="mr-6">
          <v-btn color="#ff3d00" class="mr-4" @click="toMinutes">
            <v-icon class="mr-2">mdi-script-text-outline</v-icon> 
            <span >to Minutes </span> 
          </v-btn> 
          <v-btn color="#ff3d00" class="mr-4" @click="toKanban">
            <v-icon class="mr-2">mdi-view-dashboard-variant-outline</v-icon> To Kanban Board
          </v-btn> 
          <v-btn color="#ff3d00" @click="toTask">
            <v-icon class="mr-2">mdi-format-list-checkbox</v-icon> To Task List
          </v-btn>
        </div>
      </v-col>
    </v-row> 

            
            <v-row class="pa-4 pt-2 pb-3 justify-center align-center flex-shrink-0" dense>
                <!-- Metadata cards remain the same -->
                <v-col cols="12" sm="6" md="3" class="py-2 px-2">
                    <v-card outlined class="metadata-card text-center pa-3 fill-height d-flex flex-column justify-center">
                        <div class="text-caption text-black">Created by:</div>
                        <div class="text-h6 font-weight-medium text-black mt-1">{{ transcriptHeaderData.createdBy }}</div>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="3" class="py-2 px-2">
                    <v-card outlined class="metadata-card text-center pa-3 fill-height d-flex flex-column justify-center">
                        <div class="text-caption text-black">Date:</div>
                        <div class="text-h6 font-weight-medium text-black mt-1">{{ formatDate(transcriptHeaderData.date) }}</div>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="3" class="py-2 px-2">
                    <v-card outlined class="metadata-card text-center pa-3 fill-height d-flex flex-column justify-center">
                        <div class="text-caption text-black">Total Time:</div>
                        <div class="text-h6 font-weight-medium text-black mt-1">{{ totalTime }}</div>
                    </v-card>
                </v-col>
            </v-row>
          </div> 

    <v-row no-gutters class="pa-4 pb-0 d-md-none">
      <v-col cols="12" class="text-center">
        <h1 class="text-h4 font-weight-bold text-black mb-4">
            {{ transcriptHeaderData.title }}
        </h1>
      </v-col>
      
      <v-col cols="12" class="text-center">
          <v-btn color="#ff3d00" class="mr-4" @click="toMinutes">
            <v-icon class="mr-2">mdi-script-text-outline</v-icon> 
            <span >to Minutes </span> 
          </v-btn> 
          <v-btn color="#ff3d00" class="mr-4" @click="toKanban">
            <v-icon class="mr-2">mdi-view-dashboard-variant-outline</v-icon> To Kanban Board
          </v-btn> 
          <v-btn color="#ff3d00" @click="toTask">
            <v-icon class="mr-2">mdi-format-list-checkbox</v-icon> To Task List
          </v-btn>
      </v-col>
      </v-row>

          <!-- Transcript content section -->
          <v-card-text class="meeting-details-content pa-4"> 

          <div class="d-flex justify-end mb-4 pa-2 sticky-buttons-container">
            <v-btn color="#ff3d00" class="mr-4" @click="exportToPDF"> 
              <v-icon class="mr-2">mdi-download-outline</v-icon>
              {{ 'Download Transcript' }}
            </v-btn> 
            
            <v-btn color="#ff3d00" @click="toggleEditMode">
              
              <v-icon class="mr-2">
                {{ isEditMode ? 'mdi-check' : 'mdi-fountain-pen-tip' }}
              </v-icon>
              
              {{ isEditMode ? 'Finish Editing' : 'Edit Transcript ' }}
            </v-btn>
          </div>

            <div class="content-block pa-4 rounded">
              
              <!-- EDIT MODE: Show VConfirmEdit with a textarea -->
              <VConfirmEdit
                v-if="isEditMode"
                :model-value="body.transcriptLines.join('\n')"
                @save="handleSave"
                @cancel="handleCancel"
              >
                <template #input="{ model }">
                  <v-textarea
                    v-model="model.value"
                    label="Edit Transcript"
                    variant="outlined"
                    auto-grow
                    rows="15" 
                    persistent-hint
                    autofocus
                  ></v-textarea>
                </template>
              </VConfirmEdit>

<div v-if="isEditMode" class="custom-hint px-4 mt-n4">
  <div class="text-caption text-medium-emphasis">
    Each line should be in the format: HH:MM:SS Speaker # (Name) Text
  </div>
  <div class="text-caption text-medium-emphasis">
    Click SAVE CHANGES to save changes
  </div>
  <div class="text-caption text-medium-emphasis">
    Click FINISH EDITING to exit Edit Mode
  </div>
</div>

              <!-- DISPLAY MODE: Show formatted transcript or "Add Content" button -->
              <template v-else>
                <div v-if="!parsedTranscriptLines.length" class="text-center pa-8">
                  <p class="text-body-1 text-grey-darken-1 mb-4">No transcript content available.</p>
                  <v-btn
                    color="#ff3d00"
                    variant="flat"
                    @click="toggleEditMode"
                    prepend-icon="mdi-plus-circle-outline"
                  >
                    Add Content
                  </v-btn>
                </div>
                <div v-else>
                  <div v-for="(line, index) in parsedTranscriptLines" :key="index" class="d-flex mb-3">
                    <div class="text-caption text-grey-darken-1 pr-4" style="flex-basis: 75px; min-width: 75px;">
                      {{ line.timestamp }}
                    </div>
                    <div style="flex-grow: 1;">
                      <p class="font-weight-bold text-body-2 text-black mb-1">{{ line.speaker }}</p>
                      <p class="text-body-2 text-black mb-0" style="white-space: pre-wrap;">{{ line.text }}</p>
                    </div>
                  </div>
                </div>
              </template> 
            </div> 
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container> 
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";
import VConfirmEdit from '../VConfirmEdit.vue'; // Using the new VConfirmEdit for the transcript block
import { useTranscriptStore } from '@/stores/transcriptstore';

const transcriptStore = useTranscriptStore();
const router = useRouter();
const emit = defineEmits(["action"]);

const pdfContent = ref(null); 

// Reactive state and getters from the store
const { header: transcriptHeaderData, body, totalTime, isEditMode } = storeToRefs(transcriptStore);

// Actions from the store
const { 
  updateTranscriptFromText,
  toggleEditMode, // <-- This action is used by the new "Add Content" button
} = transcriptStore;

// --- 4. DEFINE EVENT HANDLERS ---

const exportToPDF = () => {
  console.log("Export to PDF triggered!");

  const elementToCapture = pdfContent.value?.$el;

  if (!elementToCapture) {
    console.error("Could not find the element to capture.");
    alert("Error: PDF content not found.");
    return;
  }

  // --- START OF CHANGES ---
  const title = transcriptHeaderData.value?.title || 'Meeting-Transcript';
  const safeFilename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
  console.log(`Using filename: ${safeFilename}`);

  const { jsPDF } = window.jspdf;
  const html2canvas = window.html2canvas;

  if (!html2canvas || !jsPDF) {
    console.error("PDF generation libraries not loaded!");
    alert("Sorry, the PDF export feature is currently unavailable.");
    return;
  }

  html2canvas(elementToCapture, {
    scale: 2,
    useCORS: true,
    // It can be beneficial to set the width explicitly if responsive issues persist
    width: elementToCapture.scrollWidth
  }).then(canvas => {
    console.log("html2canvas was SUCCESSFUL.");
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt', // Using points is often more reliable
      format: 'a4' // Standard page size
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const canvasAspectRatio = canvas.width / canvas.height;
    const pdfAspectRatio = pdfWidth / pdfHeight;

    let finalCanvasWidth, finalCanvasHeight;

    // Fit canvas to PDF page width
    finalCanvasWidth = pdfWidth;
    finalCanvasHeight = finalCanvasWidth / canvasAspectRatio;
    
    // If the content is too tall for one page, you might need to handle multi-page PDFs.
    // For a single-page output, this will scale it down.
    if (finalCanvasHeight > pdfHeight) {
        console.warn("Content is taller than a single A4 page. It will be scaled to fit.");
        finalCanvasHeight = pdfHeight;
        finalCanvasWidth = finalCanvasHeight * canvasAspectRatio;
    }


    const xOffset = (pdfWidth - finalCanvasWidth) / 2;
    const yOffset = 0; // Or center it vertically: (pdfHeight - finalCanvasHeight) / 2;


    pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalCanvasWidth, finalCanvasHeight);
    pdf.save(safeFilename);

    console.log("PDF generation complete.");
  }).catch(error => {
    console.error("Oops, something went wrong with html2canvas!", error);
    alert("Could not generate PDF. Please check the console for errors.");
  });
};

const toMinutes = () => {
  console.log("Minutes clicked");
  emit("action", { type: "minutes" });
  router.push("/MinutesHomepage");
};

const toKanban = () => {
  console.log("kanban clicked");
  emit("action", { type: "kanban" });
  router.push("/kanbanPage");
};

const toTask = () => {
  console.log("Task clicked");
  emit("action", { type: "Task" });
  router.push("/ManagerReview");
};
 
/**
 * Handles the save event from the VConfirmEdit component.
 * @param {string} fullText - The complete, edited transcript text.
 */
function handleSave(fullText) {
  updateTranscriptFromText(fullText);  // Exit edit mode after saving
}

/**
 * Handles the cancel event from the VConfirmEdit component.
 */
function handleCancel() {
  toggleEditMode(); // Exit edit mode without saving
}

/**
 * A computed property that parses each transcript line into an object
 * for cleaner rendering in the display mode.
 */
const parsedTranscriptLines = computed(() => {
  if (!body.value || !Array.isArray(body.value.transcriptLines)) {
    return [];
  }
  return body.value.transcriptLines
    .map(line => {
      // Improved regex to handle optional speaker names gracefully
      const match = line.match(/^(\d{2}:\d{2}:\d{2})\s(Speaker \d+(?: \(.+\))?)\s*(.*)$/);
      if (match) {
        return { timestamp: match[1], speaker: match[2], text: match[3].trim() };
      }
      return { timestamp: '00:00:00', speaker: 'System', text: line };
    })
    .filter(line => line.text); // Filter out any empty or whitespace-only lines
});

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  try {
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateString;
  }
};
</script>

<style scoped>
/* Styles from the original component remain unchanged */
.content-block {
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.meeting-display-card {
  background-color: #FFFFFF;
  border-radius: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  color: black;
}

.metadata-card {
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
}

.meeting-details-content {
  background-color: #EBEBEB;
  flex-grow: 1;
  overflow-y: auto;
  line-height: 1.6;
  padding: 16px;
  margin: 0 16px 16px 16px;
  border-radius: 6px;
}

.meeting-details-content::-webkit-scrollbar {
  width: 8px;
}

.meeting-details-content::-webkit-scrollbar-track {
  background: #E0E0E0;
  border-radius: 10px;
}

.meeting-details-content::-webkit-scrollbar-thumb {
  background-color: #FA3915;
  border-radius: 10px;
  border: 2px solid #E0E0E0;
}
</style>
