'use client'

import { useState } from 'react'

import TodosList from '@/components/todos/list'

export default function Page() {
  const [value, setValue] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div>
      <TodosList />
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
