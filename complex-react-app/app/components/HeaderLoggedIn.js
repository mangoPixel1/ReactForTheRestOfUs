import React, { useEffect } from "react";

function HeaderLoggedIn(props) {
	function handleLogout() {
		props.setLoggedIn(false);
		localStorage.removeItem("complexappToken");
		localStorage.removeItem("complexappUsername");
		localStorage.removeItem("complexappAvatar");
	}

	return (
		<div className="flex-row my-3 my-md-0">
			<a href="#" className="text-white mr-2 header-search-icon">
				<i className="fas fa-search"></i>
			</a>
			<span className="mr-2 header-chat-icon text-white">
				<i className="fas fa-comment"></i>
				<span className="chat-count-badge text-white"> </span>
			</span>
			<a href="#" className="mr-2">
				<img className="small-header-avatar" src={localStorage.getItem("complexappAvatar")} />
			</a>
			<a className="btn btn-sm btn-success mr-2" href="/create-post">
				Create Post
			</a>
			<button onClick={handleLogout} className="btn btn-sm btn-secondary">
				Sign Out
			</button>
		</div>
	);
}

export default HeaderLoggedIn;
