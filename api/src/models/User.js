const mongoose = require("mongoose");
const opts = {toJSON:{virtuals:true}}

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

//A frozen object can no longer be changed;
const Role = Object.freeze({
  Admin: 'admin',
  User: 'user',
});

const UserSchema = new mongoose.Schema({
    name: {
        first: { type: String, required: false },
        last: { type: String, required: false }
      },
      email: {
        type: String,
        required: false,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please fill a valid email address'
        ]
      },
    age: {
        type: Number,
        required: false,
    },
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    carInfo: {
        type: String,
        required: false
    },
    batteryPercentage: {
        type: Number,
        required: false
    },
    batteryCapacity: {
        type: Number,
        required: false
    },
    image: { //Users role, but since its not posible to override nextjs-auth methods I left it as image
      type: String,
      enum: Object.values(Role),
      default: 'user',
      required: false
    },
    created_at: { 
        type: Date, default: new Date(), required: false
    }
}, opts);

UserSchema.virtual('full_name').get(function() {
    return this.name.first + ' ' + this.name.last;
  });

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel;