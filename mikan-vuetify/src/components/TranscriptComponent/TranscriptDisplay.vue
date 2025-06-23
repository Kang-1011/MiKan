<template>
<v-row class="justify-space-between align-center ma-2" style="padding: 8px 16px">
  <div>
    <v-tooltip text="Download Transcript" location="bottom">
      <template v-slot:activator="{ props }">
      <v-btn icon="mdi-download-outline" variant="text"  v-bind="props" @click="exportToPDF"></v-btn>
      </template>
    </v-tooltip>
  </div>
  <div>
    <v-tooltip :text="isEditMode ? 'Finish Editing' : 'Edit Transcript'" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn :icon="isEditMode ? 'mdi-check' : 'mdi-fountain-pen-tip'"  variant="text"  v-bind="props" @click="toggleEditMode"></v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="To Minutes" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-send-outline"   class="ml-4" variant="text" v-bind="props" @click="toMinute"></v-btn>
      </template>
    </v-tooltip>
  </div>
</v-row>

  <v-container fluid class="page-container" ref="pdfContent">
    
    <div class="minutes-section-card">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="title-cell d-flex justify-center align-center">
            <h1 class="text-h4 font-weight-bold">{{ transcriptHeaderData.title }}</h1> 
          </div>
        </v-col>
      </v-row>

      <v-row style= "border-bottom: 2px solid #eaeaea;" no-gutters class="pa-4">
        <v-col cols="12" md="3" class="pa-2">
          <div class="rounded-header-cell">
            <span class="font-weight-bold">Location:</span>
            <div v-if="activeEditorKey !== 'location'" @click="isEditMode && setActiveEditor('location')" :class="{ 'editable-field': isEditMode }" class="pa-2" style="min-height: 40px;">
              {{ transcriptHeaderData.location }}
            </div>
            <VConfirmEdit v-if="isEditMode && activeEditorKey === 'location'" :model-value="transcriptHeaderData.location" @save="(newValue) => handleSaveHeaderField('location', newValue)" @cancel="handleCancelEdit">
              <template #input="{ model }"><v-text-field v-model="model.value" label="Edit Location" variant="outlined"></v-text-field></template>
            </VConfirmEdit>
          </div>  
        </v-col>
        <v-col cols="12" md="3" class="pa-2">
          <div class="rounded-header-cell">
            <span class="font-weight-bold">Written by:</span>
            <div v-if="activeEditorKey !== 'createdBy'" @click="isEditMode && setActiveEditor('createdBy')" :class="{ 'editable-field': isEditMode }" class="pa-2" style="min-height: 40px;">
              {{ transcriptHeaderData.createdBy }}
            </div>
            <VConfirmEdit v-if="isEditMode && activeEditorKey === 'createdBy'" :model-value="transcriptHeaderData.createdBy" @save="(newValue) => handleSaveHeaderField('createdBy', newValue)" @cancel="handleCancelEdit">
              <template #input="{ model }"><v-text-field v-model="model.value" label="Edit Author" variant="outlined"></v-text-field></template>
            </VConfirmEdit>
          </div>
        </v-col>
        <v-col cols="12" md="3" class="pa-2">
            <div class="rounded-header-cell">
                <span class="font-weight-bold">Date:</span>
                <div v-if="activeEditorKey !== 'date'" @click="isEditMode && setActiveEditor('date')" :class="{ 'editable-field': isEditMode }" class="pa-2" style="min-height: 40px;">
                    {{ formatDate(transcriptHeaderData.date) }}
                </div>
                <VConfirmEdit v-if="isEditMode && activeEditorKey === 'date'" :model-value="transcriptHeaderData.date" @save="(newValue) => handleSaveHeaderField('date', newValue)" @cancel="handleCancelEdit">
                    <template #input="{ model }"><v-text-field v-model="model.value" label="Edit Date" variant="outlined" hint="YYYY-MM-DD"></v-text-field></template>
                </VConfirmEdit>
            </div>
        </v-col>
        <v-col cols="12" md="3" class="pa-2">
            <div class="rounded-header-cell">
                <span class="font-weight-bold">Project:</span>
                <div v-if="activeEditorKey !== 'project'" @click="isEditMode && setActiveEditor('project')" :class="{ 'editable-field': isEditMode }" class="pa-2" style="min-height: 40px;">
                    {{ transcriptHeaderData.project }}
                </div>
                <VConfirmEdit v-if="isEditMode && activeEditorKey === 'project'" :model-value="transcriptHeaderData.project" @save="(newValue) => handleSaveHeaderField('project', newValue)" @cancel="handleCancelEdit">
                    <template #input="{ model }"><v-text-field v-model="model.value" label="Edit Project" variant="outlined"></v-text-field></template>
                </VConfirmEdit>
            </div>
        </v-col>
      </v-row>
      
      <v-row no-gutters>
        <v-col cols="12" class="px-4">
          <div class="content-cell">
            <v-row no-gutters align="start">
              <v-col cols="12" md="1">
                <span class="font-weight-bold">Purpose:</span>
              </v-col>
              <v-col cols="12" md="11"> 
                <div v-if="activeEditorKey !== 'Purpose'" @click="isEditMode && setActiveEditor('Purpose')" :class="{ 'editable-field': isEditMode }" class="mt-6 mb-0" style="min-height: 40px;">
                  {{ transcriptHeaderData.Purpose }}
                </div>
                <VConfirmEdit v-if="isEditMode && activeEditorKey === 'Purpose'" :model-value="transcriptHeaderData.Purpose" @save="(newValue) => handleSaveHeaderField('Purpose', newValue)" @cancel="handleCancelEdit">
                  <template #input="{ model }"><v-textarea v-model="model.value" label="Edit Purpose" variant="outlined" auto-grow rows="3"></v-textarea></template>
                </VConfirmEdit>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" class="px-4 pb-4">
          <div class="content-cell" style="border-bottom: none;">
            <v-row no-gutters align="start">
              <v-col cols="12" md="1">
                <span class="font-weight-bold">Attendees:</span>
              </v-col>
              <v-col cols="12" md="11"> 
                <div v-if="activeEditorKey !== 'Attendees'" @click="isEditMode && setActiveEditor('Attendees')" :class="{ 'editable-field': isEditMode }" class="mt-6 mb-0 attendees-text" style="min-height: 40px;">
                  {{ transcriptHeaderData.Attendees }}
                </div>
                <VConfirmEdit v-if="isEditMode && activeEditorKey === 'Attendees'" :model-value="transcriptHeaderData.Attendees" @save="(newValue) => handleSaveHeaderField('Attendees', newValue)" @cancel="handleCancelEdit">
                  <template #input="{ model }"><v-textarea v-model="model.value" label="Edit Attendees" variant="outlined" auto-grow rows="3"></v-textarea></template>
                </VConfirmEdit>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="my-6"></div>
    <div class="tasks-section-card">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="task-list-header d-flex justify-center align-center ga-4">
            <h3 class="font-weight-bold">Transcript List</h3> 
          </div>
        </v-col>
      </v-row>



        <v-row no-gutters>
          <v-col cols="12" class="pa-4">
              <div 
                  v-if="activeEditorKey !== 'transcript'" 
                  class="transcript-container"
                  :class="{ 'editable-field': isEditMode }"
                  @click="isEditMode && setActiveEditor('transcript')"
              >
                  <div v-for="(line, index) in body.transcriptLines" :key="index" class="transcript-line">
                      <span class="speaker-info">{{ parseLine(line.transcript).speaker }} :</span>
                      <span class="content">{{ parseLine(line.transcript).content }}</span>
                  </div>
              </div>
              <VConfirmEdit 
                  v-if="isEditMode && activeEditorKey === 'transcript'"
                  :model-value="fullTranscriptText" 
                  @save="handleSaveTranscript" 
                  @cancel="handleCancelEdit"
              >
                <template #input="{ model }">
                    <v-textarea 
                      v-model="model.value" 
                      label="Edit Transcript" 
                      variant="outlined"
                      auto-grow
                      rows="10"
                      hint="Edit the raw transcript text here."
                    ></v-textarea>
                </template>
              </VConfirmEdit>
          </v-col>
        </v-row>
    </div>  
  </v-container>
