<template>
  <v-row
    class="justify-space-between align-center ma-2"
    style="border-bottom: 2px solid #e0e0e0; padding: 8px 16px"
  >
    <div>
      <h2>Minutes</h2>
    </div>
    <div>
      <v-tooltip text="Download Minutes" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-download-outline"
            variant="text"
            v-bind="props"
            @click="exportToPDF"
          ></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip
        :text="isEditMode ? 'Finish Editing' : 'Edit Minutes'"
        location="bottom"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            :icon="isEditMode ? 'mdi-check-outline' : 'mdi-square-edit-outline'"
            variant="text"
            v-bind="props"
            @click="toggleEditMode"
          ></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="To Manager Review" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-send-outline"
            variant="text"
            v-bind="props"
            @click="toTask"
          ></v-btn>
        </template>
      </v-tooltip>
    </div>
  </v-row>

  <v-container fluid class="page-container" ref="pdfContent">
    <div class="minutes-section-card">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="title-cell d-flex justify-center align-center">
            <h1
              class="attachment-manager text-h4 font-weight-black text-center"
            >
              {{ minuteHeaderData.title }} - {{ minuteHeaderData.project }}
            </h1>
          </div>
        </v-col>
      </v-row>

      <v-row style="border-bottom: 2px solid #eaeaea" no-gutters class="pa-4">
        <v-col cols="12" md="3" class="pa-2">
          <div class="rounded-header-cell">
            <span
              class="font-weight-bold attachment-manager"
              style="font-size: 18px"
              >Location:</span
            >
            <div
              v-if="activeEditorKey !== 'location'"
              @click="isEditMode && setActiveEditor('location')"
              :class="{ 'editable-field': isEditMode }"
              class="pa-2"
              style="min-height: 40px"
            >
              {{ minuteHeaderData.location }}
            </div>
            <VConfirmEdit
              v-if="isEditMode && activeEditorKey === 'location'"
              :model-value="minuteHeaderData.location"
              @save="(newValue) => handleSaveHeaderField('location', newValue)"
              @cancel="handleCancelEdit"
            >
              <template #input="{ model }"
                ><v-text-field
                  v-model="model.value"
                  label="Edit Location"
                  variant="outlined"
                ></v-text-field
              ></template>
            </VConfirmEdit>
          </div>
        </v-col>
        <v-col cols="12" md="3" class="pa-2">
          <div class="rounded-header-cell">
            <span class="font-weight-bold" style="font-size: 18px"
              >Written by:</span
            >
            <div
              v-if="activeEditorKey !== 'created_by'"
              @click="isEditMode && setActiveEditor('created_by')"
              :class="{ 'editable-field': isEditMode }"
              class="pa-2"
              style="min-height: 40px"
            >
              {{ minuteHeaderData.created_by }}
            </div>
            <VConfirmEdit
              v-if="isEditMode && activeEditorKey === 'created_by'"
              :model-value="minuteHeaderData.created_by"
              @save="
                (newValue) => handleSaveHeaderField('created_by', newValue)
              "
              @cancel="handleCancelEdit"
            >
              <template #input="{ model }"
                ><v-text-field
                  v-model="model.value"
                  label="Edit Author"
                  variant="outlined"
                ></v-text-field
              ></template>
            </VConfirmEdit>
          </div>
        </v-col>
        <v-col cols="12" md="3" class="pa-2">
          <div class="rounded-header-cell">
            <span class="font-weight-bold" style="font-size: 18px">Date:</span>
            <div
              v-if="activeEditorKey !== 'date'"
              @click="isEditMode && setActiveEditor('date')"
              :class="{ 'editable-field': isEditMode }"
              class="pa-2"
              style="min-height: 40px"
            >
              {{ formatDate(minuteHeaderData.date) }}
            </div>
            <VConfirmEdit
              v-if="isEditMode && activeEditorKey === 'date'"
              :model-value="minuteHeaderData.date"
              @save="(newValue) => handleSaveHeaderField('date', newValue)"
              @cancel="handleCancelEdit"
            >
              <template #input="{ model }"
                ><v-text-field
                  v-model="model.value"
                  label="Edit Date"
                  variant="outlined"
                  hint="YYYY-MM-DD"
                ></v-text-field
              ></template>
            </VConfirmEdit>
          </div>
        </v-col>
        <v-col cols="12" md="3" class="pa-2">
          <div class="rounded-header-cell" style="border-right: none">
            <span class="font-weight-bold" style="font-size: 18px"
              >Project:</span
            >
            <div
              v-if="activeEditorKey !== 'project'"
              @click="isEditMode && setActiveEditor('project')"
              :class="{ 'editable-field': isEditMode }"
              class="pa-2"
              style="min-height: 40px"
            >
              {{ minuteHeaderData.project }}
            </div>
            <VConfirmEdit
              v-if="isEditMode && activeEditorKey === 'project'"
              :model-value="minuteHeaderData.project"
              @save="(newValue) => handleSaveHeaderField('project', newValue)"
              @cancel="handleCancelEdit"
            >
              <template #input="{ model }"
                ><v-text-field
                  v-model="model.value"
                  label="Edit Project"
                  variant="outlined"
                ></v-text-field
              ></template>
            </VConfirmEdit>
          </div>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" class="px-4">
          <div class="content-cell">
            <v-row no-gutters align="start">
              <v-col cols="12" md="2">
                <span class="font-weight-bold" style="font-size: 18px"
                  >Purpose:</span
                >
              </v-col>
              <v-col cols="12" md="10">
                <div
                  v-if="activeEditorKey !== 'purpose'"
                  @click="isEditMode && setActiveEditor('purpose')"
                  :class="{ 'editable-field': isEditMode }"
                  class="mb-0"
                  style="min-height: 40px"
                >
                  {{ minuteHeaderData.purpose }}
                </div>
                <VConfirmEdit
                  v-if="isEditMode && activeEditorKey === 'purpose'"
                  :model-value="minuteHeaderData.purpose"
                  @save="
                    (newValue) => handleSaveHeaderField('purpose', newValue)
                  "
                  @cancel="handleCancelEdit"
                >
                  <template #input="{ model }"
                    ><v-textarea
                      v-model="model.value"
                      label="Edit Purpose"
                      variant="outlined"
                      auto-grow
                      rows="3"
                    ></v-textarea
                  ></template>
                </VConfirmEdit>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" class="px-4 pb-4">
          <div class="content-cell" style="border-bottom: none">
            <v-row no-gutters align="start">
              <v-col cols="12" md="2">
                <span
                  class="font-weight-bold attachment-manager"
                  style="font-size: 18px"
                  >Attendees:</span
                >
              </v-col>
              <v-col cols="12" md="10">
                <div
                  v-if="activeEditorKey !== 'attendees'"
                  @click="isEditMode && setActiveEditor('attendees')"
                  :class="{ 'editable-field': isEditMode }"
                  class="mb-0 attendees-text"
                  style="min-height: 40px"
                >
                  {{ minuteHeaderData.attendees }}
                </div>
                <VConfirmEdit
                  v-if="isEditMode && activeEditorKey === 'attendees'"
                  :model-value="minuteHeaderData.attendees"
                  @save="
                    (newValue) => handleSaveHeaderField('attendees', newValue)
                  "
                  @cancel="handleCancelEdit"
                >
                  <template #input="{ model }"
                    ><v-textarea
                      v-model="model.value"
                      label="Edit Attendees"
                      variant="outlined"
                      auto-grow
                      rows="3"
                    ></v-textarea
                  ></template>
                </VConfirmEdit>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="my-6"></div>

    <div class="tasks-section-card">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="task-list-header d-flex align-center">
            <h3 class="font-weight-bold mx-auto" style="font-size: 24px">
              Task List
            </h3>

            <v-btn
              v-if="isEditMode"
              color="black mr-8"
              @click="handleAddTask"
              variant="text"
              icon="mdi-plus-circle-outline"
            ></v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters class="pa-1">
        <v-col cols="12">
          <v-table density="compact" class="tasks-table">
            <thead>
              <tr>
                <th
                  class="text-center font-weight-bold text-black"
                  style="width: 8%"
                >
                  No.
                </th>
                <th
                  class="text-center font-weight-bold text-black"
                  :style="{ width: isEditMode ? '48%' : '60%' }"
                >
                  Task Description
                </th>
                <th
                  class="text-center font-weight-bold text-black"
                  style="width: 18%"
                >
                  Action by
                </th>
                <th
                  class="text-center font-weight-bold text-black"
                  style="width: 14%"
                >
                  Due Date
                </th>
                <th
                  v-if="isEditMode"
                  class="text-center font-weight-bold text-black"
                  style="width: 12%"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(task, index) in body.tasks"
                :key="index"
                :class="index % 2 === 0 ? 'even-row' : 'odd-row'"
              >
                <td>
                  {{ task["Task No."] }}
                </td>
                <td>
                  <div
                    v-if="activeEditorKey !== `task-${index}-description`"
                    @click="
                      isEditMode && setActiveEditor(`task-${index}-description`)
                    "
                    :class="{ 'editable-field': isEditMode }"
                    style="min-height: 24px"
                  >
                    {{ task.Description }}
                  </div>
                  <VConfirmEdit
                    v-if="
                      isEditMode &&
                      activeEditorKey === `task-${index}-description`
                    "
                    :model-value="task.Description"
                    @save="
                      (newValue) =>
                        handleSaveTaskField(index, 'Description', newValue)
                    "
                    @cancel="handleCancelEdit"
                  >
                    <template #input="{ model }"
                      ><v-textarea
                        v-model="model.value"
                        label="Edit Description"
                        variant="outlined"
                        auto-grow
                        rows="1"
                      ></v-textarea
                    ></template>
                  </VConfirmEdit>
                </td>
                <td>
                  <div
                    v-if="activeEditorKey !== `task-${index}-actionBy`"
                    @click="
                      isEditMode && setActiveEditor(`task-${index}-actionBy`)
                    "
                    :class="{ 'editable-field': isEditMode }"
                    style="min-height: 24px"
                  >
                    {{ task["Action by"] }}
                  </div>
                  <VConfirmEdit
                    v-if="
                      isEditMode && activeEditorKey === `task-${index}-actionBy`
                    "
                    :model-value="task['Action by']"
                    @save="
                      (newValue) =>
                        handleSaveTaskField(index, 'Action by', newValue)
                    "
                    @cancel="handleCancelEdit"
                  >
                    <template #input="{ model }"
                      ><v-text-field
                        v-model="model.value"
                        label="Edit Action by"
                        variant="outlined"
                      ></v-text-field
                    ></template>
                  </VConfirmEdit>
                </td>
                <td>
                  <div
                    v-if="activeEditorKey !== `task-${index}-dueDate`"
                    @click="
                      isEditMode && setActiveEditor(`task-${index}-dueDate`)
                    "
                    :class="{ 'editable-field': isEditMode }"
                    style="min-height: 24px"
                  >
                    {{ task["Due date"] }}
                  </div>
                  <VConfirmEdit
                    v-if="
                      isEditMode && activeEditorKey === `task-${index}-dueDate`
                    "
                    :model-value="task['Due date']"
                    @save="
                      (newValue) =>
                        handleSaveTaskField(index, 'Due date', newValue)
                    "
                    @cancel="handleCancelEdit"
                  >
                    <template #input="{ model }"
                      ><v-text-field
                        v-model="model.value"
                        label="Edit Due Date"
                        variant="outlined"
                        hint="YYYY-MM-DD"
                      ></v-text-field
                    ></template>
                  </VConfirmEdit>
                </td>
                <td v-if="isEditMode" class="text-center">
                  <v-tooltip text="Delete Task" location="left">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon="mdi-delete-outline"
                        variant="text"
                        color="error"
                        v-bind="props"
                        @click="handleDeleteTask(index)"
                      >
                      </v-btn>
                    </template>
                  </v-tooltip>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useMinuteStore } from "@/stores/minutestore";
