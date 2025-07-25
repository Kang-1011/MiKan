// transcript.vue

<template>
  <v-row
    class="justify-space-between attachment-manager align-center ma-2"
    style="border-bottom: 2px solid #e0e0e0; padding: 8px 16px"
  >
    <div>
      <h2>Transcript</h2>
    </div>
    <div>
      <v-tooltip
        :text="isEditMode ? 'Finish Editing' : 'Edit Transcript'"
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

      <v-tooltip text="Download Transcript" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-download-outline"
            variant="text"
            v-bind="props"
            @click="exportToPDF"
          ></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="To Minutes" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-send-outline"
            variant="text"
            v-bind="props"
            @click="toMinute"
          ></v-btn>
        </template>
      </v-tooltip>
    </div>
  </v-row>

  <v-container fluid class="page-container" ref="pdfContent">
    <v-row
      v-if="isGeneratingMinutes"
      class="fill-height d-flex align-center justify-center text-center"
    >
      <v-col cols="12" class="position-relative">
        <!-- Overlay message: Emoji + Text -->
        <div
          class="position-absolute"
          style="
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
            pointer-events: none;
          "
        >
          <div
            class="d-flex flex-column align-center justify-center px-10 py-10"
            style="
              background: rgba(0, 0, 0, 0.3);
              backdrop-filter: blur(10px);
              border-radius: 16px;
              color: white;
            "
          >
            <v-img
              src="@/assets/gemini-logo.png"
              alt="Google Gemini Logo"
              contain
              width="120"
              height="120"
              class="mb-2"
              style="border-radius: 50%"
            />

            <div class="d-flex align-center justify-center">
              <div class="text-h2 font-weight-medium">Google Gemini</div>
            </div>

            <div class="text-h2 font-weight-medium mt-4 text-center">
              transforming words into
            </div>
            <div class="text-h2 font-weight-medium mt-4 text-center">
              magic...
            </div>
          </div>
        </div>

        <!-- Skeleton Loader underneath -->
        <v-skeleton-loader
          class="mx-auto"
          elevation="2"
          type="heading, subtitle, card, card, card, card"
          max-width="2500"
        />
      </v-col>
    </v-row>
    <template v-else>
      <div class="attachment-manager minutes-section-card">
        <v-row no-gutters>
          <v-col cols="12">
            <div class="title-cell d-flex justify-center align-center">
              <h1 class="text-h4 font-weight-bold text-center">
                {{ transcriptHeaderData.title }} -
                {{ transcriptHeaderData.project }}
              </h1>
            </div>
          </v-col>
        </v-row>

        <v-row style="border-bottom: 2px solid #eaeaea" no-gutters class="pa-4">
          <v-col cols="12" md="3" class="pa-2">
            <div class="rounded-header-cell">
              <span class="font-weight-bold" style="font-size: 18px"
                >Location:</span
              >
              <div
                v-if="activeEditorKey !== 'location'"
                @click="isEditMode && setActiveEditor('location')"
                :class="{ 'editable-field': isEditMode }"
                class="pa-2"
                style="min-height: 40px"
              >
                {{ transcriptHeaderData.location }}
              </div>
              <VConfirmEdit
                v-if="isEditMode && activeEditorKey === 'location'"
                :model-value="transcriptHeaderData.location"
                @save="
                  (newValue) => handleSaveHeaderField('location', newValue)
                "
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
                v-if="activeEditorKey !== 'createdBy'"
                @click="isEditMode && setActiveEditor('createdBy')"
                :class="{ 'editable-field': isEditMode }"
                class="pa-2"
                style="min-height: 40px"
              >
                {{ transcriptHeaderData.createdBy }}
              </div>
              <VConfirmEdit
                v-if="isEditMode && activeEditorKey === 'createdBy'"
                :model-value="transcriptHeaderData.createdBy"
                @save="
                  (newValue) => handleSaveHeaderField('createdBy', newValue)
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
              <span class="font-weight-bold" style="font-size: 18px"
                >Date:</span
              >
              <div
                v-if="activeEditorKey !== 'date'"
                @click="isEditMode && setActiveEditor('date')"
                :class="{ 'editable-field': isEditMode }"
                class="pa-2"
                style="min-height: 40px"
              >
                {{ formatDate(transcriptHeaderData.date) }}
              </div>
              <VConfirmEdit
                v-if="isEditMode && activeEditorKey === 'date'"
                :model-value="transcriptHeaderData.date"
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
                {{ transcriptHeaderData.project }}
              </div>
              <VConfirmEdit
                v-if="isEditMode && activeEditorKey === 'project'"
                :model-value="transcriptHeaderData.project"
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
                    v-if="activeEditorKey !== 'Purpose'"
                    @click="isEditMode && setActiveEditor('Purpose')"
                    :class="{ 'editable-field': isEditMode }"
                    class="mb-0"
                    style="min-height: 40px"
                  >
                    {{ transcriptHeaderData.purpose }}
                  </div>
                  <VConfirmEdit
                    v-if="isEditMode && activeEditorKey === 'Purpose'"
                    :model-value="transcriptHeaderData.purpose"
                    @save="
                      (newValue) => handleSaveHeaderField('Purpose', newValue)
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
                  <span class="font-weight-bold" style="font-size: 18px"
                    >Attendees:</span
                  >
                </v-col>
                <v-col cols="12" md="10">
                  <div
                    v-if="activeEditorKey !== 'Attendees'"
                    @click="isEditMode && setActiveEditor('Attendees')"
                    :class="{ 'editable-field': isEditMode }"
                    class="mb-0 attendees-text"
                    style="min-height: 40px"
                  >
                    {{ transcriptHeaderData.attendees }}
                  </div>
                  <VConfirmEdit
                    v-if="isEditMode && activeEditorKey === 'Attendees'"
                    :model-value="transcriptHeaderData.attendees"
                    @save="
                      (newValue) => handleSaveHeaderField('Attendees', newValue)
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
            <div
              class="task-list-header d-flex justify-center align-center ga-4"
            >
              <h3 class="font-weight-bold" style="font-size: 24px">
                Transcript List
              </h3>
            </div>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" class="pa-4">
            <div
              v-if="activeEditorKey !== 'transcript'"
              class="transcript-container"
              :class="{ 'editable-field': isEditMode }"
              @click="isEditMode && setActiveEditor('transcript')"
            >
              <div
                v-for="(line, index) in body.transcriptLines"
                :key="index"
                class="transcript-line"
              >
                <span class="speaker-info"
                  >{{ parseLine(line.transcript).speaker }} :</span
                >
                <span class="content">{{
                  parseLine(line.transcript).content
                }}</span>
              </div>
            </div>
            <VConfirmEdit
              v-if="isEditMode && activeEditorKey === 'transcript'"
              :model-value="fullTranscriptText"
              @save="handleSaveTranscript"
              @cancel="handleCancelEdit"
            >
              <template #input="{ model }">
                <v-textarea
                  v-model="model.value"
                  label="Edit Transcript"
                  variant="outlined"
                  auto-grow
                  rows="10"
                  hint="Edit the raw transcript text here."
                ></v-textarea>
              </template>
            </VConfirmEdit>
          </v-col>
        </v-row>
      </div>
    </template>
  </v-container>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useTranscriptStore } from "@/stores/transcriptstore";
