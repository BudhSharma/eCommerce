const WishList = require('../../models/WishList')
const Cart = require('../../models/product/Cart')
const Feedback = require('../../models/product/Feedback')
const Order = require('../../models/product/Order')
const Product = require('../../models/product/Product')
const Like = require('../../models/Like')

class ProductService {
  static async addProduct (data, files) {
    try {
      const {
        category_id,
        category_name,
        product_name,
        product_price,
        product_description,
        sku_code,
        tags,
        product_type,
        attribute,
        weight,
        color,
        verientation
      } = data

      const productData = {
        category_id,
        category_name,
        product_name,
        product_price,
        product_description,
        sku_code,
        tags,
        product_type,
        attribute,
        weight,
        color,
        verientation
      }

      if (files && files.length > 0) {
        files.forEach(file => {
          const fileName = file.originalname.toLowerCase()

          if (fileName.includes('image')) {
            productData.product_image = file.path
          } else if (fileName.includes('gallery_image')) {
            productData.gallery_image = productData.gallery_image || []
            productData.gallery_image.push(file.path)
          } else if (fileName.includes('verientation_image')) {
            productData.verientation.forEach(variant => {
              if (!variant.image) {
                variant.image = file.path
              }
            })
          }
        })
      }

      const userData = await Product.create(productData)

      return {
        success: true,
        message: 'Product created successfully...',
        data: userData
      }
    } catch (error) {
      throw error
    }
  }

  // static async addProduct (data, file) {
  //   try {
  //     const {
  //       category_id,
  //       category_name,
  //       product_name,
  //       product_price,
  //       product_description,
  //       sku_code,
  //       tags,
  //       product_type,
  //       attribute,
  //       weight,
  //       color,
  //       gallery_image,
  //       verientation
  //     } = data
  //     const userData = await Product.create({
  //       category_id,
  //       category_name,
  //       product_name,
  //       product_price,
  //       product_image: file !== null ? file[0].path : file,
  //       product_description,
  //       sku_code,
  //       tags,
  //       product_type,
  //       attribute,
  //       weight,
  //       color,
  //       gallery_image,
  //       verientation
  //     })
  //     return {
  //       success: true,
  //       message: 'Product created successfully...',
  //       data: userData
  //     }
  //   } catch (error) {
  //     throw error
  //   }
  // }

