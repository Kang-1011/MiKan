<template>
  <v-app style="height: 100vh; overflow: hidden;"> 
    <v-main style="height: 100%; overflow: hidden;">
      <v-container fluid class="fill-height pa-0 ma-0">
        <v-row justify="center" align="stretch" class="fill-height ma-0">
          <v-col cols="12" md="10" class="pa-0 d-flex flex-column" style="height: 100%;">
            <v-card class="meeting-display-card" flat tile light>
              <v-row no-gutters class="pa-4 pb-0 text-center flex-shrink-0">
                <v-col>
                  <h1 class="text-h4 font-weight-bold text-black mb-0">{{ transcriptHeaderData.title }}</h1>
                </v-col>
              </v-row>

              <v-row class="pa-4 pt-2 pb-3 justify-center align-center flex-shrink-0" dense>
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
                    <div class="text-caption text-black">Action Items:</div>
                    <div class="text-h6 font-weight-medium text-black mt-1">{{ transcriptHeaderData.actionItemsCount }}</div>
                  </v-card>
                </v-col>
              </v-row>
              <v-divider class="mx-4 flex-shrink-0"></v-divider>

              <v-card-text class="meeting-details-content pa-4">
                <div class="content-block pa-4 rounded">
                  <div v-for="(line, index) in transcriptLines" :key="index" class="mb-2">
                    <p class="text-body-2 text-black mb-0">
                      <span class="font-weight-bold">[{{ line.timestamp }}] {{ line.speaker }}:</span> {{ line.dialogue }}
                    </p>
                  </div>
                  <div v-if="!transcriptLines.length" class="text-center text-grey-darken-1">
                     No transcript content provided.
                  </div>
                </div>
                </v-card-text>
            </v-card>
            </v-col>
          
          <v-col cols="12" md="2" class="pa-0" style="height: 100%;">
            <ActionButtonsBar>
              <template #top-button>
                <KanbanButton @action="handleMeetingAction" />
              </template>
              <template #middle-button-1>
                <EditButton @action="handleMeetingAction" />
              </template>
              <template #middle-button-2>
                <MinutesButton @action="handleMeetingAction" /> 
              </template>
              <template #middle-button-3>
                <ShareButton @action="handleMeetingAction" />
              </template>
              <template #middle-button-4>
                <DownloadButton @action="handleMeetingAction" />
              </template>
              <template #bottom-button>
                <TasklistButton @action="handleMeetingAction" />
              </template>
            </ActionButtonsBar>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup> 
import { ref } from 'vue';

// Assuming these components are imported if not globally registered.
// Note: Original Transcript.vue imported Navbar, MinuteDisplay.vue used MyAppBar.
// I'm using MyAppBar here as it was part of the visual structure of MinuteDisplay.
// Adjust if Navbar is the correct one for your app structure.
// import Sidebar from "../components/Sidebar.vue";
// import MyAppBar from "../components/MyAppBar.vue"; // Or Navbar.vue
// import ActionButtonsBar from '../components/ActionButtonsBar.vue';
// import KanbanButton from '../components/buttons/KanbanButton.vue';
// import EditButton from '../components/buttons/EditButton.vue';
// import MinutesButton from '../components/buttons/MinutesButton.vue';
// import ShareButton from '../components/buttons/ShareButton.vue';
// import DownloadButton from '../components/buttons/DownloadButton.vue';
// import TasklistButton from '../components/buttons/TasklistButton.vue';


const transcriptHeaderData = ref({
  title: 'Meeting 3 - Transcript',
  createdBy: 'User 1',
  date: '2025-05-15T10:00:00.000Z',
  actionItemsCount: 5, // This count might be derived differently for a transcript (e.g., 0 or based on detected actions)
});

