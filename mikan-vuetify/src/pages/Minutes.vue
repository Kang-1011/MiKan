<template>
  <v-app style="height: 100vh; overflow-y: auto; overflow: hidden;">
    <Sidebar />
    <Navbar />
    <v-main style="height: 100%; overflow: hidden;">
      <v-container fluid class="fill-height pa-0 ma-0">
        <v-row justify="center" align="stretch" class="fill-height ma-0">
          <v-col cols="12" md="10"   class="pa-0 d-flex flex-column" style="height: 100%;">
            <MinuteDisplay :meeting="meetingHeaderData">
              <div>
                <div v-if="meetingBodyData.attendees && meetingBodyData.attendees.length" class="content-block pa-4 rounded mb-4">
                  <h3 class="text-subtitle-1 font-weight-medium text-black mb-2">Attendees:</h3>
                  <ul class="pl-5">
                    <li v-for="attendee in meetingBodyData.attendees" :key="attendee.email" class="text-black text-body-2">
                      {{ attendee.name }} ({{ attendee.email }})
                    </li>
                  </ul>
                </div>

                <div v-if="meetingBodyData.agenda && meetingBodyData.agenda.length" class="content-block pa-4 rounded mb-4">
                  <h3 class="text-subtitle-1 font-weight-medium text-black mb-2">Agenda & Discussion:</h3>
                  <div v-for="(item, index) in meetingBodyData.agenda" :key="index" class="mb-3">
                    <p class="font-weight-medium text-black mb-1 text-body-1">{{ index + 1 }}. {{ item.topic }}</p>
                    <div v-if="item.discussionPoints && item.discussionPoints.length" class="pl-4 mb-2">
                      <p class="text-body-2 font-weight-medium text-black mb-1">Key Discussion Points:</p>
                      <ul class="pl-5">
                        <li v-for="(point, pIndex) in item.discussionPoints" :key="pIndex" class="text-body-2 text-black">{{ point }}</li>
                      </ul>
                    </div>
                    <div v-if="item.decisionsMade && item.decisionsMade.length" class="pl-4">
                      <p class="text-body-2 font-weight-medium text-black mb-1">Decisions Made:</p>
                      <ul class="pl-5">
                        <li v-for="(decision, dIndex) in item.decisionsMade" :key="dIndex" class="text-body-2 text-black">{{ decision }}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div v-if="meetingBodyData.nextSteps && meetingBodyData.nextSteps.length" class="content-block pa-4 rounded">
                  <h3 class="text-subtitle-1 font-weight-medium text-black mb-2">Next Steps (Summary of all Action Items):</h3>
                  <div v-for="(step, index) in meetingBodyData.nextSteps" :key="index" class="mb-2">
                    <p class="text-body-2 text-black mb-1">{{ index + 1 }}. {{ step.task }}</p>
                    <p class="text-caption text-black mb-0">
                      (Responsible: {{ step.responsible }}, Due: {{ formatDateInParent(step.dueDate) }})
                    </p>
                  </div>
                </div>
              </div>
            </MinuteDisplay>
          </v-col>
          
      <v-col cols="12" md="2" class="pa-0" style="height: 100%;">
        <ActionButtonsBar>
          <template #top-button>
            <ViewKanbanButton @action="handleMinutesAction" />
          </template>
          <template #middle-button-1>
            <FindInPageButton @action="handleMinutesAction" />
          </template>
          <template #middle-button-2>
            <ShareButton @action="handleMinutesAction" />
          </template>
          <template #middle-button-3>
            <DownloadButton @action="handleMinutesAction" />
          </template>
          <template #middle-button-4>
            <PrintButton @action="handleMinutesAction" />
          </template>
          <template #bottom-button>
            <MoreActionsButton @action="handleMinutesAction" />
          </template>
        </ActionButtonsBar>
      </v-col>
        </v-row>
      </v-container>

    </v-main> 
  </v-app>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import MinuteDisplay from "../components/MinuteDisplay.vue";
import ActionButtonsBar from '../components/ActionButtonsBar.vue'; 
import ViewKanbanButton from '../components/Buttons/KanbanButton.vue'; 
import { ref } from 'vue';

const meetingHeaderData = ref({
  title: 'Meeting 3 - Minutes',
  createdBy: 'User 1',
  date: '2025-05-15T10:00:00.000Z',
  actionItemsCount: 5,
});

