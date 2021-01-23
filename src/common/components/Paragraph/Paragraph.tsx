import React, { useState, useEffect, useCallback } from 'react'

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

  const onClickMore = useCallback(() => {
    setIsShowMore(false)
    setText(originalText as string)
  }, [originalText])

  const onClickLess = useCallback(() => {
    setIsShowMore(true)
    setText((prevText) => prevText.slice(0, maxLength) + '...')
  }, [maxLength])

  let renderButton = null
  if (originalText && originalText.length > maxLength) {
    renderButton = (
      <button
        onClick={isShowMore ? onClickMore : onClickLess}
        className="text-blue-500 text-sm hover:text-blue-700 focus:outline-none"
      >
        {isShowMore ? 'Show more' : 'Show less'}
      </button>
    )
  }

  return (
    <>
      <p className={className ? `paragraph ${className}` : 'paragraph'} children={text} {...rest} />
      {renderButton}
    </>
  )
}

export default React.memo(Paragraph)
