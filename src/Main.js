import { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import ReactQuill from "react-quill";

const Main = ({ activeNote, onUpdateNote, onDeleteNote }) => {
	const [value, setValue] = useState(false);

	const onEditField = (field, value) => {
		onUpdateNote({
			...activeNote,
			[field]: value,
			lastModified: Date.now(),
		});
	};

	const onSave = () => {
		console.log(activeNote);
		console.log(value);
	};

	const handleBody = (e) => {
		setValue(e);
	}

	if (!activeNote) {
		return <div className="no-active-note">No Active Note</div>;
	}

	const noteDeletion = (id) => {
		const answer = window.confirm("Are you sure?");
		if (answer) {
			onDeleteNote(id)
		}
	};

	return (
		<>
			<div className="toolbar">
				<div className="left">
					<input
						type="text"
						id="title"
						placeholder="Note Title"
						value={activeNote.title}
						onChange={(e) => onEditField("title", e.target.value)}
						autoFocus
					/>
				</div>
				<div className="right">
					<button onClick={onSave}>Save</button>
					<button onClick={(e) => noteDeletion(activeNote.id)}>Delete</button>
				</div>
			</div>

			<div className="app-main">
				<div className="app-main-note-edit">
					<textarea
						id="body"
						placeholder="Write your note here..."
						value={activeNote.body}
						onChange={(e) => onEditField("body", e.target.value)}
					/>
				</div>
			</div>

			<ReactQuill theme="snow" placeholder="Write your note here" value={value} onChange={setValue}></ReactQuill>
		</>
	);
};

export default Main;
