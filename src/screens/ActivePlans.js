import { collection, where } from "firebase/firestore";
import './ActivePlans.css';
import PlansCard from '../components/PlansCard';
import useFirestoreQuery from '../hooks/useFirestoreQuery'; // Import the custom hook

function ActivePlans() {
    // Define conditions: Here we're fetching only active plans based on status

    // Use the useFirestoreQuery hook to fetch active plans
    const { documents: activePlans, loading, error, refreshData } = useFirestoreQuery('active_plans', null);

    return (
        <div className="active-plans-div">
            <div className="active-plans-container">
                <h2>Active Plans</h2>
                {loading ? (
                    <p>Loading active plans...</p>
                ) : error ? (
                    <p>Error fetching plans: {error.message}</p>
                ) : activePlans.length === 0 ? (
                    <p>No active plans available.</p>
                ) : (
                    <PlansCard plans={activePlans} refreshData={{ refreshData }} />
                )}
            </div>
        </div>
    );
}

export default ActivePlans;
