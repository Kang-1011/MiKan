import { ref } from 'vue'

// --- Mock Data Generator Helpers ---
const assignees = ['Alice', 'Bob', 'Charlie', 'Diana', 'Grace', 'Hani']
const priorities = ['Low', 'Medium', 'High', 'Critical']
const reporters = ['Rohimi', 'Fazli', 'Sarah', 'John']

// Autostart link pools
const googleLinks = [
  { name: 'Gamuda HQ Directions', url: 'https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters', type: 'link' },
  { name: 'KLCC Office Directions', url: 'https://www.google.com/maps/dir/?api=1&destination=KLCC', type: 'link' }
]
const articleLinks = [
  { name: 'Design Best Practices', url: 'https://uxdesign.cc/best-practices', type: 'article' },
  { name: 'API Security Guide', url: 'https://api.security.example.com/guide', type: 'article' }
]

// Sample descriptions and comments
const sampleDescriptions = [
  'Conduct initial research and gather all relevant data for analysis.',
  'Draft the first version and circulate for team feedback to ensure alignment.',
  'Iterate based on stakeholder input and refine deliverables accordingly.',
  'Validate results against project requirements and quality standards.',
  'Document findings and prepare the final presentation deck.'
]
const sampleSubtasks = [
  'Create wireframe mockup',
  'Review with design team',
  'Write unit tests',
  'Deploy to staging',
  'Collect user feedback',
  'Optimize performance'
]
const sampleComments = [
  'Looks good to me.',
  'Please update the documentation section.',
  'I have a few suggestions; see inline comments.',
  'Great work, let’s move this forward.',
  'Can we revisit the timeline for this?'  
]

let nextTaskId = 500
function genId() { return nextTaskId++ }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)] }

function generateTasks(count, stageTitle) {
  const tasks = []
  for (let i = 0; i < count; i++) {
    const id = genId()
    const assignee = randomItem(assignees)
    const priority = randomItem(priorities)
    const dueOffset = randomInt(1, 30)
    const dueDate = new Date(Date.now() + dueOffset * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const title = `${stageTitle} Task ${i + 1}`

    // Description: 1-5 sentences
    const descCount = randomInt(1, 5)
    const description = Array.from({ length: descCount })
      .map(() => randomItem(sampleDescriptions))
      .join(' ')

    // Subtasks: 2-5
    const subCount = randomInt(2, 5)
    const subtasks = Array.from({ length: subCount })
      .map((_, j) => randomItem(sampleSubtasks))

    // Comments: 2-5
    const commCount = randomInt(2, 5)
    const comments = Array.from({ length: commCount })
      .map(() => ({ text: randomItem(sampleComments), date: new Date().toISOString() }))

    // Attachments: 1-3 links
    const attachCount = randomInt(1, 3)
    const attachments = Array.from({ length: attachCount })
      .map(() => ({ name: `${title}.pdf`, url: `https://example.com/files/${id}.pdf`, size: randomInt(50, 500) * 1024, type: 'link' }))

    // AI Attachments: 1-2 suggestions
    const aiCount = randomInt(1, 2)
    const ai_attachments = Array.from({ length: aiCount })
      .map(() => ({ name: `AI Suggestion ${id}`, url: `https://ai.example.com/suggest/${id}`, type: 'link' }))

    // Autostart: mix of google & article links, 1-2
    const autoCount = randomInt(1, 2)
    const autostart = Array.from({ length: autoCount })
      .map(() => randomItem([...googleLinks, ...articleLinks]))

    tasks.push({
      id,
      title,
      assignee,
      dueDate,
      priority,
      description,
      comments,
      attachments,
      ai_attachments,
      autostart,
      subtasks,
      reporter: randomItem(reporters)
    })
  }
  return tasks
}

export const boards = ref([
  {
    id: 1,
    title: 'Website Redesign',
    stages: [
      { id: 101, title: 'Backlog',     tasks: generateTasks(5, 'Backlog') },
      { id: 102, title: 'To Do',       tasks: generateTasks(6, 'To Do') },
      { id: 103, title: 'In Progress', tasks: generateTasks(7, 'In Progress') },
      { id: 104, title: 'QA',          tasks: generateTasks(4, 'QA') },
      { id: 105, title: 'Done',        tasks: generateTasks(3, 'Done') }
    ]
  },
  {
    id: 2,
    title: 'API Integration',
    stages: [
      { id: 201, title: 'Backlog',     tasks: generateTasks(6, 'Backlog') },
      { id: 202, title: 'To Do',       tasks: generateTasks(5, 'To Do') },
      { id: 203, title: 'In Progress', tasks: generateTasks(4, 'In Progress') },
      { id: 204, title: 'QA',          tasks: generateTasks(3, 'QA') },
      { id: 205, title: 'Done',        tasks: generateTasks(2, 'Done') }
    ]
  },
  {
    id: 3,
    title: 'Mobile App Launch',
    stages: [
      { id: 301, title: 'Backlog',     tasks: generateTasks(7, 'Backlog') },
      { id: 302, title: 'To Do',       tasks: generateTasks(6, 'To Do') },
      { id: 303, title: 'In Progress', tasks: generateTasks(5, 'In Progress') },
      { id: 304, title: 'QA',          tasks: generateTasks(4, 'QA') },
      { id: 305, title: 'Done',        tasks: generateTasks(3, 'Done') }
    ]
  }
])
