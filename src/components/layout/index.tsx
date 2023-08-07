'use client'

import React from 'react'
import { ThemeProvider } from 'styled-components'

import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyle } from '@/styles/reset'

import Footer from './footer'
import Header from './header'
import {
  ThemePreferenceContext,
  useLoginCheck,
  useTheme,
} from './layout.helper'

import { Container, Main } from './layout.style'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  // useLoginCheck()

  const { theme, value } = useTheme()

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
