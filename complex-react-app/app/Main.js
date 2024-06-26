import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header.js";
import HomeGuest from "./components/HomeGuest.js";
import Home from "./components/Home.js";
import Footer from "./components/Footer.js";
import About from "./components/About.js";
import Terms from "./components/Terms.js";

function Main() {
	const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")));

	return (
		<BrowserRouter>
			<Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			<Routes>
				<Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
				<Route path="/about-us" element={<About />} />
				<Route path="/terms" element={<Terms />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
	module.hot.accept();
}
// npm run dev
// ctr+C to stop

// Backend:
// In terminal for backend-api folder
// npm run start
// ctrl+c then y to stop
