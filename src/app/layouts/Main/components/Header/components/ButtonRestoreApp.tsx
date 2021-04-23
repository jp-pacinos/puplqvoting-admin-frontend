import React, { useState } from 'react'
import { MdRestore } from 'react-icons/md'
import { useClearSession } from 'common/hooks'
import api from 'api/apiClient'

import { IconButton } from 'common/components/Core'
import Dropdown from './Dropdown'

const dropdownLinkStyle =
  'block px-4 py-2 text-sm leading-5 font-semibold text-gray-700 hover:bg-gray-100 bg-gray-200 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'

interface ButtonRestoreAppProps {}

const ButtonRestoreApp: React.FC<ButtonRestoreAppProps> = () => {
  const clearSession = useClearSession({ reload: true })
  const [loading, setLoading] = useState(false)

  const restoreApp = async () => {
    setLoading(true)
    await api.get('/app/restore')
    clearSession()
  }

  return (
    <Dropdown
      className="w-80"
      renderContent={({ active, setActive }) => (
        <IconButton
          onClick={() => setActive(!active)}
          className="ml-3 md:ml-12 mr-3 bg-gray-200 text-lg border hover:text-blue-500 focus:bg-blue-500 focus:text-white focus:shadow-lg"
          title="Restore app"
          id="app-restore-menu"
          aria-label="app restore menu"
          aria-haspopup="true"
        >
          <MdRestore />
        </IconButton>
      )}
      childrenProps={{ 'aria-labelledby': 'app-restore-menu' }}
    >
      <div
        data-exclude="true"
        className="flex items-center justify-around px-4 py-2 text-sm leading-5 text-gray-700"
      >
        <p>Restore app to default?</p>
        <button
          onClick={restoreApp}
          className={dropdownLinkStyle}
          role="menuitem"
          disabled={loading}
        >
          {loading ? 'Restoring...' : 'Confirm'}
        </button>
      </div>
    </Dropdown>
  )
}

export default ButtonRestoreApp
