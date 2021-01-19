import React, { useState } from 'react'

import { addStudentKey, ApiResponse } from 'api/elections'

interface Props {
  sessionId: number
  studentId: number
  children: (params: { generate: () => void; loading: boolean }) => React.ReactNode
  onSuccess?: (data: ApiResponse.addStudentKey) => void
  onFailure?: (e: unknown) => void
}

const GenerateKey: React.FC<Props> = ({
  sessionId,
  studentId,
  children,
  onSuccess = () => {},
  onFailure = () => {},
}) => {
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true)

    try {
      let response = await addStudentKey({ sessionId, studentId })
      setLoading(false)
      onSuccess(response.data)
    } catch (e) {
      setLoading(false)
      onFailure(e)
    }
  }

  return <>{children({ generate, loading })}</>
}

export default GenerateKey
