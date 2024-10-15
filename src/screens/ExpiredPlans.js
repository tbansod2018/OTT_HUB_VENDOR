import React from "react";
import { where } from "firebase/firestore";
import PlansCard from "../components/PlansCard";
import useFirestoreQuery from "../hooks/useFirestoreQuery";

function ExpiredPlans() {
    const currentTime = new Date();

    const conditions = [
        where('end_time', '<', currentTime)
    ];

    const { documents: expiredSubscription, loading, error, refreshData } = useFirestoreQuery('active_plans', conditions);

    return (
        <div className="active-plans-div">
            <div className="active-plans-container">
                <h2>Expired Plans</h2>

                {error && <p>Error fetching expired plans: {error.message}</p>}
                {expiredSubscription.length === 0 ? (
                    <p>No expired plans available.</p>
                ) : (
                    <PlansCard plans={expiredSubscription} refreshData={refreshData} />
                )}
            </div>
        </div>
    );
}

export default ExpiredPlans;
