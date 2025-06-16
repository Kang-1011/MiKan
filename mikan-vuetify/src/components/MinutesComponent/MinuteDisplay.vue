<template >
  <v-container fluid class="fill-height pa-0 ma-0" ref="pdfContent">
    
  <!-- HEADER:  -->
    <v-row justify="center" align="stretch" class="fill-height ma-0">
      <v-col cols="12" md="12" class="pa-0 d-flex flex-column" style="height: 100%;">
        <v-card class="meeting-minutes-card" flat tile light>
          <div>
      <v-row no-gutters class="pa-4 pb-0 d-none d-md-flex align-center">
        <v-col class="d-flex justify-end">  

              <h1 
          class="text-h4 font-weight-bold text-black" 
          style="position: absolute; left: 50%; transform: translateX(-50%);"
        >
          {{ minuteHeaderData.title }}
        </h1>

        <div class="mr-6">
          <v-btn color="#ff3d00" class="mr-4" @click="toTranscript">
            <v-icon class="mr-2">mdi-script-text-outline</v-icon> 
            <span >to Transcript </span> 
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

    <v-row no-gutters class="pa-4 pb-0 d-md-none">
      <v-col cols="12" class="text-center">
        <h1 class="text-h4 font-weight-bold text-black mb-4">
            {{ minuteHeaderData.title }}
        </h1>
      </v-col>
      
      <v-col cols="12" class="text-center">
        <v-btn color="#ff3d00" class="mr-2" @click="toTranscript">
          <v-icon class="mr-2">mdi-script-text-outline</v-icon> Transcript
        </v-btn> 
        <v-btn color="#ff3d00" class="mr-2" @click="toKanban">
          <v-icon class="mr-2">mdi-view-dashboard-variant-outline</v-icon> Kanban
        </v-btn> 
        <v-btn color="#ff3d00" @click="toTask">
          <v-icon class="mr-2">mdi-format-list-checkbox</v-icon> Task List
        </v-btn>
      </v-col>
      </v-row>

          <v-row class="pa-4 pt-2 pb-3 justify-center align-center flex-shrink-0" dense>

            
            <v-col cols="12" sm="6" md="3" class="py-2 px-2">
              <v-card outlined class="metadata-card text-center pa-3 fill-height d-flex flex-column justify-center">
                <div class="text-caption text-black">Created by:</div>
                <div class="text-h6 font-weight-medium text-black mt-1">{{ minuteHeaderData.createdBy }}</div>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="py-2 px-2">
              <v-card outlined class="metadata-card text-center pa-3 fill-height d-flex flex-column justify-center">
                <div class="text-caption text-black">Date:</div>
                <div class="text-h6 font-weight-medium text-black mt-1">{{ formatDate(minuteHeaderData.date) }}</div>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="py-2 px-2">
              <v-card outlined class="metadata-card text-center pa-3 fill-height d-flex flex-column justify-center">
                <div class="text-caption text-black">Action Items:</div>
                <div class="text-h6 font-weight-medium text-black mt-1">{{ actionItemsCount }}</div>
              </v-card>
            </v-col>
          </v-row></div>
          <v-divider class="mx-4 flex-shrink-0"></v-divider>

          <v-card-text class="meeting-details pa-4">
            

          <div class="d-flex justify-end mb-4 pa-2 sticky-buttons-container">
            <v-btn color="#ff3d00" class="mr-4" @click="exportToPDF"> 
              <v-icon class="mr-2">mdi-download-outline</v-icon>
              {{ 'Download Minutes' }}
                </v-btn> 
            <v-btn color="#ff3d00" @click="toggleEditMode">
              
              <v-icon class="mr-2">
                {{ isEditMode ? 'mdi-check' : 'mdi-fountain-pen-tip' }}
              </v-icon>
              
              {{ isEditMode ? 'Finish Editing' : 'Edit Minutes' }}
            </v-btn>
          </div>


            <div class="content-block pa-4 rounded mb-4">
              
              <h3 class="text-subtitle-1 font-weight-medium text-black mb-2">Attendees:</h3>
              <ul v-if="!isEditMode && minuteBodyData.attendees && minuteBodyData.attendees.length" class="pl-5">
                <li v-for="(attendee, index) in minuteBodyData.attendees" :key="index" class="text-black text-body-2">
                  {{ attendee }}
                </li>
              </ul>
              <VConfirmEdit
                v-if="isEditMode"
                :model-value="minuteBodyData.attendees.join('\n')"
                @save="handleSaveAttendees" 
              >
                <template #input="{ model }">
                  <v-textarea
                    v-model="model.value"
                    label="Edit Attendees"
                    variant="outlined"
                    auto-grow
                    rows="4" 
                    persistent-hint
                    autofocus
                  ></v-textarea>
                </template>
              </VConfirmEdit>
