import { JSX } from 'react'

const Copyright = (): JSX.Element => {
  return <span>{new Date().getFullYear()}</span>
}

export default Copyright
