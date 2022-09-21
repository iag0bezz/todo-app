type JWTConfig = {
  access: {
    secret: string;
    expires_in: string;
  };
  refresh: {
    secret: string;
    expires_in: string;
  };
};

export default {
  access: {
    secret:
      (process.env.JWT_ACCESS_SECRET_KEY as string) ?? 'access-secret-key',
    expires_in: (process.env.JWT_ACCESS_EXPIRES_IN as string) ?? '15m',
  },
  refresh: {
    secret:
      (process.env.JWT_REFRESH_SECRET_KEY as string) ?? 'refresh-secret-key',
    expires_in: (process.env.JWT_REFRESH_EXPIRES_IN as string) ?? '7d',
  },
} as JWTConfig;
