import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:8080";

import StateContext from "./StateContext.js";
import DispatchContext from "./DispatchContext.js";

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

function Main() {
	const initialState = {
		loggedIn: Boolean(localStorage.getItem("complexappToken")),
		flashMessages: []
	};

	function ourReducer(state, action) {
		switch (action.type) {
			case "login":
				return { loggedIn: true, flashMessages: state.flashMessages };
			case "logout":
				return { loggedIn: false, flashMessages: state.flashMessages };
			case "flashMessage":
				return { loggedIn: state.loggedIn, flashMessages: state.flashMessages.concat(action.value) };
		}
	}

	const [state, dispatch] = useReducer(ourReducer, initialState);
	// state ACCESSES the state, dispatch UPDATES the state

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					<FlashMessages messages={state.flashMessages} />
					<Header />
					<Routes>
						<Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />
						<Route path="/post/:id" element={<ViewSinglePost />} />
						<Route path="/create-post" element={<CreatePost />} />
						<Route path="/about-us" element={<About />} />
						<Route path="/terms" element={<Terms />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</DispatchContext.Provider>
		</StateContext.Provider>
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
