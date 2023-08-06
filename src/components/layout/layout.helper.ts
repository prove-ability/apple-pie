import {
  createContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'
import { DefaultTheme } from 'styled-components'

import { supabase } from '@/lib/suparbase'
import { Colors } from '@/styles/styled'
import { base, dark, light } from '@/styles/theme'

/**
 * @description 로그인 상태 확인 후 로그인 페이지로 이동
 */
export const useLoginCheck = () => {
  const router = useRouter()
  useLayoutEffect(() => {
    ;(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login')
        throw new Error('Redirecting to /login')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/**
 * @description 테마 변경
 */
export const useTheme = () => {
  const themesMap: Record<'light' | 'dark', Colors> = {
    light,
    dark,
  }

  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')

  // cookie 테마에 따라 테마 변경
  useEffect(() => {
    const theme = localStorage.getItem('elephant-theme') as
      | typeof currentTheme
      | undefined
    if (theme) {
      setCurrentTheme(theme)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return { theme, value }
}

export const ThemePreferenceContext = createContext<{
  currentTheme: 'light' | 'dark'
  handleThemeChange: (theme: 'light' | 'dark') => void
}>({
  currentTheme: 'light',
  handleThemeChange: () => {},
})
