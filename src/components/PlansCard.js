import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import './PlansCard.css'; // Add this for styling

function PlansCard({ plans, refreshData }) {
    const [selectedPlan, setSelectedPlan] = useState(null);

    // Handle deleting the plan from Firestore
    const handleDelete = async (planId) => {
        try {
            await deleteDoc(doc(db, 'active_plans', planId));
            console.log(`Plan with ID ${planId} deleted successfully`);
            refreshData();  // Trigger re-fetch after deletion
        } catch (error) {
            console.error("Error deleting plan: ", error);
        }
    };

    // Handle editing the credentials in Firestore
    const handleEdit = async (planId, newCredentials) => {
        try {
            const planRef = doc(db, 'active_plans', planId);
            await updateDoc(planRef, {
                credentials: newCredentials
            });
            console.log(`Plan with ID ${planId} updated successfully`);
            refreshData();  // Trigger re-fetch after edit
        } catch (error) {
            console.error("Error updating plan: ", error);
        }
    };

    const handleEditClick = (plan) => {
        setSelectedPlan(plan);
    };

    const handleCloseModal = () => {
        setSelectedPlan(null);
    };

    const handleSave = (credentials) => {
        handleEdit(selectedPlan.id, credentials);
        handleCloseModal();
    };

    return (
        <div className="cards-container">
            {plans.map((plan) => (
                <div key={plan.id} className="plan-card">
                    <h3>Subscription ID: {plan.subscription_id}</h3>
                    <p><strong>User ID:</strong> {plan.user_id}</p>
                    <p><strong>Platform ID:</strong> {plan.platform_id}</p>
                    <p><strong>Vendor ID:</strong> {plan.vendor_id}</p>
                    <p><strong>Start Time:</strong> {new Date(plan.start_time.seconds * 1000).toLocaleString()}</p>
                    <p><strong>End Time:</strong> {new Date(plan.end_time.seconds * 1000).toLocaleString()}</p>
                    <p><strong>Status:</strong> {plan.status}</p>
                    <p><strong>Credentials:</strong> {plan.credentials}</p>
                    <div className="button-group">
                        <button onClick={() => handleEditClick(plan)}>Edit</button>
                        <button onClick={() => handleDelete(plan.id)}>Delete</button>
                    </div>
                </div>
            ))}
            {selectedPlan && (
                <Modal onClose={handleCloseModal} onSave={handleSave} plan={selectedPlan} />
            )}
        </div>
    );
}

const Modal = ({ onClose, onSave, plan }) => {
    const [newCredentials, setNewCredentials] = useState(plan.credentials);

    const handleSave = () => {
        onSave(newCredentials);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Credentials</h2>
                <input
                    type="text"
                    value={newCredentials}
                    onChange={(e) => setNewCredentials(e.target.value)}
                />
                <div className="modal-buttons">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default PlansCard;
