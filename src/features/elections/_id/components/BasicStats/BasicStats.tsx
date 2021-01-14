import React, { forwardRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CountUp from 'react-countup'

import { FadeGrow } from 'common/components/Transitions'
import { selectBasicStats } from 'features/elections/_id'

const easeInOutCirc: (t: number, b: number, c: number, d: number) => number = (t, b, c, d) => {
  // https://easings.net/
  // https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
  if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b
  return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
}

interface Props {}

const BasicStats: React.FC<Props> = () => {
  const basicStats = useSelector(selectBasicStats)
  const [stats, setStats] = useState(basicStats)

  useEffect(() => {
    setStats(basicStats)
  }, [basicStats])

  return (
    <div className="flex flex-wrap -mx-2">
      <FadeGrow
        renderComponent={(nodeRef) => (
          <Container ref={nodeRef}>
            <h1 className="font-medium text-yellow-500">Election Status</h1>
            <Body>
              <CountUp
                duration={3}
                decimals={2}
                end={parseFloat(stats.progress)}
                easingFn={easeInOutCirc}
                suffix="%"
              />
            </Body>
            <Subtitle>% Election Completed</Subtitle>
          </Container>
        )}
      />
      <FadeGrow
        delay={75}
        renderComponent={(nodeRef) => (
          <Container ref={nodeRef}>
            <h1 className="font-medium text-blue-500">Registered</h1>
            <Body>
              <CountUp
                duration={3}
                end={stats.registeredCount}
                easingFn={easeInOutCirc}
                preserveValue
              />
            </Body>
            <Subtitle>Students registered</Subtitle>
          </Container>
        )}
      />
      <FadeGrow
        delay={175}
        renderComponent={(nodeRef) => (
          <Container ref={nodeRef}>
            <h1 className="font-medium text-green-500">Voted</h1>
            <Body>
              <CountUp duration={3} end={stats.votedCount} easingFn={easeInOutCirc} preserveValue />
            </Body>
            <Subtitle>Students voted</Subtitle>
          </Container>
        )}
      />
      <FadeGrow
        delay={275}
        renderComponent={(nodeRef) => (
          <Container ref={nodeRef}>
            <h1 className="font-medium text-red-500">Not Voted</h1>
            <Body>
              <CountUp
                duration={3}
                end={stats.notVotedCount}
                easingFn={easeInOutCirc}
                preserveValue
              />
            </Body>
            <Subtitle>Students not yet voted</Subtitle>
          </Container>
        )}
      />
    </div>
  )
}

export default BasicStats

//

const Container: React.FC<React.ComponentPropsWithRef<'div'>> = forwardRef(({ children }, ref) => {
  return (
    <div ref={ref} className="w-full md:w-1/2 lg:w-1/4 mb-3 lg:mb-0 px-2">
      <div className="bg-white p-4 shadow rounded">{children}</div>
    </div>
  )
})

const Body: React.FC<React.ComponentPropsWithoutRef<'p'>> = (props) => {
  return <p className="font-semibold text-2xl text-gray-700 leading-loose" {...props} />
}

const Subtitle: React.FC<React.ComponentPropsWithoutRef<'p'>> = (props) => {
  return <p className="font-normal text-sm text-gray-500" {...props} />
}