const transcriptLines = ref([
  { timestamp: '00:00:05', speaker: 'Speaker 1 (Kang)', dialogue: 'Hi Chat' },
  { timestamp: '00:00:12', speaker: 'Speaker 2 (Sebastian)', dialogue: 'Good Morning Chat' },
  { timestamp: '00:00:25', speaker: 'Speaker 3 (Asfar)', dialogue: 'Good Afternoon Chat' },
  { timestamp: '00:00:33', speaker: 'Speaker 4 (Jet)', dialogue: 'Good Evening Chat' },
  { timestamp: '00:00:37', speaker: 'Speaker 5 (Rohimi)', dialogue: 'Thank you Chat' },
  { timestamp: '00:00:45', speaker: 'Speaker 6 (Alia)', dialogue: 'Bye Chat' },
  { timestamp: '00:00:05', speaker: 'Speaker 1 (Kang)', dialogue: 'Hi Chat' },
  { timestamp: '00:00:12', speaker: 'Speaker 2 (Sebastian)', dialogue: 'Good Morning Chat' },
  { timestamp: '00:00:25', speaker: 'Speaker 3 (Asfar)', dialogue: 'Good Afternoon Chat' },
  { timestamp: '00:00:33', speaker: 'Speaker 4 (Jet)', dialogue: 'Good Evening Chat' },
  { timestamp: '00:00:37', speaker: 'Speaker 5 (Rohimi)', dialogue: 'Thank you Chat' },
  { timestamp: '00:00:45', speaker: 'Speaker 6 (Alia)', dialogue: 'Bye Chat' },
  { timestamp: '00:00:05', speaker: 'Speaker 1 (Kang)', dialogue: 'Hi Chat' },
  { timestamp: '00:00:12', speaker: 'Speaker 2 (Sebastian)', dialogue: 'Good Morning Chat' },
  { timestamp: '00:00:25', speaker: 'Speaker 3 (Asfar)', dialogue: 'Good Afternoon Chat' },
  { timestamp: '00:00:33', speaker: 'Speaker 4 (Jet)', dialogue: 'Good Evening Chat' },
  { timestamp: '00:00:37', speaker: 'Speaker 5 (Rohimi)', dialogue: 'Thank you Chat' },
  { timestamp: '00:00:45', speaker: 'Speaker 6 (Alia)', dialogue: 'Bye Chat' },
  { timestamp: '00:00:05', speaker: 'Speaker 1 (Kang)', dialogue: 'Hi Chat' },
  { timestamp: '00:00:12', speaker: 'Speaker 2 (Sebastian)', dialogue: 'Good Morning Chat' },
  { timestamp: '00:00:25', speaker: 'Speaker 3 (Asfar)', dialogue: 'Good Afternoon Chat' },
  { timestamp: '00:00:33', speaker: 'Speaker 4 (Jet)', dialogue: 'Good Evening Chat' },
  { timestamp: '00:00:37', speaker: 'Speaker 5 (Rohimi)', dialogue: 'Thank you Chat' },
  { timestamp: '00:00:45', speaker: 'Speaker 6 (Alia)', dialogue: 'Bye Chat' },
  { timestamp: '00:00:05', speaker: 'Speaker 1 (Kang)', dialogue: 'Hi Chat' },
  { timestamp: '00:00:12', speaker: 'Speaker 2 (Sebastian)', dialogue: 'Good Morning Chat' },
  { timestamp: '00:00:25', speaker: 'Speaker 3 (Asfar)', dialogue: 'Good Afternoon Chat' },
  { timestamp: '00:00:33', speaker: 'Speaker 4 (Jet)', dialogue: 'Good Evening Chat' },
  { timestamp: '00:00:37', speaker: 'Speaker 5 (Rohimi)', dialogue: 'Thank you Chat' },
  { timestamp: '00:00:45', speaker: 'Speaker 6 (Alia)', dialogue: 'Bye Chat' },
  { timestamp: '00:00:05', speaker: 'Speaker 1 (Kang)', dialogue: 'Hi Chat' },
  { timestamp: '00:00:12', speaker: 'Speaker 2 (Sebastian)', dialogue: 'Good Morning Chat' },
  { timestamp: '00:00:25', speaker: 'Speaker 3 (Asfar)', dialogue: 'Good Afternoon Chat' },
  { timestamp: '00:00:33', speaker: 'Speaker 4 (Jet)', dialogue: 'Good Evening Chat' },
  { timestamp: '00:00:37', speaker: 'Speaker 5 (Rohimi)', dialogue: 'Thank you Chat' },
  { timestamp: '00:00:45', speaker: 'Speaker 6 (Alia)', dialogue: 'Bye Chat' },
  { timestamp: '00:00:05', speaker: 'Speaker 1 (Kang)', dialogue: 'Hi Chat' },
  { timestamp: '00:00:12', speaker: 'Speaker 2 (Sebastian)', dialogue: 'Good Morning Chat' },
  { timestamp: '00:00:25', speaker: 'Speaker 3 (Asfar)', dialogue: 'Good Afternoon Chat' },
  { timestamp: '00:00:33', speaker: 'Speaker 4 (Jet)', dialogue: 'Good Evening Chat' },
  { timestamp: '00:00:37', speaker: 'Speaker 5 (Rohimi)', dialogue: 'Thank you Chat' },
  { timestamp: '00:00:45', speaker: 'Speaker 6 (Alia)', dialogue: 'Bye Chat' },
  { timestamp: '00:00:05', speaker: 'Speaker 1 (Kang)', dialogue: 'Hi Chat' },
  { timestamp: '00:00:12', speaker: 'Speaker 2 (Sebastian)', dialogue: 'Good Morning Chat' },
  { timestamp: '00:00:25', speaker: 'Speaker 3 (Asfar)', dialogue: 'Good Afternoon Chat' },
  { timestamp: '00:00:33', speaker: 'Speaker 4 (Jet)', dialogue: 'Good Evening Chat' },
  { timestamp: '00:00:37', speaker: 'Speaker 5 (Rohimi)', dialogue: 'Thank you Chat' },
  { timestamp: '00:00:45', speaker: 'Speaker 6 (Alia)', dialogue: 'Bye Chat' },
  { timestamp: '00:00:05', speaker: 'Speaker 1 (Kang)', dialogue: 'Hi Chat' },
  { timestamp: '00:00:12', speaker: 'Speaker 2 (Sebastian)', dialogue: 'Good Morning Chat' },
  { timestamp: '00:00:25', speaker: 'Speaker 3 (Asfar)', dialogue: 'Good Afternoon Chat' },
  { timestamp: '00:00:33', speaker: 'Speaker 4 (Jet)', dialogue: 'Good Evening Chat' },
  { timestamp: '00:00:37', speaker: 'Speaker 5 (Rohimi)', dialogue: 'Thank you Chat' },
  { timestamp: '00:00:45', speaker: 'Speaker 6 (Alia)', dialogue: 'Bye Chat' }
]);

// Function from original MinuteDisplay.vue
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

// Renamed from handleMinutesAction for broader context
const handleMeetingAction = (action) => {
  console.log('Meeting action triggered:', action);
  // Example: if (action === 'edit-transcript') { /* ... */ }
  // Example: if (action === 'go-to-minutes') { router.push('/meeting-summary/' + meetingId); }
};

</script>

<style scoped>
/* Styles from original Transcript.vue (scoped) */
.content-block {
  background-color: #FFFFFF; /* Each section row background color */
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* Styles from original MinuteDisplay.vue (scoped), adapted */
.meeting-display-card { /* Renamed from .meeting-minutes-card */
  background-color: #FFFFFF; /* Whole display section background */
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

.meeting-details-content { /* Renamed from .meeting-details for clarity */
  background-color: #EBEBEB; /* "Board" background color */
  flex-grow: 1;
  overflow-y: auto;
  line-height: 1.6;
  padding: 16px; 
  margin: 0 16px 16px 16px; 
  border-radius: 6px; 
}

/* Custom Scrollbar Styling (from MinuteDisplay) */
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