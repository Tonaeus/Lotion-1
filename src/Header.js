import { useRef } from "react";

function Header({ show, setShow }) {
	return (
		<>
			<nav>
				<div className="left">
					<ShowHide show={show} setShow={setShow}></ShowHide>
				</div>
				<div className="center">
					<h1>Lotion</h1>
					<h5>Like Notion, But Worse</h5>
				</div>
				<div className="right"></div>
			</nav>
		</>
	);
}

function ShowHide({ show, setShow }) {
	const buttonRef = useRef(null);

	const handleClick = () => {
		buttonRef.current.blur();
		setShow(!show);
	};

	return (
		<>
			<button className="toggle" onClick={handleClick} ref={buttonRef}>
				&#9776;
			</button>
		</>
	);
}

export default Header;