</template>


<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTranscriptStore } from '@/stores/transcriptstore';
import { useRouter } from "vue-router"; 
import VConfirmEdit from '../VConfirmEdit.vue'; 

const transcriptStore = useTranscriptStore();
const pdfContent = ref(null);  
const router = useRouter();

// FIX: Re-added defineEmits as it is used by the toTask function.
const emit = defineEmits(["action"]);

const parseLine = (line) => {
    const parts = line.split(':');
    
    // If there's nothing to split, return the original line as content.
    if (parts.length <= 1) {
        return { speaker: '', content: line };
    }

    // Take the last part as the content
    const content = parts.pop().trim();
    // Join the remaining parts back together to form the speaker/timestamp
    const speaker = parts.join(':').trim();

    return { speaker, content };
};

const { header: transcriptHeaderData, body, isEditMode, activeEditorKey, fullTranscriptText } = storeToRefs(transcriptStore);
const { 
  updateHeaderField, 
  toggleEditMode,
  setActiveEditor,
  updateTranscript, 
} = transcriptStore;

const handleSaveTranscript = (newValue) => {
  updateTranscript(newValue);
  setActiveEditor(null);
};

const handleSaveHeaderField = (field, value) => {
  updateHeaderField({ field, value });
  setActiveEditor(null);
};

