import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from '~/components/Link'
import { Headline } from '../components'

export const SectionSummary: React.FC = () => {
  const intl = useIntl()

  return (
    <section>
      <Headline id={intl.formatMessage({ id: 'toc.Summary.hash' })} as="h2">
        <FormattedMessage id="06_summary.p01.heading" />
      </Headline>
      <p>
        <FormattedMessage id="06_summary.p02" />
      </p>
      <ul>
        <li>
          <FormattedMessage id="06_summary.p03" />
        </li>
        <li>
          <FormattedMessage id="06_summary.p04" />
        </li>
        <li>
          <FormattedMessage id="06_summary.p05" />
        </li>
        <li>
          <FormattedMessage id="06_summary.p06" />
        </li>
        <li>
          <FormattedMessage id="06_summary.p07" />
        </li>
        <li>
          <FormattedMessage id="06_summary.p08" />
        </li>
        <li>
          <FormattedMessage id="06_summary.p09" />
        </li>
        <li>
          <FormattedMessage id="06_summary.p10" />
        </li>
      </ul>
      <p>
        <FormattedMessage id="06_summary.p11" />
      </p>
      <p>
        <FormattedMessage id="06_summary.p12" />
      </p>
      <p>
        <FormattedMessage
          id="06_summary.p13"
          values={{
            linkPaper: (
              <Link
                external
                to="https://www.sciencedirect.com/science/article/pii/S0001457522000136?dgcid=author"
              >
                How Safe do you feel? – A large-scale survey concerning the
                subjective safety associated with different kinds of cycling
                lanes
              </Link>
            ),
            linkVideo: (
              <Link external to="https://www.youtube.com/watch?v=PDV10OPbaC8">
                <FormattedMessage id="06_summary.p13.linkVideoText" />
              </Link>
            ),
          }}
        />
      </p>
    </section>
  )
}
