import { Document } from 'mongoose';

export interface IPageView extends Document {
    pageId: string;
    userId: string;
    browser: string;
    country: string;
    timestamp: number;
}
