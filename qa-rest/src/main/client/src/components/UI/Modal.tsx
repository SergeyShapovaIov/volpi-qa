import React, {FC} from 'react';
import {Dialog} from '@headlessui/react';
import {XMarkIcon} from "@heroicons/react/24/outline";

interface ModalProps {
    children: React.ReactNode
    isOpen: boolean
    setIsOpen: (visible: boolean) => void
}

export const Modal: FC<ModalProps> = ({children, isOpen, setIsOpen}) => {

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-[1001] absolute"
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>
            <div className="fixed bottom-0 right-0 flex items-center justify-center p-4">
                <Dialog.Panel className="rounded-lg relative">
                    <button
                        className={"absolute text-white top-4 right-4 z-10 hover:text-neutral-300"}
                        onClick={() => setIsOpen(false)}
                    >
                        <XMarkIcon className={"w-6 h-6"}/>
                    </button>
                    {children}
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
