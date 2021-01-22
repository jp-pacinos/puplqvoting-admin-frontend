import { useEffect } from 'react'

import store from 'app/store'
import { fetchSelects } from 'features/app/appSlice'

const useFetchInitialData = () => {
  useEffect(() => {
    store.dispatch(fetchSelects())
  }, [])
}

export default useFetchInitialData
