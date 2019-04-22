import { getUserId } from '../utils'

function info() {
  return 'Employee API 0.0.1'
}

async function me(parent, args, { prisma, request }, info) {
  const userId = await getUserId(prisma, request)
  return await prisma.employee({ userId })
}

async function skill(parent, { search }, { prisma }, info) {
  return await prisma.skills({
    limit: 50,
    where: { name_contains: search }
  })
}

export const Query = { info, me, skill }