  static async updateProduct (param, data, file) {
    try {
      const {
        category_name,
        product_name,
        product_price,
        product_description,
        sku_code
      } = data

      const { id } = param
      const updateData = {
        category_name,
        product_name,
        product_price,
        product_image: file[0],
        product_description,
        sku_code
      }
      const result = await Product.findByIdAndUpdate(id, updateData, {
        new: true
      })
      return {
        success: true,
        message: 'Product updated successfully...',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getProduct (data) {
    try {
      const result = await Product.findById({ _id: data.id }).populate(
        'category_id'
      )
      return {
        success: true,
        message: 'Successfully get product',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getProductList (data) {
    try {
      const result = await Product.find()
      return {
        success: true,
        message: 'Successfully get product',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async deleteProduct (data) {
    try {
      const { id } = data
      const result = await Product.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'Successfully delete product',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getProductByCtegory (data) {
    try {
      const result = await Product.find({ category_id: data.id }).populate(
        'category_id'
      )
      return {
        success: true,
        message: 'Successfully get product',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateProductByCtegory (param, data) {
    try {
      const { id } = param
      const result = await Product.findByIdAndUpdate(id, data, { new: true })
      return {
        success: true,
        message: 'Successfully update',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async selectLike (data) {
    try {
      const { product_id, user_id, is_liked } = data
      const check = await Like.findOne({ product_id: product_id })
      if (check) {
        const result = await Like.updateOne(
          { product_id: product_id },
          { $set: { is_liked } }
        )
        return {
          success: true,
          message: 'Successfully update',
          data: result
        }
      } else {
        const result = await Like.create({ product_id, user_id, is_liked })
        return {
          success: true,
          message: 'Successfully create',
          data: result
        }
      }
    } catch (error) {
      throw error
    }
  }

  static async getLike (data) {
    try {
      const { user_id } = data
      const result = await Like.find({ user_id: user_id })
      return {
        success: true,
        message: 'Successfully get',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addCart (data) {
    try {
      const { user_id, product_id, quantity, purchase } = data

      const existingCartEntry = await Cart.findOne({ user_id, product_id })

      if (existingCartEntry) {
        const updatedResult = await Cart.findOneAndUpdate(
          { user_id, product_id },
          { $inc: { quantity: quantity } },
          { new: true }
        )

        return {
          success: true,
          message: 'Quantity updated successfully...',
          data: updatedResult
        }
      } else {
        const newResult = await Cart.create({
          user_id,
          product_id,
          quantity,
          purchase
        })

        return {
          success: true,
          message: 'Successfully added...',
          data: newResult
        }
      }
    } catch (error) {
      throw error
    }
  }

  static async getCartByUser (data) {
    try {
      const { id } = data
      const cartItems = await Cart.find({ user_id: id }).populate('product_id')

      const cartItemsWithTotal = cartItems.map(cartItem => {
        const { product_price } = cartItem.product_id
        const { quantity } = cartItem

        const price = parseFloat(product_price.replace('$', ''))

        const totalCost = price * quantity

        return { ...cartItem._doc, totalCost }
      })

      const totalCost = cartItemsWithTotal.reduce(
        (total, cartItem) => total + cartItem.totalCost,
        0
      )

      return {
        success: true,
        message: 'Successfully get...',
        data: cartItemsWithTotal,
        totalCost: totalCost
      }
    } catch (error) {
      throw error
    }
  }

  static async removeCart (data) {
    try {
      const { id } = data

      const result = await Cart.deleteMany({ user_id: id, purchase: true })
      return {
        success: true,
        message: 'Remove cart',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getSingleCart (data) {
    try {
      const { id } = data
      const result = await Cart.findById({ _id: id }).populate('product_id')
      return {
        success: true,
        message: 'Successfully get...',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addFeedback (data) {
    try {
      const {
        rating,
        message,
        customer_id,
        healthExpertName,
        product_id,
        role
      } = data
      const result = await Feedback.create({
        rating,
        message,
        customer_id,
        healthExpertName,
        product_id,
        role
      })
      return {
        success: true,
        message: 'Successfully create...',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getFeedback () {
    try {
      const result = await Feedback.find()
      return {
        success: true,
        message: 'Successfully retrive...',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getFeedbackById (data) {
    try {
      const { id } = data
      const result = await Feedback.findById({ _id: id })
      return {
        success: true,
        message: 'Successfully retrive...',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateFeedback (param, data) {
    try {
      const { id } = param
      const result = await Feedback.findByIdAndUpdate(id, data, { new: true })
      return {
        success: true,
        message: 'Successfully Update feedback',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addWishlist (data) {
    try {
      const { user_id, category_id, product_id } = data
      const result = await WishList.create({
        user_id,
        category_id,
        product_id
      })
      return {
        success: true,
        message: 'Successfully added',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getWishlist () {
    try {
      const result = await WishList.find()
      return {
        success: true,
        message: 'Successfully retrive',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getWishListByUser (data) {
    try {
      const { user_id } = data
      const result = await WishList.find({ user_id: user_id })
      return {
        success: true,
        message: 'Successfully retrive',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async removeWishlist (data) {
    try {
      const { id } = data
      const result = await WishList.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'Successfully Remove',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async createOrder (data) {
    try {
      const { items, user_id, delivery_type, note, order_status } = data

      const orderId = `#${Math.floor(10000 + Math.random() * 90000)}`

      const currentDateTime = new Date()
      const localizedDateTime = currentDateTime.toLocaleString()

      const result = await Order.create({
        items,
        user_id,
        order_id: orderId,
        delivery_type,
        note,
        date: localizedDateTime,
        order_status
      })
      return {
        success: true,
        message: 'Order created successfully',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getOrderList (data) {
    try {
      const { user_id } = data
      const orders = await Order.find({ user_id: user_id })
        .populate('items.product_id')
        .populate('user_id')

      const ordersWithTotal = orders.map(order => {
        const totalCost = order.items.reduce((acc, item) => {
          if (item.product_id) {
            const { product_price } = item.product_id
            const { quantity } = item

            const price = parseFloat(product_price.replace('$', ''))

            return acc + price * quantity
          } else {
            return acc
          }
        }, 0)

        return { ...order._doc, totalCost }
      })

      return {
        success: true,
        message: 'Order list',
        data: ordersWithTotal
      }
    } catch (error) {
      throw error
    }
  }

  static async getAllOrderList () {
    try {
      const orders = await Order.find()
        .populate('items.product_id')
        .populate('user_id')

      const ordersWithTotal = orders.map(order => {
        const totalCost = order.items.reduce((acc, item) => {
          if (item.product_id) {
            const { product_price } = item.product_id
            const { quantity } = item

            const price = parseFloat(product_price.replace('$', ''))

            return acc + price * quantity
          } else {
            return acc
          }
        }, 0)

        return { ...order._doc, totalCost }
      })

      return {
        success: true,
        message: 'Order list',
        data: ordersWithTotal
      }
    } catch (error) {
      throw error
    }
  }

  static async getOrderById (data) {
    try {
      const { id } = data
      const order = await Order.findById({ _id: id })
        .populate('items.product_id')
        .populate('user_id')

      if (!order) {
        return {
          success: false,
          status: 404,
          message: 'Order not found'
        }
      }

      const totalCost = order.items.reduce((acc, item) => {
        if (item.product_id) {
          const { product_price } = item.product_id
          const { quantity } = item

          const price = parseFloat(product_price.replace('$', ''))

          return acc + price * quantity
        } else {
          return acc
        }
      }, 0)

      const orderWithTotal = { ...order._doc, totalCost }

      return {
        success: true,
        message: 'Order list',
        data: orderWithTotal
      }
    } catch (error) {
      throw error
    }
  }

  static async deleteOrder (data) {
    try {
      const { id } = data
      const result = await Order.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'Delete Successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateOrder (param, data) {
    try {
      const { id } = param
      const result = await Order.findByIdAndUpdate(id, data, { new: true })
      return {
        success: true,
        message: 'Update Successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = ProductService
