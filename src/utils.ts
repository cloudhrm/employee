import jwt from 'jsonwebtoken'
import { request } from 'graphql-request'
import { KeyPair } from './generated/prisma-client'

const known_data_instances: string[] = []

interface ReceivedKey {
  key: string
}

export function addAuthInstance(instance: string) {
  known_data_instances.push(instance)
}

export async function requestPublicKey(keyId: string): Promise<ReceivedKey> {
  if (known_data_instances.length === 0) {
    throw new Error('Errror No authorization API aiviable')
  }
  const url =
    known_data_instances[
      Math.floor(Math.random() * known_data_instances.length)
    ]

  const query = `{
    key(id:"${keyId}")
  }`

  try {
    return await request(url, query)
  } catch (error) {
    console.log(error)
    throw new Error('Error while validating token Err:202')
  }
}

export async function getUserId(prisma, request) {
  const Authorization = request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const data = await jwt.decode(token)
    if (!data) {
      throw new Error('Error while validating token Err:201')
    }
    let kp: KeyPair = await prisma.keyPair({ keyId: data['keyId'] })
    if (!kp) {
      try {
        // Retrieve public key if not exists
        const { key } = await requestPublicKey(data['keyId'])
        kp = await prisma.createKeyPair({
          keyId: data['keyId'],
          public: key
        })
      } catch (error) {
        throw new Error(error)
      }
    }
    const verify = await jwt.verify(token, kp.public)
    return verify['userId']
  }

  throw new Error('Not authenticated')
}
