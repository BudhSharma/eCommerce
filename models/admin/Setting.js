const mongoose = require('mongoose')

const settingSchema = new mongoose.Schema({
  logo_first: {
    type: String
  },
  logo_second: {
    type: String
  },
  admin_commission_type: {
    type: String,
    required: true,
    enum: ['Fixed', 'Percentage']
  },
  admin_commission: {
    type: String,
    required: true
  },
  admin_email: {
    type: String,
    required: true
  },
  admin_referal_amount: {
    type: String,
    required: true
  },
  promotion_charge: {
    type: String,
    required: true
  },
  packing_charge: {
    type: String,
    required: true
  },
  service_charge_minimum: {
    type: String,
    required: true
  },
  service_charge_maximum: {
    type: String,
    required: true
  },
  dilivery_charge_2km: {
    type: String,
    required: true
  },
  dilivery_charge_4km: {
    type: String,
    required: true
  },
  dilivery_charge_per_km: {
    type: String,
    required: true
  },
  min_order_amount: {
    type: String,
    required: true
  },
  tax_free_tip: {
    type: Boolean,
    default: false
  },
  mobile_number: {
    type: String
  },
  landline_number: {
    type: String
  },
  whatsapp_number: {
    type: String
  },
  support_email: {
    type: String
  }
})

module.exports = mongoose.model('Setting', settingSchema)
