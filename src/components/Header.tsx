// react
import { FunctionComponent } from 'react'
// lib
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <div className="header">
      <nav>
        Galler<strong>easy</strong>
        <Link to='/' >Home</Link>
        <Link to='/favourite' >Favourite</Link>
      </nav>
    </div>
  )
}

export default styled(Header) `
  
`