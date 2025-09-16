import { body, validationResult } from 'express-validator'
import User from '../models/User.js'

export const validateUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('company').notEmpty().withMessage('Company is required'),
  body('address.street').notEmpty().withMessage('Street is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.zip').notEmpty().withMessage('Zip is required'),
  body('address.geo.lat').notEmpty().withMessage('Latitude is required'),
  body('address.geo.lng').notEmpty().withMessage('Longitude is required'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const existing = await User.findOne({ email: req.body.email })
    if (existing && (!req.params.id || existing._id.toString() !== req.params.id))
      return res.status(400).json({ message: 'Email already exists' })
    next()
  }
]
