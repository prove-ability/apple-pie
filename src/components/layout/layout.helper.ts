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
  useEffect(() => {
    ;(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      console.log('session: ', session)

      const { data } = await supabase.auth.getUser()

      console.log('data: ', data)
      // if (!session) {
      //   router.push('/sign-in')
      //   throw new Error('Redirecting to /sign-in')
      // }

      // eslint-disable-next-line @typescript-eslint/no-shadow
      supabase.auth.onAuthStateChange((event, session) => {
        console.log(`Supabase auth event: ${event}`, session)
        if (!session) return
        // setUserSession(session)
        // setUser(session?.user ?? null)
        if (event === 'SIGNED_OUT') {
          // delete cookies on sign out
          const expires = new Date(0).toUTCString()
          document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
          document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
          document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
          document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
        }
      })
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
