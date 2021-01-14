import React from 'react'
import { useHistory } from 'react-router'

import { Party as PartyModel } from 'api/types/Models'
import { Paragraph } from 'common/components'
import { Fade } from 'common/components/Transitions'

const colStyle = { minHeight: 150 }

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  data: PartyModel.Fields
}

const Party: React.FC<Props> = ({ data: party, ...rest }) => {
  const history = useHistory()

  const onClickEdit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    history.push(`parties/${party.id}`, { data: party })
  }

  return (
    <div className="w-full md:w-1/2 mb-3 px-2" style={colStyle} {...rest}>
      <div className="card m-0 p-6 h-full relative hover:shadow-lg transition-shadow ease-in-out duration-200">
        <div>
          <h2 className="text-gray-700 font-bold text-lg leading-relaxed mb-3">{party.name}</h2>

          <Paragraph text={party.description ?? 'No description.'} truncate={100} />
        </div>

        <div className="h-10 mb-3"></div>

        <Fade delay={200}>
          <div className="absolute bottom-0 left-0 right-0">
            <div className="text-center bg-gray-50 hover:bg-gray-100 transition-colors duration-150 ease-in-out">
              <a
                href={`/parties/${party.id}`}
                onClick={onClickEdit}
                className="block py-3 btn btn-blue-link"
              >
                View Party Details {'>'}
              </a>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  )
}

export default Party
