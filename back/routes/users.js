import { Router } from 'express';
import user from "../controllers/user.controller"
var router = Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const us = await user.findAll()

  res.json(us).status(200);

});
export default router;
