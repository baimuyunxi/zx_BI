import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// 定义基础API路径
const BASE_API = '/api/welcome';

// 定义options参数的接口
interface FetchAPIOptions extends AxiosRequestConfig {
  headers?: Record<string, string>;
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
}

// 定义详情请求参数接口
export interface DetailOrderParams {
  order: string;
  network: string;
  mold: string;
}

async function fetchAPI(endpoint: string, options: FetchAPIOptions = {}): Promise<AxiosResponse> {
  const url = `${BASE_API}${endpoint}`;

  try {
    // 修复: 直接调用axios函数而不是作为对象使用
    const response = await axios({
      url,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      responseType: options.responseType || 'json',
    });

    return response;
  } catch (error) {
    console.error(`请求${url}失败:`, error);
    throw error;
  }
}

export async function getWelcomeData(): Promise<any> {
  const response = await fetchAPI('/queryOrder', {
    method: 'GET',
  });
  return response.data;
}

export async function getDetailsOrder(params: DetailOrderParams): Promise<any> {
  const response = await fetchAPI('/detailsOrder', {
    method: 'POST',
    data: params,
  });
  return response.data;
}
