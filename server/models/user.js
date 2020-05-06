const mongoose=require('mongoose');


const userSchema =new mongoose.Schema({
    firstName  : {type:String,required:true,minlength:2},
    lastName   : {type:String,required:true,minlength:2},
    isAdmin    : {type: Boolean,default : false},
    // isSuperAdmin    : {type: Boolean,default : false}, //the one who can modify other admins
    username   : {type:String,required:true,unique:true,minlength:2},
    email      : {type:String,required:true,unique:true,match: /.+@.+\..+/ },
    password   : {type:String,required:true},
    image      : {type:String,required:true},
    comments   : [{type:mongoose.Schema.Types.ObjectId,ref:"comment"}],
    books      : [{type:mongoose.Schema.Types.ObjectId,ref:"book"}],
    lastActive : {type:Date},
    created_at : {type:Date,default: Date.now},
    updated_at : {type:Date,default: Date.now},
})


const UserModel = mongoose.model('user',userSchema);


userSchema.methods.getFullName = function() {
  return this.firstName + this.lastName
}


module.exports = UserModel;