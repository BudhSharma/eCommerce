const express = require('express')
const router = express.Router()
const { authenticateAdminToken } = require('../middleware/adminMiddleware')
const { authenticateToken } = require('../middleware/authMiddleware')
const AuthController = require('../controllers/userController/authController')

router
  .get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user })
  })

  .post('/register', AuthController.register)
  .post('/login', AuthController.login)
  .post('/refresh-token', AuthController.refreshToken)
  .post('/forgot-password', AuthController.forgotPassword)
  .post('/verify-otp', AuthController.resetPassword)
  .post('/changeForgotPassword', AuthController.changeForgotPassword)
  .get('/userDetails', authenticateToken, AuthController.userDetails)
  .patch(
    '/updateUserProfile',
    authenticateToken,
    AuthController.updateUserProfile
  )
  .patch(
    '/updatedUserProfileAddress',
    authenticateToken,
    AuthController.updatedUserProfileAddress
  )
  .get('/user-logout', authenticateToken, AuthController.signout)
  .get('/getAllUserList',  AuthController.getAllUserList)
  .get(
    '/getAllHealthExpertList',
    
    AuthController.getAllHealthExpertList
  )
  .get(
    '/getAllCustomerExpertList',
    
    AuthController.getAllCustomerExpertList
  )
  .get(
    '/getSingleUserData/:id',
    authenticateAdminToken,
    AuthController.getSingleUserData
  )
  .post('/sendContactUs', AuthController.sendContactUs)
  .get('/getCoupon', authenticateAdminToken, AuthController.getCoupon)
  .get(
    '/getSingleCoupon/:id',
    authenticateAdminToken,
    AuthController.getSingleCoupon
  )
  .post('/applyCoupon', authenticateAdminToken, AuthController.applyCoupon)
  .post(
    '/saveUsageCoupon',
    authenticateAdminToken,
    AuthController.saveUsageCoupon
  )
  .post("/postCheckout", AuthController.postCheckout)
  .get("/getCheckoutById/:id", AuthController.getCheckoutById)
  .get("/getCheckout", AuthController.getCheckout)
  .patch("/updateCheckout/:id", AuthController.updateCheckout)
  .delete("/deleteCheckout/:id", AuthController.deleteCheckout)

module.exports = router
