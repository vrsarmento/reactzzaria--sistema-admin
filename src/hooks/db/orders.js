import { useEffect, useState, useMemo } from 'react'
import { db } from 'services/firebase'

function useOrders () {
  const [orders, setOrders] = useState(null)

  const status = useMemo(() => ({
    pending: 'pending',
    inProgress: 'inProgress',
    outForDelivery: 'outForDelivery',
    delivered: 'delivered'
  }), [])

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

      const initialStatus = Object.keys(status).reduce((acc, status) => {
        acc[status] = []
        return acc
      }, {})

      const newOrders = docs.reduce((acc, doc) => {
        const mainStatus = doc.status || status.pending
        return {
          ...acc,
          [mainStatus]: acc[mainStatus].concat(doc)
        }
      }, initialStatus)

      if (mounted) setOrders(newOrders)
    })

    return () => {
      mounted = false
    }
  }, [status])

  return { orders, status }
}

export default useOrders
