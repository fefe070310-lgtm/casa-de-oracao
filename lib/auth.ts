import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_key'),
  expiresIn: '7d',
};

export async function signToken(payload: any) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(jwtConfig.expiresIn)
    .sign(jwtConfig.secret);
  return token;
}

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, jwtConfig.secret);
    return verified.payload;
  } catch (err) {
    return null;
  }
}

export async function verifyAuth(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) return null;
    return await verifyToken(token);
  } catch (err) {
    return null;
  }
}
