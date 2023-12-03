const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController/productController')
const upload = require('../utils/multer')
const { authenticateToken } = require('../middleware/authMiddleware')
const { authenticateAdminToken } = require('../middleware/adminMiddleware')

router
  .post('/add-product', upload.array('files'), ProductController.addProduct)
  .get('/getProduct/:id', ProductController.getProduct)
  .get('/getProductList', ProductController.getProductList)
  .delete('/deleteProduct/:id', ProductController.deleteProduct)
  .get('/getProductByCategory/:id', ProductController.getProductByCategory)
  .patch(
    '/updateProductByCtegory/:id',
    ProductController.updateProductByCtegory
  )
  .post('/selectLike', ProductController.selectLike)
  .get('/getLike', ProductController.getLike)
  .post('/addCart', authenticateToken, ProductController.addCart)
  .get('/getCartByUser/:id', authenticateToken, ProductController.getCartByUser)
  .delete('/removeCart', authenticateToken, ProductController.removeCart)
  .get('/getSingleCart/:id', authenticateToken, ProductController.getSingleCart)
  .post('/addFeedback', authenticateToken, ProductController.addFeedback)
  .get('/getFeedback', ProductController.getFeedback)
  .get('/getFeedbackById/:id', ProductController.getFeedbackById)
  .patch('/updateFeedback/:id', ProductController.updateFeedback)
  .post('/addWishlist', authenticateToken, ProductController.addWishlist)
  .get('/getWishlist', authenticateToken, ProductController.getWishlist)
  .get('/getWishListByUser/:user_id', ProductController.getWishListByUser)
  .delete(
    '/removeWishlist/:id',
    authenticateToken,
    ProductController.removeWishlist
  )
  .post('/createOrder', authenticateToken, ProductController.createOrder)
  .get(
    '/getOrderList/:user_id',
    authenticateToken,
    ProductController.getOrderList
  )
  .get('/getAllOrderList', ProductController.getAllOrderList)
  .get('/getOrderById/:id', ProductController.getOrderById)
  .delete(
    '/deleteOrder/:id',
    authenticateAdminToken,
    ProductController.deleteOrder
  )
  .patch('/updateOrder/:id', ProductController.updateOrder)

module.exports = router
