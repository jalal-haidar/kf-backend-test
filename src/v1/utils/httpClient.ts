import axios from 'axios';
import axiosRetry from 'axios-retry';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'x-api-key': API_KEY },
  timeout: 5000,  
});

axiosRetry(httpClient, { retries: 3, retryCondition: (error) => error.response?.status === 500 });

export default httpClient;
