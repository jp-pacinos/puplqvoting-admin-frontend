interface Props {
  (params?: { reload: boolean }): () => void
}

const useClearSession: Props = (params = { reload: false }) => {
  return () => {
    localStorage.clear()
    sessionStorage.clear()
    if (params.reload) document.location.reload()
  }
}

export default useClearSession
