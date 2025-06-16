<script setup> 
// Lightbulb.vue - <script setup>
import { ref } from 'vue'; // `computed` might not be needed if no complex data transformation here

const props = defineProps({
  userName: {
    type: String,
    default: 'USER1'
  },
  showMikanInfoDetailText: { // For the "(Only if user is new or needs info)" part
    type: Boolean,
    default: true
  },
  showRecentActivity: {
    type: Boolean,
    default: true
  },
  showActionItems: {
    type: Boolean,
    default: true
  } 

});

const isPopupVisible = ref(false);

const togglePopup = () => {
  isPopupVisible.value = !isPopupVisible.value;
  console.log('Card Overlay Toggled. New state:', isPopupVisible.value);
};

const closePopup = () => {
  isPopupVisible.value = false;
  console.log('Card Overlay Closed. New state:', isPopupVisible.value);
}; 

// Computed properties for sorting (data passed as props should ideally be pre-sorted or sorted here)
const sortedRecentActivity = computed(() => {
  // Assuming items have a 'date' property (e.g., ISO string or Date object)
  // Sort by recent date first (descending)
  return [...props.recentActivityItems].sort((a, b) => new Date(b.date) - new Date(a.date));
});

const sortedUpcomingActionItems = computed(() => {
  // Assuming items have a 'dueDateActual' property (Date object) for correct sorting
  // and 'dueDateDisplay' for showing "Tomorrow", "May 19" etc.
  // Sort by closest due date first (ascending)
  return [...props.upcomingActionItems].sort((a, b) => new Date(a.dueDateActual) - new Date(b.dueDateActual));
});

// Helper to format date for display
const formatDateForDialog = (dateString) => {
  if (!dateString) return '';
  // Example: May 15, 2025
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};
</script>

<template>
  <div> 
    <button @click="togglePopup" class="bulb-button-on-card" aria-label="Show information overlay">
    <v-icon size="50" color="white"> mdi mdi-lightbulb-alert-outline</v-icon>
    </button>

    <transition name="card-overlay-fade">
      <div @click="closePopup" v-if="isPopupVisible" class="card-overlay-dialog" role="dialog" aria-labelledby="overlayTitle">
        <button @click="closePopup" class="close-dialog-button" aria-label="Close information overlay">
          &times;
        </button>

        <div class="dialog-content-area">
          <section class="dialog-section welcome-section">
            <h2 id="overlayTitle">Welcome, {{ props.userName }}!</h2>
          </section>
 
          <section v-if="props.showRecentActivity" class="dialog-section recent-activity">
            <h3>
              Your recent activity
              <span class="mikan-info-detail-text"> </span>
            </h3>
            <p>
              - Meeting 3 (May 15, 2025) [View Minutes] [View Tasks]
              - Project GAIA (May 14, 2025) [View Minutes]

            </p>
          </section>

          <section v-if="props.showActionItems" class="dialog-section upcoming-action-items">
            <h3>
              Upcoming Action Items?
              <span  class="mikan-info-detail-text"> </span>
            </h3>
            <p>
              -  Follow up with target companies (Due: Tomorrow)
              - Draft proposal for Concept B (Due: May 19)
              [View Full Kanban Board ->]

            </p>
          </section>

          
          <section v-if="props.showMikanInfoDetailText" class="dialog-section what-is-mikan">
            <h3>
              What is Mikan?
              <span  class="mikan-info-detail-text"> </span>
            </h3>
            <p>
              Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.
            </p>
          </section>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.bulb-button-on-card {
  background-color: #FA3915; 
  border: none;
  border-radius: 50%;
  height: 100px;
  width: 100px; 
  cursor: pointer;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  bottom: 10vh;
  right: 2vw;
  transition: background-color 0.2s ease;
  /* Ensure bulb is above the dialog */
  z-index: 30; /* MODIFIED: Increased z-index */
} 
.card-overlay-dialog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(250, 250, 250, 0.98);
  /* Dialog is below the bulb button but above other card content */
  z-index: 20; /* Kept as is, or can be lower if card content has z-index */
  display: flex; /* Added for centering content */
  flex-direction: column; /* Added for centering content */
  align-items: center; /* Added for centering content */
  justify-content: center; /* Added for centering content */
  padding: 20px; /* Added padding for content within dialog */
  box-sizing: border-box; /* Ensures padding doesn't add to width/height */
}

.close-dialog-button {
  position: fixed;
  top: 10vh;
  right: 2vw;
  z-index: 25;
  cursor: pointer;
 
  border: none;
  border-radius: 50%;
  height: 50px;
  width: 50px;   
  background-color: #FF8C00; /* Red background, similar to image examples */
  color: white;             /* White 'X' */
  border: none;
  border-radius: 50%;       /* Makes it a circle */

  display: flex;            /* For centering the 'X' */
  align-items: center;
  justify-content: center;

  font-size: 20px;          /* Size of the 'X' character */
  line-height: 1;           /* Helps with precise centering of text */
  padding: 0;               /* Remove previous padding if using fixed width/height */
  box-shadow: 0 1px 3px rgba(0,0,0,0.2); /* Optional shadow */
  transition: background-color 0.2s ease, transform 0.2s ease;
}

/* Added styles for dialog content area for better presentation */
.dialog-content-area {
  max-width: 100%;
  background-color: #EBEBEB;
  color: black;
  overflow-y: auto;
  max-height: calc(100% - 20px); /* Respect padding */
  text-align: left;
}

/* Optional: Vue Transition styles (if you haven't defined them elsewhere) */
.card-overlay-fade-enter-active,
.card-overlay-fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.card-overlay-fade-enter-from,
.card-overlay-fade-leave-to {
  opacity: 0;
}
</style>