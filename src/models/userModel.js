import mongoose from 'mongoose';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// DEFINE THE USER SCHEMA
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        default: "",
    },
    number: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    isAccess: {
        type: Boolean,
        default: true
    },
    deleteAccount: {
        type: Boolean,
        default: false
    },
    Blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "BlogModel" }],
    date: {
        type: Date,
        default: () => Date.now()
    },
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// SAVE THE MODEL
const User = mongoose.models?.user || mongoose.model("user", userSchema);



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default User;