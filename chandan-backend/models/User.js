import mongoose from 'mongoose'

const geoSchema = new mongoose.Schema({
  lat: { type: String, required: true },
  lng: { type: String, required: true }
})

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  geo: { type: geoSchema, required: true }
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  company: { type: String, required: true },
  address: { type: addressSchema, required: true }
})

const User = mongoose.model('User', userSchema)
export default User
