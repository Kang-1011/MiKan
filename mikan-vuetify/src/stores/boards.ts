import { ref } from 'vue'

export const boards = ref([
    {
      id: 1,
      title: "Website Redesign",
      stages: [
        {
          id: 2,
          title: "Backlog",
          tasks: [
            {
              id: 3,
              title: "User Persona Research",
              assignee: "Diana",
              dueDate: "2025-06-10",
              priority: "Low",
              description: "Compile research into potential user personas and behaviors",
              comments: [],
              attachments: [
                { name: "Design Doc", url: "https://example.com/doc.pdf", size: 0, type: "link" }
              ],
              ai_attachments: [
                { name: "AI Suggestion 1", url: "https://ai.example.com/suggestion/1", type: "link" },
                { name: "AI-Generated Diagram", url: "https://ai.example.com/diagram.svg", type: "image" }
              ],
              autostart: [
                { name: "Auto-Task Rule 1", url: "", type: "autostart" },
                { name: "Auto-Report Script", url: "https://scripts.example.com/report.sh", size: 1024, type: "script" }
              ],
              subtasks: [],
              reporter: "Rohimi"
            }
          ]
        },
        {
          id: 4,
          title: "To Do",
          tasks: [
            {
              id: 5,
              title: "Wireframes",
              assignee: "Alice",
              dueDate: "2025-06-01",
              priority: "High",
              description: "There is a lot of stuff that needs to get done here",
              comments: [],
              attachments: [],
              ai_attachments: [],
              autostart: [],
              subtasks: [],
              reporter: "Rohimi"
            },
            {
              id: 6,
              title: "Assets",
              assignee: "Bob",
              dueDate: "2025-06-02",
              priority: "Medium",
              description: "Gather logos, brand colors, and image assets from marketing",
              comments: [],
              attachments: [],
              ai_attachments: [],
              autostart: [],
              subtasks: [],
              reporter: "Rohimi"
            }
          ]
        },
        {
          id: 7,
          title: "QA",
          tasks: [
            {
              id: 8,
              title: "Responsive Check",
              assignee: "Eliza",
              dueDate: "2025-06-09",
              priority: "Medium",
              description: "Ensure pages render well across phone, tablet, and desktop sizes",
              comments: [],
              attachments: [],
              ai_attachments: [],
              autostart: [],
              subtasks: [],
              reporter: "Rohimi"
            }
          ]
        },
        {
          id: 9,
          title: "Done",
          tasks: [
            {
              id: 10,
              title: "Audit UI",
              assignee: "Charlie",
              dueDate: "2025-05-20",
              priority: "Low",
              description: "Review completed UI components for design consistency",
              comments: [],
              attachments: [],
              ai_attachments: [],
              autostart: [],
              subtasks: [],
              reporter: "Rohimi"
            }
          ]
        }
      ]
    },
    {
      id: 11,
      title: "API Integration",
      stages: [
        {
          id: 12,
          title: "To Do",
          tasks: [
            {
              id: 13,
              title: "Design Schema",
              assignee: "Frank",
              dueDate: "2025-06-05",
              priority: "High",
              description: "Draft API request and response structure for key endpoints",
              comments: [],
              attachments: [],
              ai_attachments: [],
              autostart: [],
              subtasks: [],
              reporter: "Fazli"
            },
            {
              id: 14,
              title: "Setup Swagger Docs",
              assignee: "Grace",
              dueDate: "2025-06-06",
              priority: "Medium",
              description: "Document endpoints with auto-generated Swagger UI",
              comments: [],
              attachments: [],
              ai_attachments: [],
              autostart: [],
              subtasks: [],
              reporter: "Fazli"
            }
          ]
        },
        {
          id: 15,
          title: "In Progress",
          tasks: [
            {
              id: 16,
              title: "Auth Middleware",
              assignee: "Grace",
              dueDate: "2025-05-30",
              priority: "Critical",
              description: "Implement login verification and token refresh logic",
              comments: [],
              attachments: [],
              ai_attachments: [],
              autostart: [],
              subtasks: [],
              reporter: "Fazli"
            },
            {
              id: 17,
              title: "Rate Limiting",
              assignee: "Bob",
              dueDate: "2025-06-03",
              priority: "High",
              description: "Protect endpoints by capping request frequency",
              comments: [],
              attachments: [],
              ai_attachments: [],
              autostart: [],
              subtasks: [],
              reporter: "Fazli"
            }
          ]
        },
        {
          id: 18,
          title: "Blocked",
          tasks: [
            {
              id: 19,
              title: "Payment Gateway",
              assignee: "Hani",
              dueDate: "2025-06-08",
              priority: "High",
              description: "Integration paused due to missing API keys from provider",
              comments: [],
              attachments: [],
              ai_attachments: [],
              autostart: [],
              subtasks: [],
              reporter: "Fazli"
            }
          ]
        }
      ]
    }
    ])
    

