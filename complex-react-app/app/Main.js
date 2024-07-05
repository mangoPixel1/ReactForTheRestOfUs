import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:8080";

// Components
import Header from "./components/Header.js";
import HomeGuest from "./components/HomeGuest.js";
import Home from "./components/Home.js";
import Footer from "./components/Footer.js";
import About from "./components/About.js";
import Terms from "./components/Terms.js";
import CreatePost from "./components/CreatePost.js";
import ViewSinglePost from "./components/ViewSinglePost.js";
import FlashMessages from "./components/FlashMessages.js";
import ExampleContext from "./ExampleContext.js";

function Main() {
	const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")));
	const [flashMessages, setFlashMessages] = useState([]);

	function addFlashMessage(msg) {
		setFlashMessages(prev => prev.concat(msg));
	}

	return (
		<ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>
			<BrowserRouter>
				<FlashMessages messages={flashMessages} />
				<Header loggedIn={loggedIn} />
				<Routes>
					<Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
					<Route path="/post/:id" element={<ViewSinglePost />} />
					<Route path="/create-post" element={<CreatePost />} />
					<Route path="/about-us" element={<About />} />
					<Route path="/terms" element={<Terms />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</ExampleContext.Provider>
	);
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
	module.hot.accept();
}

// Frontend:
// npm run dev
// ctr+C to stop

// Backend:
// In terminal for backend-api folder
// npm run start
// ctrl+c then y to stop
