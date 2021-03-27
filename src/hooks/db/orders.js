import { useEffect, useState } from 'react'
import { db } from 'services/firebase'

function useOrders () {
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    let mounted = true

    db.collection('orders').get().then(querySnapshot => {
      const docs = []

      querySnapshot.forEach(doc => {
        docs.push({
          id: doc.id,
          ...doc.data()
        })
      })

      if (mounted) setOrders(docs)
    })

    return () => {
      mounted = false
    }
  }, [])

  return { orders }
}

export default useOrders
