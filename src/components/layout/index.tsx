'use client'

import React, { createContext, useEffect, useMemo, useState } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyle } from '@/styles/reset'
import { Colors } from '@/styles/styled'
import { base, dark, light } from '@/styles/theme'

import Footer from './footer'
import Header from './header'

import { Container, Main } from './layout.style'

const themesMap: Record<'light' | 'dark', Colors> = {
  light,
  dark,
}

export const ThemePreferenceContext = createContext<{
  currentTheme: 'light' | 'dark'
  handleThemeChange: (theme: 'light' | 'dark') => void
}>({
  currentTheme: 'light',
  handleThemeChange: () => {},
})

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')

  // cookie 테마에 따라 테마 변경
  useEffect(() => {
    const theme = localStorage.getItem('elephant-theme') as
      | typeof currentTheme
      | undefined
    if (theme) {
      setCurrentTheme(theme)
    }
  }, [])

  // context value
  const value = useMemo(() => {
    const handleThemeChange = (theme: typeof currentTheme) => {
      setCurrentTheme(theme)
      localStorage.setItem('elephant-theme', theme)
    }
    return {
      currentTheme,
      handleThemeChange,
    }
  }, [currentTheme])

  const theme: DefaultTheme = { ...base, colors: themesMap[currentTheme] }

  return (
    <StyledComponentsRegistry>
      <ThemePreferenceContext.Provider value={value}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Container>
            <Header />
            <Main>{children}</Main>
            <Footer />
          </Container>
        </ThemeProvider>
      </ThemePreferenceContext.Provider>
    </StyledComponentsRegistry>
  )
}
