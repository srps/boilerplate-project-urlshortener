import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    original_url: { type: String, required: true }, 
});

export const UrlDb = mongoose.model('urlshortener', UrlSchema);