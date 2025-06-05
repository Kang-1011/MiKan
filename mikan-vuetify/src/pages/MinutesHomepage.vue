 
<template>
  <v-app style="height: 100vh; overflow: hidden;">
    <Sidebar />  
    <MyAppBar2 />  

    <v-main  > 
      <v-container fluid class="fill-height pa-0 ma-0">
        <v-row no-gutters class="fill-height">
          <!-- Main Content Area -->
          <v-col cols="12" md="10" class="pa-0" style="height: 100%;">
            <MinuteDisplay />
          </v-col>

          <!-- Action Buttons Bar Area -->
          <v-col cols="12" md="2" class="pa-0 position-sticky" style="height: 100%; top: 0;"> 
            <ActionButtonsBar> 
              <template #top-button>
                <KanbanButton />
              </template>
              <template #middle-button-1>
                <EditButton @action="handleHomepageAction" />  
              </template>
              <template #middle-button-2>
                <TranscriptButton />
              </template> 
              <template #middle-button-4>
                <DownloadButton />
              </template>
              <template #bottom-button>
                <TasklistButton />
              </template>
            </ActionButtonsBar>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup> 

const handleHomepageAction = (action) => { 
  console.log('Action triggered in MinutesHomepage:', action); 
};
</script>

<style scoped> 
.content-block {
  background-color: #ffffff; /* Each section row background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>