"use client"

import { useInkathon } from "@scio-labs/use-inkathon"
import Stake from "@w3f/polkadot-icons/keyline/Stake"
import Delegate from "@w3f/polkadot-icons/keyline/Vote"
import ProofOfStake from "@w3f/polkadot-icons/keyline/ProofOfStake"

import { Container } from "@/components/Container"
import { useApp } from "@/app/app-provider"

import { ChainSwitch } from "./ChainSwitch"
import { Button } from "./ui/button"

export function PrimaryFeatures() {
  const { activeChain, activeAccount } = useInkathon()
  const {
    setIsStakingModalOpen,
    setIsDelegateModalOpen,
    setIsCalcModalOpen,  // Import the setter for calculator modal
    setConnectDropdownOpen,
  } = useApp()

  return (
    <section
      id="stake-and-delegate"
      aria-label="Staking and Delegating"
      className="relative overflow-hidden bg-gradient-to-br from-primary-500 to-teal-500 md:pb-10 pt-20 sm:py-32"
    >
      <Container className="b relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none pt-10">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl text-center mt">
            DOT tokened delegáld a Polkadot Hungary-nek!
          </h2>
        </div>
        <ChainSwitch
          className="mt-12"
          buttonClasses="h-20 w-20 rounded-full border-2 p-2 transition-all hover:rotate-6 hover:scale-105 hover:outline-2 sm:h-20 sm:w-20 md:h-32 md:w-32 md:p-3"
        />
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
         
          <div className="group">
            <Button
              className="h-auto w-full p-4 flex flex-col"
              onClick={() => {
                if (activeAccount) {
                  setIsDelegateModalOpen(true)
                } else {
                  setConnectDropdownOpen(true)
                }
              }}
            >
              <div className="flex items-center justify-center">
                <Delegate
                  stroke="#fff"
                  className="mr-2 inline-block"
                  width={25}
                />{" "}
                {/* @ts-ignore */}
                Delegálj {activeChain?.tokenSymbol} szavazatot
              </div>
            </Button>
          </div>
          <div className="group">
            <Button
              className="h-auto w-full p-4 flex flex-col"
              onClick={() => setIsCalcModalOpen(true)}  // Always open the calculator modal
            >
              <div className="flex items-center justify-center">
              <ProofOfStake
                  stroke="#fff"
                  className="mr-2 inline-block"
                  width={25}
                />{" "}
                {/* @ts-ignore */}
                Számold ki a staking jutalmaidat
              </div>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
