<template>
  <Sidebar></Sidebar>

  <v-main style="height: 100vh" class="pa-3 bg-white pl-0">
    <v-card class="fill-height rounded-lg card-1" flat>
      <AudioConverter></AudioConverter>
    </v-card>
  </v-main>
</template>

<style scoped>
.fill-height {
  height: 100%;
  /* Make sure it fills the full screen */
}

.card-1 {
  box-shadow: none;
}
</style>
