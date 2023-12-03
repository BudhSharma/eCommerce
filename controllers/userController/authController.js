const UserService = require('../../service/userService/UserService')

class AuthController {
  static async register (req, res, next) {
    try {
      const result = await UserService.registerUser(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async login (req, res, next) {
    try {
      const result = await UserService.loginUser(req.body)
      res.cookie('accessToken', result.accessToken, {
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'None',
        secure: true
      })
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'None',
        secure: true
      })
      return res.json(result)
    } catch (error) {
      next(error)
    }
  }

  static async refreshToken (req, res, next) {
    try {
      const result = await UserService.refreshAccessToken(
        req.cookies.refreshToken
      )
      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  static async forgotPassword (req, res, next) {
    try {
      const result = await UserService.forgotPassword(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async resetPassword (req, res, next) {
    try {
      const result = await UserService.resetPassword(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async changeForgotPassword (req, res, next) {
    try {
      const result = await UserService.changeForgotPassword(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async userDetails (req, res, next) {
    try {
      res
        .status(201)
        .json({ message: 'User detail...', success: true, data: req.user })
    } catch (error) {
      next(error)
    }
  }

  static async updateUserProfile (req, res, next) {
    try {
      const result = await UserService.updateUserProfile(
        req.user.user._id,
        req.body
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updatedUserProfileAddress (req, res, next) {
    try {
      const result = await UserService.updatedUserProfileAddress(
        req.user.user._id,
        req.query.operation,
        req.body
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async signout (req, res) {
    res.clearCookie('refreshToken')
    res
      .status(200)
      .json({ message: 'User logout successfull done!', success: true })
  }

  static async getAllUserList (req, res, next) {
    try {
      const result = await UserService.getAllUserList(req.body, req.query)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getAllHealthExpertList (req, res, next) {
    try {
      const result = await UserService.getAllHealthExpertList(req.body, req.query)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getAllCustomerExpertList (req, res, next) {
    try {
      const result = await UserService.getAllCustomerExpertList(req.body, req.query)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getSingleUserData (req, res, next) {
    try {
      const result = await UserService.getSingleUserData(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async sendContactUs (req, res, next) {
    try {
      const result = await UserService.sendContactUs(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getCoupon (req, res, next) {
    try {
      const result = await UserService.getCoupon()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getSingleCoupon (req, res, next) {
    try {
      const result = await UserService.getSingleCoupon(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async applyCoupon (req, res, next) {
    try {
      const result = await UserService.applyCoupon(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async saveUsageCoupon (req, res, next) {
    try {
      const result = await UserService.saveUsageCoupon(req.body)
      res.status(201).json(result)
    } catch (error) {}
  }

  static async postCheckout (req, res, next) {
    try {
      const result = await UserService.postCheckout(req.body)
      res.status(201).json(result)
    } catch (error) {}
  }

  static async getCheckoutById (req, res, next) {
    try {
      const result = await UserService.getCheckoutById(req.params)
      res.status(201).json(result)
    } catch (error) {}
  }

  static async getCheckout (req, res, next) {
    try {
      const result = await UserService.getCheckout()
      res.status(201).json(result)
    } catch (error) {}
  }

  static async updateCheckout (req, res, next) {
    try {
      const result = await UserService.updateCheckout(req.params, req.body)
      res.status(201).json(result)
    } catch (error) {}
  }

  static async deleteCheckout (req, res, next) {
    try {
      const result = await UserService.deleteCheckout(req.params)
      res.status(201).json(result)
    } catch (error) {}
  }
}
module.exports = AuthController
