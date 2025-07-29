from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from ..gcs_list_files import list_gcs_files
import re
from ..state import ReWOO
from dotenv import load_dotenv
import os   

load_dotenv()
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

planner_llm = ChatGoogleGenerativeAI(model="gemini-2.5-pro", google_api_key=GEMINI_API_KEY)

system_prompt = """
You are MiKan, an advanced AI-powered productivity platform designed to revolutionize team workflows from meeting discussions to fully prepared, actionable tasks. Your core function is to act as an **intelligent workflow orchestrator and proactive information assistant**.

Your capabilities include:

1.  **Intelligent Query Generation for RAG:** For each identified task, you will proactively determine *all* the information and resources the assignee will need to immediately begin and successfully complete that task, even if not explicitly requested in the meeting.
    * You will generate highly relevant, specific search queries for retrieval from the internal vector database (knowledge base).
    * Prioritize explicit mentions (e.g., 'Product X brochure'), but also infer implicit needs based on task type, entities (e.g., 'new client in Germany' -> 'GDPR compliance'), and common pre-work steps for similar tasks.
2.  **Proactive Information Retrieval & Synthesis ('Auto-Start'):**
    * Utilize the generated queries to retrieve the most relevant documents, data snippets, and insights from the internal vector database.
    * Synthesize this retrieved information into a concise, actionable format.
    * This synthesized content should serve as the 'pre-start' package, directly embedded within the task for the assignee. This must include not only directly requested documents but also:
        * Relevant policies, procedures, or compliance guidelines.
        * Key insights or summaries from related reports.
        * Templates or checklists that streamline the task.
        * Contact information for relevant internal stakeholders or experts.
    * Aim to provide information that mitigates 'cognitive blind spots' - knowledge the user might not even realize they need.

**Persona & Principles:**

* **Proactive & Anticipatory:** Always aim to provide information *before* it's asked for.
* **Accurate & Contextual:** Ensure all extracted and retrieved information is highly relevant and precise to the task's specific context.
* **Concise & Actionable:** Present information clearly, avoiding unnecessary verbosity, and making it directly usable for the task.
* **Reliable & Trustworthy:** Strive for consistent, high-quality output that users can depend on.
* **Security & Privacy Aware:** Understand that sensitive information may be handled; never generate or expose unauthorized data. (This is a high-level instruction; actual security is in your backend.)

**Your ultimate goal is to eliminate 'pre-work friction' and ensure that every task generated from a meeting can be 'auto-started' efficiently and comprehensively.**
"""

user_prompt = """
For the following task, make detailed plans that can solve the problem step by step. For each plan, indicate which external tool
together with tool input to retrieve evidence. You can store the evidence into a variable #E that can be called by later tools.
(Plan, #E1, Plan, #E2, Plan, ...)

Tools can be one of the following:
(1) RAG[input]: A retrieval tool that searches for relevant content from a MongoDB Vector Store, which acts as the internal knowledge base.
The knowledge base contains the following relevant documents:
{files_list}

Use this when you need information that is not publicly available and must be retrieved from proprietary or internal documents, such as
company reports, meeting transcripts, technical documentation, or internal guidelines. The input should be a natural language search query
that clearly expresses the information you are looking for.

---

Before selecting a tool, if the user query is complex or contains multiple sub-questions, **decompose it into simpler, independent sub-queries**.
Each sub-query should focus on retrieving one specific piece of information. For example:

Input: "Who is the CEO of Company X, and what product did they launch in 2023?"
→ Sub-queries:
1. "Who is the CEO of Company X?"
2. "What product did Company X launch in 2023?"

Then apply RAG[input] individually for each sub-query.

If decomposition is not necessary (i.e., the query is already simple), proceed directly with the appropriate tool.

Only use internal tools like RAG if the required information is likely stored in the internal documents listed above.

(2) LLM[input]: A pretrained LLM like yourself. Useful when you need to act with general
world knowledge and common sense. Prioritize it when you are confident in solving the problem
yourself. Input can be any instruction.

For example,
Task: Thomas, Toby, and Rebecca worked a total of 157 hours in one week. Thomas worked x
hours. Toby worked 10 hours less than twice what Thomas worked, and Rebecca worked 8 hours
less than Toby. How many hours did Rebecca work?
Plan: Given Thomas worked x hours, translate the problem into algebraic expressions and solve
with Wolfram Alpha. #E1 = WolframAlpha[Solve x + (2x - 10) + ((2x - 10) - 8) = 157]
Plan: Find out the number of hours Thomas worked. #E2 = LLM[What is x, given #E1]
Plan: Calculate the number of hours Rebecca worked. #E3 = Calculator[(2 * #E2 - 10) - 8]

Begin!
Describe your plans with rich details. Each Plan should be followed by only one #E.

Task: {task}"""

planner_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            system_prompt
        ),
        (
            "human",
            user_prompt
        )
    ]
)

planner_chain = planner_prompt | planner_llm

GCP_PROJECT_NAME = "mikan01"
GCS_BUCKET_NAME = "mikan-rag-source"
GCS_PREFIX = "" # Optional: set a prefix if you want to list files in a specific "folder"
files_list = list_gcs_files(GCP_PROJECT_NAME, GCS_BUCKET_NAME, GCS_PREFIX)

# Regex to match expressions of the form E#... = ...[...]
regex_pattern = r"Plan:\s*(.+)\s*(#E\d+)\s*=\s*(\w+)\s*\[([^\]]+)\]"

def get_plan(state: ReWOO):
    task = state["task"]
    result = planner_chain.invoke({"task": task, "files_list": files_list})
    # Find all matches in the sample text
    matches = re.findall(regex_pattern, result.content)
    return {"steps": matches, "plan_string": result.content}