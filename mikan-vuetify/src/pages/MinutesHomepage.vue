<template>
  <Sidebar />
  <Topbar title="Meeting Transcript" />
  <MinuteDisplay ref="pdfContent"/> 
 
</template>
 
<style scoped>
.content-block {
  background-color: #ffffff; /* Each section row background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>
