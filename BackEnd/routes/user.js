const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

//const nodemailer = require("nodemailer");

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRETE_KEY
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json("User Has Been Deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    console.log(user);

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).send(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// SEND EMAIL

// router.get("/send_email", async (req, res) => {
//   //async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   //let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     port: process.env.MAIL_PORT,
//     //secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.USERNAME,
//       pass: process.env.PASSWORD,
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: process.env.MAIL_FROM,
//     to: "saqibahmedaarhan@gmail.com",
//     subject: "TEST EMAIL",
//     html: `<div style="
//     border: 1px solid black;
//     padding: 20px;
//     font-family: sans-serif;
//     line-height: 2;
//     font-size: 20px;
//     ">
//     <h2>Here Is Your Email</h2>
//     <p>Hello Welcome User...</p>

//     <p>All The Best, Saqib</p>

//     </div>`,
//   });

//   if (info.messageId) {
//     res.send("Email Sent.");
//   } else {
//     res.send("Error Found While Sharing Mail");
//   }
//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//   //}

//   main().catch(console.error);
// });

module.exports = router;
