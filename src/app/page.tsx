import { supabase } from '@/lib/suparbase'

async function getData() {
  const { data: todos } = await supabase.from('todos').select('*')
  return todos
}

export default async function Page() {
  const todos = await getData()
  console.log(todos)
  return <pre>{JSON.stringify(todos, null, 2)}</pre>
}
