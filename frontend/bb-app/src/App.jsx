import { useState } from 'react'
import FormRegister from './components/formRegister/formRegister'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        HOLA DESDE REACT
        <FormRegister />
      </div>
    </>
  )
}

export default App
