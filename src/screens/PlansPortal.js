import ActivePlans from "./ActivePlans";
import ExpiredPlans from "./ExpiredPlans";

function PlansPortal() {
    return (
        <div className="plansDiv">
            <ExpiredPlans />
            <ActivePlans />
        </div>

    )
}
export default PlansPortal;