import { useRouter } from "vue-router";
import { useChatbotStore } from "@/stores/chatbotStore"; // Import the chatbot store
import VConfirmEdit from "../VConfirmEdit.vue";
import axios from "axios";

const minuteStore = useMinuteStore();
const pdfContent = ref(null);
const router = useRouter();
const chatbotStore = useChatbotStore();

const emit = defineEmits(["action"]);

const {
  header: minuteHeaderData,
  body,
  isEditMode,
  activeEditorKey,
} = storeToRefs(minuteStore);
const {
  updateHeaderField,
  updateTaskField,
  toggleEditMode,
  setActiveEditor,
  addTask,
  deleteTaskAndRenumber,
} = minuteStore;

const handleAddTask = () => {
  // This function will call the action in your Pinia store
  addTask();
};

const handleDeleteTask = (taskIndex) => {
  // This function will call the action in your Pinia store
  if (confirm("Are you sure you want to delete this task?")) {
    deleteTaskAndRenumber(taskIndex);
  }
};

const handleSaveHeaderField = (field, value) => {
  updateHeaderField({ field, value });
  setActiveEditor(null);
};

const handleSaveTaskField = (taskIndex, field, value) => {
  updateTaskField({ taskIndex, field, value });
  setActiveEditor(null);
};

const handleCancelEdit = () => {
  setActiveEditor(null);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  try {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return date.toLocaleDateString("en-US", options);
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateString;
  }
};

const toTask = async () => {
  console.log("Submitting minutes...");

  try {
    const payload = {
      header: minuteHeaderData.value,
      tasks: body.value.tasks,
    };

    const response = await axios.post(
      "http://localhost:8000/minutes/submit",
      payload
    );

    if (response.data.status === "ok") {
      console.log("Minutes submitted:", response.data);
      router.push("/ManagerReviewV2"); // Navigate after success
    } else {
      console.error("Submission failed:", response.data.message);
      alert("Submission failed: " + response.data.message);
    }
  } catch (err) {
    console.error("Error submitting minutes:", err);
    alert("An error occurred while submitting minutes.");
  }
};

const exportToPDF = () => {
  console.log("Exporting Minutes to styled, text-based PDF...");

  // Ensure jsPDF and the autoTable plugin are loaded
  const { jsPDF } = window.jspdf;
  if (!jsPDF || !jsPDF.API.autoTable) {
    console.error("jsPDF or jsPDF-AutoTable library not loaded!");
    alert("Sorry, the PDF export feature is currently unavailable.");
    return;
  }

  // 1. Initialize jsPDF
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  // 2. Define document properties and layout constants
  const pageHeight = pdf.internal.pageSize.getHeight();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let currentY = margin;

  // 3. Get data from the store
  const headerData = minuteHeaderData.value;
  const tasks = body.value.Tasks;
  const safeFilename = `${headerData.project || "Meeting"}-Minutes.pdf`;

  // --- START: Replicating the Webpage Layout ---

  // 4. Add Main Title
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.text(
    `Minutes - ${headerData.project || "General"}`,
    pageWidth / 2,
    currentY,
    { align: "center" }
  );
  currentY += 35;
  // Add this line to debug
  if (tasks && tasks.length > 0) {
    console.log("Inspecting first task object:", JSON.stringify(tasks[0]));
  }

  // 5. Draw the main container box for header info
  const headerBoxStartY = currentY;
  pdf.setDrawColor(224, 224, 224); // Light grey border
  pdf.setLineWidth(1);

  // 6. Create the four-column header section
  const colWidth = contentWidth / 4;
  const headerFields = [
    { label: "Location:", value: headerData.location },
    { label: "Written by:", value: headerData.createdBy },
    { label: "Date:", value: formatDate(headerData.date) },
    { label: "Project:", value: headerData.project },
  ];

  let maxBoxHeight = 0;

  headerFields.forEach((field, index) => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    const labelLines = pdf.splitTextToSize(field.label, colWidth - 10);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    const valueLines = pdf.splitTextToSize(field.value || "N/A", colWidth - 10);

    const boxHeight = (labelLines.length + valueLines.length) * 12 + 20;
    if (boxHeight > maxBoxHeight) {
      maxBoxHeight = boxHeight;
    }
  });

  headerFields.forEach((field, index) => {
    const xPos = margin + index * colWidth;
    let yPos = headerBoxStartY + 15;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text(field.label, xPos + 10, yPos);
    yPos += 15;

    pdf.setFont("helvetica", "normal");
    pdf.text(field.value || "N/A", xPos + 10, yPos, {
      maxWidth: colWidth - 20,
    });

    // Draw vertical separator lines
    if (index < 3) {
      pdf.line(
        xPos + colWidth,
        headerBoxStartY,
        xPos + colWidth,
        headerBoxStartY + maxBoxHeight
      );
    }
  });

  currentY = headerBoxStartY + maxBoxHeight;
  pdf.line(margin, currentY, pageWidth - margin, currentY); // Horizontal line below columns

  // 7. Add Purpose and Attendees sections
  const addSection = (label, value) => {
    let yPos = currentY + 15;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text(label, margin + 10, yPos);

    pdf.setFont("helvetica", "normal");
    const valueLines = pdf.splitTextToSize(value || "N/A", contentWidth - 120);
    pdf.text(valueLines, margin + 100, yPos);

    const sectionHeight = valueLines.length * 12 + 20;
    currentY += sectionHeight;
  };

  addSection("Purpose:", headerData.Purpose);
  addSection("Attendees:", headerData.Attendees);

  // Draw the outer box for the header section
  pdf.rect(margin, headerBoxStartY, contentWidth, currentY - headerBoxStartY);
  currentY += 40; // Space before the task list

  // 8. Add Task List using jsPDF-AutoTable
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("Task List", pageWidth / 2, currentY, { align: "center" });
  currentY += 25;

  const tableColumnStyles = {
    0: { cellWidth: 40, halign: "center" }, // No.
    1: { cellWidth: "auto" }, // Task Description
    2: { cellWidth: 80, halign: "center" }, // Action by
    3: { cellWidth: 70, halign: "center" }, // Due Date
  };

  const tableBody = tasks.map((task) => [
    task["Task No."],
    task.Description,
    task["Action by"],
    task["Due date"],
  ]);

  pdf.autoTable({
    startY: currentY,
    head: [["No.", "Task Description", "Action by", "Due Date"]],
    body: tableBody,
    theme: "grid",
    headStyles: {
      fillColor: [232, 232, 232],
      textColor: [40, 40, 40],
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: tableColumnStyles,
    didDrawCell: (data) => {
      // Custom styling for main task rows
      const taskNo = String(data.cell.raw);
      if (data.section === "body" && !taskNo.includes(".")) {
        pdf.setFillColor(240, 240, 240); // Light grey for main task rows
        pdf.rect(
          data.cell.x,
          data.cell.y,
          data.cell.width,
          data.cell.height,
          "F"
        );
      }
    },
  });

  // 9. Save the PDF
  pdf.save(safeFilename);
  console.log("Styled, text-based PDF generation complete.");
};

const isMainTask = (taskNumber) => {
  return !String(taskNumber).includes(".");
};

// 2. Define a reusable function to set the context
const updateChatContext = () => {
  // Directly access the .value of the reactive refs
  const headerData = minuteHeaderData.value;
  const bodyData = body.value;

  // Check if both parts of the minutes data are available
  if (headerData && bodyData) {
    // Combine header and body into a single context object
    const fullPageContext = {
      header: headerData,
      body: bodyData,
    };
    chatbotStore.setPageContext(fullPageContext, "Meeting Minutes Page");
    console.log("Chatbot context SET for Meeting Minutes page.");
  } else {
    // This log correctly indicates that data isn't ready yet.
    console.log("No minutes data available to set as context yet.");
  }
};

// 3. Watch for changes in the data
// This handles the case where data loads AFTER the component has already mounted.
// Watching both refs ensures the context is updated when either part changes.
watch(
  [minuteHeaderData, body],
  () => {
    updateChatContext();
  },
  {
    deep: true, // Important for watching complex objects
  }
);

// 4. Use onMounted to set the context as soon as the component is on the page
// This handles cases where the data is already in the store from a previous visit.
onMounted(() => {
  updateChatContext();
});

// 5. Use onUnmounted to clean up when leaving the page
onUnmounted(() => {
  chatbotStore.clearPageContext();
  console.log("Chatbot context CLEARED from Minutes page.");
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

.attachment-manager,
.attachment-manager * {
  font-family: "Inter", serif !important;
  /* font-family: "Times New Roman", serif !important */
}

.editable-field {
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  border: 2px dashed transparent;
  font-family: "Inter", serif !important;
  font-size: 16px;
}
.editable-field:hover {
  background-color: #e0e0e0; /* A very light yellow */
  border-color: #e0e0e0; /* A light orange/yellow */
}

.minutes-section-card {
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  font-size: 16px;
  font-family: "Inter", serif !important;
  overflow: hidden;
}
.tasks-section-card {
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  font-size: 16px;
  font-family: "Inter", serif !important;
  overflow: hidden;
}
.rounded-header-cell {
  border-right: 2px solid #e0e0e0;
  height: 100%;
  padding: 12px;
  text-align: center;
}
.title-cell {
  padding: 16px;
  border-bottom: 2px solid #e0e0e0;
}
.content-cell {
  padding: 16px 8px;
  font-size: 16px;
}
.attendees-text {
  white-space: pre-wrap;
  line-height: 1.5;
  font-family: "Inter", serif !important;
}
.task-list-header {
  border-bottom: 2px solid #e0e0e0;
  padding: 16px;
  font-family: "Inter", serif !important;
  text-align: center;
  font-size: 20px;
}
.tasks-table {
  border: none;
  text-align: center;
}
.tasks-table th,
.tasks-table td {
  padding: 8px 16px !important;
  font-size: 18px;
  vertical-align: top;
  border-bottom: 2px solid #e0e0e0;
  font-family: "Inter", serif !important;
  text-align: center;
}
.tasks-table thead th {
  border-bottom: 2px solid #bdbdbd;
}
.tasks-table tbody tr:last-child td {
  border-bottom: none;
}
.main-task-cell {
  background-color: #e0e0e0;
}

.even-row {
  background-color: #e8e7e7; /* white */
}
.odd-row {
  background-color: #ffffff; /* light grey */
}
</style>
