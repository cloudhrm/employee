import server from './server'

server.start({ port: 4001 }, () =>
  console.log(`Server is running on http://localhost:4001`)
)
