const { Schema, model } = require('mongoose')
const { createHmac, randomBytes } = require('crypto')
const {CreateTokenForUser} = require('../Services/authentication')

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: "/images/default.png"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true })

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return
    }
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex")

    this.salt = salt;
    this.password = hashedPassword;
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({email});
    if (!user) throw new Error("User not found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedhash = createHmac("sha256", salt)
        .update(password)
        .digest("hex")

    if (userProvidedhash !== hashedPassword) throw new Error("Incorrect Password");
    const token = CreateTokenForUser(user);
    return token
})

const User = model('user', userSchema)

module.exports = User
