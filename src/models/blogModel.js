import mongoose from 'mongoose';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// DEFINE THE BLOG SCHEMA
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    shortDescription: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        default: ""
    },
    tags: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default:"defaultBlog.png"
    },
    imageTitle: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "draft"
    },
    updated_at: {
        type: Date,
        default: () => Date.now()
    },
    created_at: {
        type: Date,
        default: () => Date.now()
    },
    
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// SAVE THE MODEL
const BlogModel = mongoose.models.blog || mongoose.model("blog", blogSchema)


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default BlogModel;