const {
  getDatabase,
  set,
  ref,
  get,
  query,
  orderByChild,
  equalTo,
} = require("firebase/database");
const { getProductById } = require("./products.model");
const { getPointsById, addPoints } = require("./points.model");
const { v4: uuidv4 } = require("uuid");

const buyNow = async (userId, productId, price, image, name) => {
  const db = getDatabase();
  try {
    const dT = new Date();
    const month = new Date().getMonth();
    const process = await set(ref(db, `purchased/${uuidv4()}`), {
      userId: userId,
      productId: productId,
      name: name,
      image: image,
      price: parseInt(price),
      dateTime: dT.toString(),
      month: parseInt(month.toString()),
    })
      .then((r) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
    if (process) {
      const productPoints = await getProductById(productId);
      const userPoints = await getPointsById(userId);
      if (userPoints !== null) {
        await addPoints(
          userId,
          parseInt(userPoints) + parseInt(productPoints?.points)
        );
      } else {
        await addPoints(userId, productPoints?.points);
      }

      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

module.exports = { buyNow };
