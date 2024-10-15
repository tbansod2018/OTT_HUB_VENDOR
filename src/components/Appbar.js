// src/components/Appbar.js
import React from 'react';
import './Appbar.css'; // Import your CSS file

const Appbar = ({ activeSection, setActiveSection }) => {
    return (
        <nav>
            <ul>
                <li
                    className={activeSection === 'active-plans' ? 'active' : ''}
                    onClick={() => setActiveSection('active-plans')}
                >
                    Active Plans
                </li>
                <li
                    className={activeSection === 'purchase-request' ? 'active' : ''}
                    onClick={() => setActiveSection('purchase-request')}
                >
                    Purchase Request
                </li>
                <li
                    className={activeSection === 'Chat' ? 'active' : ''}
                    onClick={() => setActiveSection('Chat')}
                >
                    Chat
                </li>
            </ul>
        </nav>
    );
};

export default Appbar;
