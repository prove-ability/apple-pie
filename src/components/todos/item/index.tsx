import React from 'react'

import { Li } from './todos-item.style'

interface Props {
  todo: any
}

export default function TodosItem({ todo }: Props) {
  return <Li>{todo.title}</Li>
}
