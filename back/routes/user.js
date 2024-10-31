import { Router } from 'express';
import user from "../controllers/user.controller"
var router = Router();

/* GET books listing. */
router.get('/', async function (req, res, next) {
    const u = await user.findById(req.body.id)

    res.json(u).status(200);

});

router.post('/', async function (req, res, next) {
    const createdUser = await user.create(req.body)

    res.json(createdUser).status(200);

});


router.patch('/', async function (req, res, next) {
    const user = req.body

    const updatedUser = await book.update(user._id, user)

    res.json(updatedUser).status(200);

});

export default router;
