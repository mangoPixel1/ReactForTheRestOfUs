import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useImmerReducer } from "use-immer";
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
import Profile from "./components/Profile.js";
import EditPost from "./components/EditPost.js";

function Main() {
	const initialState = {
		loggedIn: Boolean(localStorage.getItem("complexappToken")),
		flashMessages: [],
		user: {
			token: localStorage.getItem("complexappToken"),
			username: localStorage.getItem("complexappUsername"),
			avatar: localStorage.getItem("complexappAvatar")
		}
	};

	function ourReducer(draft, action) {
		switch (action.type) {
			case "login":
				draft.loggedIn = true;
				draft.user = action.data;
				return;
			case "logout":
				draft.loggedIn = false;
				return;
			case "flashMessage":
				draft.flashMessages.push(action.value);
				return;
		}
	}

	const [state, dispatch] = useImmerReducer(ourReducer, initialState);

	useEffect(() => {
		if (state.loggedIn) {
			localStorage.setItem("complexappToken", state.user.token);
			localStorage.setItem("complexappUsername", state.user.username);
			localStorage.setItem("complexappAvatar", state.user.avatar);
		} else {
			localStorage.removeItem("complexappToken");
			localStorage.removeItem("complexappUsername");
			localStorage.removeItem("complexappAvatar");
		}
	}, [state.loggedIn]);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					<FlashMessages messages={state.flashMessages} />
					<Header />
					<Routes>
						<Route path="/profile/:username/*" element={<Profile />} />
						<Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />
						<Route path="/post/:id" element={<ViewSinglePost />} />
						<Route path="/post/:id/edit" element={<EditPost />} />
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
