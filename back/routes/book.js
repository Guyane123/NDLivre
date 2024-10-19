import { Router } from 'express';
import book from "../controllers/book.controller"
var router = Router();

/* GET books listing. */
router.get('/', async function (req, res, next) {

    const user = req.body.user

    const b = await book.findByUserId(user.id)

    res.json(b).status(200);
});

router.post('/', async function (req, res, next) {

    const createdBook = await book.create(req.body.book)

    res.json(createdBook).status(200);
});
router.patch('/', async function (req, res, next) {

    const user = req.body.user
    const b = req.body.book

    const updatedBook = await book.update(b.id, b)

    res.json(updatedBook).status(200);
});

export default router;
