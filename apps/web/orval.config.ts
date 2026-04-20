import 'dotenv/config';

export default {
  api: {
    input: `${process.env.NEXT_PUBLIC_BACKEND_URL}/docs-json`,
    output: {
      target: './lib/api.ts',
      client: 'react-query',
      mode: 'split',
      baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    },
  },
};