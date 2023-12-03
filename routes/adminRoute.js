const express = require('express')
const router = express.Router()
const { authenticateAdminToken } = require('../middleware/adminMiddleware')
const AdminController = require('../controllers/adminController/adminController')
const upload = require('../utils/multer')

router
  .post('/admin-login', AdminController.adminlogin)
  .get('/admin-logout', AdminController.signout)

  .get('/admin-dashboard', authenticateAdminToken, (req, res) => {
    res.json({
      message: 'Welcome to the admin dashboard',
      adminuser: req.adminuser
    })
  })

  // create user
  .post('/create-user', upload.array('files'), AdminController.addUser)
  .patch(
    '/updateUser/:userId',
    authenticateAdminToken,
    AdminController.updateUser
  )
  .patch(
    '/updatedUserAddress/:userId',
    authenticateAdminToken,
    AdminController.updatedUserAddress
  )
  .delete('/deleteUser/:id', authenticateAdminToken, AdminController.deleteUser)
  .post('/createLink', authenticateAdminToken, AdminController.createLink)
  .post(
    '/addProductCategory',
    authenticateAdminToken,
    upload.array('files'),
    AdminController.addProductCategory
  )
  .get('/getProductCategory', AdminController.getProductCategory)
  .patch(
    '/updateProductCategory/:id',
    authenticateAdminToken,
    AdminController.updateProductCategory
  )
  .delete(
    '/deleteProductCategory/:id',
    authenticateAdminToken,
    AdminController.deleteProductCategory
  )

  .post(
    '/addAbout',
    authenticateAdminToken,
    upload.array('files'),
    AdminController.addAbout
  )
  .get('/getAbout', AdminController.getAbout)
  .patch(
    '/updateAbout/:id',
    authenticateAdminToken,
    upload.array('files'),
    AdminController.updateAbout
  )
  .post(
    '/addPrivacyPolicy',
    authenticateAdminToken,
    upload.array('files'),
    AdminController.addPrivacyPolicy
  )
  .get(
    '/getPrivacyPolicy/:id',
    authenticateAdminToken,
    AdminController.getPrivacyPolicy
  )
  .patch(
    '/updatePrivacyPolicy/:id',
    authenticateAdminToken,
    upload.array('files'),
    AdminController.updatePrivacyPolicy
  )
  .post(
    '/addConactUs',
    authenticateAdminToken,
    upload.array('files'),
    AdminController.addConactUs
  )
  .patch(
    '/updateContactUs/:id',
    authenticateAdminToken,
    upload.array('files'),
    AdminController.updateContactUs
  )
  .get(
    '/getContactUs/:id',
    authenticateAdminToken,
    AdminController.getContactUs
  )
  .post(
    '/addTermAndCondition',
    authenticateAdminToken,
    upload.array('files'),
    AdminController.addTermAndCondition
  )
  .get('/getTermAndCondition', AdminController.getTermAndCondition)
  .patch(
    '/updateTermAndCondition/:id',
    authenticateAdminToken,
    upload.array('files'),
    AdminController.updateTermAndCondition
  )
  .post(
    '/addReturnPolicy',
    authenticateAdminToken,
    upload.array('files'),
    AdminController.addReturnPolicy
  )
  .get('/getReturnPolicy', AdminController.getReturnPolicy)
  .patch(
    '/updateReturnPolicy',
    authenticateAdminToken,
    upload.array('files'),
    AdminController.updateReturnPolicy
  )
  .post('/createCoupon', authenticateAdminToken, AdminController.createCoupon)
  .get('/getCoupon', authenticateAdminToken, AdminController.getCoupon)
  .get('/getCouponById/:id', AdminController.getCouponById)
  .patch(
    '/updateCoupon/:id',
    authenticateAdminToken,
    AdminController.updateCoupon
  )
  .delete(
    '/deleteCoupon/:id',
    authenticateAdminToken,
    AdminController.deleteCoupon
  )
  .post(
    '/addBlogBanner',
    authenticateAdminToken,
    upload.array('files'),
    AdminController.addBlogBanner
  )
  .post(
    '/addBlog',
    authenticateAdminToken,
    upload.array('files'),
    AdminController.addBlog
  )
  .get('/getBlog', AdminController.getBlog)
  .get('/getBlogById/:id', AdminController.getBlogById)
  .patch('/updateBlog/:id', authenticateAdminToken, AdminController.updateBlog)
  .delete('/deleteBlog/:id', authenticateAdminToken, AdminController.deleteBlog)
  .post(
    '/addShopByCategory',
    upload.array('files'),
    AdminController.addShopByCategory
  )
  .get('/getShopByCategory', AdminController.getShopByCategory)
  .get('/getShopByCategoryById/:id', AdminController.getShopByCategoryById)
  .delete('/deleteShopByCategory/:id', AdminController.deleteShopByCategory)
  .patch('/updateShopByCategory/:id', AdminController.updateShopByCategory)
  .post(
    '/setSetting',
    authenticateAdminToken,
    upload.array('files'),
    AdminController.setSetting
  )
  .get('/getSetting', AdminController.getSetting)
  .post(
    '/addEmailTemplates',
    authenticateAdminToken,
    AdminController.addEmailTemplates
  )
  .get('/getEmailTemplates', AdminController.getEmailTemplates)
  .get('/getEmailTemplatesById/:id', AdminController.getEmailTemplatesById)
  .patch(
    '/updateEmailTemplate/:id',
    authenticateAdminToken,
    AdminController.updateEmailTemplate
  )
  .delete(
    '/deleteEmailTemplate/:id',
    authenticateAdminToken,
    AdminController.deleteEmailTemplate
  )
  .post('/addDeit', AdminController.addDeit)
  .get('/getDeit', AdminController.getDeit)
  .get('/getDeitById/:id', AdminController.getDeitById)
  .get('/getDeitByUser/:id', AdminController.getDeitByUser)
  .delete('/deleteDeit/:id', AdminController.deleteDeit)
  .patch('/updateDeit/:id', AdminController.updateDeit)
  .post('/addFit', authenticateAdminToken, AdminController.addFit)
  .get('/getFit', AdminController.getFit)
  .get('/getFitById/:id', AdminController.getFitById)
  .patch('/updateFit/:id', AdminController.updateFit)
  .delete('/deleteFit/:id', AdminController.deleteFit)
  .post('/addAtributte', AdminController.addAtributte)
  .get('/getAtributte', AdminController.getAtributte)
  .get('/getAtributteById/:id', AdminController.getAtributteById)
  .delete('/deleteAtributte/:id', AdminController.deleteAtributte)
  .patch('/updateAtributte/:id', AdminController.updateAtributte)
  .post('/addAtributteValue', AdminController.addAtributteValue)
  .get('/getAtributteValue', AdminController.getAtributteValue)
  .get('/getAtributteValueById/:id', AdminController.getAtributteValueById)
  .delete('/deleteAtributteValue/:id', AdminController.deleteAtributteValue)
  .patch('/updateAtributteValue/:id', AdminController.updateAtributteValue)
  .post('/addTag', AdminController.addTag)
  .get('/getTag', AdminController.getTag)
  .get('/getTagById/:id', AdminController.getTagById)
  .delete('/deleteTag/:id', AdminController.deleteTag)
  .patch('/updateTag/:id', AdminController.updateTag)
  .post('/addQueAndAns', AdminController.addQueAndAns)
  .get('/getQueAndAns', AdminController.getQueAndAns)
  .get('/getQueAndAnsById/:id', AdminController.getQueAndAnsById)
  .get('/getQueAndAnsByProductId/:id', AdminController.getQueAndAnsByProductId)
  .patch('/updateQueAndAns/:id', AdminController.updateQueAndAns)
  .delete('/deleteQueAndAns/:id', AdminController.deleteQueAndAns)
  .post('/addPages', AdminController.addPages)
  .get('/getPages', AdminController.getPages)
  .get('/getPagesById/:id', AdminController.getPagesById)
  .get('/getPagesByTitle', AdminController.getPagesByTitle)
  .patch('/updatePages/:id', upload.array('files'), AdminController.updatePages)
  .delete('/deletePages/:id', AdminController.deletePages)

module.exports = router
