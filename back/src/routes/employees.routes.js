import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employees.controller.js";
import verifyToken from "../middlewares/authentication.middleware.js";

const employeesRoutes = Router();

employeesRoutes.post("/", verifyToken, createEmployee);
employeesRoutes.get("/", verifyToken, getAllEmployees);
employeesRoutes.get("/:id", verifyToken, getEmployeeById);
employeesRoutes.put("/:id", verifyToken, updateEmployee);
employeesRoutes.delete("/:id", verifyToken, deleteEmployee);

export default employeesRoutes;
