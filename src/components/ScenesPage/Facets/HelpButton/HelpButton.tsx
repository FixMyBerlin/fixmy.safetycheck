import { Dialog, Transition } from '@headlessui/react'
import { VideoCameraIcon } from '@heroicons/react/outline'
import { StaticImage } from 'gatsby-plugin-image'
import React, { Fragment, useState } from 'react'
import { buttonStyles, Link } from '~/components/Link'

export const HelpButton: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="inline-flex items-center underline decoration-brand-yellow decoration-2 hover:text-yellow-800 hover:decoration-yellow-500 focus:text-yellow-800 focus:outline-none"
      >
        <VideoCameraIcon className="mr-0.5 h-4 w-4" /> Hilfe
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900"
                      >
                        Wir zeigen dir die wichtigen Funktionen …
                      </Dialog.Title>
                      <div className="mt-2 sm:mt-10">
                        <Link
                          external
                          blank
                          to="https://www.twitter.com/fixmyberlin"
                          className={open ? 'block' : 'hidden'}
                        >
                          <StaticImage
                            src="./assets/video-preview.png"
                            className="w-full"
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 space-x-2 text-center sm:mt-10">
                    <Link
                      external
                      blank
                      to="https://www.twitter.com/fixmyberlin"
                      button
                    >
                      Video anschauen …
                    </Link>
                    <button
                      type="button"
                      className={buttonStyles}
                      onClick={() => setOpen(false)}
                    >
                      Schließen
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
