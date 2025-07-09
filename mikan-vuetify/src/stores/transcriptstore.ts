import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import axios from "axios";

export type TranscriptLine = {
  transcript: string;
};

export const useTranscriptStore = defineStore("transcript", () => {
  const isEditMode = ref(false);
  const activeEditorKey = ref<string | null>(null);

  const header = reactive({
    title: "",
    location: "",
    createdBy: "",
    date: "",
    project: "",
    purpose: "",
    attendees: "",
  });

  type HeaderField = keyof typeof header;

  const body = reactive({
    transcriptLines: [] as TranscriptLine[],
  });

  const transcriptHeaderData = computed(() => header);
  const transcriptBodyData = computed(() => body);

  const fullTranscriptText = computed(() =>
    body.transcriptLines.map((line) => line.transcript).join("\n")
  );

  function toggleEditMode() {
    isEditMode.value = !isEditMode.value;
    if (!isEditMode.value) {
      activeEditorKey.value = null;
    }
  }

  function setActiveEditor(key: string | null) {
    activeEditorKey.value = key;
  }

  function updateHeaderField(payload: { field: HeaderField; value: string }) {
    if (payload.field in header) {
      header[payload.field] = payload.value;
    }
  }

  function updateTranscript(newText: string) {
    const newLines = newText.split("\n").map((line) => ({ transcript: line }));
    body.transcriptLines = newLines;
  }

  // ✅ Load placeholder data from JSON
  async function loadFromJson(filePath: string = "/transcript_template.json") {
    try {
      const response = await fetch(filePath);
      const data = await response.json();

      header.title = data.title;
      header.location = data.location;
      header.createdBy = data.created_by;
      header.date = data.date;
      header.project = data.project;
      header.purpose = data.purpose;
      header.attendees = data.attendees;

      body.transcriptLines = data.transcript_lines.map((line: any) => ({
        transcript: line.transcript,
      }));
    } catch (error) {
      console.error("Failed to load JSON:", error);
    }
  }

  // ✅ Save transcript to FastAPI backend
  async function saveTranscriptToDB() {
    try {
      const payload = {
        title: header.title,
        location: header.location,
        created_by: header.createdBy,
        date: header.date,
        project: header.project,
        purpose: header.purpose,
        attendees: header.attendees,
        transcript_lines: body.transcriptLines.map((line) => ({
          transcript: line.transcript,
        })),
      };

      const response = await axios.post(
        "http://localhost:8000/transcripts",
        payload
      );

      const savedTranscript = response.data;
      console.log("Transcript saved to DB:", savedTranscript);

      // 🔐 Store the transcript ID for later use (e.g., in localStorage or global store)
      localStorage.setItem("latestTranscriptId", savedTranscript.id);

      return savedTranscript;
    } catch (error) {
      console.error("Error saving transcript:", error);
      throw error;
    }
  }

  return {
    isEditMode,
    activeEditorKey,
    header,
    body,
    transcriptHeaderData,
    transcriptBodyData,
    fullTranscriptText,
    toggleEditMode,
    setActiveEditor,
    updateHeaderField,
    updateTranscript,
    loadFromJson,
    saveTranscriptToDB, // ✅ expose this to use in TranscriptDisplay.vue
  };
});
