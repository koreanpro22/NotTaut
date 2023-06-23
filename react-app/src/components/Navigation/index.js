import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { clearCurrentChannel } from '../../store/channel';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	const dispatch = useDispatch();

	const clickHome = async () => {
		history.push('/');
		dispatch(clearCurrentChannel())
	}

	return (
		<div className='navbar'>
			<div onClick={clickHome} className='home-button'>
				All Workspaces
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
