function skills(parent, args, context) {
  return context.prisma.employee({ id: parent.id }).skills()
}

function links(parent, args, context) {
  return context.prisma.employee({ id: parent.id }).links()
}

function experience(parent, args, context) {
  return context.prisma.employee({ id: parent.id }).experience()
}

function education(parent, args, context) {
  return context.prisma.employee({ id: parent.id }).education()
}

export const Employee = { skills, links, experience, education }
