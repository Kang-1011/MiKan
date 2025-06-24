import { ref } from 'vue'


export const boards = ref(
[
  {
    id: 1,
    title: "Website Redesign",
    stages: [
      {
        id: 101,
        title: "Backlog",
        tasks: [
          {
            id: 500,
            title: "Backlog Task 1",
            assignee: "Alice",
            dueDate: "2025-07-21",
            priority: "Low",
            description: "Iterate based on stakeholder input and refine deliverables accordingly. Validate results against project requirements and quality standards. Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.224Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.224Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 1.pdf",
                url: "https://example.com/files/500.pdf",
                size: 436224,
                type: "link"
              },
              {
                name: "Backlog Task 1.pdf",
                url: "https://example.com/files/500.pdf",
                size: 80896,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 500",
                url: "https://ai.example.com/suggest/500",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Review with design team",
              "Collect user feedback",
              "Optimize performance"
            ],
            reporter: "Fazli"
          },
          {
            id: 501,
            title: "Backlog Task 2",
            assignee: "Grace",
            dueDate: "2025-07-13",
            priority: "Critical",
            description: "Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.224Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.224Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 2.pdf",
                url: "https://example.com/files/501.pdf",
                size: 126976,
                type: "link"
              },
              {
                name: "Backlog Task 2.pdf",
                url: "https://example.com/files/501.pdf",
                size: 58368,
                type: "link"
              },
              {
                name: "Backlog Task 2.pdf",
                url: "https://example.com/files/501.pdf",
                size: 51200,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 501",
                url: "https://ai.example.com/suggest/501",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Deploy to staging",
              "Review with design team"
            ],
            reporter: "Sarah"
          },
          {
            id: 502,
            title: "Backlog Task 3",
            assignee: "Diana",
            dueDate: "2025-07-02",
            priority: "High",
            description: "Iterate based on stakeholder input and refine deliverables accordingly. Document findings and prepare the final presentation deck. Conduct initial research and gather all relevant data for analysis. Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 3.pdf",
                url: "https://example.com/files/502.pdf",
                size: 140288,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 502",
                url: "https://ai.example.com/suggest/502",
                type: "link"
              },
              {
                name: "AI Suggestion 502",
                url: "https://ai.example.com/suggest/502",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              }
            ],
            subtasks: [
              "Create wireframe mockup",
              "Create wireframe mockup",
              "Review with design team",
              "Deploy to staging"
            ],
            reporter: "John"
          },
          {
            id: 503,
            title: "Backlog Task 4",
            assignee: "Diana",
            dueDate: "2025-07-02",
            priority: "Low",
            description: "Draft the first version and circulate for team feedback to ensure alignment. Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 4.pdf",
                url: "https://example.com/files/503.pdf",
                size: 349184,
                type: "link"
              },
              {
                name: "Backlog Task 4.pdf",
                url: "https://example.com/files/503.pdf",
                size: 163840,
                type: "link"
              },
              {
                name: "Backlog Task 4.pdf",
                url: "https://example.com/files/503.pdf",
                size: 295936,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 503",
                url: "https://ai.example.com/suggest/503",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              },
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              }
            ],
            subtasks: [
              "Collect user feedback",
              "Create wireframe mockup",
              "Review with design team",
              "Optimize performance"
            ],
            reporter: "John"
          },
          {
            id: 504,
            title: "Backlog Task 5",
            assignee: "Bob",
            dueDate: "2025-07-05",
            priority: "Medium",
            description: "Validate results against project requirements and quality standards. Draft the first version and circulate for team feedback to ensure alignment. Validate results against project requirements and quality standards. Draft the first version and circulate for team feedback to ensure alignment. Document findings and prepare the final presentation deck.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 5.pdf",
                url: "https://example.com/files/504.pdf",
                size: 97280,
                type: "link"
              },
              {
                name: "Backlog Task 5.pdf",
                url: "https://example.com/files/504.pdf",
                size: 209920,
                type: "link"
              },
              {
                name: "Backlog Task 5.pdf",
                url: "https://example.com/files/504.pdf",
                size: 225280,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 504",
                url: "https://ai.example.com/suggest/504",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Create wireframe mockup",
              "Deploy to staging"
            ],
            reporter: "John"
          }
        ]
      },
      {
        id: 102,
        title: "To Do",
        tasks: [
          {
            id: 505,
            title: "To Do Task 1",
            assignee: "Alice",
            dueDate: "2025-07-22",
            priority: "Low",
            description: "Document findings and prepare the final presentation deck.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 1.pdf",
                url: "https://example.com/files/505.pdf",
                size: 415744,
                type: "link"
              },
              {
                name: "To Do Task 1.pdf",
                url: "https://example.com/files/505.pdf",
                size: 464896,
                type: "link"
              },
              {
                name: "To Do Task 1.pdf",
                url: "https://example.com/files/505.pdf",
                size: 358400,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 505",
                url: "https://ai.example.com/suggest/505",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Create wireframe mockup",
              "Review with design team",
              "Deploy to staging",
              "Create wireframe mockup",
              "Deploy to staging"
            ],
            reporter: "Rohimi"
          },
          {
            id: 506,
            title: "To Do Task 2",
            assignee: "Grace",
            dueDate: "2025-07-02",
            priority: "Low",
            description: "Draft the first version and circulate for team feedback to ensure alignment. Validate results against project requirements and quality standards. Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 2.pdf",
                url: "https://example.com/files/506.pdf",
                size: 425984,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 506",
                url: "https://ai.example.com/suggest/506",
                type: "link"
              },
              {
                name: "AI Suggestion 506",
                url: "https://ai.example.com/suggest/506",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Collect user feedback",
              "Review with design team",
              "Review with design team"
            ],
            reporter: "John"
          },
          {
            id: 507,
            title: "To Do Task 3",
            assignee: "Diana",
            dueDate: "2025-07-06",
            priority: "Medium",
            description: "Conduct initial research and gather all relevant data for analysis. Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 3.pdf",
                url: "https://example.com/files/507.pdf",
                size: 353280,
                type: "link"
              },
              {
                name: "To Do Task 3.pdf",
                url: "https://example.com/files/507.pdf",
                size: 241664,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 507",
                url: "https://ai.example.com/suggest/507",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Create wireframe mockup",
              "Optimize performance"
            ],
            reporter: "Fazli"
          },
          {
            id: 508,
            title: "To Do Task 4",
            assignee: "Alice",
            dueDate: "2025-07-09",
            priority: "Critical",
            description: "Iterate based on stakeholder input and refine deliverables accordingly. Validate results against project requirements and quality standards. Validate results against project requirements and quality standards. Document findings and prepare the final presentation deck. Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 4.pdf",
                url: "https://example.com/files/508.pdf",
                size: 415744,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 508",
                url: "https://ai.example.com/suggest/508",
                type: "link"
              },
              {
                name: "AI Suggestion 508",
                url: "https://ai.example.com/suggest/508",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Collect user feedback",
              "Collect user feedback"
            ],
            reporter: "Rohimi"
          },
          {
            id: 509,
            title: "To Do Task 5",
            assignee: "Diana",
            dueDate: "2025-07-22",
            priority: "High",
            description: "Document findings and prepare the final presentation deck. Validate results against project requirements and quality standards. Validate results against project requirements and quality standards. Validate results against project requirements and quality standards. Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 5.pdf",
                url: "https://example.com/files/509.pdf",
                size: 240640,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 509",
                url: "https://ai.example.com/suggest/509",
                type: "link"
              },
              {
                name: "AI Suggestion 509",
                url: "https://ai.example.com/suggest/509",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              },
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Review with design team"
            ],
            reporter: "John"
          },
          {
            id: 510,
            title: "To Do Task 6",
            assignee: "Bob",
            dueDate: "2025-07-01",
            priority: "Medium",
            description: "Iterate based on stakeholder input and refine deliverables accordingly.",
            comments: [
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 6.pdf",
                url: "https://example.com/files/510.pdf",
                size: 262144,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 510",
                url: "https://ai.example.com/suggest/510",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              }
            ],
            subtasks: [
              "Review with design team",
              "Write unit tests",
              "Collect user feedback"
            ],
            reporter: "Fazli"
          }
        ]
      },
      {
        id: 103,
        title: "In Progress",
        tasks: [
          {
            id: 511,
            title: "In Progress Task 1",
            assignee: "Grace",
            dueDate: "2025-07-16",
            priority: "Low",
            description: "Conduct initial research and gather all relevant data for analysis. Conduct initial research and gather all relevant data for analysis. Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 1.pdf",
                url: "https://example.com/files/511.pdf",
                size: 486400,
                type: "link"
              },
              {
                name: "In Progress Task 1.pdf",
                url: "https://example.com/files/511.pdf",
                size: 302080,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 511",
                url: "https://ai.example.com/suggest/511",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              }
            ],
            subtasks: [
              "Deploy to staging",
              "Deploy to staging",
              "Collect user feedback",
              "Deploy to staging"
            ],
            reporter: "Sarah"
          },
          {
            id: 512,
            title: "In Progress Task 2",
            assignee: "Alice",
            dueDate: "2025-07-21",
            priority: "Low",
            description: "Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 2.pdf",
                url: "https://example.com/files/512.pdf",
                size: 266240,
                type: "link"
              },
              {
                name: "In Progress Task 2.pdf",
                url: "https://example.com/files/512.pdf",
                size: 167936,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 512",
                url: "https://ai.example.com/suggest/512",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              },
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Collect user feedback"
            ],
            reporter: "Sarah"
          },
          {
            id: 513,
            title: "In Progress Task 3",
            assignee: "Charlie",
            dueDate: "2025-07-03",
            priority: "Critical",
            description: "Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 3.pdf",
                url: "https://example.com/files/513.pdf",
                size: 167936,
                type: "link"
              },
              {
                name: "In Progress Task 3.pdf",
                url: "https://example.com/files/513.pdf",
                size: 500736,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 513",
                url: "https://ai.example.com/suggest/513",
                type: "link"
              },
              {
                name: "AI Suggestion 513",
                url: "https://ai.example.com/suggest/513",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Review with design team",
              "Deploy to staging",
              "Write unit tests",
              "Create wireframe mockup"
            ],
            reporter: "John"
          },
          {
            id: 514,
            title: "In Progress Task 4",
            assignee: "Charlie",
            dueDate: "2025-07-16",
            priority: "Medium",
            description: "Validate results against project requirements and quality standards. Conduct initial research and gather all relevant data for analysis. Document findings and prepare the final presentation deck.",
            comments: [
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 4.pdf",
                url: "https://example.com/files/514.pdf",
                size: 233472,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 514",
                url: "https://ai.example.com/suggest/514",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Deploy to staging",
              "Collect user feedback",
              "Optimize performance",
              "Collect user feedback",
              "Write unit tests"
            ],
            reporter: "John"
          },
          {
            id: 515,
            title: "In Progress Task 5",
            assignee: "Diana",
            dueDate: "2025-07-15",
            priority: "Low",
            description: "Conduct initial research and gather all relevant data for analysis. Draft the first version and circulate for team feedback to ensure alignment. Conduct initial research and gather all relevant data for analysis. Conduct initial research and gather all relevant data for analysis. Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 5.pdf",
                url: "https://example.com/files/515.pdf",
                size: 208896,
                type: "link"
              },
              {
                name: "In Progress Task 5.pdf",
                url: "https://example.com/files/515.pdf",
                size: 60416,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 515",
                url: "https://ai.example.com/suggest/515",
                type: "link"
              },
              {
                name: "AI Suggestion 515",
                url: "https://ai.example.com/suggest/515",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              },
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Deploy to staging"
            ],
            reporter: "John"
          },
          {
            id: 516,
            title: "In Progress Task 6",
            assignee: "Grace",
            dueDate: "2025-07-20",
            priority: "High",
            description: "Validate results against project requirements and quality standards. Document findings and prepare the final presentation deck. Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 6.pdf",
                url: "https://example.com/files/516.pdf",
                size: 475136,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 516",
                url: "https://ai.example.com/suggest/516",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              },
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Collect user feedback",
              "Optimize performance"
            ],
            reporter: "Fazli"
          },
          {
            id: 517,
            title: "In Progress Task 7",
            assignee: "Hani",
            dueDate: "2025-07-24",
            priority: "High",
            description: "Draft the first version and circulate for team feedback to ensure alignment. Document findings and prepare the final presentation deck. Iterate based on stakeholder input and refine deliverables accordingly. Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 7.pdf",
                url: "https://example.com/files/517.pdf",
                size: 333824,
                type: "link"
              },
              {
                name: "In Progress Task 7.pdf",
                url: "https://example.com/files/517.pdf",
                size: 147456,
                type: "link"
              },
              {
                name: "In Progress Task 7.pdf",
                url: "https://example.com/files/517.pdf",
                size: 68608,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 517",
                url: "https://ai.example.com/suggest/517",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              },
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              }
            ],
            subtasks: [
              "Create wireframe mockup",
              "Optimize performance",
              "Review with design team",
              "Collect user feedback",
              "Optimize performance"
            ],
            reporter: "John"
          }
        ]
      },
      {
        id: 104,
        title: "QA",
        tasks: [
          {
            id: 518,
            title: "QA Task 1",
            assignee: "Hani",
            dueDate: "2025-07-03",
            priority: "Medium",
            description: "Document findings and prepare the final presentation deck. Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "QA Task 1.pdf",
                url: "https://example.com/files/518.pdf",
                size: 497664,
                type: "link"
              },
              {
                name: "QA Task 1.pdf",
                url: "https://example.com/files/518.pdf",
                size: 366592,
                type: "link"
              },
              {
                name: "QA Task 1.pdf",
                url: "https://example.com/files/518.pdf",
                size: 424960,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 518",
                url: "https://ai.example.com/suggest/518",
                type: "link"
              },
              {
                name: "AI Suggestion 518",
                url: "https://ai.example.com/suggest/518",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Optimize performance",
              "Review with design team"
            ],
            reporter: "John"
          },
          {
            id: 519,
            title: "QA Task 2",
            assignee: "Grace",
            dueDate: "2025-06-30",
            priority: "Low",
            description: "Iterate based on stakeholder input and refine deliverables accordingly. Document findings and prepare the final presentation deck. Conduct initial research and gather all relevant data for analysis. Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "QA Task 2.pdf",
                url: "https://example.com/files/519.pdf",
                size: 482304,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 519",
                url: "https://ai.example.com/suggest/519",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Create wireframe mockup",
              "Review with design team",
              "Create wireframe mockup"
            ],
            reporter: "Sarah"
          },
          {
            id: 520,
            title: "QA Task 3",
            assignee: "Charlie",
            dueDate: "2025-07-13",
            priority: "Low",
            description: "Iterate based on stakeholder input and refine deliverables accordingly. Iterate based on stakeholder input and refine deliverables accordingly. Draft the first version and circulate for team feedback to ensure alignment. Conduct initial research and gather all relevant data for analysis. Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "QA Task 3.pdf",
                url: "https://example.com/files/520.pdf",
                size: 182272,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 520",
                url: "https://ai.example.com/suggest/520",
                type: "link"
              },
              {
                name: "AI Suggestion 520",
                url: "https://ai.example.com/suggest/520",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Review with design team",
              "Optimize performance"
            ],
            reporter: "Sarah"
          },
          {
            id: 521,
            title: "QA Task 4",
            assignee: "Bob",
            dueDate: "2025-06-29",
            priority: "High",
            description: "Document findings and prepare the final presentation deck. Iterate based on stakeholder input and refine deliverables accordingly.",
            comments: [
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "QA Task 4.pdf",
                url: "https://example.com/files/521.pdf",
                size: 231424,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 521",
                url: "https://ai.example.com/suggest/521",
                type: "link"
              },
              {
                name: "AI Suggestion 521",
                url: "https://ai.example.com/suggest/521",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Collect user feedback",
              "Collect user feedback",
              "Optimize performance"
            ],
            reporter: "Sarah"
          }
        ]
      },
      {
        id: 105,
        title: "Done",
        tasks: [
          {
            id: 522,
            title: "Done Task 1",
            assignee: "Grace",
            dueDate: "2025-07-23",
            priority: "Low",
            description: "Document findings and prepare the final presentation deck. Document findings and prepare the final presentation deck. Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Done Task 1.pdf",
                url: "https://example.com/files/522.pdf",
                size: 100352,
                type: "link"
              },
              {
                name: "Done Task 1.pdf",
                url: "https://example.com/files/522.pdf",
                size: 142336,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 522",
                url: "https://ai.example.com/suggest/522",
                type: "link"
              },
              {
                name: "AI Suggestion 522",
                url: "https://ai.example.com/suggest/522",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Create wireframe mockup",
              "Write unit tests",
              "Deploy to staging",
              "Deploy to staging"
            ],
            reporter: "Sarah"
          },
          {
            id: 523,
            title: "Done Task 2",
            assignee: "Hani",
            dueDate: "2025-06-29",
            priority: "Medium",
            description: "Validate results against project requirements and quality standards. Validate results against project requirements and quality standards. Conduct initial research and gather all relevant data for analysis. Validate results against project requirements and quality standards. Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Done Task 2.pdf",
                url: "https://example.com/files/523.pdf",
                size: 414720,
                type: "link"
              },
              {
                name: "Done Task 2.pdf",
                url: "https://example.com/files/523.pdf",
                size: 238592,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 523",
                url: "https://ai.example.com/suggest/523",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              },
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Collect user feedback",
              "Collect user feedback",
              "Write unit tests"
            ],
            reporter: "Fazli"
          },
          {
            id: 524,
            title: "Done Task 3",
            assignee: "Charlie",
            dueDate: "2025-07-20",
            priority: "Low",
            description: "Draft the first version and circulate for team feedback to ensure alignment. Iterate based on stakeholder input and refine deliverables accordingly. Draft the first version and circulate for team feedback to ensure alignment. Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Done Task 3.pdf",
                url: "https://example.com/files/524.pdf",
                size: 91136,
                type: "link"
              },
              {
                name: "Done Task 3.pdf",
                url: "https://example.com/files/524.pdf",
                size: 258048,
                type: "link"
              },
              {
                name: "Done Task 3.pdf",
                url: "https://example.com/files/524.pdf",
                size: 375808,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 524",
                url: "https://ai.example.com/suggest/524",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              }
            ],
            subtasks: [
              "Review with design team",
              "Create wireframe mockup",
              "Deploy to staging",
              "Deploy to staging",
              "Write unit tests"
            ],
            reporter: "Rohimi"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "API Integration",
    stages: [
      {
        id: 201,
        title: "Backlog",
        tasks: [
          {
            id: 525,
            title: "Backlog Task 1",
            assignee: "Grace",
            dueDate: "2025-07-14",
            priority: "Low",
            description: "Validate results against project requirements and quality standards. Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 1.pdf",
                url: "https://example.com/files/525.pdf",
                size: 325632,
                type: "link"
              },
              {
                name: "Backlog Task 1.pdf",
                url: "https://example.com/files/525.pdf",
                size: 227328,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 525",
                url: "https://ai.example.com/suggest/525",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              },
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              }
            ],
            subtasks: [
              "Review with design team",
              "Collect user feedback",
              "Review with design team"
            ],
            reporter: "Rohimi"
          },
          {
            id: 526,
            title: "Backlog Task 2",
            assignee: "Grace",
            dueDate: "2025-07-06",
            priority: "Critical",
            description: "Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 2.pdf",
                url: "https://example.com/files/526.pdf",
                size: 407552,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 526",
                url: "https://ai.example.com/suggest/526",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              },
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Deploy to staging",
              "Collect user feedback",
              "Collect user feedback",
              "Create wireframe mockup",
              "Deploy to staging"
            ],
            reporter: "Rohimi"
          },
          {
            id: 527,
            title: "Backlog Task 3",
            assignee: "Diana",
            dueDate: "2025-07-18",
            priority: "Critical",
            description: "Conduct initial research and gather all relevant data for analysis. Conduct initial research and gather all relevant data for analysis. Draft the first version and circulate for team feedback to ensure alignment. Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 3.pdf",
                url: "https://example.com/files/527.pdf",
                size: 315392,
                type: "link"
              },
              {
                name: "Backlog Task 3.pdf",
                url: "https://example.com/files/527.pdf",
                size: 110592,
                type: "link"
              },
              {
                name: "Backlog Task 3.pdf",
                url: "https://example.com/files/527.pdf",
                size: 260096,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 527",
                url: "https://ai.example.com/suggest/527",
                type: "link"
              },
              {
                name: "AI Suggestion 527",
                url: "https://ai.example.com/suggest/527",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Collect user feedback",
              "Review with design team"
            ],
            reporter: "John"
          },
          {
            id: 528,
            title: "Backlog Task 4",
            assignee: "Alice",
            dueDate: "2025-07-16",
            priority: "Low",
            description: "Draft the first version and circulate for team feedback to ensure alignment. Document findings and prepare the final presentation deck. Conduct initial research and gather all relevant data for analysis. Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 4.pdf",
                url: "https://example.com/files/528.pdf",
                size: 475136,
                type: "link"
              },
              {
                name: "Backlog Task 4.pdf",
                url: "https://example.com/files/528.pdf",
                size: 362496,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 528",
                url: "https://ai.example.com/suggest/528",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              }
            ],
            subtasks: [
              "Collect user feedback",
              "Collect user feedback",
              "Collect user feedback",
              "Collect user feedback",
              "Collect user feedback"
            ],
            reporter: "John"
          },
          {
            id: 529,
            title: "Backlog Task 5",
            assignee: "Hani",
            dueDate: "2025-07-11",
            priority: "Medium",
            description: "Draft the first version and circulate for team feedback to ensure alignment. Document findings and prepare the final presentation deck. Conduct initial research and gather all relevant data for analysis. Document findings and prepare the final presentation deck.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 5.pdf",
                url: "https://example.com/files/529.pdf",
                size: 161792,
                type: "link"
              },
              {
                name: "Backlog Task 5.pdf",
                url: "https://example.com/files/529.pdf",
                size: 259072,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 529",
                url: "https://ai.example.com/suggest/529",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              },
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              }
            ],
            subtasks: [
              "Deploy to staging",
              "Write unit tests",
              "Optimize performance",
              "Deploy to staging",
              "Optimize performance"
            ],
            reporter: "Sarah"
          },
          {
            id: 530,
            title: "Backlog Task 6",
            assignee: "Grace",
            dueDate: "2025-07-24",
            priority: "Critical",
            description: "Iterate based on stakeholder input and refine deliverables accordingly.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 6.pdf",
                url: "https://example.com/files/530.pdf",
                size: 136192,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 530",
                url: "https://ai.example.com/suggest/530",
                type: "link"
              },
              {
                name: "AI Suggestion 530",
                url: "https://ai.example.com/suggest/530",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              }
            ],
            subtasks: [
              "Create wireframe mockup",
              "Collect user feedback",
              "Collect user feedback",
              "Review with design team",
              "Write unit tests"
            ],
            reporter: "John"
          }
        ]
      },
      {
        id: 202,
        title: "To Do",
        tasks: [
          {
            id: 531,
            title: "To Do Task 1",
            assignee: "Hani",
            dueDate: "2025-07-13",
            priority: "Critical",
            description: "Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 1.pdf",
                url: "https://example.com/files/531.pdf",
                size: 77824,
                type: "link"
              },
              {
                name: "To Do Task 1.pdf",
                url: "https://example.com/files/531.pdf",
                size: 313344,
                type: "link"
              },
              {
                name: "To Do Task 1.pdf",
                url: "https://example.com/files/531.pdf",
                size: 218112,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 531",
                url: "https://ai.example.com/suggest/531",
                type: "link"
              },
              {
                name: "AI Suggestion 531",
                url: "https://ai.example.com/suggest/531",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Review with design team",
              "Write unit tests"
            ],
            reporter: "John"
          },
          {
            id: 532,
            title: "To Do Task 2",
            assignee: "Grace",
            dueDate: "2025-07-11",
            priority: "High",
            description: "Document findings and prepare the final presentation deck. Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 2.pdf",
                url: "https://example.com/files/532.pdf",
                size: 221184,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 532",
                url: "https://ai.example.com/suggest/532",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              }
            ],
            subtasks: [
              "Optimize performance",
              "Write unit tests",
              "Review with design team"
            ],
            reporter: "John"
          },
          {
            id: 533,
            title: "To Do Task 3",
            assignee: "Diana",
            dueDate: "2025-07-08",
            priority: "Low",
            description: "Draft the first version and circulate for team feedback to ensure alignment. Iterate based on stakeholder input and refine deliverables accordingly. Iterate based on stakeholder input and refine deliverables accordingly.",
            comments: [
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 3.pdf",
                url: "https://example.com/files/533.pdf",
                size: 114688,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 533",
                url: "https://ai.example.com/suggest/533",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              },
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              }
            ],
            subtasks: [
              "Optimize performance",
              "Write unit tests",
              "Write unit tests",
              "Write unit tests"
            ],
            reporter: "Sarah"
          },
          {
            id: 534,
            title: "To Do Task 4",
            assignee: "Hani",
            dueDate: "2025-07-09",
            priority: "Critical",
            description: "Iterate based on stakeholder input and refine deliverables accordingly.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 4.pdf",
                url: "https://example.com/files/534.pdf",
                size: 445440,
                type: "link"
              },
              {
                name: "To Do Task 4.pdf",
                url: "https://example.com/files/534.pdf",
                size: 375808,
                type: "link"
              },
              {
                name: "To Do Task 4.pdf",
                url: "https://example.com/files/534.pdf",
                size: 499712,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 534",
                url: "https://ai.example.com/suggest/534",
                type: "link"
              },
              {
                name: "AI Suggestion 534",
                url: "https://ai.example.com/suggest/534",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              },
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Review with design team",
              "Optimize performance"
            ],
            reporter: "Rohimi"
          },
          {
            id: 535,
            title: "To Do Task 5",
            assignee: "Alice",
            dueDate: "2025-07-24",
            priority: "High",
            description: "Conduct initial research and gather all relevant data for analysis. Validate results against project requirements and quality standards. Iterate based on stakeholder input and refine deliverables accordingly.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 5.pdf",
                url: "https://example.com/files/535.pdf",
                size: 424960,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 535",
                url: "https://ai.example.com/suggest/535",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Optimize performance",
              "Optimize performance",
              "Collect user feedback",
              "Optimize performance"
            ],
            reporter: "Rohimi"
          }
        ]
      },
      {
        id: 203,
        title: "In Progress",
        tasks: [
          {
            id: 536,
            title: "In Progress Task 1",
            assignee: "Hani",
            dueDate: "2025-07-15",
            priority: "Critical",
            description: "Iterate based on stakeholder input and refine deliverables accordingly. Conduct initial research and gather all relevant data for analysis. Document findings and prepare the final presentation deck. Validate results against project requirements and quality standards. Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 1.pdf",
                url: "https://example.com/files/536.pdf",
                size: 466944,
                type: "link"
              },
              {
                name: "In Progress Task 1.pdf",
                url: "https://example.com/files/536.pdf",
                size: 403456,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 536",
                url: "https://ai.example.com/suggest/536",
                type: "link"
              },
              {
                name: "AI Suggestion 536",
                url: "https://ai.example.com/suggest/536",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              }
            ],
            subtasks: [
              "Optimize performance",
              "Deploy to staging",
              "Optimize performance",
              "Create wireframe mockup"
            ],
            reporter: "Fazli"
          },
          {
            id: 537,
            title: "In Progress Task 2",
            assignee: "Grace",
            dueDate: "2025-07-06",
            priority: "Medium",
            description: "Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 2.pdf",
                url: "https://example.com/files/537.pdf",
                size: 146432,
                type: "link"
              },
              {
                name: "In Progress Task 2.pdf",
                url: "https://example.com/files/537.pdf",
                size: 242688,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 537",
                url: "https://ai.example.com/suggest/537",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Optimize performance",
              "Write unit tests",
              "Collect user feedback"
            ],
            reporter: "Fazli"
          },
          {
            id: 538,
            title: "In Progress Task 3",
            assignee: "Hani",
            dueDate: "2025-07-12",
            priority: "Critical",
            description: "Document findings and prepare the final presentation deck. Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 3.pdf",
                url: "https://example.com/files/538.pdf",
                size: 425984,
                type: "link"
              },
              {
                name: "In Progress Task 3.pdf",
                url: "https://example.com/files/538.pdf",
                size: 171008,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 538",
                url: "https://ai.example.com/suggest/538",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Collect user feedback",
              "Write unit tests",
              "Write unit tests"
            ],
            reporter: "Rohimi"
          },
          {
            id: 539,
            title: "In Progress Task 4",
            assignee: "Alice",
            dueDate: "2025-06-30",
            priority: "Low",
            description: "Iterate based on stakeholder input and refine deliverables accordingly. Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 4.pdf",
                url: "https://example.com/files/539.pdf",
                size: 433152,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 539",
                url: "https://ai.example.com/suggest/539",
                type: "link"
              },
              {
                name: "AI Suggestion 539",
                url: "https://ai.example.com/suggest/539",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              },
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Collect user feedback",
              "Review with design team",
              "Write unit tests",
              "Review with design team"
            ],
            reporter: "Rohimi"
          }
        ]
      },
      {
        id: 204,
        title: "QA",
        tasks: [
          {
            id: 540,
            title: "QA Task 1",
            assignee: "Bob",
            dueDate: "2025-07-18",
            priority: "Medium",
            description: "Conduct initial research and gather all relevant data for analysis. Document findings and prepare the final presentation deck.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "QA Task 1.pdf",
                url: "https://example.com/files/540.pdf",
                size: 281600,
                type: "link"
              },
              {
                name: "QA Task 1.pdf",
                url: "https://example.com/files/540.pdf",
                size: 165888,
                type: "link"
              },
              {
                name: "QA Task 1.pdf",
                url: "https://example.com/files/540.pdf",
                size: 462848,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 540",
                url: "https://ai.example.com/suggest/540",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              },
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Deploy to staging",
              "Deploy to staging",
              "Optimize performance",
              "Review with design team",
              "Create wireframe mockup"
            ],
            reporter: "Sarah"
          },
          {
            id: 541,
            title: "QA Task 2",
            assignee: "Hani",
            dueDate: "2025-07-19",
            priority: "Low",
            description: "Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "QA Task 2.pdf",
                url: "https://example.com/files/541.pdf",
                size: 130048,
                type: "link"
              },
              {
                name: "QA Task 2.pdf",
                url: "https://example.com/files/541.pdf",
                size: 186368,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 541",
                url: "https://ai.example.com/suggest/541",
                type: "link"
              },
              {
                name: "AI Suggestion 541",
                url: "https://ai.example.com/suggest/541",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Write unit tests",
              "Deploy to staging",
              "Deploy to staging"
            ],
            reporter: "John"
          },
          {
            id: 542,
            title: "QA Task 3",
            assignee: "Charlie",
            dueDate: "2025-07-03",
            priority: "Critical",
            description: "Conduct initial research and gather all relevant data for analysis. Draft the first version and circulate for team feedback to ensure alignment. Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "QA Task 3.pdf",
                url: "https://example.com/files/542.pdf",
                size: 256000,
                type: "link"
              },
              {
                name: "QA Task 3.pdf",
                url: "https://example.com/files/542.pdf",
                size: 151552,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 542",
                url: "https://ai.example.com/suggest/542",
                type: "link"
              },
              {
                name: "AI Suggestion 542",
                url: "https://ai.example.com/suggest/542",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Optimize performance",
              "Collect user feedback",
              "Review with design team"
            ],
            reporter: "Sarah"
          }
        ]
      },
      {
        id: 205,
        title: "Done",
        tasks: [
          {
            id: 543,
            title: "Done Task 1",
            assignee: "Hani",
            dueDate: "2025-07-18",
            priority: "Critical",
            description: "Validate results against project requirements and quality standards. Draft the first version and circulate for team feedback to ensure alignment. Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Done Task 1.pdf",
                url: "https://example.com/files/543.pdf",
                size: 317440,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 543",
                url: "https://ai.example.com/suggest/543",
                type: "link"
              },
              {
                name: "AI Suggestion 543",
                url: "https://ai.example.com/suggest/543",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              },
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              }
            ],
            subtasks: [
              "Review with design team",
              "Review with design team",
              "Optimize performance",
              "Create wireframe mockup"
            ],
            reporter: "Sarah"
          },
          {
            id: 544,
            title: "Done Task 2",
            assignee: "Charlie",
            dueDate: "2025-07-17",
            priority: "Medium",
            description: "Document findings and prepare the final presentation deck. Validate results against project requirements and quality standards. Document findings and prepare the final presentation deck. Conduct initial research and gather all relevant data for analysis. Iterate based on stakeholder input and refine deliverables accordingly.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Done Task 2.pdf",
                url: "https://example.com/files/544.pdf",
                size: 453632,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 544",
                url: "https://ai.example.com/suggest/544",
                type: "link"
              },
              {
                name: "AI Suggestion 544",
                url: "https://ai.example.com/suggest/544",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Write unit tests",
              "Create wireframe mockup",
              "Create wireframe mockup",
              "Deploy to staging"
            ],
            reporter: "Sarah"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Mobile App Launch",
    stages: [
      {
        id: 301,
        title: "Backlog",
        tasks: [
          {
            id: 545,
            title: "Backlog Task 1",
            assignee: "Hani",
            dueDate: "2025-07-05",
            priority: "Critical",
            description: "Draft the first version and circulate for team feedback to ensure alignment. Validate results against project requirements and quality standards. Document findings and prepare the final presentation deck. Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 1.pdf",
                url: "https://example.com/files/545.pdf",
                size: 87040,
                type: "link"
              },
              {
                name: "Backlog Task 1.pdf",
                url: "https://example.com/files/545.pdf",
                size: 83968,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 545",
                url: "https://ai.example.com/suggest/545",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              },
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Write unit tests"
            ],
            reporter: "Sarah"
          },
          {
            id: 546,
            title: "Backlog Task 2",
            assignee: "Bob",
            dueDate: "2025-07-11",
            priority: "Critical",
            description: "Iterate based on stakeholder input and refine deliverables accordingly. Iterate based on stakeholder input and refine deliverables accordingly. Iterate based on stakeholder input and refine deliverables accordingly.",
            comments: [
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 2.pdf",
                url: "https://example.com/files/546.pdf",
                size: 358400,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 546",
                url: "https://ai.example.com/suggest/546",
                type: "link"
              },
              {
                name: "AI Suggestion 546",
                url: "https://ai.example.com/suggest/546",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Review with design team",
              "Optimize performance",
              "Collect user feedback"
            ],
            reporter: "Fazli"
          },
          {
            id: 547,
            title: "Backlog Task 3",
            assignee: "Hani",
            dueDate: "2025-07-21",
            priority: "High",
            description: "Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 3.pdf",
                url: "https://example.com/files/547.pdf",
                size: 241664,
                type: "link"
              },
              {
                name: "Backlog Task 3.pdf",
                url: "https://example.com/files/547.pdf",
                size: 318464,
                type: "link"
              },
              {
                name: "Backlog Task 3.pdf",
                url: "https://example.com/files/547.pdf",
                size: 230400,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 547",
                url: "https://ai.example.com/suggest/547",
                type: "link"
              },
              {
                name: "AI Suggestion 547",
                url: "https://ai.example.com/suggest/547",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              }
            ],
            subtasks: [
              "Optimize performance",
              "Collect user feedback",
              "Write unit tests",
              "Review with design team",
              "Deploy to staging"
            ],
            reporter: "John"
          },
          {
            id: 548,
            title: "Backlog Task 4",
            assignee: "Diana",
            dueDate: "2025-07-02",
            priority: "Critical",
            description: "Validate results against project requirements and quality standards. Draft the first version and circulate for team feedback to ensure alignment. Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 4.pdf",
                url: "https://example.com/files/548.pdf",
                size: 151552,
                type: "link"
              },
              {
                name: "Backlog Task 4.pdf",
                url: "https://example.com/files/548.pdf",
                size: 268288,
                type: "link"
              },
              {
                name: "Backlog Task 4.pdf",
                url: "https://example.com/files/548.pdf",
                size: 262144,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 548",
                url: "https://ai.example.com/suggest/548",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              },
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              }
            ],
            subtasks: [
              "Optimize performance",
              "Deploy to staging",
              "Deploy to staging",
              "Write unit tests"
            ],
            reporter: "John"
          },
          {
            id: 549,
            title: "Backlog Task 5",
            assignee: "Diana",
            dueDate: "2025-07-22",
            priority: "Medium",
            description: "Validate results against project requirements and quality standards. Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 5.pdf",
                url: "https://example.com/files/549.pdf",
                size: 480256,
                type: "link"
              },
              {
                name: "Backlog Task 5.pdf",
                url: "https://example.com/files/549.pdf",
                size: 427008,
                type: "link"
              },
              {
                name: "Backlog Task 5.pdf",
                url: "https://example.com/files/549.pdf",
                size: 409600,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 549",
                url: "https://ai.example.com/suggest/549",
                type: "link"
              },
              {
                name: "AI Suggestion 549",
                url: "https://ai.example.com/suggest/549",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              },
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Create wireframe mockup",
              "Deploy to staging",
              "Deploy to staging",
              "Collect user feedback"
            ],
            reporter: "John"
          },
          {
            id: 550,
            title: "Backlog Task 6",
            assignee: "Bob",
            dueDate: "2025-07-01",
            priority: "Critical",
            description: "Conduct initial research and gather all relevant data for analysis. Iterate based on stakeholder input and refine deliverables accordingly. Draft the first version and circulate for team feedback to ensure alignment. Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 6.pdf",
                url: "https://example.com/files/550.pdf",
                size: 454656,
                type: "link"
              },
              {
                name: "Backlog Task 6.pdf",
                url: "https://example.com/files/550.pdf",
                size: 467968,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 550",
                url: "https://ai.example.com/suggest/550",
                type: "link"
              },
              {
                name: "AI Suggestion 550",
                url: "https://ai.example.com/suggest/550",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              },
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              }
            ],
            subtasks: [
              "Deploy to staging",
              "Collect user feedback",
              "Collect user feedback"
            ],
            reporter: "Sarah"
          },
          {
            id: 551,
            title: "Backlog Task 7",
            assignee: "Diana",
            dueDate: "2025-07-15",
            priority: "High",
            description: "Iterate based on stakeholder input and refine deliverables accordingly. Document findings and prepare the final presentation deck. Document findings and prepare the final presentation deck. Iterate based on stakeholder input and refine deliverables accordingly. Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "Backlog Task 7.pdf",
                url: "https://example.com/files/551.pdf",
                size: 454656,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 551",
                url: "https://ai.example.com/suggest/551",
                type: "link"
              },
              {
                name: "AI Suggestion 551",
                url: "https://ai.example.com/suggest/551",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              }
            ],
            subtasks: [
              "Optimize performance",
              "Deploy to staging",
              "Write unit tests",
              "Collect user feedback"
            ],
            reporter: "John"
          }
        ]
      },
      {
        id: 302,
        title: "To Do",
        tasks: [
          {
            id: 552,
            title: "To Do Task 1",
            assignee: "Grace",
            dueDate: "2025-07-08",
            priority: "Medium",
            description: "Document findings and prepare the final presentation deck. Iterate based on stakeholder input and refine deliverables accordingly.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 1.pdf",
                url: "https://example.com/files/552.pdf",
                size: 498688,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 552",
                url: "https://ai.example.com/suggest/552",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Write unit tests",
              "Review with design team"
            ],
            reporter: "Rohimi"
          },
          {
            id: 553,
            title: "To Do Task 2",
            assignee: "Grace",
            dueDate: "2025-07-15",
            priority: "High",
            description: "Iterate based on stakeholder input and refine deliverables accordingly. Draft the first version and circulate for team feedback to ensure alignment. Conduct initial research and gather all relevant data for analysis. Iterate based on stakeholder input and refine deliverables accordingly.",
            comments: [
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 2.pdf",
                url: "https://example.com/files/553.pdf",
                size: 461824,
                type: "link"
              },
              {
                name: "To Do Task 2.pdf",
                url: "https://example.com/files/553.pdf",
                size: 67584,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 553",
                url: "https://ai.example.com/suggest/553",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              },
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              }
            ],
            subtasks: [
              "Review with design team",
              "Write unit tests",
              "Collect user feedback",
              "Create wireframe mockup",
              "Create wireframe mockup"
            ],
            reporter: "Fazli"
          },
          {
            id: 554,
            title: "To Do Task 3",
            assignee: "Charlie",
            dueDate: "2025-07-02",
            priority: "Medium",
            description: "Iterate based on stakeholder input and refine deliverables accordingly. Validate results against project requirements and quality standards. Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 3.pdf",
                url: "https://example.com/files/554.pdf",
                size: 134144,
                type: "link"
              },
              {
                name: "To Do Task 3.pdf",
                url: "https://example.com/files/554.pdf",
                size: 416768,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 554",
                url: "https://ai.example.com/suggest/554",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Create wireframe mockup",
              "Review with design team",
              "Optimize performance",
              "Collect user feedback",
              "Deploy to staging"
            ],
            reporter: "Rohimi"
          },
          {
            id: 555,
            title: "To Do Task 4",
            assignee: "Diana",
            dueDate: "2025-07-19",
            priority: "Low",
            description: "Iterate based on stakeholder input and refine deliverables accordingly. Draft the first version and circulate for team feedback to ensure alignment. Document findings and prepare the final presentation deck. Document findings and prepare the final presentation deck.",
            comments: [
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 4.pdf",
                url: "https://example.com/files/555.pdf",
                size: 166912,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 555",
                url: "https://ai.example.com/suggest/555",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Deploy to staging",
              "Collect user feedback"
            ],
            reporter: "Fazli"
          },
          {
            id: 556,
            title: "To Do Task 5",
            assignee: "Charlie",
            dueDate: "2025-07-19",
            priority: "Critical",
            description: "Iterate based on stakeholder input and refine deliverables accordingly. Conduct initial research and gather all relevant data for analysis. Iterate based on stakeholder input and refine deliverables accordingly.",
            comments: [
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 5.pdf",
                url: "https://example.com/files/556.pdf",
                size: 224256,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 556",
                url: "https://ai.example.com/suggest/556",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              },
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              }
            ],
            subtasks: [
              "Review with design team",
              "Create wireframe mockup",
              "Collect user feedback",
              "Optimize performance"
            ],
            reporter: "Fazli"
          },
          {
            id: 557,
            title: "To Do Task 6",
            assignee: "Diana",
            dueDate: "2025-06-25",
            priority: "High",
            description: "Document findings and prepare the final presentation deck. Validate results against project requirements and quality standards. Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.225Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.225Z"
              }
            ],
            attachments: [
              {
                name: "To Do Task 6.pdf",
                url: "https://example.com/files/557.pdf",
                size: 269312,
                type: "link"
              },
              {
                name: "To Do Task 6.pdf",
                url: "https://example.com/files/557.pdf",
                size: 244736,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 557",
                url: "https://ai.example.com/suggest/557",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              },
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              }
            ],
            subtasks: [
              "Review with design team",
              "Write unit tests"
            ],
            reporter: "Rohimi"
          }
        ]
      },
      {
        id: 303,
        title: "In Progress",
        tasks: [
          {
            id: 558,
            title: "In Progress Task 1",
            assignee: "Diana",
            dueDate: "2025-07-24",
            priority: "Medium",
            description: "Document findings and prepare the final presentation deck. Validate results against project requirements and quality standards. Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.226Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 1.pdf",
                url: "https://example.com/files/558.pdf",
                size: 215040,
                type: "link"
              },
              {
                name: "In Progress Task 1.pdf",
                url: "https://example.com/files/558.pdf",
                size: 479232,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 558",
                url: "https://ai.example.com/suggest/558",
                type: "link"
              },
              {
                name: "AI Suggestion 558",
                url: "https://ai.example.com/suggest/558",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              }
            ],
            subtasks: [
              "Review with design team",
              "Write unit tests",
              "Optimize performance",
              "Deploy to staging"
            ],
            reporter: "John"
          },
          {
            id: 559,
            title: "In Progress Task 2",
            assignee: "Charlie",
            dueDate: "2025-07-02",
            priority: "High",
            description: "Document findings and prepare the final presentation deck.",
            comments: [
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.226Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 2.pdf",
                url: "https://example.com/files/559.pdf",
                size: 482304,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 559",
                url: "https://ai.example.com/suggest/559",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Create wireframe mockup",
              "Optimize performance",
              "Collect user feedback",
              "Collect user feedback",
              "Write unit tests"
            ],
            reporter: "Rohimi"
          },
          {
            id: 560,
            title: "In Progress Task 3",
            assignee: "Hani",
            dueDate: "2025-06-30",
            priority: "Medium",
            description: "Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.226Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 3.pdf",
                url: "https://example.com/files/560.pdf",
                size: 99328,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 560",
                url: "https://ai.example.com/suggest/560",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Write unit tests",
              "Optimize performance",
              "Deploy to staging",
              "Collect user feedback"
            ],
            reporter: "John"
          },
          {
            id: 561,
            title: "In Progress Task 4",
            assignee: "Charlie",
            dueDate: "2025-07-03",
            priority: "Medium",
            description: "Iterate based on stakeholder input and refine deliverables accordingly. Iterate based on stakeholder input and refine deliverables accordingly. Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.226Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 4.pdf",
                url: "https://example.com/files/561.pdf",
                size: 91136,
                type: "link"
              },
              {
                name: "In Progress Task 4.pdf",
                url: "https://example.com/files/561.pdf",
                size: 193536,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 561",
                url: "https://ai.example.com/suggest/561",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Create wireframe mockup",
              "Collect user feedback",
              "Deploy to staging",
              "Create wireframe mockup",
              "Optimize performance"
            ],
            reporter: "Sarah"
          },
          {
            id: 562,
            title: "In Progress Task 5",
            assignee: "Charlie",
            dueDate: "2025-06-25",
            priority: "Critical",
            description: "Validate results against project requirements and quality standards. Draft the first version and circulate for team feedback to ensure alignment. Draft the first version and circulate for team feedback to ensure alignment. Draft the first version and circulate for team feedback to ensure alignment. Conduct initial research and gather all relevant data for analysis.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.226Z"
              }
            ],
            attachments: [
              {
                name: "In Progress Task 5.pdf",
                url: "https://example.com/files/562.pdf",
                size: 120832,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 562",
                url: "https://ai.example.com/suggest/562",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              },
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Create wireframe mockup",
              "Write unit tests",
              "Review with design team",
              "Optimize performance",
              "Optimize performance"
            ],
            reporter: "Fazli"
          }
        ]
      },
      {
        id: 304,
        title: "QA",
        tasks: [
          {
            id: 563,
            title: "QA Task 1",
            assignee: "Charlie",
            dueDate: "2025-06-27",
            priority: "High",
            description: "Document findings and prepare the final presentation deck. Draft the first version and circulate for team feedback to ensure alignment. Conduct initial research and gather all relevant data for analysis. Document findings and prepare the final presentation deck.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.226Z"
              }
            ],
            attachments: [
              {
                name: "QA Task 1.pdf",
                url: "https://example.com/files/563.pdf",
                size: 200704,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 563",
                url: "https://ai.example.com/suggest/563",
                type: "link"
              },
              {
                name: "AI Suggestion 563",
                url: "https://ai.example.com/suggest/563",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Review with design team",
              "Optimize performance",
              "Deploy to staging"
            ],
            reporter: "John"
          },
          {
            id: 564,
            title: "QA Task 2",
            assignee: "Grace",
            dueDate: "2025-07-23",
            priority: "Critical",
            description: "Iterate based on stakeholder input and refine deliverables accordingly.",
            comments: [
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.226Z"
              }
            ],
            attachments: [
              {
                name: "QA Task 2.pdf",
                url: "https://example.com/files/564.pdf",
                size: 316416,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 564",
                url: "https://ai.example.com/suggest/564",
                type: "link"
              },
              {
                name: "AI Suggestion 564",
                url: "https://ai.example.com/suggest/564",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Collect user feedback",
              "Optimize performance",
              "Write unit tests",
              "Review with design team"
            ],
            reporter: "Fazli"
          },
          {
            id: 565,
            title: "QA Task 3",
            assignee: "Diana",
            dueDate: "2025-06-25",
            priority: "Low",
            description: "Document findings and prepare the final presentation deck.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Please update the documentation section.",
                date: "2025-06-24T16:51:33.226Z"
              }
            ],
            attachments: [
              {
                name: "QA Task 3.pdf",
                url: "https://example.com/files/565.pdf",
                size: 478208,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 565",
                url: "https://ai.example.com/suggest/565",
                type: "link"
              },
              {
                name: "AI Suggestion 565",
                url: "https://ai.example.com/suggest/565",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              }
            ],
            subtasks: [
              "Create wireframe mockup",
              "Write unit tests",
              "Collect user feedback",
              "Write unit tests"
            ],
            reporter: "Fazli"
          },
          {
            id: 566,
            title: "QA Task 4",
            assignee: "Bob",
            dueDate: "2025-06-27",
            priority: "High",
            description: "Validate results against project requirements and quality standards. Iterate based on stakeholder input and refine deliverables accordingly. Validate results against project requirements and quality standards. Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.226Z"
              }
            ],
            attachments: [
              {
                name: "QA Task 4.pdf",
                url: "https://example.com/files/566.pdf",
                size: 52224,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 566",
                url: "https://ai.example.com/suggest/566",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Create wireframe mockup",
              "Deploy to staging"
            ],
            reporter: "Sarah"
          }
        ]
      },
      {
        id: 305,
        title: "Done",
        tasks: [
          {
            id: 567,
            title: "Done Task 1",
            assignee: "Charlie",
            dueDate: "2025-07-07",
            priority: "Medium",
            description: "Validate results against project requirements and quality standards.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.226Z"
              }
            ],
            attachments: [
              {
                name: "Done Task 1.pdf",
                url: "https://example.com/files/567.pdf",
                size: 367616,
                type: "link"
              },
              {
                name: "Done Task 1.pdf",
                url: "https://example.com/files/567.pdf",
                size: 164864,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 567",
                url: "https://ai.example.com/suggest/567",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Design Best Practices",
                url: "https://uxdesign.cc/best-practices",
                type: "article"
              }
            ],
            subtasks: [
              "Create wireframe mockup",
              "Deploy to staging",
              "Create wireframe mockup"
            ],
            reporter: "John"
          },
          {
            id: 568,
            title: "Done Task 2",
            assignee: "Diana",
            dueDate: "2025-06-30",
            priority: "High",
            description: "Conduct initial research and gather all relevant data for analysis. Iterate based on stakeholder input and refine deliverables accordingly. Iterate based on stakeholder input and refine deliverables accordingly. Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Great work, let’s move this forward.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Looks good to me.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "Can we revisit the timeline for this?",
                date: "2025-06-24T16:51:33.226Z"
              }
            ],
            attachments: [
              {
                name: "Done Task 2.pdf",
                url: "https://example.com/files/568.pdf",
                size: 200704,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 568",
                url: "https://ai.example.com/suggest/568",
                type: "link"
              },
              {
                name: "AI Suggestion 568",
                url: "https://ai.example.com/suggest/568",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "API Security Guide",
                url: "https://api.security.example.com/guide",
                type: "article"
              }
            ],
            subtasks: [
              "Deploy to staging",
              "Create wireframe mockup",
              "Optimize performance",
              "Review with design team",
              "Optimize performance"
            ],
            reporter: "Sarah"
          },
          {
            id: 569,
            title: "Done Task 3",
            assignee: "Diana",
            dueDate: "2025-07-14",
            priority: "Medium",
            description: "Validate results against project requirements and quality standards. Validate results against project requirements and quality standards. Validate results against project requirements and quality standards. Document findings and prepare the final presentation deck. Draft the first version and circulate for team feedback to ensure alignment.",
            comments: [
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.226Z"
              },
              {
                text: "I have a few suggestions; see inline comments.",
                date: "2025-06-24T16:51:33.226Z"
              }
            ],
            attachments: [
              {
                name: "Done Task 3.pdf",
                url: "https://example.com/files/569.pdf",
                size: 144384,
                type: "link"
              }
            ],
            ai_attachments: [
              {
                name: "AI Suggestion 569",
                url: "https://ai.example.com/suggest/569",
                type: "link"
              }
            ],
            autostart: [
              {
                name: "Gamuda HQ Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=Gamuda+Headquarters",
                type: "link"
              },
              {
                name: "KLCC Office Directions",
                url: "https://www.google.com/maps/dir/?api=1&destination=KLCC",
                type: "link"
              }
            ],
            subtasks: [
              "Deploy to staging",
              "Write unit tests",
              "Collect user feedback",
              "Deploy to staging",
              "Review with design team"
            ],
            reporter: "Rohimi"
          }
        ]
      }
    ]
  }
])
