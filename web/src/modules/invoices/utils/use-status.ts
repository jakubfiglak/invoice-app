import { useEffect } from 'react'

import { useParams, navigate, routes } from '@redwoodjs/router'

import { parseStatus } from './parse-status'

export function useStatus() {
  const params = useParams()

  useEffect(() => {
    if (!params.status) {
      navigate(routes.invoices({ ...params, status: 'all' }))
    }
  }, [params])

  return parseStatus(params.status)
}
