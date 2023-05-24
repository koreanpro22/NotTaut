import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Homepage.css';
import SingleWorkspace from '../SingleWorkspace';
import { getAllWorkspaceThunk, getSingleWorkspaceThunk } from '../../store/workspace';

function Homepage() {
    return (
        <div className='homepage-container'>
            Welcome to Not Taut!
        </div>
    );
}

export default Homepage;
