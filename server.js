// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
const winston = require('winston')
const expressWinston = require('express-winston')

const buildDir = `${__dirname}/build`

module.exports = app => {
  app.use(
    expressWinston.logger({
      transports: [new winston.transports.Console()],
      ignoreRoute: req => req.path === '/health'
    })
  )

  app.use(
    express.static(buildDir, { maxAge: 2629746, immutable: true, index: false })
  )

  app.get('/health', (req, res) => {
    res.send('OK')
  })

  app.use((req, res) => {
    const rootDomain = req.hostname
      .split('.')
      .reverse()
      .slice(0, 2)
      .reverse()
      .join('.')
    switch (rootDomain) {
      case 'whatisneeded.pl':
        res.sendFile(`${buildDir}/index_en.html`, { maxAge: 300 })
        break
      case 'shchopotribno.pl':
        res.sendFile(`${buildDir}/index_ua.html`, { maxAge: 300 })
        break
      default:
        res.sendFile(`${buildDir}/index.html`, { maxAge: 300 })
        break
    }
  })

  app.use(
    expressWinston.errorLogger({
      transports: [new winston.transports.Console()]
    })
  )
}
