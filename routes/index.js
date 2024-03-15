const Router = require("express");
const router = new Router();
const goodRouter = require("./goodRouter");
const userRouter = require("./userRouter");

router.use("./good", goodRouter);
router.use("./user", userRouter);

module.exports = router;
