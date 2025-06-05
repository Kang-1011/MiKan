<template>
  <v-app style="height: 100vh; overflow: hidden;">
    <v-main style="height: 100vh; overflow: hidden;">
      <v-container fluid class="fill-height pa-0 ma-0">
        <v-row justify="center" align="stretch" class="fill-height ma-0">
          <v-col cols="12" md="12" class="pa-0 d-flex flex-column" style="height: 100%;">
             <v-card class="meeting-minutes-card" flat tile light>
              <v-row no-gutters class="pa-4 pb-0 text-center flex-shrink-0">
                <v-col>
                  <h1 class="text-h4 font-weight-bold text-black mb-0">{{ meetingHeaderData.title }}</h1>
                </v-col>
              </v-row>

              <v-row class="pa-4 pt-2 pb-3 justify-center align-center flex-shrink-0" dense>
                <v-col cols="12" sm="6" md="3" class="py-2 px-2">
                  <v-card outlined class="metadata-card text-center pa-3 fill-height d-flex flex-column justify-center">
                    <div class="text-caption text-black">Created by:</div>
                    <div class="text-h6 font-weight-medium text-black mt-1">{{ meetingHeaderData.createdBy }}</div>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="3" class="py-2 px-2">
                  <v-card outlined class="metadata-card text-center pa-3 fill-height d-flex flex-column justify-center">
                    <div class="text-caption text-black">Date:</div>
                    <div class="text-h6 font-weight-medium text-black mt-1">{{ formatDate(meetingHeaderData.date) }}</div>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="3" class="py-2 px-2">
                  <v-card outlined class="metadata-card text-center pa-3 fill-height d-flex flex-column justify-center">
                    <div class="text-caption text-black">Action Items:</div>
                    <div class="text-h6 font-weight-medium text-black mt-1">{{ meetingHeaderData.actionItemsCount }}</div>
                  </v-card>
                </v-col>
              </v-row>
              <v-divider class="mx-4 flex-shrink-0"></v-divider>

              <v-card-text class="meeting-details pa-4">
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
                      (Responsible: {{ step.responsible }}, Due: {{ formatDate(step.dueDate) }})
                    </p>
                  </div>
                </div>
                </v-card-text>
            </v-card>
            </v-col> 
        </v-row>
      </v-container>
    </v-main> 
  </v-app>
</template>

<script setup> 
import { ref } from 'vue'; 
const meetingHeaderData = ref({
  title: 'Meeting 3 - Minutes',
  createdBy: 'User 1',
  date: '2025-05-15T10:00:00.000Z',
  actionItemsCount: 5, // This could also be dynamically calculated from nextSteps.length if preferred
});

const meetingBodyData = ref({
  attendees: [
    { name: 'Alpha', email: 'email@example.com' },
    { name: 'Bravo', email: 'email@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' },
    { name: 'Delta', email: 'delta@example.com' },
    { name: 'Echo', email: 'echo@example.com' },
    { name: 'Foxtrot', email: 'foxtrot@example.com' },
    { name: 'Golf', email: 'golf@example.com' },
    { name: 'Hotel', email: 'hotel@example.com' },
    { name: 'India', email: 'india@example.com' },
    { name: 'Juliett', email: 'juliett@example.com' },
    { name: 'Kilo', email: 'kilo@example.com' },
    { name: 'Lima', email: 'lima@example.com' },
    { name: 'Mike', email: 'mike@example.com' },
    { name: 'November', email: 'november@example.com' },
    { name: 'Oscar', email: 'oscar@example.com' },
    { name: 'Papa', email: 'papa@example.com' },
  ],
  agenda: [
    {
      topic: 'New Marketing Campaign Proposal',
      discussionPoints: [
        'Presented three campaign concepts (Alpha, Bravo, Charlie).',
        'Budget considerations for each concept were reviewed.',
        'Timeline expectations and resource allocation discussed.',
      ],
      decisionsMade: ['Proceed with Concept Bravo, with modifications to target demographic based on feedback.'],
    },
    {
      topic: 'Q2 Sales Performance Review',
      discussionPoints: [
        'Sales figures for Q2 presented and analyzed.',
        'Regional performance variations highlighted.',
        'Discussion on factors impacting sales (market trends, competitor actions).',
      ],
      decisionsMade: ['Implement a targeted training program for underperforming regions.', 'Adjust Q3 sales targets for specific product lines.'],
    },
    {
      topic: 'Product Development Update - Project Phoenix',
      discussionPoints: [
        'Current development phase and milestones achieved.',
        'Challenges encountered and mitigation strategies.',
        'Feedback from early beta testers summarized.',
      ],
      decisionsMade: ['Allocate additional QA resources to address beta feedback.', 'Schedule a follow-up meeting to finalize feature set for next sprint.'],
    },
    {
      topic: 'Employee Wellness Initiative Brainstorm',
      discussionPoints: [
        'Ideas for improving employee wellness presented (e.g., workshops, fitness challenges).',
        'Potential costs and benefits of various initiatives.',
        'Survey results on employee preferences discussed.',
      ],
      decisionsMade: ['Form a small working group to develop a detailed proposal for two selected initiatives.'],
    },
    {
      topic: 'Review of Customer Feedback from Last Month',
      discussionPoints: [
        'Key themes from customer support tickets and surveys.',
        'Positive feedback areas and areas for improvement.',
        'Specific examples of customer pain points.',
      ],
      decisionsMade: ['Prioritize addressing the top 3 pain points in the next product update cycle.', 'Update FAQ documentation based on common queries.'],
    },  
  ],
  nextSteps: [
    { task: 'Brian to circulate the revised Concept Bravo marketing proposal to the team.', responsible: 'Brian M.', dueDate: '2025-05-22T10:00:00.000Z' },
    { task: 'Alice to draft the Q3 sales target adjustments and present to management.', responsible: 'Alice W.', dueDate: '2025-05-29T10:00:00.000Z' },
    { task: 'David to coordinate with QA for additional resources for Project Phoenix.', responsible: 'David K.', dueDate: '2025-05-20T10:00:00.000Z' },
    { task: 'Sarah to lead the working group for the employee wellness initiative proposal.', responsible: 'Sarah P.', dueDate: '2025-06-05T10:00:00.000Z' },
    { task: 'Mike to compile a list of FAQ updates based on recent customer feedback.', responsible: 'Mike L.', dueDate: '2025-05-24T10:00:00.000Z' },
    { task: 'Team to review Project Phoenix beta feedback individually before next sprint planning.', responsible: 'All Dev Team', dueDate: '2025-05-21T10:00:00.000Z' },
    { task: 'Finance department to provide budget impact analysis for Concept Bravo.', responsible: 'Finance Team', dueDate: '2025-05-23T10:00:00.000Z' },
    { task: 'HR to schedule interviews for the wellness working group participants.', responsible: 'HR Department', dueDate: '2025-05-28T10:00:00.000Z' },
    { task: 'Customer Support to implement immediate workaround for critical issue X reported by users.', responsible: 'Support Lead', dueDate: '2025-05-17T10:00:00.000Z' },
    { task: 'Marketing team to research competitor strategies for similar campaigns.', responsible: 'Marketing Team', dueDate: '2025-06-01T10:00:00.000Z' },
  ],
});

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

const handleMinutesAction = (action) => {
  // Placeholder for handling actions from the ActionButtonsBar
  console.log('Action triggered:', action);
  // Example: if (action === 'edit') { router.push('/edit-minutes/' + meetingId); }
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
</style>