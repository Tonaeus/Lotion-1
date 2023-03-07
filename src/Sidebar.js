import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

function Sidebar({
	show,
	notes,
	setNotes,
	onDeleteNote,
	activeNote,
	setActiveNote,
}) {
	const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	};

	const formatDate = (when) => {
		const formatted = new Date(when).toLocaleString("en-US", options);
		if (formatted === "Invalid Date") {
			return "";
		}
		return formatted;
	};

	const navigate = useNavigate();

	const onAddNote = () => {
		const newNote = {
			id: uuid(),
			title: "Untitled",
			body: "",
			lastModified: "",
		};

		setNotes([newNote, ...notes]);
		setActiveNote(newNote.id);
		navigate(`/notes/${newNote.id}/edit`);
	};

	const handleClick = (id) => {
		setActiveNote(id);
		navigate(`/notes/${id}`);
	}

	return (
		<>
			{show && (
				<div className="menuBar">
					<div className="notes">
						<h1>Notes</h1>
						<button onClick={onAddNote}>Add</button>
					</div>
					<div className="selector">
						{sortedNotes.map(({ id, title, body, lastModified }, i) => (
							<div
                            key={id}
								className={`app-sidebar-note ${id === activeNote && "active"}`}
								onClick={() => handleClick(id)}
							>
								<div className="sidebar-note-title">
									<strong>{title}</strong>
									<button onClick={(e) => onDeleteNote(id)}>Delete</button>
								</div>

								<p>{body.substr(0, 20) + "..."}</p>
								<small className="note-meta">
									{formatDate(lastModified)}
								</small>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Sidebar;