<div v-if="isEditMode" class="custom-hint px-4 mt-n4">
  <div class="text-caption text-medium-emphasis">
    Each line should be in the format: Name (Email)  
  </div>
  <div class="text-caption text-medium-emphasis">
    Click SAVE CHANGES to save changes
  </div>
  <div class="text-caption text-medium-emphasis">
    Click FINISH EDITING to exit Edit Mode
  </div>
</div>
            </div>

            <div class="content-block pa-4 rounded mb-4">
              <h3 class="text-subtitle-1 font-weight-medium text-black mb-2">Agenda & Discussion:</h3>
              <div v-if="!isEditMode && minuteBodyData.agenda && minuteBodyData.agenda.length">
                <div v-for="(line, index) in minuteBodyData.agenda" :key="index" class="text-body-2 text-black"
                  :class="{
                    'font-weight-bold mt-4': line.startsWith('**'),
                    'pl-5': line.startsWith('-'),
                    'font-weight-medium text-body-1 mt-4': /^\d+\./.test(line)
                  }">
                  {{ line.replaceAll('**', '') }}
                </div>
              </div>
              <VConfirmEdit
                v-if="isEditMode"
                :model-value="minuteBodyData.agenda.join('\n')"
                @save="handleSaveAgenda" 
              >
                <template #input="{ model }">
                  <v-textarea
                    v-model="model.value"
                    label="Edit Agenda & Discussion"
                    variant="outlined"
                    auto-grow
                    rows="10" 
                    persistent-hint
                  ></v-textarea>
                </template>
              </VConfirmEdit>

<div v-if="isEditMode" class="custom-hint px-4 mt-n4">
  <div class="text-caption text-medium-emphasis">
    Use Markdown for formatting (e.g., **Heading**, - item).
  </div>
  <div class="text-caption text-medium-emphasis">
    Click SAVE CHANGES to save changes
  </div>
  <div class="text-caption text-medium-emphasis">
    Click FINISH EDITING to exit Edit Mode
  </div>
</div>
            </div>

            <div class="content-block pa-4 rounded">
              <h3 class="text-subtitle-1 font-weight-medium text-black mb-2">Next Steps (Summary of all Action Items):</h3>
              <div v-if="!isEditMode && minuteBodyData.nextSteps && minuteBodyData.nextSteps.length">
                <div v-for="(step, index) in minuteBodyData.nextSteps" :key="index" class="mb-2">
                  <p class="text-body-2 text-black mb-1">{{ index + 1 }}. {{ step }}</p>
                </div>
              </div>
              <VConfirmEdit
                v-if="isEditMode"
                :model-value="minuteBodyData.nextSteps.join('\n')"
                @save="handleSaveNextSteps" 
              >
                <template #input="{ model }">
                  <v-textarea
                    v-model="model.value"
                    label="Edit Next Steps"
                    variant="outlined"
                    auto-grow
                    rows="5" 
                    persistent-hint
                  ></v-textarea>
                </template>
              </VConfirmEdit>
              

<div v-if="isEditMode" class="custom-hint px-4 mt-n4">
  <div class="text-caption text-medium-emphasis">
    One action item per line.
  </div>
  <div class="text-caption text-medium-emphasis">
    Click SAVE CHANGES to save changes
  </div>
  <div class="text-caption text-medium-emphasis">
    Click FINISH EDITING to exit Edit Mode
  </div>
</div>
            </div> 
          </v-card-text>
          </v-card>
          </v-col>
    </v-row>
    </v-container>
</template>


<script setup> 
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";
import VConfirmEdit from '../VConfirmEdit.vue';
import { useMinuteStore } from '@/stores/minutestore';

