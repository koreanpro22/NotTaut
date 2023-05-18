import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Homepage.css';

function Homepage(){

    const sessionUser = useSelector(state => state.session.user);

    console.log(sessionUser)

    if (!sessionUser) return null

	return (
        <div>
            This is the current user: {sessionUser.name}
        </div>
	);
}

export default Homepage;