// export const boards = ref([
//     {
//       id: genId(),
//       title: "Website Redesign",
//       stages: [
//         {
//           id: genId(),
//           title: "Backlog",
//           tasks: [
//             {
//               id: genId(),
//               title: "User Persona Research",
//               assignee: "Diana",
//               dueDate: "2025-06-10",
//               priority: "Low",
//               description: "Compile research into potential user personas and behaviors",
//               comments: [],
//               attachments: [],
//               ai_attachments: [],
//               autostart: [],
//               subtasks: [],
//               reporter: "Rohimi"
//             }
//           ]
//         },
//         {
//           id: genId(),
//           title: "To Do",
//           tasks: [
//             {
//               id: genId(),
//               title: "Wireframes",
//               assignee: "Alice",
//               dueDate: "2025-06-01",
//               priority: "High",
//               description: "There is a lot of stuff that needs to get done here",
//               comments: [],
//               attachments: [],
//               ai_attachments: [],
//               autostart: [],
//               subtasks: [],
//               reporter: "Rohimi"
//             },
//             {
//               id: genId(),
//               title: "Assets",
//               assignee: "Bob",
//               dueDate: "2025-06-02",
//               priority: "Medium",
//               description: "Gather logos, brand colors, and image assets from marketing",
//               comments: [],
//               attachments: [],
//               ai_attachments: [],
//               autostart: [],
//               subtasks: [],
//               reporter: "Rohimi"
//             }
//           ]
//         },
//         {
//           id: genId(),
//           title: "QA",
//           tasks: [
//             {
//               id: genId(),
//               title: "Responsive Check",
//               assignee: "Eliza",
//               dueDate: "2025-06-09",
//               priority: "Medium",
//               description: "Ensure pages render well across phone, tablet, and desktop sizes",
//               comments: [],
//               attachments: [],
//               ai_attachments: [],
//               autostart: [],
//               subtasks: [],
//               reporter: "Rohimi"
//             }
//           ]
//         },
//         {
//           id: genId(),
//           title: "Done",
//           tasks: [
//             {
//               id: genId(),
//               title: "Audit UI",
//               assignee: "Charlie",
//               dueDate: "2025-05-20",
//               priority: "Low",
//               description: "Review completed UI components for design consistency",
//               comments: [],
//               attachments: [],
//               ai_attachments: [],
//               autostart: [],
//               subtasks: [],
//               reporter: "Rohimi"
//             }
//           ]
//         }
//       ]
//     },
//     {
//       id: genId(),
//       title: "API Integration",
//       stages: [
//         {
//           id: genId(),
//           title: "To Do",
//           tasks: [
//             {
//               id: genId(),
//               title: "Design Schema",
//               assignee: "Frank",
//               dueDate: "2025-06-05",
//               priority: "High",
//               description: "Draft API request and response structure for key endpoints",
//               comments: [],
//               attachments: [],
//               ai_attachments: [],
//               autostart: [],
//               subtasks: [],
//               reporter: "Fazli"
//             },
//             {
//               id: genId(),
//               title: "Setup Swagger Docs",
//               assignee: "Grace",
//               dueDate: "2025-06-06",
//               priority: "Medium",
//               description: "Document endpoints with auto-generated Swagger UI",
//               comments: [],
//               attachments: [],
//               ai_attachments: [],
//               autostart: [],
//               subtasks: [],
//               reporter: "Fazli"
//             }
//           ]
//         },
//         {
//           id: genId(),
//           title: "In Progress",
//           tasks: [
//             {
//               id: genId(),
//               title: "Auth Middleware",
//               assignee: "Grace",
//               dueDate: "2025-05-30",
//               priority: "Critical",
//               description: "Implement login verification and token refresh logic",
//               comments: [],
//               attachments: [],
//               ai_attachments: [],
//               autostart: [],
//               subtasks: [],
//               reporter: "Fazli"
//             },
//             {
//               id: genId(),
//               title: "Rate Limiting",
//               assignee: "Bob",
//               dueDate: "2025-06-03",
//               priority: "High",
//               description: "Protect endpoints by capping request frequency",
//               comments: [],
//               attachments: [],
//               ai_attachments: [],
//               autostart: [],
//               subtasks: [],
//               reporter: "Fazli"
//             }
//           ]
//         },
//         {
//           id: genId(),
//           title: "Blocked",
//           tasks: [
//             {
//               id: genId(),
//               title: "Payment Gateway",
//               assignee: "Hani",
//               dueDate: "2025-06-08",
//               priority: "High",
//               description: "Integration paused due to missing API keys from provider",
//               comments: [],
//               attachments: [],
//               ai_attachments: [],
//               autostart: [],
//               subtasks: [],
//               reporter: "Fazli"
//             }
//           ]
//         }
//       ]
//     }
//     ])
    