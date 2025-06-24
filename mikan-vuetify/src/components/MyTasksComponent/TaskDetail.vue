<template>
  <v-dialog v-model="internalDialogOpen" max-width="800" >
    <v-card v-if="localTask" class="rounded-xl border-md dialog-card"  style=" background:#fcfcfc;">
      <!-- Header with action icons -->
      <v-toolbar flat dense density="compact" class="dialog-header">
        <v-toolbar-title class="header-title">
          Task: {{ localTask.title || 'New Task' }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon density="compact" elevation="0" class="header-action-btn" @click="closeDialog">
          <v-icon color="rgba(0,0,0,0.6)">mdi-close</v-icon>
        </v-btn>
        <v-btn icon density="compact" elevation="0" class="header-action-btn save-btn" @click="save">
          <v-icon color="rgba(0,0,0,0.6)">mdi-content-save-outline</v-icon>
        </v-btn>
        <v-btn icon density="compact" elevation="0" class="header-action-btn delete-btn" @click="$emit('delete-task')">
          <v-icon color="rgba(0,0,0,0.6)">mdi-delete-outline</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="dialog-body">
        <div class="column-left">
          <!-- Title -->
          <div class="input-label small-gap">Title</div>
          <div class="custom-input-wrapper small-gap">
            <input
              type="text"
              v-model="localTask.title"
              :disabled="visitorMode"
              class="custom-input"
            />
          </div>

          <!-- Description with auto-grow to ~10 rows -->
          <div class="input-label small-gap">Description</div>
          <div class="custom-input-wrapper small-gap">
            <textarea
              ref="descRef"
              v-model="localTask.description"
              :disabled="visitorMode"
              class="custom-input description-textarea"
              @input="autoGrowDesc"
            ></textarea>
          </div>

          <!-- Subtasks -->
          <div class="input-label small-gap">Subtasks</div>
          <div class="subtasks-container">
            <div
              v-for="(sub, idx) in localTask.subtasks"
              :key="idx"
              class="subtask-item"
            >
              <div class="custom-input-wrapper subtask-wrapper">
                <input
                  type="text"
                  v-model="localTask.subtasks[idx]"
                  :disabled="visitorMode"
                  class="custom-input"
                />
                <v-btn
                  icon
                  density="compact"
                  elevation="0"
                  class="subtask-delete-btn"
                  @click="removeSubtask(idx)"
                  :disabled="visitorMode"
                >
                  <v-icon small color="rgba(0,0,0,0.4)">mdi-trash-can-outline</v-icon>
                </v-btn>
              </div>
            </div>
            <v-btn
              variant="text"
              color="grey"
              density="compact"
              elevation="0"
              class="border-sm rounded-xl small-gap"
              @click="addSubtask"
              :disabled="visitorMode"
              :style="{ fontSize: '0.75rem' }"
            >
              <v-icon left small>mdi-plus</v-icon> Add Subtask
            </v-btn>
          </div>

<!-- Attachments -->
<div class="input-label small-gap">Attachments</div>
          <Attachment
            v-model="localTask.attachments"
            mode="attachments"
            :visitorMode="visitorMode"
          />

          <!-- AI Attachments -->
          <div class="input-label small-gap">AI Attachments</div>
          <Attachment
            v-model="localTask.ai_attachments"
            mode="ai_attachments"
            :visitorMode="visitorMode"
          />

          <!-- Autostart -->
          <div class="input-label small-gap">Autostart</div>
          <Attachment
            v-model="localTask.autostart"
            mode="autostart"
            :visitorMode="visitorMode"
          />

        </div>

        <div class="vertical-divider"></div>

        <div class="column-right">
          <!-- Assignee -->
          <div class="input-label small-gap">Assignee</div>
          <div class="custom-input-wrapper select-wrapper small-gap">
            <select
              v-model="localTask.assignee"
              :disabled="visitorMode"
              class="custom-input select-input"
            >
              <option value="" disabled>Select assignee</option>
              <option v-for="opt in assigneeOptions" :key="opt" :value="opt">
                {{ opt }}
              </option>
            </select>
          </div>

          <!-- Priority -->
          <div class="input-label small-gap">Priority</div>
          <div class="custom-input-wrapper select-wrapper small-gap">
            <select
              v-model="localTask.priority"
              :disabled="visitorMode"
              class="custom-input select-input"
            >
              <option value="" disabled>Select priority</option>
              <option
                v-for="p in ['Low','Medium','High','Critical']"
                :key="p"
                :value="p"
              >
                {{ p }}
              </option>
            </select>
          </div>

          <!-- Due Date -->
          <div class="input-label small-gap">Due Date</div>
          <v-menu v-model="dateMenu" :close-on-content-click="false">
            <template #activator="{ props }">
              <div
                class="custom-input-wrapper select-wrapper small-gap"
                v-bind="props"
              >
                <input
                  type="text"
                  v-model="formattedDate"
                  readonly
                  :disabled="visitorMode"
                  class="custom-input"
                  placeholder="Due Date"
                />
              </div>
            </template>
            <v-date-picker
              v-model="localTask.dueDate"
              @input="dateMenu = false"

              title=""
            />
          </v-menu>

          <!-- Comments input -->
          <div class="input-label small-gap">Add Comment</div>
          <div class="custom-input-wrapper small-gap comment-wrapper rounded-xl">
            <textarea
              v-model="newComment"
              :disabled="visitorMode"
              class="custom-input"
              rows="1"
            ></textarea>
          </div>
          <v-btn
            variant="text"
            color="grey"
            density="compact"
            elevation="0"
            class="border-sm rounded-xl small-gap"
            @click="submitComment"
            :disabled="visitorMode || !newComment"
            :style="{ fontSize: '0.75rem' }"
          >
            Comment
          </v-btn>

          <!-- Comments list -->
          <div class="comments-list small-gap">
            <div
              v-for="(c, i) in localTask.comments"
              :key="i"
              class="comment-block rounded-lg"
            >
              <div class="comment-author">You</div>
              <div class="comment-text">{{ c.text }}</div>
              <div class="comment-ts">{{ formatDateShort(c.date) }}</div>
            </div>
          </div>
        </div>
      </v-card-text>

      <!-- Minimized footer (reserved) -->
      <v-card-actions class="dialog-footer minimized"></v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import Attachment from '@/components/MyTasksComponent/AttachmentManager.vue'

const props = defineProps<{ modelValue: boolean; task: any; visitorMode?: boolean }>()
const emit = defineEmits(['update:modelValue','save-task','delete-task'])

const internalDialogOpen = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
const localTask = ref<any>(null)
const dateMenu = ref(false)
const newComment = ref('')
const assigneeOptions = ref<string[]>(['Alice','Bob','Charlie','Diana','Grace','Frank','Hani'])
const descRef = ref<HTMLTextAreaElement | null>(null)

function autoGrowDesc(event: Event) {
  const target = event.target as HTMLTextAreaElement
  target.style.height = 'auto'
  const newHeight = Math.min(target.scrollHeight, 200)
  target.style.height = `${newHeight}px`
}

// Auto-grow on mount
onMounted(() => {
  nextTick(() => {
    if (descRef.value) autoGrowDesc({ target: descRef.value } as any)
  })
})

// Auto-grow each time dialog opens
watch(internalDialogOpen, open => {
   if (!open) return
   // 1) Reset the localTask snapshot to the latest props.task
   if (props.task) {
    // shallow‐clone so File instances aren’t lost
    const t = props.task
    const copy: any = {
      ...t,
      subtasks:       [...(t.subtasks       || [])],
      attachments:    [...(t.attachments    || [])],
      autostart:      [...(t.autostart      || [])],
      ai_attachments: [...(t.ai_attachments || [])],
      comments:       (t.comments || []).map(x =>
        typeof x === 'string' ? { text: x, date: new Date() } : { ...x }
      ),
    }
    localTask.value = copy
  } else {
     // If no task, clear out any previous edits
     localTask.value = {
       title:       '',
       description: '',
       subtasks:    [],
       attachments: [],
       autostart:   [],
       ai_attachments: [],
       comments:    [],
       assignee:    '',
       priority:    '',
       dueDate:     '',
     }
   }
   // 2) Then auto-grow the textarea as before
   nextTick(() => {
     if (descRef.value) autoGrowDesc({ target: descRef.value } as any)
   })
 })


const formattedDate = computed({
  get() {
    return localTask.value?.dueDate
      ? new Date(localTask.value.dueDate).toLocaleDateString(undefined, {
          day: 'numeric', month: 'short', year: 'numeric'
        })
      : ''
  },
  set(v: string) {
    localTask.value.dueDate = new Date(v).toISOString().split('T')[0]
  }
})

function closeDialog() {
  emit('update:modelValue', false)
}
function save() {
  if (localTask.value) {
    emit('save-task', localTask.value)
    closeDialog()
  }
}
function addSubtask() {
  localTask.value.subtasks.push('')
}
function removeSubtask(i: number) {
  localTask.value.subtasks.splice(i, 1)
}
function submitComment() {
  if (newComment.value.trim()) {
    localTask.value.comments.push({ text: newComment.value.trim(), date: new Date() })
    newComment.value = ''
  }
}
function formatDateShort(d: any) {
  return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.dialog-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.rounded-xl { border-radius: 1rem; }
.border-md  { border: 1px solid #ddd; }

.dialog-header {
  background: transparent;
  border-bottom: none;
  align-items: center;
}
.header-title   { font-size: 1rem; }
.header-action-btn { margin-left: 4px; }

.dialog-body {
  display: flex;
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 16px;
}
.column-left, .column-right {
  display: flex;
  flex-direction: column;
}
.column-left { flex: 3; }
.column-right { flex: 1; }

.vertical-divider {
  width: 1px;
  background: #eee;
  margin: 0 16px;
  align-self: stretch;
  height: 100%;
}

.small-gap { margin-bottom: 4px; }
.input-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(0,0,0,0.6);
}

.custom-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 24px;
  padding: 4px 12px;
  background: white;
  transition: border-color 0.2s;
}
.custom-input-wrapper:focus-within {
  border-color: #1976d2;
}
.custom-input {
  width: 100%;
  font-size: 13px;
  border: none;
  outline: none;
  background: transparent;
  padding: 6px 0;
  resize: none;
  appearance: none;
}

.select-wrapper::after {
  content: '▼';
  position: absolute;
  right: 12px;
  pointer-events: none;
  font-size: 10px;
  color: #888;
}

.subtasks-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.subtask-wrapper {
  padding-right: 24px;
}
.subtask-delete-btn {
  position: absolute;
  right: 4px;
  background: transparent;
  border: none;
}

.description-textarea {
  overflow-y: auto;
  max-height: 200px;
  resize: none;
}

.comment-wrapper { border-radius: 1rem; }

.comments-list {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.comment-block {
  background: #f9f9f9;
  padding: 8px 8px 24px; /* bottom-space for timestamp */
  border-radius: 12px;
  position: relative;
  word-break: break-word;
}
.comment-author { font-size: 0.75rem; font-weight: 600; color: #1976d2; }
.comment-text   { font-size: 13px; }
.comment-ts     {
  position: absolute;
  bottom: 4px;
  right: 8px;
  font-size: 0.65rem;
  color: rgba(0,0,0,0.5);
}

.dialog-footer.minimized {
  padding: 4px;
  min-height: 24px;
  border-top: 1px solid #eee;
}
.delete-btn { color: #e53935; }
</style>
