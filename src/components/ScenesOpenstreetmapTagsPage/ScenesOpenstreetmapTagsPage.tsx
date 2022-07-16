import React, { useMemo } from 'react'
import { useStore } from 'zustand'
import { FeelSafe } from '../charts'
import { MetaTags } from '../Layout'
import { Link } from '../Link'
import { SceneImage } from '../Scenes'
import { useStoreExperimentData } from '../Scenes/store'
import { cleanupCsvData } from '../Scenes/utils'
import { useTitleScene } from '../Scenes/utils/titleScenes/utils'

type Props = {
  rawScenes: any
}

export const ScenesOpenstreetmapTagsPage: React.FC<Props> = ({ rawScenes }) => {
  const scenes = useMemo(() => {
    // Flatten the data by extracting the objects we want from [node: { /* object */ }, node: { /* object */ }, …]
    const flattened = rawScenes.map((list) => list.node)
    // Clean the data
    const clean = cleanupCsvData(flattened)
    return clean.sort((a, b) => a.voteScore - b.voteScore)
  }, [rawScenes])

  const totalResults = Number(scenes.length).toLocaleString()
  const totalVotes = scenes.reduce((acc, scene) => acc + scene.voteCount, 0)

  const titleScene = useTitleScene()

  const { experimentTextKey } = useStore(useStoreExperimentData)
  const categoryTranslation =
    experimentTextKey === 'primary' ? 'Hauptstrassen' : 'Nebenstrassen'
  const resultsPath =
    experimentTextKey === 'primary' ? '/hauptstrassen' : '/nebenstrassen'
  const otherCategoryTranslation =
    experimentTextKey === 'primary' ? 'Nebenstrassen' : 'Hauptstrassen'
  const otherResultsPath =
    experimentTextKey === 'primary'
      ? '/nebenstrassen/alle'
      : '/hauptstrassen/alle'

  return (
    <>
      <MetaTags
        article
        noindex
        title={`Tag-Vorschläge für OpenStreetMap für alle ${Number(
          totalResults
        ).toLocaleString()} Szenen auf ${categoryTranslation}.`}
        description={`Auf Basis von insgesamt ${Number(
          totalVotes
        ).toLocaleString()} Bewertungen.`}
      />

      <h1 className="mb-5 text-center text-4xl font-semibold">
        Tag-Vorschläge für OpenStreetMap für alle {totalResults} Szenen für{' '}
        {categoryTranslation}
      </h1>
      <p className="mb-5 text-center">
        Diese Tag-Vorschläge sind noch in Arbeit. Sie sollen dazu anregen,
        detaillierte Erfassung von Fahrradinfrastruktur in OpenStreetMap
        voranzutreiben.
      </p>
      <p className="mb-6 text-center text-gray-500">
        Aus dem Blickwinkel einer Fahrradfahrer:in. Die Sortierung zeigt die am
        schlechtesten bewerteten Szenen zuerst.
      </p>
      <p className="text-center">
        <Link to={resultsPath} button className="mr-2">
          Ergebnisse filtern
        </Link>{' '}
        <Link to={otherResultsPath}>Zu den {otherCategoryTranslation}</Link>
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {scenes.slice(0, 5).map((scene) => (
          <section className="flex gap-5" key={scene.sceneId}>
            <div className="relative">
              <SceneImage
                sceneId={scene.sceneId}
                className="mb-2 h-72 w-full rounded object-cover object-bottom"
              />
              <div className="absolute top-1 right-1">
                <FeelSafe value={scene.voteScore} standalone />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Link to={scene.path} className="col-span-4">
                <h2 className="text-lg font-bold leading-tight">
                  {titleScene(scene)}
                </h2>
              </Link>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-sm">
                  <strong>
                    KfZ-<code>Way</code>
                  </strong>
                  <pre className="font-mono">highway=*</pre>
                </div>
                <div className="text-sm">
                  <strong>
                    Fahrrad-<code>Way</code>
                  </strong>
                  <pre className="font-mono">highway=cycleway</pre>
                </div>
                <div className="text-sm">
                  <strong>
                    Fußänger-<code>Way</code>
                  </strong>
                  <pre className="font-mono">
                    highway=footway footway=sidewalk
                  </pre>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