import { useRouter } from "vue-router";
import VConfirmEdit from "../VConfirmEdit.vue";

import { useMinuteStore } from "@/stores/minutestore";

const minuteStore = useMinuteStore();
import { useChatbotStore } from "@/stores/chatbotStore";

const transcriptStore = useTranscriptStore();
const chatbotStore = useChatbotStore();
const pdfContent = ref(null);
const router = useRouter();
const emit = defineEmits(["action"]);

const {
  header: transcriptHeaderData,
  body,
  isEditMode,
  activeEditorKey,
  fullTranscriptText,
  highlightedLine,
} = storeToRefs(transcriptStore);

const { updateHeaderField, toggleEditMode, setActiveEditor, updateTranscript } =
  transcriptStore;

const parseLine = (line) => {
  const parts = line.split(":");
  if (parts.length <= 1) {
    return { speaker: "", content: line };
  }
  const content = parts.pop().trim();
  const speaker = parts.join(":").trim();
  return { speaker, content };
};

const handleSaveTranscript = (newValue) => {
  updateTranscript(newValue);
  setActiveEditor(null);
};

const handleSaveHeaderField = (field, value) => {
  updateHeaderField({ field, value });
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

const isGeneratingMinutes = ref(false);

const toMinute = async () => {
  try {
    isGeneratingMinutes.value = true;

    // Step 1: Save transcript to DB first
    const savedTranscript = await transcriptStore.saveTranscriptToDB();
    console.log("Transcript saved:", savedTranscript);

    // Step 2: Trigger minutes generation using Gemini backend
    const response = await fetch("http://localhost:8000/minutes/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(savedTranscript), // ✅ Use clean DB-saved data
    });

    if (!response.ok) {
      throw new Error(`Generation failed: ${await response.text()}`);
    }

    const generatedMinutes = await response.json();

    // Step 3: Load into minuteStore for display/editing
    minuteStore.loadFromJson(generatedMinutes);

    // ✅ Step 4: Navigate to minutes page
    emit("action", { type: "Minute", payload: generatedMinutes });
    router.push("/MinutesHomepage");
  } catch (error) {
    console.error("ToMinutes error:", error);
    alert("❌ Failed to generate minutes. Check console for details.");
  }
};

