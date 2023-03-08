import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";

const Main = ({ activeNote, onUpdateNote, onDeleteNote }) => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [date, setDate] = useState("");

	useEffect(() => {
		if (activeNote) {
			setTitle(activeNote.title);
			setBody(activeNote.body);
			setDate(new Date().toISOString().slice(0, 16));
		}
		else {
			navigate(`/notes`);
		}
	}, [activeNote]);

	const navigate = useNavigate();
	const { currId, mode } = useParams();

	if (!activeNote)
		return (
			<div className="no-active-note"><h1>Select a note or Create a new note</h1></div>
		);

	const onSave = () => {
		onUpdateNote({
			...activeNote,
			title: title,
			body: body,
			lastModified: date,
		});
		navigate(`/notes/${activeNote.id}`);
	};

	const onDelete = (id) => {
		const answer = window.confirm("Are you sure?");
		if (answer) {
			onDeleteNote(id);
			navigate(`/notes`);
		}
	};

	const onEdit = () => {
		navigate(`/notes/${activeNote.id}/edit`);
	}

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

	const formatTitle = (title) => {
		if (title.length === 0) {
			return "Untitled";
		}
		else {
			return title;
		}
	}

	if (currId && mode) {
		return (
			<>
				<div className="toolbar">
					<div className="left toolbar-input">
						<input
							type="text"
							className="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							autoFocus
						/>
						<input
							type="datetime-local"
							className="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</div>
					<div className="right">
						<button className="toolbar-button btn" onClick={onSave}>Save</button>
						<button className="toolbar-button btn" onClick={() => onDelete(activeNote.id)}>Delete</button>
					</div>
				</div>
				<div className="editingBody">
					<ReactQuill
						id="body"
						theme="snow"
						placeholder="Write your note here"
						value={body}
						onChange={setBody}
					/>
				</div>
			</>
		);
	}
	else {
		return (
			<>
				<div className="toolbar2">
					<div className="left toolbar-display">
						<div className="left toolbar-input disabled-field">
						<input
							type="text"
							className="title"
							value={formatTitle(activeNote.title)}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<small className="note-meta date-display">
							{formatDate(activeNote.lastModified)}
						</small>
					</div>
					</div>
					
					<div className="right">
						<button className="toolbar-button btn" onClick={onEdit}>Edit</button>
						<button className="toolbar-button btn" onClick={() => onDelete(activeNote.id)}>Delete</button>
					</div>
				</div>
				<div className="main-body">
				<div dangerouslySetInnerHTML={{__html: body}}></div>
				</div>
			</>
		);
	}


};

export default Main;
