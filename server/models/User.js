import mongoose from "mongoose"

const UserSchema=new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            max: 30
        },
        lastName: {
            type: String,
            required: true,
            max: 30
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minimum: 6,
            maximum: 20
        },
        picturePath: {
            type: String
        },
        friends: {
            type: Array,
            default: []
        },
        location: String,
        occupation: String,
        viewedProfile: String,
        impressions: String
    },
    {timestamps: true}
)

const User=mongoose.model("User", UserSchema);
export default User