const exportToPDF = () => {
  console.log("Exporting Transcript to styled, text-based PDF...");
  const { jsPDF } = window.jspdf;
  if (!jsPDF || !jsPDF.API.autoTable) {
    console.error("jsPDF or jsPDF-AutoTable library not loaded!");
    alert("Sorry, the PDF export feature is currently unavailable.");
    return;
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const pageHeight = pdf.internal.pageSize.getHeight();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 40;
  let currentY = margin;

  const headerData = transcriptHeaderData.value;
  const transcriptLines = body.value.transcriptLines;
  const safeFilename = `${headerData.project || "Meeting"}-Transcript.pdf`;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text(
    `Transcript - ${headerData.project || "General"}`,
    pageWidth / 2,
    currentY,
    { align: "center" }
  );
  currentY += 35;

  const headerBoxStartY = currentY;
  pdf.setDrawColor(224, 224, 224);
  pdf.setLineWidth(1);
  const colWidth = (pageWidth - margin * 2) / 4;

  const headerFields = [
    { label: "Location:", value: headerData.location },
    { label: "Written by:", value: headerData.createdBy },
    { label: "Date:", value: formatDate(headerData.date) },
    { label: "Project:", value: headerData.project },
  ];

  let maxBoxHeight = 0;
  headerFields.forEach((field) => {
    const valueLines = pdf.splitTextToSize(field.value || "N/A", colWidth - 20);
    const boxHeight = 30 + valueLines.length * 12;
    if (boxHeight > maxBoxHeight) maxBoxHeight = boxHeight;
  });

  headerFields.forEach((field, index) => {
    const xPos = margin + index * colWidth;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text(field.label, xPos + 10, headerBoxStartY + 15);
    pdf.setFont("helvetica", "normal");
    pdf.text(field.value || "N/A", xPos + 10, headerBoxStartY + 30, {
      maxWidth: colWidth - 20,
    });
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
  pdf.line(margin, currentY, pageWidth - margin, currentY);

  const addSection = (label, value) => {
    let yPos = currentY + 15;
    pdf.setFont("helvetica", "bold");
    pdf.text(label, margin + 10, yPos);
    pdf.setFont("helvetica", "normal");
    const valueLines = pdf.splitTextToSize(
      value || "N/A",
      pageWidth - margin * 2 - 100
    );
    pdf.text(valueLines, margin + 100, yPos);
    currentY += valueLines.length * 12 + 10;
  };

  addSection("Purpose:", headerData.purpose);
  addSection("Attendees:", headerData.attendees);
  pdf.rect(
    margin,
    headerBoxStartY,
    pageWidth - margin * 2,
    currentY - headerBoxStartY
  );
  currentY += 40;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("Transcript List", pageWidth / 2, currentY, { align: "center" });
  currentY += 25;

  const tableBody = transcriptLines.map((line) => {
    const { speaker, content } = parseLine(line.transcript);
    return [speaker, content];
  });

  pdf.autoTable({
    startY: currentY,
    head: [["Speaker/Timestamp", "Content"]],
    body: tableBody,
    theme: "plain",
    headStyles: {
      fontStyle: "bold",
      fontSize: 11,
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { cellWidth: 150, fontStyle: "bold" },
      1: { cellWidth: "auto" },
    },
    styles: {
      cellPadding: 8,
      fontSize: 10,
      valign: "top",
    },
  });

  pdf.save(safeFilename);
  console.log("Styled, text-based Transcript PDF generation complete.");
};

// transcript.vue -> <script setup> section

// --- ✨ START: UNIFIED HIGHLIGHT & SCROLL LOGIC ---

const { lastSourceLine } = storeToRefs(chatbotStore);
const lineRefs = new Map();

// ✅ NEW: A dedicated reactive state to hold the full, matched line
const activelyHighlightedLine = ref(null);

// Helper to normalize strings for comparison (removes extra whitespace)
const normalizeString = (str) => {
  if (!str) return "";
  return str.trim().replace(/\s+/g, " ");
};

// Function to populate the map of refs
const setLineRef = (el, line) => {
  if (el) {
    lineRefs.set(normalizeString(line), el);
  }
};

// Watch for a new source line from the chatbot
watch(lastSourceLine, (newLine) => {
  transcriptStore.setHighlightedLine(newLine);
});

// ✅ MODIFIED: This watcher now sets the 'activelyHighlightedLine' state
// which drives BOTH highlighting and scrolling.
watch(highlightedLine, (newVal) => {
  // If the citation from the AI exists...
  if (newVal) {
    nextTick(() => {
      const partialNormalizedKey = normalizeString(newVal);
      if (!partialNormalizedKey) {
        activelyHighlightedLine.value = null;
        return;
      }

      let foundKey = null;

      // Iterate through the full, original lines to find a match
      for (const fullLineKey of lineRefs.keys()) {
        if (fullLineKey.includes(partialNormalizedKey)) {
          foundKey = fullLineKey; // We found the full line!
          break;
        }
      }

      // If a match was found...
      if (foundKey) {
        const targetElement = lineRefs.get(foundKey);
        // 1. Set the state for the visual highlight
        activelyHighlightedLine.value = foundKey;
        // 2. Scroll to the element
        if (targetElement) {
          console.log(
            `✅ Match found! Highlighting and scrolling to: "${foundKey}"`
          );
          targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        // If no match was found, clear the highlight
        activelyHighlightedLine.value = null;
        console.error(
          `❌ No match found for partial key: "${partialNormalizedKey}"`
        );
      }
    });
  } else {
    // If the citation from the AI is cleared, clear our highlight state
    activelyHighlightedLine.value = null;
  }
});

// --- ✨ END: UNIFIED HIGHLIGHT & SCROLL LOGIC ---
const updateChatContext = () => {
  const headerData = transcriptHeaderData.value;
  const bodyData = body.value;
  if (headerData && bodyData) {
    const fullPageContext = { header: headerData, body: bodyData };
    chatbotStore.setPageContext(fullPageContext, "Meeting Transcript Page");
  }
};

watch(
  [transcriptHeaderData, body],
  () => {
    updateChatContext();
  },
  { deep: true }
);

onMounted(() => {
  updateChatContext();
});

onUnmounted(() => {
  transcriptStore.setHighlightedLine(null);
  chatbotStore.clearPageContext();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

.attachment-manager,
.attachment-manager * {
  font-family: "Inter", serif !important;
}

.transcript-container {
  border-radius: 4px;
  padding: 16px;
  line-height: 1.6;
  max-height: 50vh; /* Adjusted for better viewport fit */
  overflow-y: auto;
  font-family: "Inter", serif !important;
}

.transcript-line {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  padding: 4px 8px; /* Added padding for the highlight effect */
  font-family: "Inter", serif !important;
  border-radius: 4px; /* Added for the highlight effect */
  transition: background-color 0.3s ease-in-out;
}

.transcript-line.highlight {
  background-color: #ffe951; /* A pleasant light yellow */
}

.speaker-info {
  flex-shrink: 0;
  width: 250px; /* Adjusted width */
  padding-right: 1em; /* Added spacing */
  color: #333;
  font-weight: 500; /* Made speaker slightly bolder */
  font-family: "Inter", serif !important;
}

.content {
  flex-grow: 1;
}

.editable-field {
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  border: 2px dashed transparent;
  font-family: "Inter", serif !important;
}
.editable-field:hover {
  background-color: #f0f0f0;
  border-color: #e0e0e0;
}

.minutes-section-card,
.tasks-section-card {
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  overflow: hidden;
  font-family: "Inter", serif !important;
}
.rounded-header-cell {
  border-right: 2px solid #e0e0e0;
  height: 100%;
  padding: 12px;
  text-align: center;
}

.task-list-header {
  border-bottom: 2px solid #e0e0e0;
  padding: 16px;
  text-align: center;
}

.title-cell {
  padding: 16px;
  border-bottom: 2px solid #e0e0e0;
  font-family: "Inter", serif !important;
}
.content-cell {
  padding: 16px 8px;
}
.attendees-text {
  white-space: pre-wrap;
  line-height: 1.5;
}
</style>
