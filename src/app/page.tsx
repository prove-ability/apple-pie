'use client'

import { useEffect, useState } from 'react'

import { supabase } from '@/lib/suparbase'

async function getData() {
  const { data: todos } = await supabase.from('todos').select('*')
  return todos
}

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [todos, setTodos] = useState<any[] | null>(null)
  useEffect(() => {
    ;(async () => {
      const data = await getData()
      setTodos(data)
    })()
  }, [])
  const [value, setValue] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div>
      <p>{JSON.stringify(todos, null, 2)}</p>
      <div>
        <form action="">
          <label htmlFor="value">
            <input type="text" value={value} onChange={handleChange} />
          </label>
          <button type="submit">추가</button>
        </form>
      </div>
    </div>
  )
}
