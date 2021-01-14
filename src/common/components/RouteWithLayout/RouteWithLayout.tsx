import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

interface Props {
  layout: React.ElementType
  component: React.ElementType
}

const RouteWithLayout: React.FC<Props & RouteProps> = (props) => {
  const { layout: Layout, component: Component, ...rest } = props

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  )
}

export default RouteWithLayout
