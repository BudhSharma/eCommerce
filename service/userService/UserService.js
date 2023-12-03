const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const config = require('../../config')
const nodemailer = require('nodemailer')
const {
  generateAccessToken,
  generateRefreshToken
} = require('../../jsonwebtoken/jsonwebtoken')
const { generateUniqueNumber } = require('../../utils/UniqueNumber')
const UserContactUs = require('../../models/ContactUs')
const { sendEmailContactUs } = require('../../utils/nodemailer')
const Coupon = require('../../models/coupon/Coupon')
const CouponUsageUser = require('../../models/coupon/CouponUsageUser')
const Checkout = require('../../models/Checkout')

class UserService {
  static async registerUser (data) {
    try {
      const {
        first_name,
        last_name,
        email,
        phone,
        password,
        confirm_password,
        role
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
          role
        })

        return { success: true, message: 'User registered successfully' }
      }
    } catch (error) {
      throw error
    }
  }

  static async loginUser (data) {
    try {
      const { email, password } = data

      const user = await User.findOne({ email })

      if (!user) {
        throw { status: 404, message: 'User not found' }
      }

      const validPassword = await bcrypt.compare(password, user.password)

      if (!validPassword) {
        throw { status: 401, message: 'Invalid password' }
      }

      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)

      return { accessToken, refreshToken }
    } catch (error) {
      throw error
    }
  }

  static async refreshAccessToken (refreshToken) {
    try {
      if (!refreshToken) {
        throw { status: 401, message: 'Unauthorized: Refresh token missing' }
      }

      const user = jwt.verify(refreshToken, config.jwtSecret)
      const accessToken = generateAccessToken(user.user)

      return { accessToken }
    } catch (error) {
      throw error
    }
  }

  static async forgotPassword (data) {
    try {
      const { email } = data
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { $set: { otp: generateUniqueNumber() } },
        { new: true }
      )

      if (!updatedUser) {
        throw {
          status: 404,
          message: 'User does not exist...!'
        }
      }
      const token = jwt.sign({ id: updatedUser._id }, config.jwtSecret, {
        expiresIn: config.forgotTokenExpireIn
      })

      const sendEmail = () => {
        return new Promise((resolve, reject) => {
          var transporter = nodemailer.createTransport({
            service: config.nodemailerService,
            auth: {
              user: config.nodemailerUser,
              pass: config.nodemailerPassword
            }
          })

          var mailOptions = {
            from: config.nodemailerUser,
            to: email,
            subject: 'Reset Password Link',
            html: `Use this OTP to reset your password: <strong>${updatedUser.otp}</strong><br/><a href="http://localhost:3000/verify-otp/${token}">Click here to change your password</a>`
          }

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              reject({
                status: 421,
                message: error.message
              })
            } else {
              resolve({
                message: 'Success sending the password link',
                success: true
              })
            }
          })
        })
      }

      return await sendEmail()
    } catch (error) {
      throw error
    }
  }

  static async resetPassword (data) {
    try {
      const { token, otp } = data

      try {
        const decoded = jwt.verify(token, config.jwtSecret)
        if (!decoded) {
          throw {
            status: 401,
            message: 'Unauthorized: Token is not valid or expired...!'
          }
        }

        const check = await User.findById({ _id: decoded.id })

        if (!check) {
          throw {
            status: 404,
            message: 'User not found'
          }
        }

        if (check.otp !== otp) {
          throw {
            status: 401,
            message: 'Please input correct OTP'
          }
        } else {
          await User.findByIdAndUpdate(
            { _id: decoded.id },
            { $set: { otp: null } },
            { new: true }
          )
          return { Status: 'Successful verify OTP done', data: token }
        }
      } catch (error) {
        throw {
          status: 402,
          message: error.message
        }
      }
    } catch (error) {
      throw error
    }
  }

  static async changeForgotPassword (data) {
    try {
      const { token, password } = data

      const decoded = jwt.verify(token, config.jwtSecret)
      if (!decoded) {
        throw {
          status: 401,
          message: 'Unauthorized: Token is not valid or expired...!'
        }
      }

      const user = await User.findById({ _id: decoded.id })
      if (!user) {
        throw {
          status: 404,
          message: 'User not found'
        }
      }

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      await User.findByIdAndUpdate({ _id: decoded.id }, { password: hash })

      return { Status: 'Password successfully changed' }
    } catch (error) {
      throw error
    }
  }

  static async updateUserProfile (param, data) {
    try {
      const userId = param
      const updateData = data
      try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
          new: true
        })

        if (!updatedUser) {
          throw {
            status: 404,
            message: 'User not found'
          }
        }
        return {
          success: true,
          message: 'User updated successfully',
          data: updatedUser
        }
      } catch (error) {
        throw error
      }
    } catch (error) {
      throw error
    }
  }

  static async updatedUserProfileAddress (param, query, data) {
    const userId = param
    const operation = query //req.query.operation; // 'add', 'update', or 'remove'

    const userData = data

    try {
      const user = await User.findById(userId)

      if (!user) {
        throw {
          status: 404,
          message: 'User not found'
        }
      }

      switch (operation) {
        case 'add':
          user.address.push(userData.address)
          break
        case 'update':
          const addressIndex = user.address.findIndex(
            a => a._id.toString() === userData.address._id
          )

          if (addressIndex !== -1) {
            user.address[addressIndex] = userData.address
          }
          break
        case 'remove':
          user.address = user.address.filter(
            a => a._id.toString() !== userData.address._id
          )
          break
        default:
          throw {
            status: 400,
            message: 'Invalid operation'
          }
      }

      const updatedUser = await user.save()
      return {
        success: true,
        message: 'Address successfully update',
        data: updatedUser
      }
    } catch (error) {
      throw error
    }
  }

  static async getAllUserList (data, queryParam) {
    try {
      const limit = data.limit ? data.limit : 10
      const filters = queryParam

      const mongooseQuery = {}
      for (const key in filters) {
        mongooseQuery[key] = filters[key]
      }
      const result = await User.find(mongooseQuery)
        .sort({ createdAt: -1 })
        .limit(limit)
      return {
        success: true,
        message: 'User list are retrive successfully...',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getAllHealthExpertList (data, queryParam) {
    try {
      const limit = data.limit ? data.limit : 10
      const filters = queryParam

      const mongooseQuery = {}
      for (const key in filters) {
        mongooseQuery[key] = filters[key]
      }
      const result = await User.find({
        role: 'HealthExpert',
        ...mongooseQuery
      }).limit(limit)
      return {
        success: true,
        message: 'Health Expert list are retrive successfully...',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getAllCustomerExpertList (data, queryParam) {
    try {
      const limit = data.limit ? data.limit : 10
      const filters = queryParam

      const mongooseQuery = {}
      for (const key in filters) {
        mongooseQuery[key] = filters[key]
      }
      const result = await User.find({
        role: 'Customer',
        ...mongooseQuery
      }).limit(limit)
      return {
        success: true,
        message: 'Health Customer list are retrive successfully...',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getSingleUserData (data) {
    try {
      const result = await User.findById({ _id: data.id })
      console.log(result)
      return {
        success: true,
        message: 'Get User successfully...',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async sendContactUs (data) {
    try {
      const result = sendEmailContactUs(data)
      return result
    } catch (error) {
      throw error
    }
  }

  static async getCoupon () {
    try {
      const result = await Coupon.find()
      return {
        success: true,
        message: 'Get coupon successfully',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getSingleCoupon (data) {
    try {
      const { id } = data
      const result = await Coupon.findById({ _id: id })
      return {
        success: true,
        message: 'Get coupon successfully',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async applyCoupon (data) {
    const { code, totalPrice } = data

    try {
      const coupon = await Coupon.findOne({ code })

      if (!coupon) {
        throw {
          status: 404,
          message: 'Coupon not found'
        }
      }

      if (coupon.isActive) {
        let discountedPrice = totalPrice

        if (coupon.type === 'percentage') {
          discountedPrice *= 1 - coupon.discount / 100
        } else if (coupon.type === 'fixed') {
          discountedPrice -= coupon.discount
        }
        return {
          success: true,
          message: 'Coupon discopunt price',
          data: discountedPrice
        }
      } else {
        throw {
          status: 400,
          message: 'Coupon is not active.'
        }
      }
    } catch (error) {
      throw error
    }
  }

  static async saveUsageCoupon (data) {
    try {
      const { user_id, coupon_code, usage_count } = data
      const result = await CouponUsageUser.create({
        user_id,
        coupon_code,
        usage_count
      })
      return {
        success: true,
        message: 'Usage coupon success',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async postCheckout (data) {
    try {
      const {
        user_id,
        first_name,
        last_name,
        country_name,
        street_address,
        apt_suite_unit,
        city,
        state,
        postal_code,
        phone,
        save_information,
        deliviry_type
      } = data
      const result = await Checkout.create({
        user_id,
        first_name,
        last_name,
        country_name,
        street_address,
        apt_suite_unit,
        city,
        state,
        postal_code,
        phone,
        save_information,
        deliviry_type
      })
      return {
        success: true,
        message: 'checkout add successfull',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getCheckoutById (data) {
    try {
      const { id } = data
      const result = await Checkout.findById({ _id: id })
      return {
        success: true,
        message: 'checkout get successfull',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getCheckout () {
    try {
      const result = await Checkout.find()
      return {
        success: true,
        message: 'checkout get successfull',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateCheckout (param, data) {
    try {
      const { id } = param
      const result = await Checkout.findByIdAndUpdate(id, data, { new: true })
      return {
        success: true,
        message: 'checkout update successfull',
        data: result
      }
    } catch (error) {
      throw error
    }
  }
  static async deleteCheckout (param) {
    try {
      const { id } = param
      const result = await Checkout.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'checkout delete successfull',
        data: result
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = UserService
