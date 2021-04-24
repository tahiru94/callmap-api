import dotenv from 'dotenv';

dotenv.config();

const mongodbUrl: string = process.env.MONGODB_URL || '';

export default {
    mongodbUrl
};