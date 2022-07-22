import classNames from 'classnames'
import React, { useMemo } from 'react'
import { useStore } from 'zustand'
import { TwitterButtonIconCurrentUrl } from '~/components/Link'
import { trackEvent } from '~/components/utils'

import { useStoreExperimentData } from '../store'
import { ResultProps } from '../types'
import { ExperimentSwitcher } from './ExperimentSwitcher'
import {
  FacetsButtons,
  HandleMultiChoice,
  HandleSingleChoice,
} from './FacetsButtons'
import { FacetsHeadline } from './FacetsHeadline'
import { FooterLinks } from './FooterLinks'
import { HelpButton } from './HelpButton'
import { Logo } from './Logo'
import { PresetDropdown, PresetDropdownProps } from './PresetDropdown'
import { ResetFilterButton } from './ResetFilterButton'

export type FacetsProps = {
  results: ResultProps
  handleResetFilter: () => void
  handleSingleChoice: HandleSingleChoice
  handleMultiChoice: HandleMultiChoice
  className?: string
  showLogo: boolean
} & PresetDropdownProps

export const Facets: React.FC<FacetsProps> = ({
  results,
  handleResetFilter,
  handleSingleChoice,
  handleMultiChoice,
  handlePresetClick,
  className,
  showLogo,
}) => {
  const aggregations = results?.data?.aggregations || {}
  const { aggregationConfig, experimentTextKey } = useStore(
    useStoreExperimentData
  )

  const mainAggregations = useMemo(
    () =>
      Object.entries(aggregations).filter(
        ([key, _v]) => aggregationConfig[key]?.primaryGroup === true
      ),
    [aggregations, aggregationConfig]
  )

  const furtherAggregations = useMemo(
    () =>
      Object.entries(aggregations).filter(
        ([key, _v]) => !aggregationConfig[key]?.primaryGroup
      ),
    [aggregations, aggregationConfig]
  )

  return (
    <nav
      className={classNames(
        className,
        'relative overflow-y-scroll overscroll-contain'
      )}
    >
      <div className="relative flex h-14 items-center justify-between bg-brand-light-yellow py-1 px-3 shadow-md">
        <Logo visible={showLogo} />
        <ExperimentSwitcher />
        <TwitterButtonIconCurrentUrl
          className="lg:hidden"
          onClick={() =>
            trackEvent({
              category: `[${experimentTextKey}] Twitter button`,
              action: 'Click',
              label: 'Desktop view',
            })
          }
        />
      </div>

      <div
        className={classNames('z-0 mb-4 bg-gray-200 px-3 pt-5 pb-1 shadow-md')}
      >
        <h1 className="sr-only">Ergebnisse filtern</h1>

        <PresetDropdown handlePresetClick={handlePresetClick} />

        <div className="mb-6 flex justify-between">
          <ResetFilterButton onClick={handleResetFilter} />
          <HelpButton />
        </div>

        {mainAggregations.map(([aggregationKey, aggregation]) => {
          const { buckets } = aggregation

          return (
            <section key={aggregationKey} className={classNames('mb-5')}>
              <FacetsHeadline aggregationKey={aggregationKey} />

              <FacetsButtons
                aggregationKey={aggregationKey}
                results={results}
                buckets={buckets}
                handleSingleChoice={handleSingleChoice}
                handleMultiChoice={handleMultiChoice}
              />
            </section>
          )
        })}
      </div>
      <div className="px-3">
        {furtherAggregations.map(([aggregationKey, aggregation]) => {
          if (!aggregationConfig[aggregationKey]) return null

          const { buckets } = aggregation
          const { showAsIcons, groupEndIndicator } =
            aggregationConfig[aggregationKey]

          return (
            <section
              key={aggregationKey}
              className={classNames(
                { 'mb-5': !groupEndIndicator },
                { '-mt-3': showAsIcons },
                {
                  'mb-4 border-b border-dashed border-gray-300 pb-5':
                    groupEndIndicator,
                }
              )}
            >
              <FacetsHeadline
                aggregationKey={aggregationKey}
                forIcons={showAsIcons}
              />

              <FacetsButtons
                aggregationKey={aggregationKey}
                results={results}
                buckets={buckets}
                handleSingleChoice={handleSingleChoice}
                handleMultiChoice={handleMultiChoice}
              />
            </section>
          )
        })}
      </div>
      <FooterLinks />
    </nav>
  )
}
