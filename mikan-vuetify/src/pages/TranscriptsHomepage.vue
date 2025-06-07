 <template>
  <Sidebar />
  <Topbar title="Meeting Transcript" />
  <TranscriptDisplay />

  
  <ActionButtonsBar> 
              <template #top-button>
                <KanbanButton />
              </template>
              <template #middle-button-1>
                <EditButton @action="handleHomepageAction" />  
              </template>
              <template #middle-button-2>
                <MinutesButton />
              </template> 
              <template #middle-button-4>
                <DownloadButton />
              </template>
              <template #bottom-button>
                <TasklistButton />
              </template>
            </ActionButtonsBar> 

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