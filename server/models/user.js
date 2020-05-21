const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    firstName: {type: String, required: [true, "First Name is required"], minlength: 2},
    lastName: {type: String, required: [true, "Last Name is required"], minlength: 2},
    //isActive??if we have time
    isAdmin: {type: Boolean, default: false},
    isSuperAdmin: {type: Boolean, default: false}, //the one who can modify other admins
    username: {type: String, required: [true, "Username is required"], unique: true, minlength: 2},
    email: {
        type: String, required: [true, "Email is required"], unique: true, lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                if (!validator.isEmail(value)) {
                    throw new Error(`Email is not vaild.`);
                }
            },
        },
    },
    password: {
        type: String, required: [true, "Password is required"],
        validate: {
            validator: function (value) {
                if (value.length < 8) {
                    throw new Error(`Password must be at least 8 symbols.`)
                }
            }
        }
    },
    image: {type: String,/* required: [true, "Image is required"]*/},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    books: [{
        book: {type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true},
        status: {
            type: String, enum: {
                values: ["read", "reading", "want to read"], message: 'Status is required.'
            }, required: true
        }
    }],
    lastActive: {type: Date},
}, {
    timestamps: true,
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


userSchema.virtual('comment', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'user'
})

userSchema.methods.getFullName = function () {
    return `${this.firstName} ${this.lastName}`
}


userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    // delete obj.password;
    delete obj.isAdmin;
    delete obj.isSuperAdmin;
    return obj;
   }

const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;