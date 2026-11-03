import {
  ThemeManager,
  ThemeWrapperContext,
} from '@nutanix-core/prism-ui-themes-common'
import type React from 'react'
import { useCallback, useContext } from 'react'

export type ThemeId = 'light' | 'dark' | 'auto'

interface ThemeWrapperContextType {
  id: string | symbol
  themeManager: typeof ThemeManager.instance
  getVar: (s: string) => string | Record<string, unknown>
}

interface UseThemeReturn {
  themeId: string
  isDarkMode: boolean
  getVar: (variableName: string) => string | Record<string, unknown>
  themeManager: typeof ThemeManager.instance
  setTheme: (themeId: ThemeId) => void
}

const THEME_STORAGE_KEY = 'nutanix-theme-preference'

// Get initial theme from localStorage or default
export const getStoredTheme = (): ThemeId => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored && ['light', 'dark', 'auto'].includes(stored)) {
      return stored as ThemeId
    }
  } catch (error) {
    console.error('Failed to read theme from localStorage', error)
  }
  return 'auto'
}

// Apply theme on initial load (before React renders)
export const initializeTheme = () => {
  try {
    const themeId = getStoredTheme()
    const themeManager = ThemeManager.instance
    themeManager.theme = themeManager.getThemeById(themeId)
  } catch (error) {
    console.error('Failed to initialize theme', error)
  }
}

export const useTheme = (): UseThemeReturn => {
  // Type assertion to handle create-react-context vs React.Context incompatibility
  const context = useContext(
    ThemeWrapperContext as unknown as React.Context<ThemeWrapperContextType>,
  )

  const { id, themeManager, getVar } = context
  const themeId = typeof id === 'string' ? id : String(id)
  const isDarkMode = themeId.toLowerCase().includes('dark')

  const setTheme = useCallback(
    (newThemeId: ThemeId) => {
      try {
        // Update localStorage
        localStorage.setItem(THEME_STORAGE_KEY, newThemeId)

        // Apply theme via ThemeManager
        themeManager.theme = themeManager.getThemeById(newThemeId)
      } catch (error) {
        console.error('Failed to set theme', error)
      }
    },
    [themeManager],
  )

  return {
    themeId,
    isDarkMode,
    getVar,
    themeManager,
    setTheme,
  }
}
