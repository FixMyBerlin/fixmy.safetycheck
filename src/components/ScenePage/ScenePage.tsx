import { InformationCircleIcon } from '@heroicons/react/outline'
import React from 'react'
import { useStore } from 'zustand'
import Logo from '~/components/assets/radwegecheck-logo.svg'
import { MetaTags } from '../Layout'
import { Link, PrintButton, TwitterButton } from '../Link'
import { Popover } from '../Popover'
import { SceneImage } from '../Scenes'
import { ResultCells } from '../Scenes/Results/ResultCells'
import { ResultNumbers } from '../Scenes/Results/ResultNumbers'
import { sceneImageUrl } from '../Scenes/SceneImage'
import { useStoreExperimentData } from '../Scenes/store'
import { ScenePrimaryProps, SceneSecondaryProps } from '../Scenes/types'
import { useTitleScene } from '../Scenes/utils/titleScenes/utils'
import { formatNumber } from '../utils'

type Props = {
  scene: ScenePrimaryProps | SceneSecondaryProps
  pagePath: string
}

export const ScenePage: React.FC<Props> = ({ scene, pagePath }) => {
  const { experimentTextKey } = useStore(useStoreExperimentData)

  const titleScene = useTitleScene()

  const categoryTranslation =
    experimentTextKey === 'primary' ? 'Hauptstrasse' : 'Nebenstrasse'
  const categoryTranslationSentencePart =
    experimentTextKey === 'primary'
      ? 'auf einer Hauptstrasse'
      : 'in einer Nebenstrasse'

  return (
    <>
      <MetaTags
        article
        title={titleScene(scene)}
        description={`Diese Führungsform ${categoryTranslationSentencePart} wurde mit ${formatNumber(
          scene.voteScore,
          {
            unit: '%',
            precision: 0,
          }
        )} als „(eher) sicher“ bewertet.`}
        imageUrl={sceneImageUrl(scene.sceneId)}
        imageSize={{ width: 1240, height: 930 }}
      />

      <div className="items-center bg-white p-3 lg:flex lg:flex-col lg:px-0 lg:py-6">
        <div className="mb-5 flex w-full max-w-7xl items-start gap-4 lg:grid lg:grid-cols-4 lg:gap-6">
          <div className="mt-1 lg:mt-0 lg:ml-5">
            <Link
              to="/"
              classNameOverwrite="block h-10 w-10 overflow-hidden lg:overflow-visible lg:w-auto"
              title="Zur Startseite…"
            >
              <Logo className="h-full" alt="Radwege-Check" />
            </Link>
          </div>
          <h1 className="silbentrennung col-span-3 w-full text-2xl lg:h-14 lg:pr-40">
            {titleScene(scene)}
          </h1>
        </div>

        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 print:hidden">
          <TwitterButton
            url={pagePath}
            text={`Subjektive Sicherheit ${formatNumber(scene.voteScore, {
              unit: '%',
              precision: 0,
            })}`}
            hashtags="verkehrswende"
          />
          <PrintButton />
        </div>

        <div className="flex max-w-7xl flex-col gap-6 lg:grid lg:grid-cols-4">
          <div className="order-3 lg:order-none">
            <p className="px-6 pt-0 pb-3">
              <strong className="text-xxs font-semibold">Straßenklasse</strong>
              <br />
              {categoryTranslation}
            </p>
            <div className="rounded bg-blue-50 p-6">
              <ResultCells scene={scene} />
            </div>
          </div>

          <div className="order-1 col-span-2 lg:order-none">
            <SceneImage
              sceneId={scene.sceneId}
              className="mb-5 h-96 w-full rounded object-cover object-bottom"
            />
            <div className="grid grid-cols-2 gap-5 text-xs lg:text-base">
              {'sceneIdPedestrian' in scene && scene.sceneIdPedestrian ? (
                <figure>
                  <figcaption className="mb-0.5 font-normal">
                    Perspektive einer Fußgänger:in
                  </figcaption>
                  <SceneImage
                    sceneId={scene.sceneIdPedestrian}
                    alt="Illustration der bewerteten Szene aus Blickwinkel einer Fußgänger:in"
                    className="w-full rounded object-cover"
                  />
                </figure>
              ) : (
                <div className="rounded bg-gray-50" />
              )}
              {'sceneIdCar' in scene && scene.sceneIdCar ? (
                <figure>
                  <figcaption className="mb-0.5 font-normal">
                    Perspektive einer Autofahrer:in
                  </figcaption>
                  <SceneImage
                    sceneId={scene.sceneIdCar}
                    alt="Illustration der bewerteten Szene aus Blickwinkel einer Autofahrer:in"
                    className="w-full rounded object-cover"
                  />
                </figure>
              ) : (
                <div className="rounded bg-gray-50" />
              )}
            </div>
          </div>

          <div className="order-2 flex h-96 flex-col lg:order-none">
            <div className="flex items-center">
              Durchschnittliche Bewertungen dieser Szene zur subjektiven
              Sicherheit.{' '}
              <Popover
                buttonText={
                  <>
                    <InformationCircleIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Mehr erfahren…</span>
                  </>
                }
              >
                Die Zahlen zur Bewertung der Radverkehrsführungsformen basieren
                aus einer umfassenden Online Umfrage. Die{' '}
                <Link
                  to="https://fixmyberlin.de/research/subjektive-sicherheit"
                  external
                  blank
                  classNameOverwrite="underline decoration-neutral-300 hover:decoration-white"
                >
                  Ergebnisse können in unserem Report nachgelesen werden
                </Link>
                . Die oberste große Zahl gibt den Prozentsatz aller Bewertungen
                „sicher“ und „eher sicher“ an. Die weiteren Zahlen und die
                farbigen Balken entsprechen den vier Bewertungsmöglichkeiten
                „sicher“ „eher sicher“, eher „unsicher“ und „unsicher“. Anzahl
                der Bewertungen gibt an wie viele Bewertungen zu dieser Szene in
                der Umfrage abgegeben wurden. Der Mittelwert gibt den
                Durchschnitt aller Bewertungen an zwischen 0 (unsicher) und 3
                (sicher).
              </Popover>
            </div>
            <ResultNumbers
              scene={scene}
              showTable
              setShowTable={null}
              wrapperClass="h-full"
            />
          </div>
        </div>
      </div>
    </>
  )
}
