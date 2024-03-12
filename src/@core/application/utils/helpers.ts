import crypto from 'crypto';

export const hash = (password: string) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const checkPassword = (password: string, hashedPassword: string) => {
  return hash(password) === hashedPassword;
};
