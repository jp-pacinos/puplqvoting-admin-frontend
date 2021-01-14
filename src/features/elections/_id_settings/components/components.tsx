export const Container: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return <div className="flex flex-wrap -mx-3 mb-5 md:mb-10" {...props} />
}

interface DetailsContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  title: string
  details?: string
}

export const DetailsContainer: React.FC<DetailsContainerProps> = ({
  title,
  details,
  children,
  ...rest
}) => {
  return (
    <div className="w-full px-3 mb-3 md:w-2/6 md:mb-0 md:mt-5" {...rest}>
      <h2 className="font-bold text-md mb-3">{title}</h2>
      {details && <p className="text-sm text-gray-600">{details}</p>}
      {children}
    </div>
  )
}

export const FormContainer: React.FC<React.ComponentPropsWithoutRef<'form'>> = (props) => {
  return (
    <div className="px-3 w-full md:w-4/6">
      <div className="card p-0">
        <form {...props} />
      </div>
    </div>
  )
}

export const FormBody: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return <div className="p-4" {...props} />
}

export const FormFooter: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return <div className="bg-gray-50 px-4 py-3 text-right" {...props} />
}

interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
  required?: boolean
}

export const Label: React.FC<LabelProps> = ({ required = false, children, ...props }) => {
  return (
    <label className="text-gray-500 text-sm font-semibold leading-loose pl-1" {...props}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}
