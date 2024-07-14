"use client"

import { Fragment, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import logo from "@/images/logos/polkadotHU.png"
import { Dialog, Popover, Transition } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

import { ConnectButton } from "./ConnectButton"

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          "origin-center transition",
          open && "scale-90 opacity-0"
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          "origin-center transition",
          !open && "scale-90 opacity-0"
        )}
      />
    </svg>
  )
}


export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigation = [
    { name: "Stake", href: "?feature=stake#features" },
    { name: "Delegate", href: "?feature=delegate#features" },
  ]

  return (
    <header className="fixed top-0 z-50 w-full bg-white/95">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 px-6 lg:px-8"
        aria-label="Global"
      >
        <a href="/" className="-m-1.5 p-1.5 hover:animate-spin_right">
          <span className="sr-only">The Kus</span>
          <Image
            src={logo}
            alt="the kus"
            className="inline-block w-auto h-12"
          />
        </a>
        <div className="flex items-center justify-end gap-x-4">
          <a
            href="https://polkadothungary.net"
            className="text-base font-semibold leading-7 text-gray-900 hover:underline"
          >
            vissza a blogra
          </a>
          <ConnectButton />
          
        </div>
      </nav>
      <div className="h-[1px] w-full bg-gradient-to-r from-primary-500/30 to-teal-500/30"></div>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                src={logo}
                alt="the kus"
                className="h-8 w-auto"
              />
            </a>
            <div className="flex flex-1 justify-end">
              <a
                href="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="mt-5 text-center">
            <a
              href="https://polkadothungary.net"
              className="text-base font-semibold leading-7 text-gray-900 hover:underline"
            >
              vissza a blogra
            </a>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
