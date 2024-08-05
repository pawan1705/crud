import express from "express";
import { requireSignIn } from "../Utils/AuthMiddleware.js";
import * as userController from "../Controller/UserController.js";
const router = express.Router();
router.post("/login-user", userController.loginUser);
router.post("/register", requireSignIn, userController.userRegister);
router.get("/get-user", requireSignIn, userController.fetchUsers);
router.get("/get-by-id/:id", requireSignIn, userController.userById);
router.put("/update-user/:id", requireSignIn, userController.UpdateUser);
router.delete("/delete-user/:uid", requireSignIn, userController.deleteUser);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
