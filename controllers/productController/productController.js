const ProductService = require('../../service/productService/productService')

class ProductController {
  static async addProduct (req, res, next) {
    try {
      const result = await ProductService.addProduct(
        req.body,
        req.files !== undefined ? req.files : null
      )

      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getProduct (req, res, next) {
    try {
      const result = await ProductService.getProduct(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getProductList (req, res, next) {
    try {
      const result = await ProductService.getProductList()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async deleteProduct (req, res, next) {
    try {
      const result = await ProductService.deleteProduct(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getProductByCategory (req, res, next) {
    try {
      const result = await ProductService.getProductByCtegory(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateProductByCtegory (req, res, next) {
    try {
      const result = await ProductService.updateProductByCtegory(
        req.params,
        req.body
      )
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async selectLike (req, res, next) {
    try {
      const result = await ProductService.selectLike(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getLike (req, res, next) {
    try {
      const result = await ProductService.getLike(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addCart (req, res, next) {
    try {
      const result = await ProductService.addCart(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getCartByUser (req, res, next) {
    try {
      const result = await ProductService.getCartByUser(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async removeCart (req, res, next) {
    try {
      const result = await ProductService.removeCart(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getSingleCart (req, res, next) {
    try {
      const result = await ProductService.getSingleCart(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addFeedback (req, res, next) {
    try {
      const result = await ProductService.addFeedback(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getFeedback (req, res, next) {
    try {
      const result = await ProductService.getFeedback()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getFeedbackById (req, res, next) {
    try {
      const result = await ProductService.getFeedbackById(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateFeedback (req, res, next) {
    try {
      const result = await ProductService.updateFeedback(req.params, req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async addWishlist (req, res, next) {
    try {
      const result = await ProductService.addWishlist(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getWishlist (req, res, next) {
    try {
      const result = await ProductService.getWishlist()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getWishListByUser (req, res, next) {
    try {
      const result = await ProductService.getWishListByUser(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async removeWishlist (req, res, next) {
    try {
      const result = await ProductService.removeWishlist(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async createOrder (req, res, next) {
    try {
      const result = await ProductService.createOrder(req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getAllOrderList (req, res, next) {
    try {
      const result = await ProductService.getAllOrderList()
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getOrderList (req, res, next) {
    try {
      const result = await ProductService.getOrderList(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getOrderById (req, res, next) {
    try {
      const result = await ProductService.getOrderById(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async deleteOrder (req, res, next) {
    try {
      const result = await ProductService.deleteOrder(req.params)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async updateOrder (req, res, next) {
    try {
      const result = await ProductService.updateOrder(req.params, req.body)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController
