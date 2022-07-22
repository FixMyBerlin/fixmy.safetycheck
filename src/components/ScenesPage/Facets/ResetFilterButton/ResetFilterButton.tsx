import classNames from 'classnames'
import React from 'react'
import { useStore } from 'zustand'
import { useStoreResetFilterEnabled } from '../../store/useStoreResetFilterEnabled'

type Props = {
  onClick: () => void
}

export const ResetFilterButton: React.FC<Props> = ({ onClick }) => {
  const { resetFilterEnabled } = useStore(useStoreResetFilterEnabled)

  return (
    <p>
      <button
        type="button"
        onClick={resetFilterEnabled ? onClick : undefined}
        className={classNames(
          resetFilterEnabled
            ? 'hover:text-yellow-800 hover:decoration-yellow-500 focus:text-yellow-800 focus:outline-none'
            : 'cursor-not-allowed text-gray-500 decoration-gray-300',
          'underline decoration-brand-yellow decoration-2'
        )}
        disabled={!resetFilterEnabled}
      >
        Filter zurücksetzen
      </button>
    </p>
  )
}
