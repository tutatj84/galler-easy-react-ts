// react
import { FunctionComponent, useContext } from 'react'
// lib
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'
import styled from 'styled-components'
import FavPicsContext from '../Context'

interface HeaderProps {
  className?: string
}

const CustomLink = ({ children, to, ...props }: LinkProps) => {
  const resolved = useResolvedPath(to)
  const isMatched = useMatch({ path: resolved.pathname, end: true })

  return (
    <Link
      style={{ fontWeight: isMatched ? 'bold' : 'inherit' }}
      to={to}
      {...props}
    >
    {children}
    </Link>
  )
}

const Header: FunctionComponent<HeaderProps> = ({ className }) => {
  const { favImages } = useContext(FavPicsContext)

  return (
    <div className={`header ${className}`}>
      <div className="brand">
        Galler<strong>easy</strong>
      </div>
      <div className="divider">|</div>
      <nav>
        <CustomLink to='/' >Home</CustomLink>
        <CustomLink to='/favourite' >Favourite({favImages.length})</CustomLink>
      </nav>
    </div>
  )
}

export default styled(Header)`
  padding: 1rem 2rem;
  border-bottom: 1px solid gray;
  font-size: 1.3rem;
  display: flex;

  .divider {
    margin: 0 1rem;
  }

  nav a, a:visited {
    margin-right: 1rem;
    color: inherit;
    text-decoration: none;
  }
`