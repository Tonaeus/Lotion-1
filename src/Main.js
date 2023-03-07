import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";

const Main = ({ activeNote, onUpdateNote, onDeleteNote }) => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [date, setDate] = useState("");

	useEffect(() => {
		if (activeNote) {
			setTitle(activeNote.title);
			setBody(activeNote.body);
			setDate((new Date().toISOString()).slice(0, 16));
		}
	}, [activeNote]);

	const onSave = () => {
		onUpdateNote({
			...activeNote,
			title: title,
			body: body,
			lastModified: date,
		});
		console.log({
			...activeNote,
			title: title,
			body: body,
			lastModified: date,
		});
	};

	if (!activeNote)
		return (
			<div className="no-active-note">Select a note, or create a new one.</div>
		);


	return (
		<>
			<div className="toolbar">
				<div className="left">
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						autoFocus
					/>
					<input
						type="datetime-local"
						id="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>
				<div className="right">
					<button onClick={onSave}>Save</button>
					<button onClick={() => onDeleteNote(activeNote.id)}>Delete</button>
				</div>
			</div>
			<div className="main-body">
				<ReactQuill
					id="body"
					theme="snow"
					placeholder="Your Note Here"
					value={body}
					onChange={setBody}
				/>
			</div>
		</>
	);
};

export default Main;
