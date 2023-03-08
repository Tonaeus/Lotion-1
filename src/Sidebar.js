import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

function Sidebar({
	show,
	notes,
	setNotes,
	activeNote,
	setActiveNote
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
		// const answer = window.confirm("Are you sure?");
		// if (answer) {
		// 	setActiveNote(id);
		// 	navigate(`/notes/${id}`);
		// }
		setActiveNote(id);
		navigate(`/notes/${id}`);
	}

	const formatTitle = (title) => {
		if (title.length === 0) {
			return "Untitled";
		}
		else {
			return title;
		}
	}

	const formatBody = (body) => {
		const plainBody = body.replace(/<[^>]+>/g, '');
		if (plainBody.length === 0) {
			return "...";
		}
		else {
			return plainBody;
		}
	}

	return (
		<>
			{show && (
				<div className="menuBar">
					<div className="notes">
						<h1 className="left bar-label">Notes</h1>
						<div className="add-note">
						<button className="right note-button btn" onClick={onAddNote}>Add</button>
						</div>
					</div>
					<div className="selector">
						{sortedNotes.map(({ id, title, body, lastModified }) => (
							<div
                            key={id}
								className={`app-sidebar-note ${id === activeNote && "active"}`}
								onClick={() => handleClick(id)}
							>
								<div className="sidebar-note-title">
									<strong className="block-title">{formatTitle(title)}</strong>
									{/* <button onClick={(e) => onDeleteNote(id, i)}>Delete</button> */}
								</div>
								<small className="note-meta">
									{formatDate(lastModified)}
								</small>

								<p className="block-body">{formatBody(body)}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Sidebar;