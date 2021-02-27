import axios from 'axios';
import { PEXEL_API_KEY } from '../constants';

export const IMAGE_API = axios.create({
  baseURL: 'https://api.pexels.com/v1',
  headers: {
    Authorization: PEXEL_API_KEY,
  },
});
