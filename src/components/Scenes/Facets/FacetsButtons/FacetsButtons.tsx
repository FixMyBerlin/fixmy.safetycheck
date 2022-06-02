import classNames from 'classnames'
import React from 'react'
import { useAggregationConfig } from '../../hooks'
import { ResultBucketProps, ResultProps, SceneCategory } from '../../types'
import { ButtonIcon } from './ButtonIcon'
import { ButtonMultiChoice, HandleMultiChoice } from './ButtonMultiChoice'
import { ButtonSingleChoice, HandleSingleChoice } from './ButtonSingleChoice'
import { checkBucketValueConsistency, checkDataConsistency } from '../utils'
import { ButtonSingleChoiceNoChoice } from './ButtonSingleChoiceNoChoice'

type Props = {
  aggregationKey: string
  category: SceneCategory
  results: ResultProps
  buckets: ResultBucketProps[]
  handleSingleChoice?: HandleSingleChoice
  handleMultiChoice?: HandleMultiChoice
}

export const FacetsButtons: React.FC<Props> = ({
  aggregationKey,
  category,
  results,
  buckets,
  handleSingleChoice,
  handleMultiChoice,
}) => {
  checkDataConsistency({ category, aggregationKey })
  const { keyFromItemjsMissingInTranslations } = checkBucketValueConsistency({
    category,
    aggregationKey,
    buckets,
  })

  // We need a specific order for our Bucket values.
  // We use the order of key from our aggregationConfig for that.
  // However, for keys of type number that does not work, which is why we use a custom order via the `sortOrder` key.
  const aggregationConfig = useAggregationConfig(category)
  const sortedBuckets =
    aggregationConfig[aggregationKey]?.sortOrder ||
    Object.keys(aggregationConfig[aggregationKey].buckets)

  const { showAsIcons, choiceMode } = aggregationConfig[aggregationKey]

  return (
    <>
      <div
        className={classNames('flex w-full flex-row font-condensed', {
          'gap-1': choiceMode === 'multi',
        })}
      >
        {sortedBuckets.map((bucketKey, index) => {
          if (bucketKey === 'noChoice') {
            return (
              <ButtonSingleChoiceNoChoice
                key="noChoice"
                category={category}
                bucketKey="noChoice"
                buckets={buckets}
                aggregationKey={aggregationKey}
                handleClick={handleSingleChoice}
              />
            )
          }
          const bucket = results.data.aggregations[
            aggregationKey
          ].buckets.filter((b) => b.key === bucketKey)?.[0]
          // Guard for `keyFromTranslationMissingInItemjs`
          if (!bucket) return null

          if (showAsIcons) {
            return (
              <ButtonIcon
                key={bucketKey}
                category={category}
                bucket={bucket}
                aggregationKey={aggregationKey}
                handleClick={handleSingleChoice}
                paginationTotal={results?.pagination?.total}
              />
            )
          }

          if (choiceMode === 'single') {
            return (
              <ButtonSingleChoice
                key={bucketKey}
                category={category}
                buckets={buckets}
                bucket={bucket}
                index={index}
                aggregationKey={aggregationKey}
                handleClick={handleSingleChoice}
                paginationTotal={results?.pagination?.total}
              />
            )
          }

          return (
            <ButtonMultiChoice
              key={bucketKey}
              category={category}
              buckets={buckets}
              bucket={bucket}
              aggregationKey={aggregationKey}
              handleClick={handleMultiChoice}
              paginationTotal={results?.pagination?.total}
            />
          )
        })}
      </div>

      {!!keyFromItemjsMissingInTranslations.length && (
        <div className="text-xs text-neutral-500">
          Werte, die wir in den Daten bereinigen müssen:{' '}
          {keyFromItemjsMissingInTranslations.map((v) => (
            <code key={v} className="rounded-sm bg-red-100 px-1">
              {v}
            </code>
          ))}
        </div>
      )}
    </>
  )
}
