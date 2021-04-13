import { useState, useEffect } from 'react'
import { useCollection } from 'hooks'

const initialState = {
  name: '',
  image: '',
  value: {}
}

function usePizzaFlavour (id) {
  const { data, add, edit } = useCollection('pizzasFlavours')
  const [pizza, setPizza] = useState(initialState)

  useEffect(() => {
    setPizza(data?.find(p => p.id === id) || initialState)
  }, [data, id])

  return { initialState, pizza, add, edit }
}

export default usePizzaFlavour
