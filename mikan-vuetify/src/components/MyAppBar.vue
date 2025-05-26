<template>
    <v-app-bar app color="red lighten-1" dark>
      <v-toolbar-title>My Tasks    </v-toolbar-title>
      <v-spacer />
      <v-btn text>Projects <v-icon right>mdi-menu-down</v-icon></v-btn>
      <v-btn text>Dashboards <v-icon right>mdi-menu-down</v-icon></v-btn>
      <v-btn text>Filter <v-icon right>mdi-menu-down</v-icon></v-btn>
      <v-btn text>Group <v-icon right>mdi-menu-down</v-icon></v-btn>
      <v-btn color="orange" class="ml-4">Create</v-btn>
      <v-btn icon class="ml-4"><v-icon>mdi-theme-light-dark</v-icon></v-btn>
      <v-btn icon><v-icon>mdi-account-circle</v-icon></v-btn>
      <v-text-field
        flat hide-details placeholder="Search..."
        append-inner-icon="mdi-magnify"
        class="mx-4" style="max-width:200px"
      />
    </v-app-bar>
  </template>
  <script>
  export default { name: 'MyAppBar' }
  </script>