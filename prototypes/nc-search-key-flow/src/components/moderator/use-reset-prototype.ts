import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import { usePrototypeStore } from '@proto/store/prototype-store'

/** "Reset to start": clean dashboard, moderator settings kept. */
export const useResetPrototype = () => {
  const { resetToStart } = usePrototypeStore()
  const navigate = useNavigate()

  return useCallback(() => {
    resetToStart()
    // EBR persists the VMs browser's query settings (filters) per session
    sessionStorage.clear()
    void navigate({ to: '/' })
  }, [resetToStart, navigate])
}
