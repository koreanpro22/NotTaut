import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { clearChannel } from '../../store/channel';
import { clearMessage } from '../../store/message';
import { clearWorkspace } from '../../store/workspace';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	const dispatch = useDispatch();

	const clickHome = async () => {
		history.push('/');
		// await dispatch(clearChannel())
		// await dispatch(clearMessage())
		// await dispatch(clearWorkspace())
	}

	return (
		<div className='navbar'>
			<div onClick={clickHome} className='home-button'>
				Home
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
