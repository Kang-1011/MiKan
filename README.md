# MiKan: Your AI-Powered Productivity Co-Pilot

## 🚀 Overview

**MiKan** (short for **Mi**nutes to **Kan**ban) is an innovative AI-powered productivity platform designed to revolutionize how teams transition from dynamic meeting discussions to actionable, fully prepared tasks. We eliminate the pervasive "preparation friction" that typically delays task initiation, ensuring that every insight captured in a meeting translates into immediate, contextualized progress.

Imagine a world where you leave a meeting, and the AI has already drafted your tasks, assigned them, and proactively gathered *all* the necessary context, documents, and even potential "blind spot" information you need to start working – without you lifting a finger or typing a single search query. That's the power of MiKan.

## ✨ Key Features & Differentiators

MiKan goes beyond traditional meeting summarizers or knowledge management tools by offering a seamless, end-to-end workflow automation:

1.  **Intelligent Meeting Capture:**
    * Record live meetings directly within the app or upload audio files (from meetings, presentations, interviews, etc.).
    * Advanced speech-to-text transcription for accurate conversion of spoken words.
2.  **AI-Powered Minutes & Task Extraction:**
    * Leverages large language models (LLMs) to understand the meeting's context and intent.
    * Summarizes discussions into concise, actionable "minutes."
    * **Crucially:** Automatically identifies and extracts specific tasks, assignees, and deadlines mentioned in the conversation.
3.  **Automated Task Generation & Workflow Integration:**
    * Generates structured "task drafts" based on extracted information, ready for quick manager review and approval.
    * Seamlessly pushes approved tasks directly to a team's integrated Kanban board for visual project tracking.
4.  **Proactive Task Enrichment ("Auto-Start"):**
    * This is MiKan's core differentiator. Using **Retrieval-Augmented Generation (RAG)**, MiKan proactively determines *all* the information and resources an assignee will need for their task.
    * It intelligently queries a comprehensive internal knowledge base (vector database) to fetch and embed relevant documents, reports, policies, customer data summaries, and more, directly within the Kanban task card.
    * **Beyond traditional RAG:** MiKan anticipates needs and delivers context without user prompting, mitigating "cognitive blind spots" (information users might forget or not know to ask for). This means:
        * **No more manual searching:** Information is delivered to you.
        * **Reduced context switching:** Everything you need is in one place.
        * **Elimination of "pre-work friction":** Start working immediately, fully equipped.
5.  **Dynamic Knowledge Base & Chatbot:**
    * Users can upload new files (PDFs, documents, reports) to continuously update MiKan's vector database with the latest internal context.
    * An integrated chatbot allows users to ask follow-up questions for deeper insights into the knowledge base.

## 💡 How MiKan Differentiates Itself

MiKan is not just a meeting notes app or a smart search engine; it's an **intelligent workflow orchestrator** that operates proactively.

* **Event-Driven:** Triggered by the *event* of a meeting, not a manual query.
* **Automated Workflow:** It handles the entire flow from conversation to structured tasks, assignment, and contextual delivery into the workflow.
* **Cognitive Enhancement:** It actively pre-fills critical, sometimes overlooked, information, acting as an intelligent safety net against human oversight.

## 🛠️ Technology Stack (Example - adjust based on your actual stack)

* **Frontend:** Vue.js
* **Backend:** Python (FastAPI)
* **Database:** PostgreSQL (for structured data)
* **AI/ML:**
    * **LLMs:** Google Gemini 2.5 Pro, Google Gemini 2.5 Flash
    * **Vector Database:** MongoDB Atlas
    * **Embedding Models:** gemini-embedding-001
* **Speech-to-Text:** Gemini 2.5 Flash
* **Cloud Platform:** Google Cloud Platform (GCP)

## 🚀 Getting Started (For Development/Contribution)

To set up MiKan locally for development:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/MiKan.git](https://github.com/your-username/MiKan.git)
    cd MiKan
    ```
2.  **Set up the backend:**
    ```bash
    # Assuming Python environment
    cd backend
    pip install -r requirements.txt
    # Configure environment variables (e.g., API keys for LLMs, DB connection)
    .env
    ```
3.  **Set up the frontend:**
    ```bash
    cd frontend
    npm install # or yarn install
    npm start # or yarn start
    ```
4.  **Populate the Vector Database:**
    All files are uploaded directly into a Google Drive files and sync with GCS bucket before embedding them into MongoDB Vectore database

## 📊 Demo & Use Cases

See MiKan in action with a compelling use case showcasing the power of 'auto-start' and its ability to mitigate 'cognitive blind spots'.

**(Placeholder for a short GIF/Video demonstrating the core flow - highly recommended for GitHub!)**

**Example Use Case: New Project Onboarding with Implicit Compliance Checks**
MiKan ensures that when a developer is assigned a new project for a client in a new country (e.g., Germany, handling sensitive data), it proactively provides not just the technical specs, but also critical compliance documents like GDPR guidelines, data residency requirements, and relevant legal team contacts – information often overlooked in the initial rush.

## 🎖️ Credits

This project was developed as the Capstone Project for Gamuda AI Academy, Cohort 3 – Team 6.

**Special Thanks 🙏**
Mentors & Instructors at Gamuda AI Academy for guidance.
Reviewers & Panelists for valuable feedback.
Open-Source Contributors whose libraries/tools made this project possible.

**Acknowledgements**
We also thank the entire Gamuda AI Academy community for their support!

## 📧 Contact

For any questions or collaborations, feel free to reach out:
* Kang
* weikang021011@gmail.com
