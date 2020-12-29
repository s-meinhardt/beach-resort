import React from 'react'
import ReactDOM from 'react-dom'
import { RoomProvider } from './context'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <RoomProvider>
      <App />
    </RoomProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
