<template>
  <v-app style="height: 100vh; overflow: hidden;"> 
    <Sidebar />
    <Navbar />
    <v-main style="height: 100%; overflow: hidden;">
      <v-container fluid class="fill-height pa-0 ma-0">
        <v-row justify="center" align="stretch" class="fill-height ma-0">
          <v-col cols="12" md="10" offset-md="1" class="pa-0 d-flex flex-column" style="height: 100%;">
            <MinuteDisplay :meeting="transcriptHeaderData">
              <div class="content-block pa-4 rounded">
                <div v-for="(line, index) in transcriptLines" :key="index" class="mb-2">
                  <p class="text-body-2 text-black mb-0">
                    <span class="font-weight-bold">[{{ line.timestamp }}] {{ line.speaker }}:</span> {{ line.dialogue }}
                  </p>
                </div>
              </div>
            </MinuteDisplay>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup> 
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";

import MinuteDisplay from "../components/MinuteDisplay.vue"; // Your updated component
import { ref } from 'vue';

const transcriptHeaderData = ref({
  title: 'Meeting 3 - Transcript', // Or just meeting.title
  createdBy: 'User 1',
  date: '2025-05-15T10:00:00.000Z',
  actionItemsCount: 5, // Or perhaps this isn't relevant for a pure transcript view
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
</script>

<style scoped>
/* Add this style to your transcript.vue if not already global */
.content-block {
  background-color: #FFFFFF; /* Each section row background color */
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
</style>