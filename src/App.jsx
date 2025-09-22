import React from 'react'
import './App.scss'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import Routes from "./pages/Routes"
import { useAuthContext } from './context/Auth'
import { ConfigProvider } from 'antd'

function App() {
  const { isAppLoading } = useAuthContext()
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#07887f' } }}>
      {/* {isAppLoading
        ? <ScreenLoader />
        : <Routes />
      } */}
      <Routes />
    </ConfigProvider>
  )
}

export default App
