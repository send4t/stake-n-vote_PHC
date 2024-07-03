"use client"

import { useState, useEffect } from "react"
import { useInkathon } from "@scio-labs/use-inkathon"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useApp } from "@/app/app-provider"
import StakingRewardCalculator from "./form-calc"
import useAccountBalances from "@/hooks/use-account-balance"
import { parseBN } from "@/util"
import { CHAIN_CONFIG } from "@/config/config"
import { NotConnected } from "../not-connected"

export function usePolkadotPrice() {
  const [price, setPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=polkadot&vs_currencies=usd')
        const data = await response.json()
        setPrice(data.polkadot.usd)
      } catch (err) {
        setError(new Error('An error occurred while fetching the Polkadot price'))
      } finally {
        setLoading(false)
      }
    }
    fetchPrice()
  }, [])

  return { price, loading, error }
}

export default function ModalCalc() {
  const { isCalcModalOpen, setIsCalcModalOpen } = useApp()
  const { data: accountBalance } = useAccountBalances()
  const { activeAccount, activeChain } = useInkathon()
  const { price, loading: priceLoading, error: priceError } = usePolkadotPrice()

  const {
    tokenSymbol,
    tokenDecimals,
  } = CHAIN_CONFIG[activeChain?.network || "Polkadot"] || {}

  const humanFreeBalance = accountBalance ? parseBN(accountBalance.freeBalance, tokenDecimals) : 0

  if (priceError) {
    return <div>Nem sikerült lekérni a Polkadot árát: {priceError.message}</div>
  }

  return (
    <Dialog open={isCalcModalOpen} onOpenChange={setIsCalcModalOpen}>
      <DialogContent className="sm:max-w-[600px] border-4 border-primary-500 bg-gradient-to-br from-primary-500/50 to-teal-500/50">
        <DialogHeader>
          {/* @ts-ignore */}
          <DialogTitle>Számold ki a Polkadot staking jutalmaidat</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-1 flex-col">
            {activeAccount ? (
              <div className="flex text-white flex-col gap-1">
                <span className="text-xs text-gray-300">
                  {humanFreeBalance.toFixed(2)} {tokenSymbol} elérhető
                  {price && ` - Polkadot ár: $${price.toFixed(2)}`}
                </span>
                <StakingRewardCalculator price={price} />
              </div>
            ) : (
              <NotConnected />
            )}
          </div>
        </div>
        <DialogFooter className="flex-row justify-center sm:justify-center text-center">
          <p className="my-2 text-center text-xs">
            Csatlakozz hozzánk és formáld velünk a Polkadot-ot! <br />
            <a
              className="underline"
              href="https://t.me/polkadothungary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram csatornánk
            </a>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
