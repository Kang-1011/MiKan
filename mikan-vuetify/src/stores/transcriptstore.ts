// transcriptstore.ts

import { defineStore } from 'pinia';
import { ref, computed, reactive } from 'vue';

export type Transcript = {
  "transcript": string; 
}

export const useTranscriptStore = defineStore('transript', () => {
  const isEditMode = ref(false);
  const activeEditorKey = ref<string | null>(null);

  const header = reactive({
    title: "Transcript",
    location: "Meeting Room 1",
    createdBy: "Alpha",
    date: new Date().toISOString().split('T')[0],
    project: "Project Capstone",
    Purpose: "The meeting focused on aligning team efforts across marketing, sales, development, and support. Key updates included progress on the Concept Bravo proposal, Project Capstone resource needs, the employee wellness initiative, and addressing a critical user issue. Action items and next steps were confirmed to ensure timely follow-up.",
    Attendees : "Alpha (email@example.com)\nBravo (email@example.com)\nCharlie (email@example.com)\nDelta (email@example.com)\nEcho (email@example.com)\nFoxtrot (email@example.com)"
    });

  type HeaderField = keyof typeof header;

  const body = reactive ({
    transcriptLines: [
    { transcript: "00:00:05 Speaker 1 (Alpha) : Good morning, everyone. Let's get started by reviewing our key action items for this week. We’ve got a full agenda and I appreciate everyone being on time." },
    { transcript: "00:00:20 Speaker 2 (Bravo) : Morning all. I’ve updated the Concept Bravo marketing proposal and will circulate the revised version by end of day. We’re also working on a budget impact analysis—Finance needed some clarifications before final numbers." },
    { transcript: "00:00:45 Speaker 1 (Alpha) : Thanks, Bravo. Will that impact the distribution timeline or are we still on track?" },
    { transcript: "00:00:55 Speaker 2 (Bravo) : We’re still on track. I’m meeting with Procurement later today to finalize the vendor costs. Assuming that goes smoothly, we’re good to go." },
    { transcript: "00:01:10 Speaker 3 (Charlie) : From the Marketing side, we’re deep into researching competitor strategies for similar campaigns. We’ve benchmarked three already and have insights coming in. The full report will be ready by July 1st." },
    { transcript: "00:01:30 Speaker 1 (Alpha) : That’s great. Make sure to add any social performance metrics—we need a solid comparison on reach and engagement." },
    { transcript: "00:01:42 Speaker 3 (Charlie) : Will do. We’ve already gathered data from Meta and LinkedIn. Twitter’s analytics are slightly delayed but should be available tomorrow." },
    { transcript: "00:01:55 Speaker 4 (Delta) : On my end, I’ve started drafting the Q3 sales target adjustments. The initial numbers show some regional variation, so I’ll need input from the Southeast team. I plan to present to management next Monday." },
    { transcript: "00:02:15 Speaker 1 (Alpha) : Thanks, Delta. Let me know if you need help consolidating the dashboard data for that." },
    { transcript: "00:02:25 Speaker 4 (Delta) : Actually, yes. I’ll sync with you after the call. There's a discrepancy in lead conversion data I’d like your take on." },
    { transcript: "00:02:40 Speaker 5 (Echo) : Moving to Project Capstone—QA flagged that we’ll need more resources for regression testing. I’ve drafted a resource request and will meet with QA leads this afternoon." },
    { transcript: "00:03:00 Speaker 6 (Foxtrot) : Good timing. All Dev Team members need to review the Capstone beta feedback individually by July 21st. I’d suggest everyone spend 30–45 minutes with the annotated test logs." },
    { transcript: "00:03:20 Speaker 1 (Alpha) : Let’s make sure the feedback is documented clearly. Use tags by severity level so it’s easier to prioritize in sprint planning." },
    { transcript: "00:03:35 Speaker 6 (Foxtrot) : Already in place. We’ve tagged major, minor, and UI-only bugs separately. Should be easier to filter in JIRA." },
    { transcript: "00:03:50 Speaker 1 (Alpha) : Nice. Echo, any update on the wellness initiative?" },
    { transcript: "00:03:58 Speaker 5 (Echo) : Yes, the working group kicks off this week. I’ve drafted an interview schedule for participant selection. Interviews are set for July 28th. We’re also preparing initial surveys to guide the discussion." },
    { transcript: "00:04:20 Speaker 3 (Charlie) : Just thinking aloud—should we involve Facilities or Admin in the wellness conversations?" },
    { transcript: "00:04:30 Speaker 5 (Echo) : Great idea. I’ll loop in our Facilities contact—especially since workspace ergonomics is one of the focus areas." },
    { transcript: "00:04:45 Speaker 2 (Bravo) : Switching gears—Support reported a critical login issue last night. We implemented a temporary workaround early this morning. It’s stable now, but we’ll need a full fix soon." },
    { transcript: "00:05:05 Speaker 1 (Alpha) : Thanks for the quick turnaround, Bravo. Can you document that workaround and send it to Support and Product?" },
    { transcript: "00:05:15 Speaker 2 (Bravo) : Already done. The doc is in the shared folder. I also created a Loom walkthrough." },
    { transcript: "00:05:30 Speaker 4 (Delta) : That issue might affect our NPS if it recurs. We should note it in our CX review report." },
    { transcript: "00:05:42 Speaker 1 (Alpha) : Agreed. Let’s not lose sight of the impact. I’ll alert the Customer Experience team to flag it." },
    { transcript: "00:05:55 Speaker 6 (Foxtrot) : A heads-up, the Design team is finalizing Capstone UI assets this week. Once that’s done, we’ll need front-end integration before the next demo." },
    { transcript: "00:06:10 Speaker 3 (Charlie) : Do we have an ETA on those assets?" },
    { transcript: "00:06:15 Speaker 6 (Foxtrot) : End of this week. I’ve seen the preview—they look clean and mobile-friendly." },
    { transcript: "00:06:28 Speaker 5 (Echo) : And a note on the wellness pilot, we're starting with three areas—mental health, ergonomics for remote teams, and flexible scheduling." },
    { transcript: "00:06:42 Speaker 2 (Bravo) : Count me in. The flexible scheduling one sounds especially relevant." },
    { transcript: "00:06:50 Speaker 5 (Echo) : You’re added. Anyone else, just ping me after the meeting." },
    { transcript: "00:07:00 Speaker 1 (Alpha) : Before we wrap, I’d like to start compiling FAQ updates based on recent customer feedback." },
    { transcript: "00:07:10 Speaker 3 (Charlie) : I’ll export the latest Zendesk tags and summarize the most common queries." },
    { transcript: "00:07:22 Speaker 1 (Alpha) : Perfect. Let’s aim to update the FAQ by mid-next week. Use the new CMS templates if possible." },
    { transcript: "00:07:35 Speaker 6 (Foxtrot) : One more quick thing—we noticed some inconsistencies in staging vs. production environments. Can we get DevOps to run a config diff?" },
    { transcript: "00:07:50 Speaker 1 (Alpha) : Noted. I’ll flag that in our post-meeting notes and assign it to the DevOps queue." },
    { transcript: "00:08:00 Speaker 4 (Delta) : Anything we can do to speed up feedback cycles? The delay from QA is slowing down handoff to Sales." },
    { transcript: "00:08:15 Speaker 5 (Echo) : We’re looking at setting up automated test runs for critical paths—that should reduce manual QA time by 20–30%." },
    { transcript: "00:08:30 Speaker 2 (Bravo) : That would help. Also, can we agree to consolidate bug triage into a biweekly session instead of ad hoc?" },
    { transcript: "00:08:42 Speaker 1 (Alpha) : Good call. Let’s make it official—Tuesdays at 3 PM starting next week. I’ll send the invite." },
    { transcript: "00:08:55 Speaker 3 (Charlie) : Quick note—the marketing creative team will be presenting campaign visuals Friday at 11 AM. Everyone’s welcome to join." },
    { transcript: "00:09:10 Speaker 1 (Alpha) : Great. Add it to the shared calendar please." },
    { transcript: "00:09:18 Speaker 3 (Charlie) : Done." },
    { transcript: "00:09:22 Speaker 6 (Foxtrot) : Any news on the accessibility review for Capstone?" },
    { transcript: "00:09:30 Speaker 5 (Echo) : Yes, we’ve scheduled it for next Thursday. We’ll be using the WCAG 2.1 checklist." },
    { transcript: "00:09:45 Speaker 1 (Alpha) : Excellent. Let’s use the remaining time for any blockers." },
    { transcript: "00:09:50 Speaker 6 (Foxtrot) : Just waiting on mockups, as mentioned. No other blockers." },
    { transcript: "00:09:58 Speaker 4 (Delta) : We’re all clear." },
    { transcript: "00:10:00 Speaker 2 (Bravo) : Same here." },
    { transcript: "00:10:03 Speaker 3 (Charlie) : All good." },
    { transcript: "00:10:05 Speaker 5 (Echo) : Nothing urgent from my side." },
    { transcript: "00:10:10 Speaker 1 (Alpha) : Alright, then let’s wrap with next steps. Each of you will receive a summary with your action items and deadlines." },
    { transcript: "00:10:22 Speaker 1 (Alpha) : Quick reminder, we’ll reconvene next Thursday, same time. Please have your mid-sprint updates ready." },
    { transcript: "00:10:35 Speaker 2 (Bravo) : Will do. Thanks all." },
    { transcript: "00:10:40 Speaker 4 (Delta) : See you next week." },
    { transcript: "00:10:42 Speaker 3 (Charlie) : Great session everyone." },
    { transcript: "00:10:45 Speaker 5 (Echo) : Thanks!" },
    { transcript: "00:10:47 Speaker 6 (Foxtrot) : Take care." },
    { transcript: "00:10:50 Speaker 1 (Alpha) : Meeting adjourned. Have a productive week, everyone!" }
] as Transcript[]
  });

  
  const transcriptHeaderData = computed(() => header);
  const transcriptBodyData = computed(() => body);

  // NEW: Computed property to get the transcript as a single string.
  const fullTranscriptText = computed(() => {
    return body.transcriptLines.map(line => line.transcript).join('\n');
  });

  function toggleEditMode() {
    isEditMode.value = !isEditMode.value;
    if (!isEditMode.value) {
      activeEditorKey.value = null;
    }
  }

  function setActiveEditor(key: string | null) {
    activeEditorKey.value = key;
  }
  
  function updateHeaderField(payload: { field: HeaderField, value: string }) {
    if (header.hasOwnProperty(payload.field)) {
      header[payload.field] = payload.value;
    }
  }

  // NEW: Action to update the transcript from a single string.
  function updateTranscript(newText: string) {
    const newLines = newText.split('\n').map(line => ({ "transcript": line }));
    body.transcriptLines = newLines;
  }

  return {
    isEditMode,
    activeEditorKey,
    header,
    body,
    transcriptHeaderData,
    transcriptBodyData,
    fullTranscriptText, // <-- Expose the new computed property
    toggleEditMode,
    setActiveEditor,
    updateHeaderField,
    updateTranscript, // <-- Expose the new action
  }
});