// --- 1. SETUP STORE AND ROUTER ---
const minuteStore = useMinuteStore();
const router = useRouter();
const emit = defineEmits(["action"]);

const pdfContent = ref(null); 


// --- 2. GET STATE & GETTERS (THE CORRECT WAY) ---
// Use storeToRefs to get reactive access to the store's state and getters.
// This is the single, correct source of truth for your template.
const { 
  isEditMode,
  minuteHeaderData, 
  minuteBodyData, 
  actionItemsCount 
} = storeToRefs(minuteStore);

// --- 3. GET ACTIONS (FUNCTIONS) ---
// Destructure actions directly from the store instance.
const { 
  toggleEditMode,
  updateAttendees,
  updateAgenda,
  updateNextSteps,
} = minuteStore;

// --- 4. DEFINE EVENT HANDLERS ---

const exportToPDF = () => {
  console.log("Export to PDF triggered!");

  // --- START OF CHANGES ---

  // 1. Get the title from the exposed data of the child component
  const title = pdfContent.value?.meetingHeaderData?.title || 'Meeting-Minutes';

  // 2. Create a safe filename (replaces spaces and removes invalid characters)
  const safeFilename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
  
  console.log(`Using filename: ${safeFilename}`);

  // --- END OF CHANGES ---

  const elementToCapture = pdfContent.value?.$el;

  if (!elementToCapture) {
    console.error("Could not find the element to capture.");
    alert("Error: PDF content not found.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const html2canvas = window.html2canvas;

  if (!html2canvas || !jsPDF) {
    console.error("PDF generation libraries not loaded!");
    alert("Sorry, the PDF export feature is currently unavailable.");
    return;
  }
  
  html2canvas(elementToCapture, { scale: 2, useCORS: true })
    .then(canvas => {
      console.log("html2canvas was SUCCESSFUL.");
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

      // 3. Use the new safe filename here
      pdf.save(safeFilename);

      console.log("PDF generation complete.");
    })
    .catch(error => {
      console.error("Oops, something went wrong with html2canvas!", error);
      alert("Could not generate PDF. Please check the console for errors.");
    });
};


const toTranscript = () => {
  console.log("Transcript clicked");
  emit("action", { type: "transcript" });
  router.push("/TranscriptsHomepage");
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
 
function handleSaveAttendees(attendeesText) {
  updateAttendees(attendeesText); 
}

function handleSaveAgenda(agendaText) {
  updateAgenda(agendaText); 
}

function handleSaveNextSteps(nextStepsText) {
  updateNextSteps(nextStepsText); 
}

// --- 5. HELPER FUNCTIONS ---
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
/* Styles from original Minutes.vue */
.content-block {
  background-color: #FFFFFF; /* Each section row background color */
  /* Using Vuetify classes for padding (pa-4) and border-radius (rounded) in template */
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* Styles from original MinuteDisplay.vue */
.meeting-minutes-card {
  background-color: #FFFFFF; /* Whole minutes section background */
  border-radius: 8px; 
  height: 100%; 
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  color: black;
  width:100%
}

.metadata-card {
  background-color: #FFFFFF; 
  border: 1px solid #E0E0E0; 
}

.meeting-details {
  background-color: #EBEBEB; /* "Board" background color */
  flex-grow: 1;
  overflow-y: auto;
  line-height: 1.6;
  /* Padding on the board itself, around the content blocks */
  padding: 16px; 
  margin: 0 16px 16px 16px; /* Margin for the board area from main card edges */
  border-radius: 6px; /* Rounded corners for the board area */
}

/* Custom Scrollbar Styling */
.meeting-details::-webkit-scrollbar {
  width: 8px;
}

.meeting-details::-webkit-scrollbar-track {
  background: #E0E0E0; /* Slightly lighter than board for contrast */
  border-radius: 10px;
}

.meeting-details::-webkit-scrollbar-thumb {
  background-color: #FA3915; /* User requested color */
  border-radius: 10px;
  border: 2px solid #E0E0E0; /* Creates padding around thumb */
}

.sticky-buttons-container {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #EBEBEB; /* Matches the parent background to hide content scrolling under it */
}

</style>