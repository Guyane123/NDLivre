import { Router } from 'express';
import { findAll } from "../controllers/user.controller.js"
var router = Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const us = await findAll()

  res.json(us).status(200);

});
export default router;
