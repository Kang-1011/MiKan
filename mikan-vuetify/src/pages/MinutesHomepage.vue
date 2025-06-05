<template>
  <Sidebar />
  <Topbar title="Meeting Minutes" />
  <MinuteDisplay />
</template>

<script setup>
import { ref } from "vue";

const meetingHeaderData = ref({
  title: "Meeting 3 - Minutes",
  createdBy: "User 1",
  date: "2025-05-15T10:00:00.000Z",
  actionItemsCount: 5,
});

const meetingBodyData = ref({
  attendees: [
    { name: "Alpha", email: "email@example.com" },
    { name: "Bravo", email: "email@example.com" },
    { name: "Alpha", email: "email@example.com" },
    { name: "Bravo", email: "email@example.com" },
    { name: "Alpha", email: "email@example.com" },
    { name: "Bravo", email: "email@example.com" },
    { name: "Alpha", email: "email@example.com" },
    { name: "Bravo", email: "email@example.com" },
    { name: "Alpha", email: "email@example.com" },
    { name: "Bravo", email: "email@example.com" },
    { name: "Alpha", email: "email@example.com" },
    { name: "Bravo", email: "email@example.com" },
    { name: "Alpha", email: "email@example.com" },
    { name: "Bravo", email: "email@example.com" },
    { name: "Alpha", email: "email@example.com" },
    { name: "Bravo", email: "email@example.com" },
  ],
  agenda: [
    {
      topic: "New Marketing Campaign Proposal",
      discussionPoints: [
        "Presented three campaign concepts.",
        "Budget considerations for each concept.",
      ],
      decisionsMade: ["Proceed with Concept B, with modifications."],
    },
    {
      topic: "New Marketing Campaign Proposal",
      discussionPoints: [
        "Presented three campaign concepts.",
        "Budget considerations for each concept.",
      ],
      decisionsMade: ["Proceed with Concept B, with modifications."],
    },
    {
      topic: "New Marketing Campaign Proposal",
      discussionPoints: [
        "Presented three campaign concepts.",
        "Budget considerations for each concept.",
      ],
      decisionsMade: ["Proceed with Concept B, with modifications."],
    },
    {
      topic: "New Marketing Campaign Proposal",
      discussionPoints: [
        "Presented three campaign concepts.",
        "Budget considerations for each concept.",
      ],
      decisionsMade: ["Proceed with Concept B, with modifications."],
    },
    {
      topic: "New Marketing Campaign Proposal",
      discussionPoints: [
        "Presented three campaign concepts.",
        "Budget considerations for each concept.",
      ],
      decisionsMade: ["Proceed with Concept B, with modifications."],
    },
  ],
  nextSteps: [
    {
      task: "Brian to follow up to this group with a list of target companies by end of week.",
      responsible: "Brian",
      dueDate: "2025-05-22T10:00:00.000Z",
    },
    {
      task: "Follow up on item X.",
      responsible: "Alice",
      dueDate: "2025-05-29T10:00:00.000Z",
    },
    // ... more action items
    {
      task: "Brian to follow up to this group with a list of target companies by end of week.",
      responsible: "Brian",
      dueDate: "2025-05-22T10:00:00.000Z",
    },
    {
      task: "Follow up on item X.",
      responsible: "Alice",
      dueDate: "2025-05-29T10:00:00.000Z",
    },
    // ... more action items
    {
      task: "Brian to follow up to this group with a list of target companies by end of week.",
      responsible: "Brian",
      dueDate: "2025-05-22T10:00:00.000Z",
    },
    {
      task: "Follow up on item X.",
      responsible: "Alice",
      dueDate: "2025-05-29T10:00:00.000Z",
    },
    // ... more action items
    {
      task: "Brian to follow up to this group with a list of target companies by end of week.",
      responsible: "Brian",
      dueDate: "2025-05-22T10:00:00.000Z",
    },
    {
      task: "Follow up on item X.",
      responsible: "Alice",
      dueDate: "2025-05-29T10:00:00.000Z",
    },
    // ... more action items
    {
      task: "Brian to follow up to this group with a list of target companies by end of week.",
      responsible: "Brian",
      dueDate: "2025-05-22T10:00:00.000Z",
    },
    {
      task: "Follow up on item X.",
      responsible: "Alice",
      dueDate: "2025-05-29T10:00:00.000Z",
    },
    // ... more action items
  ],
});

// If formatDate is needed in the parent for slot content, define it here too
const formatDateInParent = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "long", day: "numeric" };
  try {
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (e) {
    return dateString;
  }
};
</script>

<style scoped>
/* Add this style to your minutes.vue if not already global */
.content-block {
  background-color: #ffffff; /* Each section row background color */
  /* Using Vuetify classes for padding (pa-4) and border-radius (rounded) in template */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>
