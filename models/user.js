const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose")

const UserSchema = new mongoose.Schema({
       displayName: {
        type: String,
        required: true
    },
})

const OauthUserSchema = UserSchema.clone()

UserSchema.plugin(passportLocalMongoose)

OauthUserSchema.statics.findOrCreate = function findOrCreate(profile, provider, cb){
    var userObj = new this();
    this.findOne({ [provider] : profile.id},function(err,result){ 
        if(!result){
            userObj[provider] = profile.id
            userObj.displayName = profile.displayName
            userObj.save(cb);
        }else{
            cb(err,result);
        }
    });
};

module.exports = {
    User: mongoose.model('users', UserSchema),
    OauthUser: mongoose.model('OauthUsers', OauthUserSchema)
}