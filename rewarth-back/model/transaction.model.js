const { getDatabase, set, ref } = require("firebase/database");
const uid = require("../config/id.gen");

const addTransaction = (userId, product, price) => {
  const db = getDatabase();
  set(ref(db, "transaction/" + uid), {
    userId,
    product,
  });
};

module.exports = { addTransaction };
