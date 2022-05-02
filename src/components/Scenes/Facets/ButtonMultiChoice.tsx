import React from 'react';
import { aggregationConfig } from '../constants';
import { ResultBucketProps } from '../types';
import { buttonClassNames } from './buttonClassNames';

export type HandleMultiChoiceProps = {
  aggregationKey: string;
  buckets: ResultBucketProps[];
  selectedBucket: ResultBucketProps;
};

export type HandleMultiChoice = ({
  aggregationKey,
  buckets,
  selectedBucket,
}: HandleMultiChoiceProps) => void;

type Props = {
  aggregationKey: string;
  bucket: ResultBucketProps;
  buckets: ResultBucketProps[];
  handleClick: HandleMultiChoice;
  index: number;
  paginationTotal: number;
};

export const ButtonMultiChoice: React.FC<Props> = ({
  aggregationKey,
  bucket,
  buckets,
  handleClick,
  index,
  paginationTotal,
}) => {
  const { showAsIcons } = aggregationConfig[aggregationKey];

  // For our uiSelected, aggregations with no selected buckets are shows als "all selected".
  const anyOfGroupSelected = buckets.some((b) => b.selected);
  const results = parseInt(bucket?.doc_count, 10);
  const uiSelected = bucket?.selected || !anyOfGroupSelected;
  const futureResult = uiSelected ? (paginationTotal || 0) - results : '-';
  const uiCanpress = !!futureResult;
  const firstElement = index === 0;
  const lastElement = index === buckets.length - 1;

  return (
    <button
      key={bucket.key}
      type="button"
      className={buttonClassNames({
        firstElement,
        lastElement,
        uiSelected,
        uiCanpress,
      })}
      onClick={() =>
        uiCanpress &&
        handleClick({
          aggregationKey,
          buckets,
          selectedBucket: bucket,
        })
      }
      title={`${
        showAsIcons
          ? `${aggregationConfig[aggregationKey].buckets[bucket.key]} – `
          : ''
      }Ergebnisse ${futureResult}`}
    >
      {showAsIcons ? (
        <span className="font-bold uppercase">
          {aggregationConfig[aggregationKey].buckets[bucket.key]?.charAt(0) ||
            'TODO'}
        </span>
      ) : (
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html:
              aggregationConfig[aggregationKey].buckets[bucket.key] || 'TODO',
          }}
        />
      )}
    </button>
  );
};
