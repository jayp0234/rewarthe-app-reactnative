require("./config/firebase.config");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const { getAllProducts, addProducts } = require("./model/products.model");
const { getDatabase, set, ref, get } = require("firebase/database");
const { v4: uuidv4 } = require("uuid");
const { buyNow } = require("./model/purchased.model");
const { addPoints } = require("./model/points.model");

app.use(cors());
app.use(bodyParser.json());

app.post("/api/add-product", async (req, res) => {
  try {
    const { image, price, points, name } = req.body;
    const db = getDatabase();
    set(ref(db, "products/" + uuidv4()), {
      image: image,
      name: name,
      points: points,
      price: price,
    });
    return res
      .send({ msg: "Product added succesfully !!", data: req.body })
      .json();
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/get-products", async (req, res) => {
  const items = await getAllProducts();
  return res.send(items).json();
});

app.get("/api/get-points/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const db = getDatabase();
    const snapshot = await get(ref(db, `points/${uid}`));
    if (snapshot.exists()) {
      const values = snapshot.val();
      return res.send({ data: values, msg: "Points available !!" }).json();
    } else {
      return res.send({ data: null, msg: "Points not available !!" }).json();
    }
  } catch (error) {
    return res.send({ data: null, msg: "Points not found !!" }).json();
  }
});

app.post("/api/add-points", async (req, res) => {
  try {
    const { userId, points } = req.body;
    const db = getDatabase();
    const snapshot = await get(ref(db, `points/${userId}`));

    if (snapshot.exists()) {
      const values = snapshot.val();
      set(ref(db, "points/" + userId), {
        points: parseInt(values.points) + points,
      });
      return res
        .send({ msg: "Points added succesfully !!", data: req.body })
        .json();
    } else {
      set(ref(db, "points/" + userId), {
        points: points,
      });
      return res
        .send({ msg: "Points added succesfully !!", data: req.body })
        .json();
    }
  } catch (err) {
    return res.send({ msg: "Points not added", data: null }).json();
  }
});

app.post("/api/buy-product", async (req, res) => {
  try {
    const { userId, productId, price, image, name } = req.body;
    await buyNow(userId, productId, price, image, name);
    return res.send({ msg: "Product buy successfully" }).json();
  } catch (err) {
    return res.send({ msg: "Product buy failed" }).json();
  }
});

app.get("/api/barcode/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const db = getDatabase();
    const snapshot = await get(ref(db, `purchased`));
    const snapshotPoints = await get(ref(db, `points/${uid}`));

    const filterData = Object.values(snapshot.val()).filter(
      (item) => item.userId === uid
    );
    return res
      .send({
        data: filterData,
        snapshotPoints,
        forbarcode: "/api/reward-claim",
        msg: "Transaction available !!",
      })
      .json();
  } catch (error) {
    return res.send({ data: null, msg: "Points not found !!" }).json();
  }
});

app.get("/api/transactions/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const db = getDatabase();
    const purchasedSnapshot = await get(ref(db, "purchased"));
    const purchasedData = purchasedSnapshot.val();

    const filteredItems = Object.values(purchasedData).filter(
      (item) => item.userId === uid
    );
    const currentMonth = new Date().getMonth();
    const monthWiseCount = filteredItems.filter(
      (item) => item?.month === currentMonth
    );
    const monthWiseCountExpense = filteredItems.filter(
      (item) => item?.month === currentMonth
    );
    const total = monthWiseCountExpense.reduce(
      (total, product) => total + product.price,
      0
    );
    // console.log(monthWiseCountExpense.reduce((s, r) => s.price));
    return res
      .send({
        data: filteredItems,
        monthWise: monthWiseCount,
        expense: total,
      })
      .json();
  } catch (error) {
    return res.send({ data: null, msg: "Transaction not found !!" }).json();
  }
});

app.get("/api/reward-claim", async (req, res) => {
  const { userId } = req.query;
  if (await addPoints(userId, 0)) {
    return res.send("<h1>Rewared claimed successfully</h1>");
  }
  return res.send("<h1>Rewared claimed failed</h1>");
});

app.listen(8000, () => {
  console.log("Server started");
});
