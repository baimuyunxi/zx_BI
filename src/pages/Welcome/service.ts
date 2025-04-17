import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

// 定义基础API路径
const BASE_API = '/api/welcome';

// 定义options参数的接口
interface FetchAPIOptions extends AxiosRequestConfig {
  headers?: Record<string, string>;
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
}

async function fetchAPI(endpoint: string, options: FetchAPIOptions = {}): Promise<AxiosResponse> {
  const url = `${BASE_API}${endpoint}`;
  try {
    // 使用axios进行请求
    return await axios(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      responseType: options.responseType || 'json', // 默认为JSON响应，下载文件时使用 'blob'
    });
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
