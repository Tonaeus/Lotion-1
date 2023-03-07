import { useEffect, useState, useRef } from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";
import uuid from "react-uuid";
import "react-quill/dist/quill.snow.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";

function App() {
	const [show, setShow] = useState(true);

	const [notes, setNotes] = useState(
		localStorage.notes ? JSON.parse(localStorage.notes) : []
	);
	const [activeNote, setActiveNote] = useState(false);

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	const onAddNote = () => {
		const newNote = {
			id: uuid(),
			title: "Untitled",
			body: "",
			lastModified: "",
		};

		setNotes([newNote, ...notes]);
		setActiveNote(newNote.id);
	};

	const onDeleteNote = (noteId) => {
		setNotes(notes.filter(({ id }) => id !== noteId));
	};

	const onUpdateNote = (updatedNote) => {
		const updatedNotesArr = notes.map((note) => {
			if (note.id === updatedNote.id) {
				return updatedNote;
			}

			return note;
		});

		setNotes(updatedNotesArr);
	};

	const getActiveNote = () => {
		return notes.find(({ id }) => id === activeNote);
	};

	return (
		<BrowserRouter>
			<Header show={show} setShow={setShow} />

			<main>
				<Sidebar
					show={show}
					notes={notes}
					onAddNote={onAddNote}
					onDeleteNote={onDeleteNote}
					activeNote={activeNote}
					setActiveNote={setActiveNote}
				/>

				<div className="editor">
					<Routes>
						<Route
							path="/"
							element={<Default activeNote={getActiveNote()} />}
						></Route>
						<Route
							path="/notes"
							element={
								<Main
									activeNote={getActiveNote()}
									onUpdateNote={onUpdateNote}
									onDeleteNote={onDeleteNote}
								/>
							}
						></Route>
						<Route path="/notes/:pageId" element={
								<Main
									activeNote={getActiveNote()}
									onUpdateNote={onUpdateNote}
									onDeleteNote={onDeleteNote}
								/>
							}></Route>
					</Routes>
				</div>
			</main>
		</BrowserRouter>
	);
}

const Default = ({ activeNote }) => {
	const buttonRef = useRef(null);

	const navigate = useNavigate();

	const handleClick = () => {
		buttonRef.current.blur();

		console.log("Works");
		navigate(`/edit`);
	};

	useEffect(() => {
		navigate(`/notes`);
	}, []);

	if (!activeNote) {
		navigate(`/notes`);
	}

	return (
		<>
			<h1>Select a note or Create a new note</h1>
			<button className="save" onClick={handleClick} ref={buttonRef}>
				TEST
			</button>
		</>
	);
};

export default App;
