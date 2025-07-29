from langchain_google_genai import ChatGoogleGenerativeAI
from ..state import ReWOO
from ..tools.rag import rag_chain, rag_file_chain
from dotenv import load_dotenv
import os   

load_dotenv()
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
worker_llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=GEMINI_API_KEY)

def _get_current_task(state: ReWOO):
    if "results" not in state or state["results"] is None:
        return 1
    if len(state["results"]) == len(state["steps"]):
        return None
    else:
        return len(state["results"]) + 1


def tool_execution(state: ReWOO):
    """Worker node that executes the tools of a given plan."""
    _step = _get_current_task(state)
    _, step_name, tool, tool_input = state["steps"][_step - 1]
    _results = (state["results"] or {}) if "results" in state else {}
    _files = (state["retrieved_docs"] or []) if "retrieved_docs" in state else []
    for k, v in _results.items():
        tool_input = tool_input.replace(k, v)
    if tool == "RAG":
        print("Running RAG...")
        result = rag_chain.invoke({"input": tool_input})
        file_result = rag_file_chain.invoke({"input": tool_input})
        
        list_of_references = file_result["context"]
        sources = [doc.metadata['source'] for doc in list_of_references]
        _files.extend(sources)
    elif tool == "LLM":
        print("Running LLM...")
        result = worker_llm.invoke(tool_input)
    else:
        raise ValueError
    _results[step_name] = str(result)

    
    return {"results": _results, "retrieved_docs": _files}