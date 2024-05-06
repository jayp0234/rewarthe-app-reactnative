import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export const useProducts = async (_j) => {
  const [products, setProducts] = useState([]);
  const db = getDatabase();

  const getIt = async () => {
    try {
      const itemRef = ref(db, "products");
      onValue(itemRef, (snapshot) => {
        const data = [];
        snapshot.forEach((childSnapshot) => {
          data.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        setProducts(data);
      });
    } catch (error) {
      setProducts([]);
    }
  };

  useEffect(() => {
    getIt();
  }, [_j]);

  return products;
};
