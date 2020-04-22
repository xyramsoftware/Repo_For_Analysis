'use strict';
/*eslint no-invalid-this:0*/
import crypto from 'crypto';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';
const validator = require('validator')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')
mongoose.Promise = require('bluebird');

const authTypes = ['github', 'twitter', 'facebook', 'google'];

var clientSchema = new Schema({
  
  clientId: {
    type:String
    },
   
   clientFirstName: {
     type:String
    },
    clientLastName:{
     type:String
   },
   clientPhone:{
     type:Number
   },
   companyName:{
     type:String
   },
   companyAddress:{
     type:String
   },
   companyPhone:{
     type:Number
   },

   status :{
    type: Boolean,
    default:true
  },
  RegistrationFeature :{
    type: Boolean,
    default:true
  },
  AccompanyFeature :{
    type: Boolean,
    default:true
  },
  SessionFeature :{
    type: Boolean,
    default:true
  },
  AccommodationFeature :{
    type: Boolean,
    default:true
  },
  PaymentGatewayFeature :{
    type: Boolean,
    default:true
  },
  SMSFeature:{
    type: Boolean,
    default:true
  },
  QRCodewithoutImageFeature:{
    type: Boolean,
    default:true
  },
  QRCodewithImageFeature:{
    type: Boolean,
    default:true
  },
   role: {
    type: String,
    default: 'client'
  },

   email:{
    type: String,
    required: true,
    unique:true,
    trim: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Email is invalid!')
        }
    }

},
password:{
    type:String,
    required:true,
    trim:true,
   // minlength: 7,
    validate(value){
        if(validator.isEmpty(value)){
            throw new Error('Please enter your password!')
        }else if(validator.equals(value.toLowerCase(),"password")){
            throw new Error('Password is invalid!')
        }else if(validator.contains(value.toLowerCase(), "password")){
            throw new Error('Password should not contain password!')
        }
    }
},
tokens:[{
    token:{
        type:String,
        required: true
    }
}],


createdAt:{
    type: Date,
    default: Date.now
}
});





clientSchema.statics.checkValidCredentials = async (email, password) => {
const user = await Client.findOne({email})

if(!user){
    throw new Error('Unable to login 2')
}
const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){
    throw new Error('Unable to login 2')
}

return user
}

clientSchema.methods.newAuthToken = async function(){
const user  = this
const token =  jwt.sign({ _id: user.id.toString() },'thisismynewblog')
user.tokens = user.tokens.concat({ token })
//await user.save()
return token
}
clientSchema.methods.toJSON = function(){
const user = this
const userObj = user.toObject()

delete userObj.password
delete userObj.tokens

return userObj
}

//hash the plain text password before saving
clientSchema.pre('save', async function(next){
const user = this
if(user.isModified('password')){
  user.password = await bcrypt.hash(user.password, 8)
}
next()
})

clientSchema.pre('remove', async function(next){
const user = this
await Post.deleteMany({author: user._id})
next()
})

//export default mongoose.model('Client', clientSchema);
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;