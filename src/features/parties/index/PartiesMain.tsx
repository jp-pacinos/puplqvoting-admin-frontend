import React from 'react'

import PartiesWithFetcher from './PartiesWithFetcher'

interface PartiesMainProps {}

const PartiesMain: React.FC<PartiesMainProps> = () => {
  return (
    <>
      {/* react helmet etc. */}

      <PartiesWithFetcher />
    </>
  )
}

export default PartiesMain
