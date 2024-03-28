import crypto from 'crypto';
import { sign } from 'jsonwebtoken';
import jwtConfig from '../config/auth';

export const hash = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const checkPassword = (password: string, hashedPassword: string): boolean => {
  return hash(password) === hashedPassword;
};

export const genToken = (userId: string): string => {
  if (!userId) return;

  const token = sign({}, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
    subject: userId,
  });

  return token;
}