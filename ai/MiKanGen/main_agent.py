from langgraph.graph import END, StateGraph, START
from .nodes.tool_manager import _get_current_task
from .state import ReWOO
from .nodes.planner import get_plan
from .nodes.tool_manager import tool_execution
from .nodes.solver import solve

def _route(state):
    _step = _get_current_task(state)
    # return _step is None
    if _step is None:
        # We have executed all tasks
        return "finalise"
    else:
        # We are still executing tasks, loop back to the "tool" node
        return "continue"
    
graph = StateGraph(ReWOO)
graph.add_node("plan", get_plan)
graph.add_node("tools", tool_execution)
graph.add_node("solve", solve)
graph.add_edge("plan", "tools")
graph.add_edge("solve", END)
graph.add_conditional_edges(
    "tools",
    _route,
    {
        "finalise": "solve",
        "continue": "tools",
    }
)
graph.add_edge(START, "plan")

app = graph.compile()

import json

task = "Draft the Shaver Gaming media invites"
for s in app.stream({"task": task}):
    print(json.dumps(s, indent=2))
    print("---")