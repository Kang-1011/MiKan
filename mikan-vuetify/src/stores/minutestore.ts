import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";

export type Task = {
  "Task No.": string;
  Description: string;
  "Action by"?: string;
  "Due date"?: string;
};

export const useMinuteStore = defineStore("minutes", () => {
  const isEditMode = ref(false);
  const activeEditorKey = ref<string | null>(null);

  const header = reactive({
    title: "Minutes",
    location: "",
    created_by: "",
    date: new Date().toISOString().split("T")[0],
    project: "",
    purpose: "",
    attendees: "",
  });

  type HeaderField = keyof typeof header;

  const body = reactive({
    tasks: [] as Task[],
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

  function updateHeaderField(payload: { field: HeaderField; value: string }) {
    if (header.hasOwnProperty(payload.field)) {
      header[payload.field] = payload.value;
    }
  }

  function updateTaskField(payload: {
    taskIndex: number;
    field: keyof Task;
    value: string;
  }) {
    if (body.tasks[payload.taskIndex]) {
      const taskToUpdate = body.tasks[payload.taskIndex];
      if (taskToUpdate.hasOwnProperty(payload.field)) {
        (taskToUpdate as any)[payload.field] = payload.value;
      }
    }
  }

  function setTasksFromGemini(
    tasks: { description: string; assignee?: string; due_date?: string }[]
  ) {
    body.tasks = tasks.map((task, idx) => ({
      "Task No.": (idx + 1).toString(),
      Description: task.description,
      "Action by": task.assignee || "",
      "Due date": task.due_date || "",
    }));
  }

  function renumberAllTasks() {
    let mainTaskCounter = 0;
    let subTaskCounter = 1;

    body.tasks.forEach((task) => {
      const isSubTask = task["Task No."].includes(".");
      if (!isSubTask) {
        mainTaskCounter++;
        task["Task No."] = String(mainTaskCounter);
        subTaskCounter = 1;
      } else {
        task["Task No."] = `${mainTaskCounter}.${subTaskCounter}`;
        subTaskCounter++;
      }
    });
  }

  function addTask() {
    const mainTasks = body.tasks.filter(
      (task) => !task["Task No."].includes(".")
    );
    const nextMainTaskNum = mainTasks.length + 1;

    const newTask: Task = {
      "Task No.": String(nextMainTaskNum),
      Description: "New task description.",
      "Action by": "",
      "Due date": "",
    };

    body.tasks.push(newTask);
  }

  function addSubTask(parentIndex: number) {
    const parentTask = body.tasks[parentIndex];
    const parentTaskNo = parentTask["Task No."];

    let lastSubTaskIndex = parentIndex;
    for (let i = parentIndex + 1; i < body.tasks.length; i++) {
      if (body.tasks[i]["Task No."].startsWith(parentTaskNo + ".")) {
        lastSubTaskIndex = i;
      } else {
        break;
      }
    }

    const newSubTask: Task = {
      "Task No.": `${parentTaskNo}.x`,
      Description: "New sub-task description.",
      "Action by": "",
      "Due date": "",
    };

    body.tasks.splice(lastSubTaskIndex + 1, 0, newSubTask);
    renumberAllTasks();
  }

  function deleteTaskAndRenumber(taskIndex: number) {
    if (taskIndex < 0 || taskIndex >= body.tasks.length) return;

    const taskToDelete = body.tasks[taskIndex];
    const taskNo = taskToDelete["Task No."];
    const isMainTask = !taskNo.includes(".");

    let tasksToRemove = 1;
    if (isMainTask) {
      for (let i = taskIndex + 1; i < body.tasks.length; i++) {
        if (body.tasks[i]["Task No."].startsWith(taskNo + ".")) {
          tasksToRemove++;
        } else {
          break;
        }
      }
    }

    body.tasks.splice(taskIndex, tasksToRemove);
    renumberAllTasks();
  }

  // ✅ Accept external JSON data (e.g., from API or Gemini)
  // ✅ Load JSON locally on mount
  async function loadFromJsonFile() {
    try {
      const response = await fetch(
        "http://localhost:8000/transcripts/generated"
      );
      if (!response.ok) throw new Error("Failed to fetch from API");
      const data = await response.json();
      loadFromJson(data);
    } catch (err) {
      console.error("Failed to load minutes JSON from API:", err);
    }
  }

  // ✅ Accept external JSON data (e.g., from local fetch)
  function loadFromJson(data: any) {
    if (data.header) {
      Object.keys(header).forEach((key) => {
        if (data.header[key] !== undefined) {
          (header as any)[key] = data.header[key];
        }
      });
    }

    if (Array.isArray(data.tasks)) {
      body.tasks = data.tasks.map((t: any) => ({
        "Task No.": t["Task No."] || "",
        Description: t["Description"] || "",
        "Action by": t["Action by"] || "",
        "Due date": t["Due date"] || "",
      }));
    }
  }

  // ✅ Call FastAPI to generate minutes and load result into store
  async function generateMinutesAndStore() {
    try {
      const response = await fetch("http://localhost:8000/minutes/generate");
      if (!response.ok) throw new Error("Failed to generate minutes");
      const data = await response.json();
      loadFromJson(data);
    } catch (err) {
      console.error("Failed to generate minutes from FastAPI:", err);
    }
  }

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
    addTask,
    addSubTask,
    deleteTaskAndRenumber,
    setTasksFromGemini,
    loadFromJson,
    generateMinutesAndStore,
    loadFromJsonFile,
  };
});
