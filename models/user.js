const mongoose = require('mongoose');

/*
User {
    _id: Object ID, Auto Generate
    username: String (100), Primary Key
    email: String (50), Unique
    password: String (50), May be encrypted with other fields
}
*/
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Username already registered'],
        required: [true, 'Username is required'],
        trim: true,
        maxLength: [100, 'Username length must be less than 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already registered'],
        trim: true,
        lowercase: true,
        validate: {
            validator: v => /.+[@]\w+[\.]\w+/.test(v),
            message: 'Invalid email address'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        maxLength: [50, 'Password length must be less than 50 characters']
    },
});

module.exports = mongoose.model('user', userSchema, 'users');