import { useEffect } from 'react'
import axios from 'axios'

import apiClient from 'api/apiClient'
import store from 'app/store'
import { snackbarOpen } from 'features/snackbar'

function useResponseInterceptor() {
  useEffect(() => {
    const myErrorInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (axios.isCancel(error)) return Promise.reject(error)

        let message = error.message
        let statusCode = error.response ? error.response.status : 0

        if (statusCode === 401) {
          message = 'You are unauthorized.'
          localStorage.removeItem('auth-token')

          setTimeout(() => {
            window.location.reload()
          }, 2250)
        }

        if (statusCode === 403) {
          message = 'This action is forbidden.'

          if (error.response.data.message) {
            message = error.response.data.message
          }
        }

        if (statusCode === 422 || statusCode === 404) {
          return Promise.reject(error)
        }

        if (statusCode === 429) {
          // Too Many Attempts.
        }

        if (statusCode >= 500) {
          message = 'Something went wrong. Please refresh the page.'
        }

        store.dispatch(
          snackbarOpen({
            text: message,
            duration: 5000,
            position: { x: 'left', y: 'bottom' },
          })
        )

        return Promise.reject(error)
      }
    )

    return () => {
      apiClient.interceptors.request.eject(myErrorInterceptor)
    }
  })
}

export default useResponseInterceptor
