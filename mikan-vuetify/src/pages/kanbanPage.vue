<template>
  <v-app>
    <Sidebar class="position-fixed" />
    <Topbar title="Kanban" />
    <v-main>
      <kanbanBoard></kanbanBoard>
    </v-main>
  </v-app>
</template>

<script setup>
// const tasks = ref(Array(9).fill({}));
// const tasks = ref(
//   Array(9)
//     .fill()
//     .map((_, index) => ({
//       id: index + 1,
//       title: `Task ${index + 1}`,
//       dueDate: "2025-05-30",
//       assignee: "Team Member",
//       description: "Task description...",
//     }))
// );
// const clearTasks = () => {
//   tasks.value = [];
// };
// const deleteTask = (index) => {
//   tasks.value.splice(index, 1);
// };
</script>
