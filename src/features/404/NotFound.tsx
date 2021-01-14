import React from 'react'
import { Link } from 'react-router-dom'

interface Props {}

const NotFound: React.FC<Props> = () => {
  return (
    <div className="py-48 text-center">
      <div className="mb-8">
        <h1 className="font-bold text-3xl">404 Page not found :(</h1>
        <p className="text-gray-600">The page you are looking for may be moved or gone.</p>
      </div>

      <Link to="/" className="btn btn-blue btn-lg">
        Return home
      </Link>
    </div>
  )
}

export default NotFound
