import { defineStore } from 'pinia';

// Define the store
export const useTranscriptStore = defineStore('transcript', {
  // State: The single source of truth for your meeting data
  state: () => ({
    isEditMode: false,
    header: {
        title: 'Transcript',
        createdBy: 'User 1',
        date: new Date().toISOString(),
    },
    body: {
      transcriptLines: [
            "00:00:05 Speaker 1 (Kang)Hi Chat",
            '00:00:12 Speaker 2 (Sebastian) Good Morning Chat' ,
            '00:00:25 Speaker 3 (Asfar) Good Afternoon Chat' ,
            '00:00:33 Speaker 4 (Jet) Good Evening Chat' ,
            '00:00:37 Speaker 5 (Rohimi) Thank you Chat' ,
            '00:00:45 Speaker 6 (Alia) Bye Chat', 
      ],
    },
  }),

  // Getters: Computed properties for your state
  getters: {
    /**
     * Extracts the timestamp from the very last line of the transcript.
     * Returns '00:00:00' if the transcript is empty or the format is incorrect.
     */
    totalTime: (state) => {
      const lines = state.body.transcriptLines;

      // Safety check: ensure 'lines' is an array and is not empty.
      if (!Array.isArray(lines) || lines.length === 0) {
        return '00:00:00';
      }

      // Get the last line from the array.
      const lastLine = lines[lines.length - 1];

      // Safety check for the last line itself
      if (!lastLine || typeof lastLine !== 'string') {
        return '00:00:00';
      }

      // Extract timestamp from the last line using regex.
      // Matches a pattern like HH:MM:SS at the start of the string.
      const match = lastLine.match(/^(\d{2}:\d{2}:\d{2})/);

      // Return the matched timestamp or a default value.
      return match ? match[1] : '00:00:00';
    }
  },

  // Actions: Functions to mutate the state
  actions: {
    /**
     * Toggles the edit mode on or off.
     */
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },

    /**
     * Updates the title of the transcript.
     * @param {string} newTitle - The new title for the transcript.
     */
    updateTranscriptTitle(newTitle: string) {
        this.header.title = newTitle;
    },

    /**
     * Replaces the current transcript lines with new content from a single block of text.
     * @param {string} fullText - A string where each line is separated by a newline character.
     */
    updateTranscriptFromText(fullText: string) {
      this.body.transcriptLines = fullText.split('\n');
    }
  }
});
