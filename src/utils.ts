import jwt from 'jsonwebtoken'
import { KeyPair } from './generated/prisma-client'

export async function getUserId(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const data = await jwt.decode(token)
    if (!data) {
      throw new Error('Wrong token Err:201')
    }
    const kp: KeyPair = await context.prisma.keyPair({ id: data['keyId'] })
    if (!kp) {
      // Retrieve public key if not exists
      throw new Error('Wrong token Err:202')
    }
    const verify = await jwt.verify(token, kp.public)
    return verify['userId']
  }

  throw new Error('Not authenticated')
}
