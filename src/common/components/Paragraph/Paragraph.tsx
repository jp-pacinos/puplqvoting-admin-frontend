import React, { useState, useEffect, useMemo } from 'react'

interface Props extends React.ComponentPropsWithoutRef<'p'> {
  text: string | null
  truncate?: number
}

const Paragraph: React.FC<Props> = ({
  text: originalText,
  truncate: maxLength = 180,
  className,
  ...rest
}) => {
  const [text, setText] = useState('')
  const [isShowMore, setIsShowMore] = useState(false)

  const paragraphClass = useMemo(() => {
    return `paragraph${className ? ` ${className}` : ''}`
  }, [className])

  useEffect(() => {
    if (typeof originalText !== 'string') {
      setText('No description.')
      return
    }

    if (originalText.length > maxLength) {
      setIsShowMore(true)
      setText(originalText.slice(0, maxLength) + '...')
      return
    }

    setText(originalText)
  }, [originalText, maxLength])

  const onClickMore = () => {
    setIsShowMore(false)
    setText(originalText as string)
  }

  const onClickLess = () => {
    setIsShowMore(true)
    setText((prevText) => prevText.slice(0, maxLength) + '...')
  }

  let renderButton = null
  if (originalText && originalText.length > maxLength) {
    renderButton = isShowMore ? (
      <button
        onClick={onClickMore}
        className="text-blue-500 text-sm hover:text-blue-700 focus:outline-none"
      >
        Show more
      </button>
    ) : (
      <button
        onClick={onClickLess}
        className="text-blue-500 text-sm hover:text-blue-700 focus:outline-none"
      >
        Show less
      </button>
    )
  }

  return (
    <>
      <p className={paragraphClass} {...rest}>
        {text}
      </p>
      {renderButton}
    </>
  )
}

export default Paragraph
