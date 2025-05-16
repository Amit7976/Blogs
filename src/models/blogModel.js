import mongoose from 'mongoose';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// DEFINE THE BLOG SCHEMA
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    imageTitle: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
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