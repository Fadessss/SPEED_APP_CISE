import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [text, setText] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const res = await axios.post('/api/data', { text })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Text:
          <input type="text" value={text} onChange={e => setText(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}