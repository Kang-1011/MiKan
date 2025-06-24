// minutestore.ts

import { defineStore } from 'pinia';
import { ref, computed, reactive } from 'vue';

export type Task = {
  "Task No.": string;
  "Description": string;
  "Action by"?: string;
  "Due date"?: string;
}

export const useMinuteStore = defineStore('minutes', () => {
  const isEditMode = ref(false);
  const activeEditorKey = ref<string | null>(null);

  const header = reactive({
    title: "Minutes",
    location: "Meeting Room 1",
    createdBy: "Alpha",
    date: new Date().toISOString().split('T')[0],
    project: "Project Capstone",
    Purpose: "The meeting focused on aligning team efforts across marketing, sales, development, and support. Key updates included progress on the Concept Bravo proposal, Project Capstone resource needs, the employee wellness initiative, and addressing a critical user issue. Action items and next steps were confirmed to ensure timely follow-up.",
    Attendees : "Alpha (email@example.com)\nBravo (email@example.com)\nCharlie (email@example.com)\nDelta (email@example.com)\nEcho (email@example.com)\nFoxtrot (email@example.com)"
  });

  type HeaderField = keyof typeof header;

  const body = reactive({
    Tasks: [
     { "Task No.": "1", "Description": "Circulate the revised Concept Bravo marketing proposal to the team." },
     { "Task No.": "1.1", "Description": "Provide budget impact analysis for Concept Bravo.", "Action by": "Bravo", "Due date": "2025-07-23" },
     { "Task No.": "1.2", "Description": "Research competitor strategies for similar campaigns.", "Action by": "Charlie", "Due date": "2025-07-01" },
     { "Task No.": "2", "Description": "Draft the Q3 sales target adjustments and present to management.", "Action by": "Delta" },
     { "Task No.": "3", "Description": "Coordinate with QA for additional resources for Project Capstone.", "Action by": "Echo" },
     { "Task No.": "3.1", "Description": "All Dev Team to review Project Capstone beta feedback individually before next sprint planning.", "Action by": "Foxtrot", "Due date": "2025-07-21" },
     { "Task No.": "4", "Description": "Lead the working group for the employee wellness initiative proposal.", "Action by": "Echo" },
     { "Task No.": "4.1", "Description": "Schedule interviews for the wellness working group participants.", "Action by": "Echo", "Due date": "2025-07-28" },
     { "Task No.": "5", "Description": "Compile a list of FAQ updates based on recent customer feedback.", "Action by": "Alpha" },
     { "Task No.": "5.1", "Description": "Implement immediate workaround for critical issue X reported by users.", "Action by": "Bravo", "Due date": "2025-07-17" }
  ] as Task[]
  });

  const minuteHeaderData = computed(() => header);
  const minuteBodyData = computed(() => body);

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

  function updateTaskField(payload: { taskIndex: number; field: keyof Task; value: string }) {
    if (body.Tasks[payload.taskIndex]) {
      const taskToUpdate = body.Tasks[payload.taskIndex];
      if (taskToUpdate.hasOwnProperty(payload.field)) {
        (taskToUpdate as any)[payload.field] = payload.value;
      }
    }
  }

  // --- MODIFIED/NEW ACTIONS START HERE ---

  /**
   * Iterates through the entire task list and re-applies sequential numbering.
   * This robustly handles the order of main tasks and their respective sub-tasks.
   */
  function renumberAllTasks() {
    let mainTaskCounter = 0;
    let subTaskCounter = 1;

    body.Tasks.forEach(task => {
      const isSubTask = task["Task No."].includes('.');
      if (!isSubTask) {
        mainTaskCounter++;
        task["Task No."] = String(mainTaskCounter);
        // Reset the sub-task counter for the next group of sub-tasks
        subTaskCounter = 1;
      } else {
        task["Task No."] = `${mainTaskCounter}.${subTaskCounter}`;
        subTaskCounter++;
      }
    });
  }

  /**
   * Adds a new main task to the end of the task list.
   */
  function addTask() {
    const mainTasks = body.Tasks.filter(task => !task["Task No."].includes('.'));
    const nextMainTaskNum = mainTasks.length + 1;
    
    const newTask: Task = {
      "Task No.": String(nextMainTaskNum),
      "Description": "New task description.",
      "Action by": "",
      "Due date": ""
    };

    body.Tasks.push(newTask);
    // No re-numbering needed here as it's always added to the end.
  }

  /**
   * Adds a sub-task directly below the parent task.
   * @param {number} parentIndex The index of the parent task.
   */
  function addSubTask(parentIndex: number) {
      const parentTask = body.Tasks[parentIndex];
      const parentTaskNo = parentTask["Task No."];

      // Find the last sub-task of this parent to insert after it
      let lastSubTaskIndex = parentIndex;
      for (let i = parentIndex + 1; i < body.Tasks.length; i++) {
        if (body.Tasks[i]["Task No."].startsWith(parentTaskNo + '.')) {
          lastSubTaskIndex = i;
        } else {
          break; // Stop when we hit a new main task
        }
      }

      const newSubTask: Task = {
        "Task No.": `${parentTaskNo}.x`, // Temporary number, renumberAllTasks will fix it
        "Description": "New sub-task description.",
        "Action by": "",
        "Due date": ""
      };

      body.Tasks.splice(lastSubTaskIndex + 1, 0, newSubTask);
      renumberAllTasks(); // Re-number to fix the new sub-task's number
  }

  /**
   * Deletes a task and its children (if any), then re-numbers the entire list.
   * @param {number} taskIndex The index of the task to be deleted.
   */
  function deleteTaskAndRenumber(taskIndex: number) {
    if (taskIndex < 0 || taskIndex >= body.Tasks.length) return;

    const taskToDelete = body.Tasks[taskIndex];
    const taskNo = taskToDelete["Task No."];
    const isMainTask = !taskNo.includes('.');

    let tasksToRemove = 1; // Default to removing just one task
    if (isMainTask) {
      // If it's a main task, count its children to remove them too
      for (let i = taskIndex + 1; i < body.Tasks.length; i++) {
        if (body.Tasks[i]["Task No."].startsWith(taskNo + '.')) {
          tasksToRemove++;
        } else {
          break; // Stop at the next main task
        }
      }
    }

    // Remove the task(s)
    body.Tasks.splice(taskIndex, tasksToRemove);

    // Now, re-number everything to fix the sequence
    renumberAllTasks();
  }
  
  // --- MODIFIED/NEW ACTIONS END HERE ---

  return {
    isEditMode,
    activeEditorKey,
    header,
    body,
    minuteHeaderData,
    minuteBodyData,
    toggleEditMode,
    setActiveEditor,
    updateHeaderField,
    updateTaskField,
    // MODIFICATION: Expose the new actions
    addTask,
    addSubTask, // <-- NEW
    deleteTaskAndRenumber, // <-- RENAMED AND MODIFIED
  };
});