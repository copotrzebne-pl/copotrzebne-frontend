import React from 'react'
import { render } from 'react-dom'
import App from './App'
import TagManager from 'react-gtm-module'
 
const gtmConfig = {
  gtmId: process.env.GTM_CONTAINER_ID || ''
}
 
TagManager.initialize(gtmConfig)

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
