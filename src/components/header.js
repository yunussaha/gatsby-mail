import React from 'react'
import { Link } from 'gatsby'
import cx from 'classnames'
import PropTypes from 'prop-types'

import Authentication from './authentication'
import { GatsbyLogo, ThemeToggle } from './icons'
import Signout from './sign-out'
import Theme from './theme'

const Container = ({ className, ...rest }) => (
  <header className={cx('header', className)} {...rest}>
    {rest.children}
  </header>
)

const StyledLink = ({ className, ...rest }) => (
  <Link className={cx('header--link', className)} {...rest}>
    {rest.children}
  </Link>
)

const IconButton = ({ className, ...rest }) => (
  <button className={cx('header--button', className)} {...rest}>
    {rest.children}
  </button>
)

const Header = ({ siteTitle }) => (
  <Theme.Consumer>
    {({ toggleTheme, theme }) => (
      <Container>
        <h1 style={{ margin: 0 }}>
          <StyledLink to="/">
            <GatsbyLogo
              css={{ marginRight: '0.5rem', position: 'relative', top: -2 }}
            />
            {siteTitle
              .split('Gatsby')
              .pop()
              .trim()}
          </StyledLink>
        </h1>
        <div>
          <IconButton
            onClick={toggleTheme}
            title={`Switch to ${
              theme.name === 'dark' ? 'light' : 'dark'
            } theme`}
          >
            <ThemeToggle color={theme.link} size={20} />
          </IconButton>
          <Authentication.Consumer>
            {({ authenticated, logout }) => (
              <>
                {authenticated ? (
                  <Signout
                    css={{ color: theme.link, position: 'relative', top: 3 }}
                    onClick={logout()}
                    title="Sign out"
                  />
                ) : null}
              </>
            )}
          </Authentication.Consumer>
        </div>
      </Container>
    )}
  </Theme.Consumer>
)

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default Header
