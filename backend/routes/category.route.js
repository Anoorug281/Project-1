import { Router } from "express";
import auth from "../middleware/auth.js";
import { getCategoryController, updateCategoryController, uploadCategoryController } from "../controllers/category.controller.js";

const categoryRouter = Router()

categoryRouter.post("/add-category",auth,uploadCategoryController)
categoryRouter.get('/get',getCategoryController)
categoryRouter.put('/update',auth,updateCategoryController)

export default categoryRouter