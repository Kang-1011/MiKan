 
<template>
       
  <Sidebar />
  <Topbar title="Meeting Minutes" /> 
  <MinuteDisplay ref="pdfContent" />
 
  <ActionButtonsBar> 
              <template #top-button>
                <KanbanButton />
              </template>
              <template #middle-button-1>
                <EditButton />  
              </template>
              <template #middle-button-2>
                <TranscriptButton />
              </template> 
              <template #middle-button-4>
                <DownloadButton @action="exportToPDF" />
              </template>
              <template #bottom-button>
                <TasklistButton />
              </template>
            </ActionButtonsBar> 

</template>

<script setup>

import { ref } from 'vue';

const pdfContent = ref(null);

const exportToPDF = () => {
  console.log("Export to PDF triggered!");

  // --- START OF CHANGES ---

  // 1. Get the title from the exposed data of the child component
  const title = pdfContent.value?.meetingHeaderData?.title || 'Meeting-Minutes';

  // 2. Create a safe filename (replaces spaces and removes invalid characters)
  const safeFilename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
  
  console.log(`Using filename: ${safeFilename}`);

  // --- END OF CHANGES ---

  const elementToCapture = pdfContent.value?.$el;

  if (!elementToCapture) {
    console.error("Could not find the element to capture.");
    alert("Error: PDF content not found.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const html2canvas = window.html2canvas;

  if (!html2canvas || !jsPDF) {
    console.error("PDF generation libraries not loaded!");
    alert("Sorry, the PDF export feature is currently unavailable.");
    return;
  }
  
  html2canvas(elementToCapture, { scale: 2, useCORS: true })
    .then(canvas => {
      console.log("html2canvas was SUCCESSFUL.");
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

      // 3. Use the new safe filename here
      pdf.save(safeFilename);

      console.log("PDF generation complete.");
    })
    .catch(error => {
      console.error("Oops, something went wrong with html2canvas!", error);
      alert("Could not generate PDF. Please check the console for errors.");
    });
};
</script>

<style scoped> 
.content-block {
  background-color: #ffffff; /* Each section row background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>
