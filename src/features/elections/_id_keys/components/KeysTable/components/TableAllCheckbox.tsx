import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Checkbox } from 'common/components/Core'
import { checkboxToggleAll, selectCheckedCount } from 'features/elections/_id_keys'

interface CheckAllProps {}

const TableAllCheckbox: React.FC<CheckAllProps> = () => {
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch()

  const checkedCount = useSelector(selectCheckedCount)

  useEffect(() => {
    setChecked(() => checkedCount.all > 0 || checkedCount.withCode > 0)
  }, [checkedCount.all, checkedCount.withCode])

  const toogle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked)
      dispatch(checkboxToggleAll(e.target.checked))
    },
    [dispatch]
  )

  return (
    <Checkbox
      value="all"
      checked={checked}
      onChange={toogle}
      className="block m-auto text-blue-500"
    />
  )
}

export default TableAllCheckbox
