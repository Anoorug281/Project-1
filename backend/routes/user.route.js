import { Router } from 'express'
import { forgotPasswordController, loginController, logoutController, refreshToken, registerUserController,  resetpassword,  updateUserDetails,  verifyEmailController, verifyForgotPasswordOtp } from '../controllers/user.controller.js'
import auth from '../middleware/auth.js'
const userRouter = Router()

userRouter.post('/register',registerUserController)
userRouter.post('/verify_email',verifyEmailController)
userRouter.post('/login',loginController)
userRouter.get('/logout',auth,logoutController)

userRouter.put('/update-user',auth,updateUserDetails)
userRouter.put('/forgot-password',forgotPasswordController)
userRouter.put('/verify-forgot-password-otp',verifyForgotPasswordOtp)
userRouter.put('/reset-password',resetpassword)
userRouter.post('/refresh-token',refreshToken)


export default userRouter