const { getDatabase, set, ref, get } = require("firebase/database");
const uid = require("../config/id.gen");

const addProducts = (image, points, price, name) => {
  const db = getDatabase();
  set(ref(db, "products/" + uid), {
    name: name,
    image: image,
    points: points,
    price: price,
  });
};

async function getProductById(id) {
  try {
    const db = getDatabase();
    const snapshot = await get(ref(db, `products/${id}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

async function getAllProducts() {
  try {
    const db = getDatabase();
    const usersRef = ref(db, "products");
    const snapshot = await get(usersRef);
    const users = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        users.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
    }
    return users;
  } catch (error) {
    console.error("Error getting all users:", error);
    return [];
  }
}

module.exports = { addProducts, getAllProducts, getProductById };
