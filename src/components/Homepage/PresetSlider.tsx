import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useState } from 'react';
import { buttonStyles, Link } from '../Link';
import { SceneImage } from '../Scenes';
import { PresetSlides } from './presetSlides.const';

type Props = { slides: PresetSlides };

export const PresetSlider: React.FC<Props> = ({ slides }) => {
  // https://www.embla-carousel.com/api/options/
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    draggable: true,
    align: 'start',
    skipSnaps: true,
    inViewThreshold: 0.95,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    // TODO: Make user we stopp scrolling earlier, once the lat element is in view. See 16a9ccb.
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, slides]);

  return (
    <div className="mb-3 flex flex-col justify-center gap-3 overflow-hidden rounded-md bg-stone-300 p-4">
      <div ref={emblaRef} className="overflow-hidden">
        <ul className="flex flex-row gap-4">
          {Object.entries(slides).map(([presetName, preset]) => {
            return (
              <li key={presetName} className="">
                <Link
                  button
                  to={preset.url}
                  classNameOverwrite="flex h-80 w-80 flex-col justify-between rounded-md bg-white p-3 shadow-lg group"
                >
                  <>
                    <h3 className="h-24 font-semibold group-hover:underline">
                      {preset.title}
                    </h3>
                    <div className="relative">
                      {preset.sceneIdForImage && (
                        <SceneImage
                          sceneId={preset.sceneIdForImage}
                          className="rounded object-cover object-bottom"
                        />
                      )}
                      <div
                        className={classNames(
                          buttonStyles,
                          'absolute bottom-3 right-3'
                        )}
                      >
                        {preset.results} Ergebnisse
                      </div>
                    </div>
                  </>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className={classNames(
            prevBtnEnabled
              ? 'text-stone-800 hover:text-yellow-600'
              : 'text-stone-400'
          )}
          disabled={!prevBtnEnabled}
          onClick={scrollPrev}
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </button>
        <button
          type="button"
          className={classNames(
            nextBtnEnabled
              ? 'text-stone-800 hover:text-yellow-600'
              : 'text-stone-400'
          )}
          disabled={!nextBtnEnabled}
          onClick={scrollNext}
        >
          <ChevronRightIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};