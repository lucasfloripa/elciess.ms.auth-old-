import { App } from './app'
import 'reflect-metadata'

const server = new App().express.listen(
  process.env.PORT || 3333, () =>
    console.log(`Server listening on port ${process.env.PORT || 3333}`)
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err}`)
  // Close server & exit process
  server.close(() => process.exit(1))
})
