const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const Link = require('../../models/admin/linkSchema')
const Category = require('../../models/product/Category')
const About = require('../../models/admin/About')
const PrivacyPolicy = require('../../models/admin/PrivacyPolicy')
const ContactUs = require('../../models/admin/ContactUs')
const TermAndCondition = require('../../models/admin/TermAndCondition')
const ReturndPolicy = require('../../models/admin/ReturndPolicy')
const Coupon = require('../../models/coupon/Coupon')
const BlogBanner = require('../../models/blog/BlogBanner')
const Blog = require('../../models/blog/Blog')
const ShopByCategory = require('../../models/admin/ShopByCategory')
const Setting = require('../../models/admin/Setting')
const EmailTemplate = require('../../models/admin/EmailTemplate')
const Deit = require('../../models/admin/Deit')
const Fit = require('../../models/admin/Fit')
const Atributte = require('../../models/admin/Atributte')
const AtributteValue = require('../../models/admin/AtributteValue')
const Tag = require('../../models/admin/Tag')
const { default: mongoose } = require('mongoose')
const QueAndAns = require('../../models/admin/QueAndAns')
const Page = require('../../models/admin/Page')

class AdminService {
  static async addUser (data, file) {
    try {
      const profile_pic = file !== null ? file[0].path : file
      const {
        first_name,
        last_name,
        email,
        password,
        phone,
        location,
        latitude,
        longitude,
        role,
        address,
        status
      } = data

      if (!first_name || !email || !password || !phone) {
        return {
          success: false,
          message:
            'Incomplete user data. Please provide first_name, email, password, and phone.'
        }
      }

      const firstNameRegex = /^[^\s!@#$%^&*(),.?":{}|<>0-9]+$/

      if (!firstNameRegex.test(first_name)) {
        return {
          success: false,
          message:
            'First name should not contain special characters or numbers.'
        }
      }

      const forbiddenWords = [
        'admin',
        'superuser',
        'root',
        'name',
        'first_name',
        'last_name'
      ]
      const lowerCaseFirstName = first_name.toLowerCase()

      if (forbiddenWords.some(word => lowerCaseFirstName.includes(word))) {
        return {
          success: false,
          message: 'First name should not contain certain words.'
        }
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailRegex.test(email)) {
        return {
          success: false,
          message: 'Invalid email format.'
        }
      }

      const phoneRegex = /^\d{10}$/
      if (!phoneRegex.test(phone)) {
        return {
          success: false,
          message:
            'Invalid phone number format. Please provide a 10-digit number.'
        }
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

      if (!passwordRegex.test(password)) {
        return {
          success: false,
          message:
            'Password must meet the following criteria:\n' +
            '- At least 6 characters\n' +
            '- At least one uppercase letter\n' +
            '- At least one lowercase letter\n' +
            '- At least one digit\n' +
            '- At least one special character (@, $, !, %, *, ?, &)'
        }
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const check = await User.findOne({ email: email, role: role })

      if (check) {
        return {
          success: false,
          message: 'User already exists'
        }
      } else {
        const userData = await User.create({
          first_name,
          last_name,
          email,
          password: hashedPassword,
          phone,
          location,
          latitude,
          longitude,
          role,
          profile_pic,
          address,
          status
        })

        return {
          success: true,
          message: 'User created successfully',
          data: userData
        }
      }
    } catch (error) {
      throw error
    }
  }

  static async updateUser (param, data) {
    try {
      const { userId } = param
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

  static async updatedUserAddress (param, query, data) {
    const { userId } = param
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

  static async deleteUser (data) {
    try {
      const { id } = data
      const result = await User.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'Delete Successfully',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addSocialLinks (data) {
    try {
      const result = await Link.create(data)
      return {
        success: true,
        message: 'Link created successfully...',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addProductCategory (data, file) {
    try {
      const { category_name, category_description } = data
      const result = await Category.create({
        category_name,
        category_description,
        category_image: file.path
      })
      return {
        success: true,
        message: 'Category created successfully...',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getProductCategory (data) {
    try {
      const result = await Category.find().sort({ _id: -1 })
      return {
        success: true,
        message: 'Successfully get...',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateProductCategory (param, data) {
    const { id } = param
    const { category_name, category_description } = data
    try {
      const category = await Category.findByIdAndUpdate(
        id,
        {
          category_name,
          category_description
        },
        { new: true }
      )

      if (!category) {
        return {
          success: false,
          message: 'Category not found.'
        }
      }

      return {
        success: true,
        message: 'Category updated successfully',
        data: category
      }
    } catch (error) {
      throw error
    }
  }

  static async deleteProductCategory (data) {
    try {
      const { id } = data
      const result = await Category.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'Successfully delete',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addAbout (data, file) {
    try {
      const upload_banner = file[0].path
      const upload_image = file[1].path
      const { text, our_data } = data
      const result = await About.create({
        banner: upload_banner,
        about_image: upload_image,
        text,
        our_data
      })
      return {
        success: true,
        message: 'Successfully add...',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getAbout () {
    try {
      const result = await About.findOne()
      return {
        success: true,
        message: 'Successfully retrive',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateAbout (paramData, bodyData, formData) {
    try {
      const { id } = paramData
      const upload_banner = formData[0].path
      const upload_about_image = formData[1].path
      const { text, our_data } = bodyData
      const updateData = {
        banner: upload_banner,
        about_image: upload_about_image,
        text: text,
        our_data: our_data
      }
      const result = await About.findByIdAndUpdate(id, updateData, {
        new: true
      })
      return {
        success: true,
        message: 'Successfully update',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addPrivacyPolicy (data, file) {
    try {
      const { privacy_policy } = data
      const result = await PrivacyPolicy.create({
        banner: file[0].path,
        privacy_policy
      })
      return {
        success: true,
        message: 'Successfully add...',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getPrivacyPolicy (data) {
    try {
      const { id } = data
      const result = await PrivacyPolicy.findById({ _id: id })
      return {
        success: true,
        message: 'Successfully retrive',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updatePrivacyPolicy (paramData, bodyData, formData) {
    try {
      const { id } = paramData
      const upload_banner = formData[0].path
      const { privacy_policy } = bodyData
      const updateData = {
        banner: upload_banner,
        privacy_policy: privacy_policy
      }
      const result = await PrivacyPolicy.findByIdAndUpdate(id, updateData, {
        new: true
      })
      return {
        success: true,
        message: 'Successfully update',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addConactUs (bodyData, formData) {
    try {
      const upload_banner = formData[0].path
      const { description } = bodyData

      const result = await ContactUs.create({
        banner: upload_banner,
        description: description
      })
      return {
        success: true,
        message: 'Successfully created',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateContactUs (paramData, bodyData, formData) {
    try {
      const { id } = paramData
      const upload_banner = formData[0].path
      const { description } = bodyData
      const updateData = {
        banner: upload_banner,
        description: description
      }
      const result = await ContactUs.findByIdAndUpdate(id, updateData, {
        new: true
      })
      return {
        success: true,
        message: 'Successfully update',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getContactUs (paramData) {
    try {
      const { id } = paramData
      const result = await ContactUs.findById({ _id: id })
      return {
        success: true,
        message: 'Successfully retrive',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addTermAndCondition (bodyData, formData) {
    try {
      const upload_banner = formData[0].path
      const { term_condition, section } = bodyData

      const result = await TermAndCondition.create({
        banner: upload_banner,
        term_condition,
        section
      })
      return {
        success: true,
        message: 'Successfully created',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getTermAndCondition () {
    try {
      const result = await TermAndCondition.find()
      return {
        success: true,
        message: 'Successfully retrive',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateTermAndCondition (param, data, file) {
    try {
      const { id } = param
      const upload_banner = file[0].path
      const { term_condition, section } = data
      const updateData = {
        banner: upload_banner,
        term_condition: term_condition,
        section: section
      }
      const result = await TermAndCondition.findByIdAndUpdate(id, updateData, {
        new: true
      })
      return {
        success: true,
        message: 'Successfully update',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addReturnPolicy (bodyData, formData) {
    try {
      const upload_banner = formData[0].path
      const { description, about } = bodyData

      const result = await ReturndPolicy.create({
        banner: upload_banner,
        description,
        about
      })
      return {
        success: true,
        message: 'Successfully created',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getReturnPolicy () {
    try {
      const result = await ReturndPolicy.find()
      return {
        success: true,
        message: 'Successfully retrive',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateReturnPolicy (param, data, file) {
    try {
      const { id } = param
      const upload_banner = file[0].path
      const { description, about } = data
      const updateData = {
        banner: upload_banner,
        description: description,
        about: about
      }
      const result = await ReturndPolicy.findByIdAndUpdate(id, updateData, {
        new: true
      })
      return {
        success: true,
        message: 'Successfully update',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async createCoupon (data) {
    try {
      const {
        code,
        description,
        discountType,
        discountValue,
        minPurchase,
        maxUses,
        startDate,
        endDate,
        isActive,
        usageCount
      } = data
      const result = await Coupon.create({
        code,
        description,
        discountType,
        discountValue,
        minPurchase,
        maxUses,
        startDate,
        endDate,
        isActive,
        usageCount
      })
      return {
        success: true,
        message: 'Successfully create coupon',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getCoupon () {
    try {
      const result = await Coupon.find()
      return {
        success: true,
        message: 'Successfully retrive coupon',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getCouponById (data) {
    try {
      const { id } = data
      const result = await Coupon.findById({ _id: id })
      return {
        success: true,
        message: 'Successfully retrive coupon',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateCoupon (param, data) {
    try {
      const { id } = param
      const result = await Coupon.findByIdAndUpdate(id, data, { new: true })
      return {
        success: true,
        message: 'Successfully update coupon',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async deleteCoupon (param) {
    try {
      const { id } = param
      const result = await Coupon.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'Successfully delete coupon',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addBlogBanner (data) {
    try {
      const banner = data[0].path
      const result = await BlogBanner.create({ banner })
      return {
        success: true,
        message: 'Successfully Added',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addBlog (form, data) {
    try {
      const blog_image = form.map(_ => _.path)
      const { title, blog } = data
      const result = await Blog.create({ title, blog, blog_image })
      return {
        success: true,
        message: 'Successfully added blog',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getBlog () {
    try {
      const result = await Blog.find()
      return {
        success: true,
        message: 'Successfully get blog',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getBlogById (data) {
    try {
      const { id } = data
      const result = await Blog.findById({ _id: id })
      return {
        success: true,
        message: 'Successfully get blog',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateBlog (data, param) {
    try {
      const { id } = param
      const { title, blog } = data
      const result = await Blog.findByIdAndUpdate(
        id,
        { title, blog },
        { new: true }
      )
      return {
        success: true,
        message: 'Successfully update blog',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async deleteBlog (data) {
    try {
      const { id } = data
      const result = await Blog.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'Successfully delete',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addShopByCategory (form, data) {
    try {
      const image = form !== null ? form[0].path : null
      const { title, description, product_id, product_details } = data
      const mappedProductDetails = JSON.parse(product_details).map(
        (detail, index) => {
          const productImageFile =
            form && form.length > index + 1 ? form[index + 1] : null

          return {
            product_title: detail.product_title,
            product_actual_price: detail.product_actual_price,
            product_discount_price: detail.product_discount_price,
            product_image: productImageFile ? productImageFile.path : null
          }
        }
      )

      const result = await ShopByCategory.create({
        title,
        description,
        image,
        product_id: JSON.parse(product_id),
        product_details: mappedProductDetails
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

  static async getShopByCategory () {
    try {
      const result = await ShopByCategory.find()
      return {
        success: true,
        message: 'Successfully get',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getShopByCategoryById (data) {
    try {
      const { id } = data
      const result = await ShopByCategory.find({ _id: id }).populate(
        'product_id'
      )
      return {
        success: true,
        message: 'Successfully get',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async deleteShopByCategory (data) {
    try {
      const { id } = data
      const result = await ShopByCategory.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'Successfully delete',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateShopByCategory (param, data) {
    try {
      const { id } = param
      const result = await ShopByCategory.findByIdAndUpdate(id, data, {
        new: true
      })
      return {
        success: true,
        message: 'Successfully update',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async setSetting (data, file) {
    try {
      const logo_first = file[0].path
      const logo_second = file[1].path

      const existingSetting = await Setting.findOne()

      if (existingSetting) {
        const result = await Setting.findByIdAndUpdate(
          existingSetting._id,
          {
            logo_first,
            logo_second,
            admin_commission_type: data.admin_commission_type,
            admin_commission: data.admin_commission,
            admin_email: data.admin_email,
            admin_referal_amount: data.admin_referal_amount,
            promotion_charge: data.promotion_charge,
            packing_charge: data.packing_charge,
            service_charge_minimum: data.service_charge_minimum,
            service_charge_maximum: data.service_charge_maximum,
            dilivery_charge_2km: data.dilivery_charge_2km,
            dilivery_charge_4km: data.dilivery_charge_4km,
            dilivery_charge_per_km: data.dilivery_charge_per_km,
            min_order_amount: data.min_order_amount,
            tax_free_tip: data.tax_free_tip,
            mobile_number: data.mobile_number,
            landline_number: data.landline_number,
            whatsapp_number: data.whatsapp_number,
            support_email: data.support_email
          },
          { new: true }
        )

        return {
          success: true,
          message: 'Setting updated successfully',
          data: result
        }
      } else {
        // Create a new setting if it doesn't exist
        const result = await Setting.create({
          logo_first,
          logo_second,
          ...data
        })

        return {
          success: true,
          message: 'Setting created successfully',
          data: result
        }
      }
    } catch (error) {
      throw error
    }
  }

  static async getSetting () {
    try {
      const result = await Setting.findOne()
      return {
        success: true,
        message: 'Setting view',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addEmailTemplates (data) {
    try {
      const {
        from_name,
        from_email,
        email_category,
        email_subject,
        email_content,
        status
      } = data
      const result = await EmailTemplate.create({
        from_name,
        from_email,
        email_category,
        email_subject,
        email_content,
        status
      })
      return {
        success: true,
        message: 'Email template add successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getEmailTemplates () {
    try {
      const result = await EmailTemplate.find()
      return {
        success: true,
        message: 'Email template get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getEmailTemplatesById (data) {
    try {
      const { id } = data
      const result = await EmailTemplate.findById({ _id: id })

      if (!result) {
        return {
          success: false,
          message: 'Email Template dose not exist.'
        }
      }

      return {
        success: true,
        message: 'Email template get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateEmailTemplate (param, data) {
    try {
      const { id } = param
      const result = await EmailTemplate.findByIdAndUpdate(id, data, {
        new: true
      })

      return {
        success: true,
        message: 'Email template update successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async deleteEmailTemplate (param) {
    try {
      const { id } = param
      const result = await EmailTemplate.findByIdAndDelete({ _id: id })

      return {
        success: true,
        message: 'Email template delete successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addDeit (data) {
    try {
      const {
        health_expert_id,
        customer_id,
        select_day,
        early_morning_meds,
        breakfast,
        snack,
        lunch,
        after_lunch_meds,
        evening,
        before_dinner_meds,
        dinner,
        after_meal_meds
      } = data
      const result = await Deit.create({
        health_expert_id,
        customer_id,
        select_day,
        early_morning_meds,
        breakfast,
        snack,
        lunch,
        after_lunch_meds,
        evening,
        before_dinner_meds,
        dinner,
        after_meal_meds
      })
      return {
        success: true,
        message: 'Deit added successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getDeit () {
    try {
      const result = await Deit.find()
        .populate('health_expert_id')
        .populate('customer_id')
      return {
        success: true,
        message: 'Deit get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getDeitById (data) {
    try {
      const { id } = data
      const result = await Deit.findById({ _id: id })
        .populate('health_expert_id')
        .populate('customer_id')
      return {
        success: true,
        message: 'Deit get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getDeitByUser (data) {
    try {
      const { id } = data
      const result = await Deit.find({ customer_id: { $in: id } })
        .populate('health_expert_id')
        .populate('customer_id')
      return {
        success: true,
        message: 'Deit get by user successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async deleteDeit (data) {
    try {
      const { id } = data
      const result = await Deit.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'Deit delete successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateDeit (param, data) {
    try {
      const { id } = param
      const result = await Deit.findByIdAndUpdate(id, data, { new: true })
      return {
        success: true,
        message: 'Deit update successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addFit (data) {
    try {
      const { title, topic } = data
      const result = await Fit.create({ title, topic })
      return {
        success: true,
        message: 'Fit added successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getFit () {
    try {
      const result = await Fit.findOne()
      return {
        success: true,
        message: 'Fit get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getFitById (data) {
    try {
      const { id } = data
      const result = await Fit.findById({ _id: id })
      return {
        success: true,
        message: 'Fit get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateFit (param, data) {
    try {
      const { id } = param
      const result = await Fit.findByIdAndUpdate(id, data, { new: true })
      return {
        success: true,
        message: 'Fit update successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async deleteFit (param) {
    try {
      const { id } = param
      const result = await Fit.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'Fit delete successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addAtributte (data) {
    try {
      const { title } = data
      const result = await Atributte.create({ title })
      return {
        success: true,
        message: 'Atributte add successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getAtributte () {
    try {
      const result = await Atributte.find()
      return {
        success: true,
        message: 'Atributte get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getAtributteById (data) {
    try {
      const { id } = data
      const result = await Atributte.findById({ _id: id })
      return {
        success: true,
        message: 'Atributte get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async deleteAtributte (data) {
    try {
      const { id } = data
      const result = await Atributte.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'Atributte delete successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateAtributte (param, data) {
    try {
      const { id } = param
      const result = await Atributte.findByIdAndUpdate(id, data, { new: true })
      return {
        success: true,
        message: 'Atributte update successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addAtributteValue (data) {
    try {
      const { atributte_id, atributte_value } = data
      const result = await AtributteValue.create({
        atributte_id,
        atributte_value
      })
      return {
        success: true,
        message: 'Atributte Value add successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getAtributteValue () {
    try {
      const result = await AtributteValue.find().populate('atributte_id')
      return {
        success: true,
        message: 'Atributte Value get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getAtributteValueById (data) {
    try {
      const { id } = data
      const result = await AtributteValue.findById({ _id: id }).populate(
        'atributte_id'
      )
      return {
        success: true,
        message: 'Atributte Value get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async deleteAtributteValue (data) {
    try {
      const { id } = data
      const result = await AtributteValue.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'Atributte Value delete successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateAtributteValue (param, data) {
    try {
      const { id } = param
      const result = await AtributteValue.findByIdAndUpdate(id, data, {
        new: true
      })
      return {
        success: true,
        message: 'Atributte Value update successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addTag (data) {
    try {
      const { title, status } = data
      const result = await Tag.create({ title, status })
      return {
        success: true,
        message: 'Tag add successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getTag () {
    try {
      const result = await Tag.find()
      return {
        success: true,
        message: 'Tag get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getTagById (data) {
    try {
      const { id } = data
      const result = await Tag.findById({ _id: id })
      return {
        success: true,
        message: 'Tag get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async deleteTag (data) {
    try {
      const { id } = data
      const result = await Tag.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'Tag delete successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateTag (param, data) {
    try {
      const { id } = param
      const result = await Tag.findByIdAndUpdate(id, data, { new: true })
      return {
        success: true,
        message: 'Tag update successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addQueAndAns (data) {
    try {
      const { product_id, user_id, question, answer, status, type } = data
      const result = await QueAndAns.create({
        product_id,
        user_id,
        question,
        answer,
        status,
        type
      })
      return {
        success: true,
        message: 'QueAndAns add successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getQueAndAns () {
    try {
      const result = await QueAndAns.find()
      return {
        success: true,
        message: 'QueAndAns get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getQueAndAnsById (data) {
    try {
      const { id } = data
      const result = await QueAndAns.findById({ _id: id })
      return {
        success: true,
        message: 'QueAndAns get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getQueAndAnsByProductId (data) {
    try {
      const { id } = data
      const result = await QueAndAns.find({ product_id: id })
      return {
        success: true,
        message: 'QueAndAns get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updateQueAndAns (param, data) {
    try {
      const { id } = param
      const result = await QueAndAns.findByIdAndUpdate(id, data, { new: true })
      return {
        success: true,
        message: 'QueAndAns update successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async deleteQueAndAns (param) {
    try {
      const { id } = param
      const result = await QueAndAns.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'QueAndAns delete successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async addPages (data) {
    try {
      const { title, description } = data
      const result = await Page.create({ title, description })
      return {
        success: true,
        message: 'Page add successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getPages () {
    try {
      const result = await Page.find()
      return {
        success: true,
        message: 'Page get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getPagesById (param) {
    try {
      const { id } = param
      const result = await Page.findById({ _id: id })
      return {
        success: true,
        message: 'Page get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async getPagesByTitle (data) {
    try {
      const { title } = data
      const result = await Page.findOne({ title: title })
      return {
        success: true,
        message: 'Page get successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async updatePages (param, data, files) {
    try {
      const { id } = param

      const updateObject = {
        ...data
      }

      files &&
        files.forEach(file => {
          if (file.originalname.includes('image')) {
            updateObject.image = file.path
          } else if (file.originalname.includes('banner')) {
            updateObject.banner = file.path
          }
        })

      const result = await Page.findByIdAndUpdate(id, updateObject, {
        new: true
      })

      return {
        success: true,
        message: 'Page update successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }

  static async deletePages (param) {
    try {
      const { id } = param
      const result = await Page.findByIdAndDelete({ _id: id })
      return {
        success: true,
        message: 'Page delete successfully.',
        data: result
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = AdminService
