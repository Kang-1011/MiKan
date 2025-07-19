from fastapi import *
from database import *
from model import *

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/")
def get_project_boards(db: db_dependency):
	try:
		results = (
			db.query(
				Project.id.label("project_id"),
				Project.title.label("project_title"),

				Task.id.label("task_id"),
				Task.title.label("task_title"),
				Task.description,
				Task.status,
				Task.due_date,
				Task.priority,

				User.id.label("assignee_id"),
				User.name.label("assignee_name"),
				User.username.label("assignee_username"),

				Comment.text.label("comment_text"),
				Comment.date.label("comment_date"),

				Subtask.id.label("subtask_id"),
				Subtask.task_id.label("subtask_task_id"),
				Subtask.text.label("subtask_text"),
				Subtask.date.label("subtask_date"),

				Attachment.id.label("attachment_id"),
				Attachment.task_id.label("attachment_task_id"),
				Attachment.title.label("attachment_name"),
				Attachment.type.label("attachment_type"),

				AIAttachment.title.label("ai_attachment_name"),
				AIAttachment.url.label("ai_attachment_url"),

				Autostart.title.label("autostart_name"),
				Autostart.url.label("autostart_url")
			)
			.outerjoin(Task, Task.project_id == Project.id)
			.outerjoin(User, Task.assignee_id == User.id)
			.outerjoin(Comment, Comment.task_id == Task.id)
			.outerjoin(Subtask, Subtask.task_id == Task.id)
			.outerjoin(Attachment, Attachment.task_id == Task.id)
			.outerjoin(AIAttachment, AIAttachment.task_id == Task.id)
			.outerjoin(Autostart, Autostart.task_id == Task.id)
			.all()
		)

		rows = [dict(row._mapping) for row in results]
		projects_map = {}
		task_tracker = {}

		for row in rows:
			project_id = row["project_id"]
			task_id = row["task_id"]
			status = row["status"] or "to-do"

			stage_map = {
				"to-do": "To Do",
				"in-progress": "In Progress",
				"done": "Done"
			}
			stage_title = stage_map.get(status, "To Do")

			# Init project if new
			if project_id not in projects_map:
				projects_map[project_id] = {
					"id": project_id,
					"title": row["project_title"],
					"stages": {
						"To Do": [],
						"In Progress": [],
						"Done": []
					}
				}

			if not task_id:
				continue  # skip projects without tasks

			if task_id not in task_tracker:
				task_tracker[task_id] = {
					"id": task_id,
					"title": row["task_title"],
					"assignee_id": row["assignee_id"],
					"assignee": row["assignee_name"] or "Unassigned",
					"dueDate": row["due_date"],
					"priority": row["priority"],
					"description": row["description"],
					"comments": [],
					"subtasks": [],
					"attachments": [],
					"ai_attachments": [],
					"autostart": [],
					"status": status,
					"reporter": row["assignee_username"] or "",

					# Helpers for deduplication
					"_comment_keys": set(),
					"_subtask_keys": set(),
					"_attachment_keys": set(),
					"_ai_keys": set(),
					"_auto_keys": set()
				}
				projects_map[project_id]["stages"][stage_title].append(task_tracker[task_id])

			task = task_tracker[task_id]

			# --- DEDUPLICATION BELOW ---
			if row["comment_text"]:
				key = (row["comment_text"], row["comment_date"])
				if key not in task["_comment_keys"]:
					task["comments"].append({
						"text": row["comment_text"],
						"date": row["comment_date"].isoformat() if row["comment_date"] else None
					})
					task["_comment_keys"].add(key)

			if row["subtask_text"]:
				key = (row["subtask_text"], row["subtask_date"])
				if key not in task["_subtask_keys"]:
					task["subtasks"].append({
						"subtask_id": row["subtask_id"],
						"id": row["subtask_task_id"],
						"text": row["subtask_text"],
						"date": row["subtask_date"].isoformat() if row["subtask_date"] else None
					})
					task["_subtask_keys"].add(key)

			if row["attachment_id"]:
				key = row["attachment_id"]
				if key not in task["_attachment_keys"]:
					task["attachments"].append({
						"name": row["attachment_name"],
						"url": f"http://127.0.0.1:8000/attachments/{key}",
						"type": "link"
					})
					task["_attachment_keys"].add(key)

			if row["ai_attachment_name"]:
				key = (row["ai_attachment_name"], row["ai_attachment_url"])
				if key not in task["_ai_keys"]:
					task["ai_attachments"].append({
						"name": row["ai_attachment_name"],
						"url": row["ai_attachment_url"]
					})
					task["_ai_keys"].add(key)

			if row["autostart_name"]:
				key = (row["autostart_name"], row["autostart_url"])
				if key not in task["_auto_keys"]:
					task["autostart"].append({
						"name": row["autostart_name"],
						"url": row["autostart_url"]
					})
					task["_auto_keys"].add(key)

		# 🔚 Clean up helper keys before returning the final data
		for task in task_tracker.values():
			for key in list(task.keys()):
				if key.startswith("_"):
					del task[key]

		# Final formatting
		boards = []
		for project in projects_map.values():
			stages = []
			for idx, (title, tasks) in enumerate(project["stages"].items(), start=101):
				stages.append({"id": idx, "title": title, "tasks": tasks})
			boards.append({
				"id": project["id"],
				"title": project["title"],
				"stages": stages
			})

		return boards
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))