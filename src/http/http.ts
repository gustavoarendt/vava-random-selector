import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://valorant-api.com/v1/',
  params: {
    language: 'pt-BR',
  },
});
