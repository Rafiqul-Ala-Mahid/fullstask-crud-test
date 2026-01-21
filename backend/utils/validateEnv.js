const requiredEnvVars = ['MONGODB_URI'];

export function validateEnv() {
  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missing.length > 0) {
    console.error(`ERROR: Missing required environment variables: ${missing.join(', ')}`);
    console.error('Please check your .env file');
    process.exit(1);
  }

  if (!process.env.PORT) {
    console.warn('WARNING: PORT not set, defaulting to 8000');
  }
}
