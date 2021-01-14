import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Chart from 'react-apexcharts'

import { selectStudentVotes, selectOfficialEntities } from 'features/elections/_id'
import { Filters } from './components'

import fullname, { User } from 'common/utils/fullname'

interface Props {
  //
}

const StudentVotesChart: React.FC<Props> = () => {
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([
    { name: 'Votes', data: [] },
  ])
  const [options, setOptions] = useState<any>({
    chart: {
      height: 400,
      type: 'bar',
      stacked: false,
    },
    plotOptions: {
      bar: {
        // columnWidth: '45%',
        distributed: true,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#6b7280'],
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      position: 'bottom',
      categories: [],
    },
    yaxis: {
      labels: {
        formatter: (val: string) => parseInt(val),
      },
      // min: 0,
    },
  })

  const officials = useSelector(selectOfficialEntities)
  const { data: studentVotes, status } = useSelector(selectStudentVotes)

  useEffect(() => {
    if (!studentVotes || !officials) return

    let seriesData: number[] = []
    let categories: string[] = []
    for (let i = 0; i < studentVotes.length; i++) {
      let official = studentVotes[i]
      let name = fullname(officials[official.id]?.student as User)

      seriesData.push(official.votes)
      categories.push(name)
    }

    setOptions((prevOptions: any) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: categories,
      },
    }))

    setSeries((prevSeries) => [{ ...prevSeries[0], data: seriesData }])
  }, [officials, studentVotes])

  return (
    <div className="card">
      <h4 className="text-blue-600 font-medium leading-loose">Student Votes</h4>

      <div
        className={
          status === 'pending' ? 'opacity-50 transition-opacity duration-75 ease-in-out' : undefined
        }
      >
        <Chart type="bar" options={options} series={series} height={400} />
      </div>

      <div className="mb-3 px-1">
        <Filters />
      </div>
    </div>
  )
}

export default StudentVotesChart
