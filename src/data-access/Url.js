import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
    original_url: { type: String, required: true }, 
});

export const UrlDb = mongoose.model('urlshortener', UrlSchema);