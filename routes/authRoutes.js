import express from 'express'
import { loginController, registerController, userController } from '../controllers/authController.js'
import { requireSignIn } from '../middleware/authMiddleware.js'
const router = express.Router()

//routing
router.post('/register', registerController)
router.post('/login', loginController)

//protected user route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})
router.get('/welcome', requireSignIn, userController)

export default router;
