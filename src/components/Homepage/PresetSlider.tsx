import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'
import { getColorByValue } from '../charts'
import { buttonStyles, Link } from '../Link'
import { SceneImage } from '../ScenesPage'
import { PresetsScenes } from '../ScenesPage/constants'
import { formatPercent } from '../utils'
import { FilterUrlProp } from './Presets'

export type Props = {
  filterUrl: FilterUrlProp
  slides: PresetsScenes
  className?: string
}

// TODO: This need to be able to switch from scenesPrimary to scenesSeconary
export const PresetSlider: React.FC<Props> = ({
  filterUrl,
  slides,
  className,
}) => {
  // https://www.embla-carousel.com/api/options/
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    draggable: true,
    align: 'start',
    skipSnaps: true,
    inViewThreshold: 0.95,
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    // TODO: Make user we stopp scrolling earlier, once the lat element is in view. See 16a9ccb.
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (emblaApi) emblaApi.reInit()
  }, [emblaApi, slides])

  const slideEntries = Object.entries(slides)

  return (
    <div
      className={classNames(
        className,
        'relative mb-3 flex flex-col justify-center bg-stone-200 px-10 py-6'
      )}
    >
      <div ref={emblaRef} className="relative overflow-hidden">
        <ul className="flex flex-row gap-5">
          {slideEntries.map(([presetName, preset]) => {
            const url = `${filterUrl}${preset.searchFilterString}`

            return (
              <li key={presetName} className="">
                <Link
                  button
                  to={url}
                  classNameOverwrite="flex relative h-82 w-80 flex-col justify-between rounded-md bg-white shadow-lg group"
                >
                  <h3 className="my-3 ml-3 flex h-20 flex-none font-semi text-2xl leading-7 hover:text-yellow-800 group-hover:underline group-hover:decoration-brand-yellow">
                    {preset.title}
                  </h3>

                  <div className="relative flex-auto">
                    {preset.sceneIdForImage && (
                      <SceneImage
                        sceneId={preset.sceneIdForImage}
                        className="h-[14rem] w-full overflow-hidden rounded-b-md object-cover object-bottom"
                      />
                    )}
                    <div
                      className={classNames(
                        buttonStyles,
                        'absolute -top-4 right-3 flex flex-col text-center'
                      )}
                      style={{
                        backgroundColor: getColorByValue(preset.averageScore),
                      }}
                    >
                      {Number(preset.resultTotal).toLocaleString()} Ergebnisse
                      <div>
                        {formatPercent(preset.averageScore, { precision: 0 })}{' '}
                        <span className="text-thin inline">Ø Score</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <button
        type="button"
        className={classNames(
          'top-[calc(50%_-_10px] absolute -left-5 flex items-center justify-center rounded-full p-1',
          prevBtnEnabled
            ? 'bg-stone-600 text-stone-100 hover:bg-brand-yellow hover:text-gray-800'
            : 'bg-stone-600 text-stone-500'
        )}
        disabled={!prevBtnEnabled}
        onClick={scrollPrev}
      >
        <ChevronLeftIcon className="h-8 w-8" />
      </button>
      <button
        type="button"
        className={classNames(
          'top-[calc(50%_-_10px] absolute -right-5 flex items-center justify-center rounded-full p-1',
          nextBtnEnabled
            ? 'bg-stone-600 text-stone-100 hover:bg-brand-yellow hover:text-gray-800'
            : 'bg-stone-600 text-stone-500'
        )}
        disabled={!nextBtnEnabled}
        onClick={scrollNext}
      >
        <ChevronRightIcon className="h-8 w-8" />
      </button>
    </div>
  )
}
