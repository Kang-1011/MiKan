<template>
  <v-app-bar app color="red lighten-1" dark>
    <v-toolbar-title>Manager Review </v-toolbar-title>
    <v-spacer />
    <v-btn text>Filter <v-icon right>mdi-menu-down</v-icon></v-btn>
    <v-btn text>Group by<v-icon right>mdi-menu-down</v-icon></v-btn>
    <v-btn color="orange" class="ml-4" @click="create = true">Create</v-btn>
    <v-dialog v-model="create">
      <CreateNewTaskDialog></CreateNewTaskDialog>
    </v-dialog>

    <v-btn
      icon
      @click="toggleDark"
      class="ml-4"
      :class="['dark-toggle', { active: darkMode }]"
      ><v-icon>{{
        darkMode ? "mdi-weather-night" : "mdi-weather-sunny"
      }}</v-icon></v-btn
    >
    <v-btn icon><v-icon>mdi-account-circle</v-icon></v-btn>
    <v-text-field
      flat
      hide-details
      placeholder="Search..."
      append-inner-icon="mdi-magnify"
      class="mx-4 search-white"
      style="max-width: 200px"
    />
  </v-app-bar>
</template>
<script setup>
//   export default { name: 'MyAppBar' }
import { ref } from "vue";
import { useTheme } from "vuetify";
import CreateNewTaskDialog from "./CreateNewTaskDialog.vue";
const search = ref("");
const darkMode = ref(false);
const theme = useTheme();
const isDark = ref(theme.global.name.value === "dark");
theme.global.name.value = darkMode.value ? "dark" : "light";
const create = ref(false);

function toggleDark() {
  darkMode.value = !darkMode.value;
  // if you have Vuetify theme control:
  // flip Vuetify’s global theme name
  theme.global.name.value = isDark.value ? "light" : "dark";
  // sync our local ref
  isDark.value = !isDark.value;
}
</script>

<style scoped>
/* Dark-mode toggle button styling */
.dark-toggle {
  background-color: #ffffff; /* dark grey bg */
  color: #000000; /* white icon */
  border-radius: 50%;
  transition: background-color 0.2s;
}
.dark-toggle.active {
  background-color: #ffffff; /* even darker when active */
}

/* Force the search bar’s background to white */
.search-white ::v-deep .v-input__control {
  background-color: #a5a5a5 !important;
  /* border-radius: 10%; */
}
.search-white ::v-deep .v-text-field__slot {
  background-color: #a5a5a5 !important;
}
</style>
