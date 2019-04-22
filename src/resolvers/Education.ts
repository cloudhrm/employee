async function employee({ id }, args, { prisma }) {
  return await prisma.education({ id }).employee()
}

export const Education = { employee }
