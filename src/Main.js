import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";

const Main = ({ activeNote, onUpdateNote, onDeleteNote, updateId }) => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [date, setDate] = useState("");

	useEffect(() => {
		if (activeNote) {
			setTitle(activeNote.title);
			setBody(activeNote.body);
			setDate(new Date().toISOString().slice(0, 16));
		}
	}, [activeNote]);

	const navigate = useNavigate();
	const { currId, mode } = useParams();

	if (!activeNote)
		return (
			<div className="no-active-note">Select a note, or create a new one.</div>
		);

	const onSave = () => {
		onUpdateNote({
			id: currId,
			title: title,
			body: body,
			lastModified: date,
		});
		navigate(`/notes/${activeNote.id}`);
		console.log(activeNote);
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

	if (mode) {
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
						<button onClick={() => onDelete(activeNote.id)}>Delete</button>
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
	}
	else {
		return (
			<>
				<div className="toolbar">
					<div className="left">
					<div dangerouslySetInnerHTML={{__html: activeNote.title}}></div>
						{formatDate(activeNote.lastModified)}
					</div>
					<div className="right">
						<button onClick={onEdit}>Edit</button>
						<button onClick={() => onDelete(activeNote.id)}>Delete</button>
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
