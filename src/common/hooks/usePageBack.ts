import { useHistory, useLocation } from 'react-router-dom'
import isBoolean from 'lodash/isBoolean'
import isArray from 'lodash/isArray'
import get from 'lodash/get'

type Params = { to: string; hasState?: boolean | string[]; fallbackTo?: string }
interface Props {
  (params: Params): (state?: unknown) => void
}

const usePageBack: Props = ({ to, hasState, fallbackTo = to }) => {
  const history = useHistory()
  const location = useLocation()

  return (state) => {
    if (isBoolean(hasState) && hasState) {
      location.state ? history.goBack() : history.push(to, state)
      return
    }

    if (
      isArray(hasState) &&
      hasState.length === hasState.filter((s) => get(location.state, s)).length
    ) {
      location.state ? history.goBack() : history.push(to, state)
      return
    }

    history.push(fallbackTo, state)
  }
}

export default usePageBack
