import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();

	const clickHome = () => {
		history.push('/');
	}

	return (
		<div className='navbar'>
			<div onClick={clickHome} className='home-button'>
				Home
				{/* <NavLink exact to="/">Home</NavLink> */}
			</div>
			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
