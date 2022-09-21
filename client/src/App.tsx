import { Content } from './components/Content'
import { Header } from './components/Header'
import { AuthContext } from './contexts/AuthContext'
import './global.css'

function App() {
  return (
    <div>
      <AuthContext>
        <Header />
        <Content />
      </AuthContext>
    </div>
  )
}

export default App
