// src/common/http/axios-http.service.ts
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

@Injectable()
export class AxiosHttpService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.mangadex.org/',
      timeout: 5000,
      headers: {
        'User-Agent': 'MangaSpotBackend/1.0',
        Accept: 'application/json',
      },
    });
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }
}
