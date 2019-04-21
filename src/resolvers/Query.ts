import { getUserId } from '../utils'

function info() {
  return 'Employee API 0.0.1'
}

async function me(parent, args, context, info) {
  const userId = await getUserId(context)
  return await context.prisma.employee({ userId })
}

async function skill(parent, args, context, info) {
  return await context.prisma.skills({
    limit: 50,
    where: { name_contains: args.search }
  })
}

export const Query = { info, me, skill }