const handleCancelEdit = () => {
  setActiveEditor(null);
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  try {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return date.toLocaleDateString('en-US', options);
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateString;
  }
};

const toMinute = () => {
  console.log("Minute clicked");
  emit("action", { type: "Minute" });
  router.push("/MinutesHomepage");
};


const exportToPDF = () => {
  console.log("Export to PDF triggered!");

  const elementToCapture = pdfContent.value?.$el;

  if (!elementToCapture) {
    console.error("Could not find the element to capture.");
    alert("Error: PDF content not found.");
    return;
  }

  // --- START: Fix for capturing full scrollable content ---

  // 1. Find the specific scrollable element within our capture area
  const scrollableElement = elementToCapture.querySelector('.transcript-container');
  let originalMaxHeight = '';
  let originalOverflowY = '';

  if (scrollableElement) {
    // 2. Store its original CSS so we can restore it later
    originalMaxHeight = scrollableElement.style.maxHeight;
    originalOverflowY = scrollableElement.style.overflowY;
    
    // 3. Temporarily override the CSS to make all content visible
    scrollableElement.style.maxHeight = 'none';
    scrollableElement.style.overflowY = 'visible';
  }

  // --- END: Fix for capturing full scrollable content ---


  const title = 'Meeting-Transcript';
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
    width: elementToCapture.scrollWidth
  }).then(canvas => {
    console.log("html2canvas was SUCCESSFUL.");
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasAspectRatio = canvas.width / canvas.height;

    let finalCanvasWidth = pdfWidth;
    let finalCanvasHeight = finalCanvasWidth / canvasAspectRatio;

    // This logic now correctly handles the newly expanded height.
    // If it's still taller than one page, it will be scaled to fit.
    // For multi-page PDFs, a more advanced approach would be needed.
    if (finalCanvasHeight > pdfHeight) {
        console.warn("Content is taller than a single A4 page. It will be scaled to fit.");
        finalCanvasHeight = pdfHeight;
        finalCanvasWidth = finalCanvasHeight * canvasAspectRatio;
    }

    const xOffset = (pdfWidth - finalCanvasWidth) / 2;
    const yOffset = 0;

    pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalCanvasWidth, finalCanvasHeight);
    pdf.save(safeFilename);
    console.log("PDF generation complete.");

  }).catch(error => {
    console.error("Oops, something went wrong with html2canvas!", error);
    alert("Could not generate PDF. Please check the console for errors.");

  }).finally(() => {
    // --- START: Restore Original Styles ---
    // IMPORTANT: Restore the original styles regardless of success or failure.
    if (scrollableElement) {
      scrollableElement.style.maxHeight = originalMaxHeight;
      scrollableElement.style.overflowY = originalOverflowY;
    }
    // --- END: Restore Original Styles ---
  });
};


</script>



<style scoped>


.transcript-container {
    /* font-family: 'Courier New', Courier, monospace; */
    background-color: #fdfdfd;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
    padding: 16px;
    line-height: 1.6;    
    max-height: 400px; /* You can adjust this value as needed */
    overflow-y: auto;   /* Adds a scrollbar only when content exceeds max-height */

}

.transcript-line {
    display: flex;
    align-items: flex-start;
    margin-bottom: 8px;
}

.speaker-info {
    flex-shrink: 0;
    min-width: 300px;
    font-weight: bold;
    color: #333;
}
 
.editable-field {
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  border: 2px dashed transparent;
}
.editable-field:hover {
  background-color: #e0e0e0; /* A very light yellow */
  border-color: #e0e0e0; /* A light orange/yellow */
}

.minutes-section-card {
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  overflow: hidden;
}
.tasks-section-card {
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  overflow: hidden;
}
.rounded-header-cell {
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  background-color: #f9f9f9;
  height: 100%;
  padding: 12px;
  text-align: center;
}

.task-list-header {
  border-bottom: 2px solid #e0e0e0;
  padding: 16px; 
  text-align: center;
}

.title-cell {
  padding: 16px;
  border-bottom: 2px solid #e0e0e0;
}
.content-cell {
  padding: 16px 8px;
  border-bottom: 2px solid #e0e0e0;
}
.attendees-text {
  white-space: pre-wrap;
  line-height: 1.5;
} 

.transcript-display {
    white-space: pre-wrap; /* Ensures newlines are respected */
    line-height: 1.6;
    /* font-family: monospace; Often good for transcripts */
    background-color: #f9f9f9;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
}

.editable-field {
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  border: 2px dashed transparent;
}
.editable-field:hover {
  background-color: #e0e0e0; /* A very light yellow */
  border-color: #e0e0e0; /* A light orange/yellow */
}
</style>