import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch } from 'app/store'
import { Select } from 'common/components/Core'
import { SelectPositions, SelectCourses, SelectGender } from 'features/app/components'
import { selectPartiesOptions, selectOfficials, fetchStudentVotes } from 'features/elections/_id'

import fullname from 'common/utils/fullname'

interface Props {
  //
}

const Filters: React.FC<Props> = () => {
  const firstUpdate = useRef(true)

  const partiesOptions = useSelector(selectPartiesOptions)
  const officials = useSelector(selectOfficials)

  const [officialsOptions, setOfficialsOptions] = useState<{ text: string; value: string }[]>([])

  const [party, setParty] = useState('')
  const [position, setPosition] = useState('')
  const [officer, setOfficer] = useState('')
  const [course, setCourse] = useState('')
  const [gender, setGender] = useState('')

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!officials) return

    let options = officials.slice()

    if (Boolean(party.length)) {
      options = options.filter((official) => official.party_id === parseInt(party))
    }

    if (Boolean(position.length)) {
      options = options.filter((official) => official.position_id === parseInt(position))
    }

    setOfficialsOptions(() => {
      if (!options) return []

      return options.map((official) => {
        return {
          text: fullname(official.student),
          value: official.id.toString(),
        }
      })
    })
  }, [officials, party, position])

  useEffect(() => {
    setOfficer('')
  }, [party, position])

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

    let promise = dispatch(
      fetchStudentVotes({
        filters: {
          partyId: party,
          positionId: position,
          officialId: officer,
          courseId: course,
          gender: gender,
        },
      })
    )

    return () => {
      promise.abort()
    }
  }, [course, dispatch, gender, officer, party, position])

  return (
    <>
      {/* candidates ~ party/position/officer */}
      <div className="mb-3 flex flex-wrap items-center w-full">
        <Title>Filter Candidates</Title>
        <FormContainer>
          <FormField>
            <Select
              id="party"
              items={partiesOptions}
              className="bg-gray-100"
              placeholder="All parties"
              value={party}
              onChange={(e) => setParty(e.target.value)}
            />
          </FormField>

          <FormField>
            <SelectPositions
              id="position"
              className="bg-gray-100"
              placeholder="All positions"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </FormField>

          <FormField>
            <Select
              id="officers"
              items={officialsOptions}
              className="bg-gray-100"
              placeholder="All officers"
              value={officer}
              onChange={(e) => setOfficer(e.target.value)}
            />
          </FormField>
        </FormContainer>
      </div>

      {/* students ~ course/gender */}
      <div className="flex flex-wrap items-center w-full">
        <Title>Filter Students</Title>
        <FormContainer>
          <FormField>
            <SelectGender
              id="gender"
              className="bg-gray-100"
              placeholder="All gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </FormField>

          <FormField>
            <SelectCourses
              id="course"
              className="bg-gray-100"
              placeholder="All courses"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </FormField>
        </FormContainer>
      </div>
    </>
  )
}

export default Filters

//

const Title: React.FC<React.ComponentPropsWithoutRef<'h5'>> = ({ children, ...rest }) => {
  return (
    <h5 className="w-full md:w-2/12 text-blue-600 text-sm font-semibold mb-3 md:mb-0" {...rest}>
      {children}
    </h5>
  )
}

const FormContainer: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return <div className="flex-grow flex flex-wrap" {...props} />
}

const FormField: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return <div className="w-full md:w-1/3 px-0 mb-3 md:px-2 md:mb-0" {...props} />
}
