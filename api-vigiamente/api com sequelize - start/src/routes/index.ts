import express, { Router } from "express";
import usuarios from "./user";


const v1: Router = express.Router();
v1.use("/users", usuarios);

export default v1;