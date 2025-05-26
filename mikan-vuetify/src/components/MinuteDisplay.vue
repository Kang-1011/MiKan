<template>
  <v-card class="meeting-minutes-card" flat tile light>
    <v-row no-gutters class="pa-4 pb-0 text-center flex-shrink-0">
      <v-col>
        <h1 class="text-h4 font-weight-bold text-black mb-0">{{ meeting.title }}</h1>
      </v-col>
    </v-row>

    <v-row class="pa-4 pt-2 pb-3 justify-center align-center flex-shrink-0" dense>
      <v-col cols="12" sm="6" md="3" class="py-2 px-2">
        <v-card outlined class="metadata-card text-center pa-3 fill-height d-flex flex-column justify-center">
          <div class="text-caption text-black">Created by:</div>
          <div class="text-h6 font-weight-medium text-black mt-1">{{ meeting.createdBy }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="py-2 px-2">
        <v-card outlined class="metadata-card text-center pa-3 fill-height d-flex flex-column justify-center">
          <div class="text-caption text-black">Date:</div>
          <div class="text-h6 font-weight-medium text-black mt-1">{{ formatDate(meeting.date) }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3" class="py-2 px-2">
        <v-card outlined class="metadata-card text-center pa-3 fill-height d-flex flex-column justify-center">
          <div class="text-caption text-black">Action Items:</div>
          <div class="text-h6 font-weight-medium text-black mt-1">{{ meeting.actionItemsCount }}</div>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="mx-4 flex-shrink-0"></v-divider>

    <v-card-text class="meeting-details pa-4">
      <slot>
        <p class="text-center text-grey-darken-1">No content provided.</p>
      </slot>
    </v-card-text>
  </v-card>
</template>

<script setup>
// defineProps is a compiler macro and does not need to be imported.
const props = defineProps({
  meeting: {
    type: Object,
    required: true,
    default: () => ({ // Default for object/array props must be a factory function
      title: 'Meeting Title',
      createdBy: 'N/A',
      date: new Date().toISOString(),
      actionItemsCount: 0,
      // Removed attendees, agenda, nextSteps from default as they will be passed via slot
    }),
  },
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
</script>

<style scoped>
.meeting-minutes-card {
  background-color: #FFFFFF; /* Whole minutes section background */
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

/* .content-block class will now be applied to the elements *inside* the slot by the parent */
/*
.content-block {
  background-color: #FFFFFF; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
*/

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