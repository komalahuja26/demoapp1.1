const express = require("express");
const router = express.Router();
const Shop = require("../model/shop");
const { client, paypal } = require("../configs/paypal");

// Get all request............
router.get("/", async (req, res, next) => {
  let books = await Shop.find().sort([["name", "ascending"]]);
  res.render("shop/index", { title: "Book List", dataset: books ,    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID
  });
});

// Get request for showing add form...........
router.get("/add", (req, res, next) => {
  res.render("shop/add", { title: "Add a Book" });
});

// Post request for saving the book.............
router.post("/add", async (req, res, next) => {
  let newBook = new Shop({
    name: req.body.name,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
  });
  await newBook.save();
  res.redirect("/shop");
});

// get request fro editing load...................
router.get("/edit/:_id", async (req, res, next) => {
  let book = await Shop.findById(req.params._id);
  res.render("shop/edit", { title: "Edit Book", book });
});

// Post request for editing with Id................
router.post("/edit/:_id", async (req, res, next) => {
  await Shop.findByIdAndUpdate(
    { _id: req.params._id },
    {
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
    }
  );
  res.redirect("/shop");
});

// GET request for deleting book...................
router.get("/delete/:_id", async (req, res, next) => {
  await Shop.findByIdAndDelete({ _id: req.params._id });
  res.redirect("/shop");
});



// Post request for creating order..........
router.post("/checkout", async (req, res) => {
  const { bookId } = req.body;
  const book = await Shop.findById(bookId);

  if (!book) return res.status(404).send("Book not found");

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: { currency_code: "USD", value: book.price },
      },
    ],
  });

  const response = await client().execute(request);
  res.json({ id: response.result.id });
});

// Post request for capturing order.............
router.post("/capture/:orderId", async (req, res) => {
  const request = new paypal.orders.OrdersCaptureRequest(req.params.orderId);
  request.requestBody({});
  const response = await client().execute(request);
  res.json(response.result);
});

module.exports = router;
