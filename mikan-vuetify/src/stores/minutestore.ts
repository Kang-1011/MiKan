 
import { defineStore } from 'pinia';

// Define the store
export const useMinuteStore = defineStore('minutes', {
  // State: The single source of truth for your meeting data
  state: () => ({
    isEditMode: false, 
    header: {
      title: 'Minutes',
      createdBy: 'User 1',
      date: new Date().toISOString(),
    },
    body: {
      attendees: [
          'Alpha (email@example.com)',
          'Bravo (email@example.com)',
          'Charlie (charlie@example.com)',
          'Delta (delta@example.com)',
          'Echo (echo@example.com)',
          'Foxtrot (foxtrot@example.com)',
          'Golf (golf@example.com)',
          'Hotel (hotel@example.com)',
          'India (india@example.com)',
          'Juliett (juliett@example.com)',
          'Kilo (kilo@example.com)',
          'Lima (lima@example.com)',
          'Mike (mike@example.com)',
          'November (november@example.com)',
          'Oscar (oscar@example.com)',
          'Papa (papa@example.com)',
      ],
      agenda: [
        '1. New Marketing Campaign Proposal',
        '**Key Discussion Points:**',
        '- Presented three campaign concepts (Alpha, Bravo, Charlie).',
        '- Budget considerations for each concept were reviewed.',
        '- Timeline expectations and resource allocation discussed.',
        '**Decisions Made:**',
        '- Proceed with Concept Bravo, with modifications to target demographic based on feedback.',

        '2. Q2 Sales Performance Review',
        '**Key Discussion Points:**',
        '- Sales figures for Q2 presented and analyzed.',
        '- Regional performance variations highlighted.',
        '- Discussion on factors impacting sales (market trends, competitor actions).',
        '**Decisions Made:**',
        '- Implement a targeted training program for underperforming regions.',
        '- Adjust Q3 sales targets for specific product lines.',

        '3. Product Development Update - Project Phoenix',
        '**Key Discussion Points:**',
        '- Current development phase and milestones achieved.',
        '- Challenges encountered and mitigation strategies.',
        '- Feedback from early beta testers summarized.',
        '**Decisions Made:**',
        '- Allocate additional QA resources to address beta feedback.',
        '- Schedule a follow-up meeting to finalize feature set for next sprint.',

        '4. Employee Wellness Initiative Brainstorm',
        '**Key Discussion Points:**',
        '- Ideas for improving employee wellness presented (e.g., workshops, fitness challenges).',
        '- Potential costs and benefits of various initiatives.',
        '- Survey results on employee preferences discussed.',
        '**Decisions Made:**',
        '- Form a small working group to develop a detailed proposal for two selected initiatives.',

        '5. Review of Customer Feedback from Last Month',
        '**Key Discussion Points:**',
        '- Key themes from customer support tickets and surveys.',
        '- Positive feedback areas and areas for improvement.',
        '- Specific examples of customer pain points.',
        '**Decisions Made:**',
        '- Prioritize addressing the top 3 pain points in the next product update cycle.',
        '- Update FAQ documentation based on common queries.',
      ],
      nextSteps: [
        'Brian M. to circulate the revised Concept Bravo marketing proposal to the team (Due: 2025-05-22).',
        'Alice W. to draft the Q3 sales target adjustments and present to management (Due: 2025-05-29).',
        'David K. to coordinate with QA for additional resources for Project Phoenix (Due: 2025-05-20).',
        'Sarah P. to lead the working group for the employee wellness initiative proposal (Due: 2025-06-05).',
        'Mike L. to compile a list of FAQ updates based on recent customer feedback (Due: 2025-05-24).',
        'All Dev Team to review Project Phoenix beta feedback individually before next sprint planning (Due: 2025-05-21).',
        'Finance Team to provide budget impact analysis for Concept Bravo (Due: 2025-05-23).',
        'HR Department to schedule interviews for the wellness working group participants (Due: 2025-05-28).',
        'Support Lead to implement immediate workaround for critical issue X reported by users (Due: 2025-05-17).',
        'Marketing Team to research competitor strategies for similar campaigns (Due: 2025-06-01).',
      ],
    },
  }),


  // Getters: Computed properties for your state
  getters: { 
    actionItemsCount: (state) => state.body.nextSteps.length, 
    minuteHeaderData: (state) => state.header, 
    minuteBodyData: (state) => state.body,
  },

  // Actions: Functions to mutate the state
  actions: {
    // Action to toggle the global edit state
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },

    // Action to update the minutes title (can be used with VConfirmEdit)
    updateMinutesTitle(newTitle: string) { 
        this.header.title = newTitle; 
    },

    // UPDATED: Action now accepts a single string and splits it into an array.
    updateAttendees(attendeesText: string) { 
      this.body.attendees = attendeesText.split('\n').filter(line => line.trim() !== '');
    },
    
    // UPDATED: Action now accepts a single string and splits it into an array.
    updateAgenda(agendaText: string) { 
      this.body.agenda = agendaText.split('\n').filter(line => line.trim() !== '');
    },
    
    // UPDATED: Action now accepts a single string and splits it into an array.
    updateNextSteps(nextStepsText: string) { 
      this.body.nextSteps = nextStepsText.split('\n').filter(line => line.trim() !== '');
    }, 
  },
});