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
    default: false
  },
  showActionItems: {
    type: Boolean,
    default: false
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>lightbulb-alert-outline</title><path d="M10 2C13.9 2 17 5.1 17 9C17 11.4 15.8 13.5 14 14.7V17C14 17.6 13.6 18 13 18H7C6.4 18 6 17.6 6 17V14.7C4.2 13.5 3 11.4 3 9C3 5.1 6.1 2 10 2M7 21V20H13V21C13 21.6 12.6 22 12 22H8C7.4 22 7 21.6 7 21M10 4C7.2 4 5 6.2 5 9C5 11.1 6.2 12.8 8 13.6V16H12V13.6C13.8 12.8 15 11.1 15 9C15 6.2 12.8 4 10 4M19 12V7H21V13H19M19 17V15H21V17H19Z" /></svg>
      
    </button>

    <transition name="card-overlay-fade">
      <div v-if="isPopupVisible" class="card-overlay-dialog" role="dialog" aria-labelledby="overlayTitle">
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
              Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.
            </p>
          </section>

          <section v-if="props.showActionItems" class="dialog-section upcoming-action-items">
            <h3>
              Upcoming Action Items?
              <span  class="mikan-info-detail-text"> </span>
            </h3>
            <p>
              Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
              integrating seamlessly with your Kanban workflow.
            </p>
          </section>

          
          <section v-if="props.showMikanInfoDetailText" class="dialog-section what-is-mikan">
            <h3>
              What is Mikan?
              <span  class="mikan-info-detail-text"> </span>
            </h3>
            <p>
              Mikan effortlessly transforms your meeting audio into structured minutes and actionable tasks,
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
  background-color: #FF8C00; 
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px; 
  fill: white;
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  bottom: 10px;
  right: 10px;
  transition: background-color 0.2s ease;
  /* Ensure bulb is above the dialog */
  z-index: 30; /* MODIFIED: Increased z-index */
}
.bulb-button-on-card svg {
  fill: white;
  width: 24px;  /* YOU CAN CHANGE THIS VALUE */
  height: 24px; /* AND THIS VALUE */
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
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 25;
  cursor: pointer;

  width: 30px;  /* Define width for the circle */
  height: 30px; /* Define height for the circle */
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
  background-color: #FF8C00;
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