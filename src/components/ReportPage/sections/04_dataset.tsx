import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from '~/components/Link'
import { ButtonWrapper, Headline } from '../components'

export const SectionDataset: React.FC = () => {
  const intl = useIntl()

  return (
    <section>
      <Headline id={intl.formatMessage({ id: 'toc.Dataset.hash' })} as="h2">
        <FormattedMessage id="04_dataset.heading" />
      </Headline>
      <p>
        <FormattedMessage
          id="04_dataset.p1"
          values={{
            linkLicense: (
              <Link to="https://www.opendatacommons.org/licenses/odbl/summary/index.html">
                <FormattedMessage id="04_dataset.p1.linkLicense" />
              </Link>
            ),
            linkSpec: (
              <Link to="/uploads/kataster-ki/Spezifikation_Ausgabeformat_des_Strassenchecks.pdf">
                <FormattedMessage id="04_dataset.p1.linkSpec" />
              </Link>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage id="04_dataset.p2" />
      </p>

      <ButtonWrapper>
        <Link
          to="https://fmb-aws-bucket.s3.eu-central-1.amazonaws.com/KatasterKI/SurveyResults_200414.json.zip"
          external
          button
        >
          <FormattedMessage id="04_dataset.downloadLabel" />
        </Link>
        <div className="mt-3 text-center text-gray-500">
          <FormattedMessage id="04_dataset.downloadCaption" />
        </div>
      </ButtonWrapper>
    </section>
  )
}
