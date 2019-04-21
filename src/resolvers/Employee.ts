async function skills(parent, args, context) {
  return await context.prisma.employee({ id: parent.id }).skills()
}

async function links(parent, args, context) {
  return await context.prisma.employee({ id: parent.id }).links()
}

async function experience(parent, args, context) {
  return await context.prisma.employee({ id: parent.id }).experience()
}

async function education(parent, args, context) {
  return await context.prisma.employee({ id: parent.id }).education()
}

export const Employee = { skills, links, experience, education }
