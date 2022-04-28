const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const buildDir = `${__dirname}/build`

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

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
