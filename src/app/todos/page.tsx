'use client'

import { supabase } from '@/lib/suparbase'

export default async function Page() {
  const { data } = await supabase.from('todos').select()
  console.log(data)
  return data ? (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  ) : (
    <p>Loading todos...</p>
  )
}
