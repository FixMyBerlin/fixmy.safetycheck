import React from 'react'
import { Helmet } from 'react-helmet'
import { ReportTranslations } from '~/components/ReportPage/translations'
import { domain } from '~/components/utils'

// FYI, https://www.gatsbyjs.com/docs/add-seo-component/ suggest to use useStaticQuery but I don't see why, yet
const seoDefaultValues = {
  defaultTitle: 'Radwege-Check',
  defaultDescription:
    'In diesem Online-Tool kannst du 1.779 Varianten von Fahrrad-Führungsformen nach ihrer Bewertung zur subjektiven Sicherheit vergleichen. Basierend auf über 400.000 Bewertungen.',
}

type Props = {
  lang?: ReportTranslations
  noindex?: boolean
  canonicalPath?: string
  title?: string
  sharingTitle?: string
  description?: string
  imagePath?: string
  imageUrl?: string | `https://${string}`
  imageSize?: { width: number; height: number }
  article?: boolean
  children?: React.ReactNode
}

export const MetaTags: React.FC<Props> = ({
  lang = 'de',
  noindex = false,
  canonicalPath,
  title,
  sharingTitle,
  description,
  imagePath,
  imageUrl,
  imageSize,
  article,
  children,
}) => {
  const { defaultTitle, defaultDescription } = seoDefaultValues

  const withDefaults = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image:
      imageUrl ||
      (imagePath && `${domain() || ''}${imagePath}`) ||
      `${domain() || ''}/social-sharing/default.jpg`,
  }

  // FYI, we do not inlcude the url meta tags since there was an issue with specs and `useLocation`.
  //  Since we do not need this field, its OK to remove it.
  return (
    <Helmet>
      <html lang={lang} className="scroll-smooth" />
      <title>{withDefaults.title}</title>
      <meta property="og:title" content={sharingTitle || withDefaults.title} />
      <meta name="twitter:title" content={sharingTitle || withDefaults.title} />

      {canonicalPath ? (
        <link rel="canonical" href={`${domain}${canonicalPath}`} />
      ) : null}

      {noindex === true ? <meta name="robots" content="noindex" /> : null}

      <meta name="description" content={withDefaults.description} />
      <meta property="og:description" content={withDefaults.description} />
      <meta name="twitter:description" content={withDefaults.description} />

      <meta name="image" content={withDefaults.image} />
      <meta property="og:image" content={withDefaults.image} />
      <meta name="twitter:image" content={withDefaults.image} />

      <meta name="twitter:card" content="summary_large_image" />

      {Object.entries(imageSize || {}).map(([key, value]) => (
        <meta key={key} property={`og:image:${key}`} content={`${value}`} />
      ))}

      {article ? <meta property="og:type" content="article" /> : null}

      {children}
    </Helmet>
  )
}
