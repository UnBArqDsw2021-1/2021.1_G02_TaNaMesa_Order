import { Router } from "express";

import clientController from '../controllers/employeeController';

const routes = Router();

routes.post("/", async (request, response) => await clientController.create(request, response));

routes.get("/", async (request, response) => await clientController.getAll(request, response));

routes.get("/:cpf", async (request, response) => await clientController.getOne(request, response));

routes.put("/:cpf", async (request, response) => await clientController.edit(request, response));

routes.delete("/:cpf", async (request, response) => await clientController.destroy(request, response));


export default routes;