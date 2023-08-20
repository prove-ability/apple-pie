import React, { useEffect, useState } from 'react'

import { supabase } from '@/lib/suparbase'

import TodosItem from '../item'

import { Ol } from './todos-list.style'

async function getData() {
  const { data: todos } = await supabase.from('todos').select('*')
  return todos
}

export default function TodosList() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [todos, setTodos] = useState<any[] | null>(null)
  useEffect(() => {
    ;(async () => {
      const data = await getData()
      setTodos(data)
    })()
  }, [])

  return (
    <Ol>
      {todos ? (
        todos.map((todo) => <TodosItem key={todo.id} todo={todo} />)
      ) : (
        <div>loading...</div>
      )}
    </Ol>
  )
}
