const dotenv = require("dotenv");
const router = require("express").Router();
const uuid = require("uuid");
const Razorpay = require("razorpay");
const crypto = require("crypto");
dotenv.config();

const KEY = process.env.STRIPE_SECRET_KEY;
//console.log(KEY);
const stripe = require("stripe")(KEY);

router.post("/payments", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.token,
      amount: req.body.amount,
      currency: "USD",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );

  // stripe.customers
  //   .create({
  //     email: req.body.stripeEmail,
  //     source: req.body.stripeToken,
  //     name: "Saqib",
  //     address: {
  //       line1: "new Chowk",
  //       postal_code: "570007",
  //       city: "mysore",
  //       state: "Karnataka",
  //       country: "India",
  //     },
  //   })
  //   .then((customer) => {
  //     return stripe.charges.create({
  //       amount: 7000,
  //       description: "Product Items",
  //       currency: "USD",
  //       customer: customer.id,
  //     });
  //   })
  //   .then((charge) => {
  //     console.log(charge);
  //     res.send("Success");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.send(err);
  //   });

  // stripe.charges.create(
  //   {
  //     source: req.body.tokenId,
  //     amount: req.body.amount,
  //     currency: "usd",
  //   },
  //   (stripeErr, stripeRes) => {
  //     if (stripeErr) {
  //       console.log("Hi I'm Stripe Error ");
  //       res.status(500).json(stripeErr);
  //     } else {
  //       console.log("SUCCESS");
  //       res.status(200).json(stripeRes);
  //     }
  //   }
  // );
});

router.post("/pay", (req, res) => {
  try {
    var instance = new Razorpay({
      key_id: process.env.RAZOR_KEY_ID,
      key_secret: process.env.RAZOR_SECRET_KEY,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      console.log(order,'---');
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZOR_SECRET_KEY)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res
        .status(200)
        .json({ message: "Payment Verified SuccessFully." });
    } else {
      return res.status(400).json({ message: "Invalid Signature Sent!" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
/* const { product, token } = req.body;

  console.log("PRODUCT", product);
  console.log("PRICE", product.price);

  const idempontencyKey = uuid;

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchase Of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    }); */
