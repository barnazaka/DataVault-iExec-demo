import './App.css'
import { DataVault } from './DataVault'

function App() {
  return (
    <>
      <div>
        <a href="https://iex.ec" target="_blank">
          <img src="https://docs.iex.ec/Logo-RLC-Yellow.png" className="logo" alt="iExec logo" />
        </a>
      </div>
      <DataVault />
      <p className="read-the-docs">
        Build with iExec DataProtector SDK
      </p>
    </>
  )
}

export default App
