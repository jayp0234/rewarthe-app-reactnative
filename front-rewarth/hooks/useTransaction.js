import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  off,
  equalTo,
} from "firebase/database";

export const useTransactions = (uid) => {
  const [transactions, setTransactions] = useState([]);
  const [monthWiseCount, setMonthWiseCount] = useState([]);
  const [expense, setExpense] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const purchasedRef = ref(db, "purchased");
        const transactionsQuery = query(
          purchasedRef,
          orderByChild("userId"),
          equalTo(uid)
        );

        onValue(transactionsQuery, (snapshot) => {
          const purchasedData = snapshot.val() || {};
          const filteredItems = Object.values(purchasedData);
          const currentMonth = new Date().getMonth();
          const monthWiseCount = filteredItems.filter(
            (item) => item?.month === currentMonth
          );
          const totalExpense = monthWiseCount.reduce(
            (total, product) => total + product.price,
            0
          );

          setTransactions(filteredItems);
          setMonthWiseCount(monthWiseCount);
          setExpense(totalExpense);
          setLoading(false);
          setError(null);
        });
      } catch (error) {
        setError("Transaction not found!!");
        setLoading(false);
        setTransactions([]);
        setMonthWiseCount([]);
        setExpense(0);
      }
    };

    fetchData();

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      // Detach the listener to avoid memory leaks
      off(purchasedRef);
    };
  }, [uid]);

  return { transactions, monthWiseCount, expense, loading, error };
};
