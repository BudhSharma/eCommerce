const AdminService = require('../../service/adminService/adminService')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config')

const adminUser = {
  email: 'admin@admin.com',
  passwordHash: '$2a$10$zTYxEK/6UKP5H2ruhFxX/ONcs2o.KiEapBW0CQez7MCwoMj1JO.HK'
}

class AdminController {
  static async adminRegistration (req, res) {
    try {
      const {
        first_name,
        last_name,
        email,
        phone,
        password,
        confirm_password
      } = data

      if (password !== confirm_password) {
        throw { status: 400, message: "Passwords don't match" }
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const check = await User.findOne({ email: email })
      if (check) {
        throw { status: 409, message: 'User already exists' }
      } else {
        await User.create({
          first_name,
          last_name,
          email,
          phone,
          password: hashedPassword,
          role: 'Admin'
        })

        return { success: true, message: 'User registered successfully' }
      }
    } catch (error) {
      throw error
    }
  }

  static async adminlogin (req, res) {
    try {
      const { email, password } = req.body

      if (email !== adminUser.email) {
        return res
          .status(422)
          .json({ error: 'Please provide correct information!!!' })
      }

      const validPassword = await bcrypt.compare(
        password,
        adminUser.passwordHash
      )

      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid password' })
      }

      const accessToken = jwt.sign(
        { userId: adminUser.email },
        config.jwtSecret,
        {
          expiresIn: '7d'
        }
      )

      if (res.status(200)) {
        res.cookie('adminAccessToken', accessToken, {
          httpOnly: false,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          sameSite: 'None',
          secure: true
        })
        res.status(200).json({
          message: 'Login successfull done!',
          success: true,
          token: accessToken
        })
      } else {
        return res.json({ error: 'error' })
      }
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        success: false,
        error: error.message
      })
    }
  }

  static async signout (req, res) {
    res.clearCookie('adminAccessToken')
    res.status(200).json({ message: 'Logout successfull done!', success: true })
  }

  static async addUser (req, res, next) {
    try {
      const result = await AdminService.addUser(
        req.body,
        req.files !== undefined ? req.files : null
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateUser (req, res, next) {
    try {
      const result = await AdminService.updateUser(req.params, req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updatedUserAddress (req, res, next) {
    try {
      const result = await AdminService.updatedUserAddress(
        req.params,
        req.query.operation,
        req.body
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async deleteUser (req, res, next) {
    try {
      const result = await AdminService.deleteUser(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async createLink (req, res, next) {
    try {
      const result = await AdminService.addSocialLinks(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addProductCategory (req, res, next) {
    try {
      const result = await AdminService.addProductCategory(
        req.body,
        req.files[0] ? req.files[0] : null
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getProductCategory (req, res, next) {
    try {
      const result = await AdminService.getProductCategory()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateProductCategory (req, res, next) {
    try {
      const result = await AdminService.updateProductCategory(
        req.params,
        req.body
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async deleteProductCategory (req, res, next) {
    try {
      const result = await AdminService.deleteProductCategory(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addAbout (req, res, next) {
    try {
      const result = await AdminService.addAbout(
        req.body,
        req.files[0] ? req.files : null
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getAbout (req, res, next) {
    try {
      const result = await AdminService.getAbout()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateAbout (req, res, next) {
    try {
      const result = await AdminService.updateAbout(
        req.params,
        req.body,
        req.files[0] ? req.files : null
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addPrivacyPolicy (req, res, next) {
    try {
      const result = await AdminService.addPrivacyPolicy(
        req.body,
        req.files[0] ? req.files : null
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getPrivacyPolicy (req, res, next) {
    try {
      const result = await AdminService.getPrivacyPolicy(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updatePrivacyPolicy (req, res, next) {
    try {
      const result = await AdminService.updatePrivacyPolicy(
        req.params,
        req.body,
        req.files[0] ? req.files : null
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addConactUs (req, res, next) {
    try {
      const result = await AdminService.addConactUs(
        req.body,
        req.files[0] ? req.files : null
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateContactUs (req, res, next) {
    try {
      const result = await AdminService.updateContactUs(
        req.params,
        req.body,
        req.files[0] ? req.files : null
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getContactUs (req, res, next) {
    try {
      const result = await AdminService.getContactUs(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addTermAndCondition (req, res, next) {
    try {
      const result = await AdminService.addTermAndCondition(
        req.body,
        req.files[0] ? req.files : null
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getTermAndCondition (req, res, next) {
    try {
      const result = await AdminService.getTermAndCondition()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateTermAndCondition (req, res, next) {
    try {
      const result = await AdminService.updateTermAndCondition(
        req.params,
        req.body,
        req.files[0] ? req.files : null
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addReturnPolicy (req, res, next) {
    try {
      const result = await AdminService.addReturnPolicy(
        req.body,
        req.files[0] ? req.files : null
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getReturnPolicy (req, res, next) {
    try {
      const result = await AdminService.getReturnPolicy()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateReturnPolicy (req, res, next) {
    try {
      const result = await AdminService.updateReturnPolicy(
        req.params,
        req.body,
        req.files[0] ? req.files : null
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async createCoupon (req, res, next) {
    try {
      const result = await AdminService.createCoupon(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getCoupon (req, res, next) {
    try {
      const result = await AdminService.getCoupon()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getCouponById (req, res, next) {
    try {
      const result = await AdminService.getCouponById(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateCoupon (req, res, next) {
    try {
      const result = await AdminService.updateCoupon(req.params, req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async deleteCoupon (req, res, next) {
    try {
      const result = await AdminService.deleteCoupon(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addBlogBanner (req, res, next) {
    try {
      const result = await AdminService.addBlogBanner(req.files)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addBlog (req, res, next) {
    try {
      const result = await AdminService.addBlog(req.files, req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getBlog (req, res, next) {
    try {
      const result = await AdminService.getBlog()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getBlogById (req, res, next) {
    try {
      const result = await AdminService.getBlogById(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateBlog (req, res, next) {
    try {
      const result = await AdminService.updateBlog(req.body, req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async deleteBlog (req, res, next) {
    try {
      const result = await AdminService.deleteBlog(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addShopByCategory (req, res, next) {
    try {
      const result = await AdminService.addShopByCategory(
        req.files !== undefined ? req.files : null,
        req.body
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getShopByCategory (req, res, next) {
    try {
      const result = await AdminService.getShopByCategory()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getShopByCategoryById (req, res, next) {
    try {
      const result = await AdminService.getShopByCategoryById(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async deleteShopByCategory (req, res, next) {
    try {
      const result = await AdminService.deleteShopByCategory(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateShopByCategory (req, res, next) {
    try {
      const result = await AdminService.updateShopByCategory(
        req.params,
        req.body
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async setSetting (req, res, next) {
    try {
      const result = await AdminService.setSetting(req.body, req.files)

      res.status(201).json(result)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async getSetting (req, res, next) {
    try {
      const result = await AdminService.getSetting()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addEmailTemplates (req, res, next) {
    try {
      const result = await AdminService.addEmailTemplates(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getEmailTemplates (req, res, next) {
    try {
      const result = await AdminService.getEmailTemplates()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getEmailTemplatesById (req, res, next) {
    try {
      const result = await AdminService.getEmailTemplatesById(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateEmailTemplate (req, res, next) {
    try {
      const result = await AdminService.updateEmailTemplate(
        req.params,
        req.body
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async deleteEmailTemplate (req, res, next) {
    try {
      const result = await AdminService.deleteEmailTemplate(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addDeit (req, res, next) {
    try {
      const result = await AdminService.addDeit(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getDeit (req, res, next) {
    try {
      const result = await AdminService.getDeit()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getDeitById (req, res, next) {
    try {
      const result = await AdminService.getDeitById(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getDeitByUser (req, res, next) {
    try {
      const result = await AdminService.getDeitByUser(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async deleteDeit (req, res, next) {
    try {
      const result = await AdminService.deleteDeit(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateDeit (req, res, next) {
    try {
      const result = await AdminService.updateDeit(req.params, req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addFit (req, res, next) {
    try {
      const result = await AdminService.addFit(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getFit (req, res, next) {
    try {
      const result = await AdminService.getFit()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getFitById (req, res, next) {
    try {
      const result = await AdminService.getFitById(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateFit (req, res, next) {
    try {
      const result = await AdminService.updateFit(req.params, req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async deleteFit (req, res, next) {
    try {
      const result = await AdminService.deleteFit(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addAtributte (req, res, next) {
    try {
      const result = await AdminService.addAtributte(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getAtributte (req, res, next) {
    try {
      const result = await AdminService.getAtributte()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getAtributteById (req, res, next) {
    try {
      const result = await AdminService.getAtributteById(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async deleteAtributte (req, res, next) {
    try {
      const result = await AdminService.deleteAtributte(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateAtributte (req, res, next) {
    try {
      const result = await AdminService.updateAtributte(req.params, req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addAtributteValue (req, res, next) {
    try {
      const result = await AdminService.addAtributteValue(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getAtributteValue (req, res, next) {
    try {
      const result = await AdminService.getAtributteValue()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getAtributteValueById (req, res, next) {
    try {
      const result = await AdminService.getAtributteValueById(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async deleteAtributteValue (req, res, next) {
    try {
      const result = await AdminService.deleteAtributteValue(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateAtributteValue (req, res, next) {
    try {
      const result = await AdminService.updateAtributteValue(
        req.params,
        req.body
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addTag (req, res, next) {
    try {
      const result = await AdminService.addTag(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getTag (req, res, next) {
    try {
      const result = await AdminService.getTag()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getTagById (req, res, next) {
    try {
      const result = await AdminService.getTagById(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async deleteTag (req, res, next) {
    try {
      const result = await AdminService.deleteTag(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateTag (req, res, next) {
    try {
      const result = await AdminService.updateTag(req.params, req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addQueAndAns (req, res, next) {
    try {
      const result = await AdminService.addQueAndAns(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getQueAndAns (req, res, next) {
    try {
      const result = await AdminService.getQueAndAns()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getQueAndAnsById (req, res, next) {
    try {
      const result = await AdminService.getQueAndAnsById(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getQueAndAnsByProductId (req, res, next) {
    try {
      const result = await AdminService.getQueAndAnsByProductId(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateQueAndAns (req, res, next) {
    try {
      const result = await AdminService.updateQueAndAns(req.params, req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async deleteQueAndAns (req, res, next) {
    try {
      const result = await AdminService.deleteQueAndAns(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addPages (req, res, next) {
    try {
      const result = await AdminService.addPages(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getPages (req, res, next) {
    try {
      const result = await AdminService.getPages()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getPagesById (req, res, next) {
    try {
      const result = await AdminService.getPagesById(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getPagesByTitle (req, res, next) {
    try {
      const result = await AdminService.getPagesByTitle(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updatePages (req, res, next) {
    try {
      const result = await AdminService.updatePages(
        req.params,
        req.body,
        req.files !== undefined ? req.files : null
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async deletePages (req, res, next) {
    try {
      const result = await AdminService.deletePages(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminController
