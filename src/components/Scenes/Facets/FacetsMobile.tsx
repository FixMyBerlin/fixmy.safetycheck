import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React, { Fragment, useState } from 'react';
import { Facets, FacetsProps } from './Facets';

export const FacetsMobile: React.FC<FacetsProps> = ({
  results,
  handleResetFilter,
  handleSingleChoice,
  handleMultiChoice,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button type="button" onClick={() => setOpen((prevState) => !prevState)}>
        Filter
      </button>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
            <div className="flex min-h-full items-start justify-center p-4 text-center">
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
                  <Dialog.Title
                    as="h3"
                    className="mb-6 flex flex-row items-center justify-between border-b pb-3 text-lg font-medium leading-6 text-gray-900"
                  >
                    <strong>Ergebnisse filtern </strong>
                    <button type="button" onClick={() => setOpen(false)}>
                      <XIcon className="h-8 w-8" />
                    </button>
                  </Dialog.Title>

                  <Facets
                    results={results}
                    handleResetFilter={handleResetFilter}
                    handleSingleChoice={handleSingleChoice}
                    handleMultiChoice={handleMultiChoice}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};