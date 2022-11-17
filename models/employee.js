const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

/*
Employee {
      _id: Object ID, Auto Generate
      first_name: String (100), Required
      last_name: String (50), Required 
      email: String (50), Unique
      gender: String (25), Male/Female/Other
      salary: Float, Required
}
*/
const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'Employee first name is required'],
        trim: true,
        maxLength: [100, 'First name length must be less than 100 characters']
    },
    last_name: {
        type: String,
        required: [true, 'Employee last name is required'],
        trim: true,
        maxLength: [100, 'Last name length must be less than 100 characters']
     },
    email: {
        type: String,
        required: [true, 'Employee email is required'],
        unique: [true, 'Employee email already registered'],
        trim: true,
        lowercase: true,
        validate: {
            validator: v => /.+[@]\w+[\.]\w+/.test(v),
            message: 'Invalid email address'
        }
    },
    gender: {
        type: String,
        required: [true, 'Employee gender is required'],
        enum: {
            values: ['Male', 'Female', 'Other'],
            message: '{VALUE} is not a valid option'
        }
    },
    salary: {
        type: Number,
        required: [true, 'Employee salary is required'],
        min: [0, 'Salary must be greater than zero']
    },
});

employeeSchema.plugin(AutoIncrement, {inc_field: 'eid'});

module.exports = mongoose.model('Employee', employeeSchema, 'employees');