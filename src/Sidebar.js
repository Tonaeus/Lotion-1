function Sidebar({
	show,
	notes,
	onAddNote,
	onDeleteNote,
	activeNote,
	setActiveNote,
}) {
	const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

	const clickHandler = () => {
		onAddNote();
	}

	return (
		<>
			{show && (
				<div className="menuBar">
					<div className="notes">
						<h1>Notes</h1>
						<button onClick={clickHandler}>Add</button>
					</div>
					<div className="selector">
						{sortedNotes.map(({ id, title, body, lastModified }, i) => (
							<div
                            key={id}
								className={`app-sidebar-note ${id === activeNote && "active"}`}
								onClick={() => setActiveNote(id)}
							>
								<div className="sidebar-note-title">
									<strong>{title}</strong>
									<button onClick={(e) => onDeleteNote(id)}>Delete</button>
								</div>

								<p>{body && body.substr(0, 100) + "..."}</p>
								<small className="note-meta">
									Last Modified{" "}
									{new Date(lastModified).toLocaleDateString("en-GB", {
										hour: "2-digit",
										minute: "2-digit",
									})}
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
