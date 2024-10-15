import React, { useState } from 'react';
import Appbar from '../components/Appbar';
import Chat from '../screens/Chat'; // Chat component
import ActivePlans from '../screens/ActivePlans';
import PurchaseRequest from '../screens/PurchaseRequest';
import ExpiredPlans from '../screens/ExpiredPlans';
import PlansPortal from '../screens/PlansPortal';

function AdminPanel() {
    const [activeSection, setActiveSection] = useState('active-plans');

    const renderContent = () => {
        switch (activeSection) {
            case 'active-plans':
                return <PlansPortal />;
            case 'purchase-request':
                return < PurchaseRequest />;
            case 'Chat':
                return <Chat />;
            default:
                return <PlansPortal />; // Default to Subscriptions if no section is selected
        }
    };

    return (
        <div>
            <Appbar activeSection={activeSection} setActiveSection={setActiveSection} />
            <div style={{ marginTop: '20px' }}>
                {renderContent()}
            </div>
        </div>
    );
}

export default AdminPanel;