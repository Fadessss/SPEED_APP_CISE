import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

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
      <Link href="/search">
        <a>Go to Search page</a>
      </Link>
    </div>
  )
}