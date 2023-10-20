import { useCallback, useState } from 'react'

export const useSwitch = (initialBool: boolean) => {
  const [state, setState] = useState(initialBool)

  const setTrue = useCallback(() => setState(true), [])
  const setFalse = useCallback(() => setState(false), [])

  return [state, setTrue, setFalse] as const
}
