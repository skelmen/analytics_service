import * as mongoose from 'mongoose';

export const PageViewSchema = new mongoose.Schema({
    pageId: String,
    userId: String,
    browser: String,
    country: String,
    timestamp: { type: Number, default: Math.floor(Date.now() / 1000) }
});
