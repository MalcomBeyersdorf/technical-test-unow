import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/security.controller.js";

const securityRoutes = Router();

securityRoutes.post("/sign-in", signIn);
securityRoutes.post("/sign-out", signOut);
securityRoutes.post("/sign-up", signUp);

export default securityRoutes;
