import { getDatabase, ref, onValue, off } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";

export const useGetPoints = () => {
  const { _j } = useContext(AuthContext);
  const [pointData, setPointData] = useState(0);
  const db = getDatabase();
  let pointsRef;

  useEffect(() => {
    if (_j) {
      pointsRef = ref(db, `points/${_j}`);

      // Listen for changes and update state
      const handleSnapshot = (snapshot) => {
        if (snapshot.exists()) {
          setPointData(snapshot.val());
        } else {
          setPointData(0); // If no data exists, set points to 0
        }
      };

      onValue(pointsRef, handleSnapshot);

      // Cleanup function to remove the listener when component unmounts
      return () => {
        off(pointsRef, "value", handleSnapshot);
      };
    }
  }, [_j]);

  return pointData;
};
