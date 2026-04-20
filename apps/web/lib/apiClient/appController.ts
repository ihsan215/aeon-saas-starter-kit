import { appControllerGetHello } from '../api';
import type { appControllerGetHelloResponse } from '../api';


export const getHello = async (): Promise<string> => {
  try {
    const response: appControllerGetHelloResponse = await appControllerGetHello();

    if (response.status === 200) {
      if (typeof response.data === 'string' && response.data.trim() !== '') {
        return response.data;
      }

      if (typeof (response as any).body === 'string') {
        return (response as any).body;
      }

      return 'Hello World!';
    }

    throw new Error(`Unexpected status code: ${response.status}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('[getHello] Error:', error.message);
      throw new Error(`Failed to get hello message: ${error.message}`);
    }

    console.error('[getHello] Unknown error:', error);
    throw new Error('An unexpected error occurred while fetching hello message');
  }
};