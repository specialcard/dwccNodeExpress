const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwr = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        trim: true,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        tpye: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save',function(next){
    //비밀번호를 암호 시킵니다
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if(err) return next(err)
    
            bcrypt.hash(user.password , salt , function(err,hash) {
                if(err) return next(err)
                user.password = hash;
                next();
            })
        })
    } else{
        next();
    }
    
})

userSchema.method.comparePassword = function(plainPassword, cd){
    //plainPassword
    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(err) return cd(err),
        cd(null,isMatch)
    })
}

userSchema.method.generateToken = function(cd){
    var user = this;
    //jontoken 생성
    var token = jwt.sign(user._id.toHexString(),'secretToken');

    user.token = token;
    user.save(function(err,user){
        if(err) return cd(err)
        cd(null , user)
    })


}

const User = mongoose.model('User',userSchema)

module.exports = { User };