import React, { useState, useEffect, useRef } from 'react'
import './App.scss'

function App() {
  const [name, updateName] = useState('')
  const [nameInfo, updateNameInfo] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const inputEl = useRef(null)

  useEffect(() => {
    inputEl.current.focus()
  })

  async function findMyName(e) {
    e.preventDefault()
    setIsLoading(true)
    const newNameInfo = await (await fetch(`http://localhost:5000/?name=${name}`)).json()
    console.log('name info', newNameInfo)
    updateNameInfo(newNameInfo)
    setIsLoading(false)
  }

  return (
    <div className="App">
      <h1>What's in a name?</h1>
      <form onSubmit={findMyName}>
        <input ref={inputEl} onChange={(e) => updateName(e.target.value)} value={name} />
        <button onClick={findMyName}>Find</button>
      </form>

      <div className="name-info">
        { isLoading ? <img src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' /> : 
          JSON.stringify(nameInfo) }
      </div>
    </div>
  )
}

export default App
