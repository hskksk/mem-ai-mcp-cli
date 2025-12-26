import { z } from 'zod';

/**
 * Environment variable schema
 */
const envSchema = z.object({
  MEM_API_KEY: z.string().min(1, 'MEM_API_KEY is required'),
  MEM_API_BASE_URL: z.string().url().default('https://api.mem.ai'),
});

/**
 * Validated environment variables
 */
export const env = envSchema.parse({
  MEM_API_KEY: process.env.MEM_API_KEY,
  MEM_API_BASE_URL: process.env.MEM_API_BASE_URL || 'https://api.mem.ai',
});

export type Env = z.infer<typeof envSchema>;
