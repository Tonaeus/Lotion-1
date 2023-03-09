import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";

function App() {
	const [show, setShow] = useState(true);
	const [edit, setEdit] = useState(false);

	const [notes, setNotes] = useState(
		localStorage.notes ? JSON.parse(localStorage.notes) : []
	);
	const [activeNote, setActiveNote] = useState(false);

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

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
					setNotes={setNotes}
					onDeleteNote={onDeleteNote}
					activeNote={activeNote}
					setActiveNote={setActiveNote}
					onUpdateNote={onUpdateNote}
					edit={edit}
					setEdit={setEdit}
				/>

				<div className="editor">
					<Routes>
						<Route
							path="/"
							element={<Default />}
						></Route>
						<Route
							path="/notes"
							element={
								<Main
									activeNote={getActiveNote()}
									onUpdateNote={onUpdateNote}
									onDeleteNote={onDeleteNote}
									setEdit={setEdit}
								/>
							}
						></Route>
						<Route
							path="/notes/:currId"
							element={
								<Main
									activeNote={getActiveNote()}
									onUpdateNote={onUpdateNote}
									onDeleteNote={onDeleteNote}
									setEdit={setEdit}
								/>
							}
						></Route>
						<Route
							path="/notes/:currId/:mode"
							element={
								<Main
									activeNote={getActiveNote()}
									onUpdateNote={onUpdateNote}
									onDeleteNote={onDeleteNote}
									setEdit={setEdit}
								/>
							}
						></Route>
					</Routes>
				</div>
			</main>
		</BrowserRouter>
	);
}

const Default = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate(`/notes`);
	}, []);
};

export default App;
