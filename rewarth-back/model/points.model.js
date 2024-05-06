const { getDatabase, set, ref, get } = require("firebase/database");
const uid = require("../config/id.gen");

const addPoints = (userId, points) => {
  const db = getDatabase();
  set(ref(db, "points/" + userId), {
    points: points,
  });
  return true;
};

async function getPointsById(id) {
  try {
    const db = getDatabase();
    const snapshot = await get(ref(db, `points/${id}`));
    if (snapshot.exists()) {
      return snapshot.val()?.points;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

module.exports = { addPoints, getPointsById };
