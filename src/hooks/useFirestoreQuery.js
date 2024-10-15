// src/hooks/useFirestoreQuery.js
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useFirestoreQuery = (collectionName, conditions) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(false);  // Add refresh trigger

    useEffect(() => {
        const fetchDocuments = async () => {
            setLoading(true);
            try {
                const collectionRef = collection(db, collectionName);
                const q = conditions?.length ? query(collectionRef, ...conditions) : collectionRef;  // Check if conditions exist
                const snapshot = await getDocs(q);
                const fetchedDocs = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setDocuments(fetchedDocs);
            } catch (err) {
                setError(err);
                console.error("Error fetching documents: ", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [collectionName, conditions, refreshTrigger]); // Add refreshTrigger to dependencies

    const refreshData = () => {
        setRefreshTrigger(prev => !prev);
        console.log("Refresh triggered: ", refreshTrigger);
    };


    return { documents, loading, error, refreshData };  // Return refreshData function
};

export default useFirestoreQuery;