const meetingBodyData = ref({
  attendees: [
    { name: 'Alpha', email: 'email@example.com' },
    { name: 'Bravo', email: 'email@example.com' },
    { name: 'Alpha', email: 'email@example.com' },
    { name: 'Bravo', email: 'email@example.com' },
    { name: 'Alpha', email: 'email@example.com' },
    { name: 'Bravo', email: 'email@example.com' },
    { name: 'Alpha', email: 'email@example.com' },
    { name: 'Bravo', email: 'email@example.com' },
    { name: 'Alpha', email: 'email@example.com' },
    { name: 'Bravo', email: 'email@example.com' },
    { name: 'Alpha', email: 'email@example.com' },
    { name: 'Bravo', email: 'email@example.com' },
    { name: 'Alpha', email: 'email@example.com' },
    { name: 'Bravo', email: 'email@example.com' },
    { name: 'Alpha', email: 'email@example.com' },
    { name: 'Bravo', email: 'email@example.com' },
  ],
    agenda: [
    {
      topic: 'New Marketing Campaign Proposal',
      discussionPoints: [
        'Presented three campaign concepts.',
        'Budget considerations for each concept.',
      ],
      decisionsMade: ['Proceed with Concept B, with modifications.'],
    },
    {
      topic: 'New Marketing Campaign Proposal',
      discussionPoints: [
        'Presented three campaign concepts.',
        'Budget considerations for each concept.',
      ],
      decisionsMade: ['Proceed with Concept B, with modifications.'],
    },
    {
      topic: 'New Marketing Campaign Proposal',
      discussionPoints: [
        'Presented three campaign concepts.',
        'Budget considerations for each concept.',
      ],
      decisionsMade: ['Proceed with Concept B, with modifications.'],
    },
    {
      topic: 'New Marketing Campaign Proposal',
      discussionPoints: [
        'Presented three campaign concepts.',
        'Budget considerations for each concept.',
      ],
      decisionsMade: ['Proceed with Concept B, with modifications.'],
    },
    {
      topic: 'New Marketing Campaign Proposal',
      discussionPoints: [
        'Presented three campaign concepts.',
        'Budget considerations for each concept.',
      ],
      decisionsMade: ['Proceed with Concept B, with modifications.'],
    },  
  
  ],
  nextSteps: [
    { task: 'Brian to follow up to this group with a list of target companies by end of week.', responsible: 'Brian', dueDate: '2025-05-22T10:00:00.000Z' },
    { task: 'Follow up on item X.', responsible: 'Alice', dueDate: '2025-05-29T10:00:00.000Z' },
    // ... more action items
    { task: 'Brian to follow up to this group with a list of target companies by end of week.', responsible: 'Brian', dueDate: '2025-05-22T10:00:00.000Z' },
    { task: 'Follow up on item X.', responsible: 'Alice', dueDate: '2025-05-29T10:00:00.000Z' },
    // ... more action items
    { task: 'Brian to follow up to this group with a list of target companies by end of week.', responsible: 'Brian', dueDate: '2025-05-22T10:00:00.000Z' },
    { task: 'Follow up on item X.', responsible: 'Alice', dueDate: '2025-05-29T10:00:00.000Z' },
    // ... more action items
    { task: 'Brian to follow up to this group with a list of target companies by end of week.', responsible: 'Brian', dueDate: '2025-05-22T10:00:00.000Z' },
    { task: 'Follow up on item X.', responsible: 'Alice', dueDate: '2025-05-29T10:00:00.000Z' },
    // ... more action items
    { task: 'Brian to follow up to this group with a list of target companies by end of week.', responsible: 'Brian', dueDate: '2025-05-22T10:00:00.000Z' },
    { task: 'Follow up on item X.', responsible: 'Alice', dueDate: '2025-05-29T10:00:00.000Z' },
    // ... more action items
  ],
});

// If formatDate is needed in the parent for slot content, define it here too
const formatDateInParent = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  try {
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (e) { return dateString; }
};
</script>

<style scoped>
/* Add this style to your minutes.vue if not already global */
.content-block {
  background-color: #FFFFFF; /* Each section row background color */
  /* Using Vuetify classes for padding (pa-4) and border-radius (rounded) in template */
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
</style>