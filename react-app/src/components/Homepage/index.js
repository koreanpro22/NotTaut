import React from 'react';
import './Homepage.css';
import { useModal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal';

function Homepage() {

    const { setModalContent } = useModal();
    // console.log(modal)

    return (
        <>
            <div className='homepage-container'>
                <div className='home-intro'>
                    <h1>
                        Welcome to Not Taut!
                    </h1>
                    <p>
                        NotTaut provides users quick and easy accessabilty to communicate with others live via chat.
                    </p>
                </div>
                <div className='home-body'>
                    <div className='feature-carousel'>
                        <h1>Take a look at the features!</h1>
                        <div className='single-feature'>
                            <h3>Workspace Feature</h3>
                            <p>Having multiple workspaces to be able to maintain different teams. Creating a new workspace with the ablilty to invite users.</p>
                            <img id='workspace-feature-img' src={'../../../../static/all-workspaces.PNG'} style={{ width: '450px' }}></img>
                        </div>
                        <div className='single-feature'>
                            <h3>Channel Feature</h3>
                            <p>The channel feature gives users the ability to have different topics and handle their converstations within the same workspace.</p>
                            <img src={'../../../../static/channel-feature-img.PNG'} style={{ width: '450px' }}></img>
                        </div>
                        <div className='single-feature'>
                            <h3>Message Feature</h3>
                            <p>The message feature utilizes web-sockets so users are able to communicate in real-time</p>
                            <img src={'../../../../static/message-feature-img.PNG'} style={{ width: '450px' }}></img>
                        </div>
                        <div className='single-feature'>
                            <h3>Thread Message Feature</h3>
                            <p>The thread message feature lets users respond to a specific message to keep the channel </p>
                            <img src={'../../../../static/thread-message-feature-img.PNG'} alt='Feature coming soon!' style={{ width: '450px' }}></img>
                        </div>
                    </div>
                    {/* <div className='getting-started'>
                        <h1>Ready to get Started!</h1>
                        <div className='launch-NotTaut' onClick={setModalContent(<LoginFormModal />)}>
                            Launch NotTaut!
                        </div>
                    </div> */}
                </div>
                <div className='home-footer'>
                    <div className='home-footer-content'>
                        <div>NotTaut was developed using Python, Flask, React, and Redux.</div>
                        <div className='social-links'>David Kim <a href='https://github.com/koreanpro22'><i class="fab fa-github"></i></a> <a href='https://www.linkedin.com/in/david-kim-a37b59274/'><i class="fab fa-linkedin"></i></a></div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Homepage;
