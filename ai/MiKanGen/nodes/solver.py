from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from ..state import ReWOO
from dotenv import load_dotenv
import os   

load_dotenv()
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

solver_llm = ChatGoogleGenerativeAI(model="gemini-2.5-pro", google_api_key=GEMINI_API_KEY)

solve_prompt = """Solve the following task or problem. To solve the problem, we have made step-by-step Plan and \
retrieved corresponding Evidence to each Plan. Use them with caution since long evidence might \
contain irrelevant information.

{plan}

Now solve the question or task according to provided Evidence above. Respond with the answer
directly with no extra words.

Task: {task}
Response:"""

solver_prompt = ChatPromptTemplate.from_messages([("user", solve_prompt)])

solver_chain = solver_prompt | solver_llm

def solve(state: ReWOO):
    plan = ""
    for _plan, step_name, tool, tool_input in state["steps"]:
        _results = (state["results"] or {}) if "results" in state else {}
        for k, v in _results.items():
            tool_input = tool_input.replace(k, v)
            step_name = step_name.replace(k, v)
        plan += f"Plan: {_plan}\n{step_name} = {tool}[{tool_input}]"

    solver_result = solver_chain.invoke({"plan": plan, "task": state["task"]})

    _files = (state["retrieved_docs"] or []) if "retrieved_docs" in state else []
    return {"result": solver_result.content, "retrieved_docs": _files}