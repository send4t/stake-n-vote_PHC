"use client"

import { useState, ChangeEvent } from "react"
import { bnToBn, BN_ZERO } from "@polkadot/util"
import { useInkathon } from "@scio-labs/use-inkathon"

import {
  CHAIN_CONFIG,
  KUSAMA_DELEGATOR,
  POLKADOT_DELEGATOR,
} from "@/config/config"
import useAccountBalances from "@/hooks/use-account-balance"
import { findChangedItem, parseBN } from "@/util"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"

export default function StakingRewardCalculator({ price }: { price: number | null }) {
  const { data: accountBalance } = useAccountBalances()
  const { activeChain } = useInkathon()
  const APY = 0.15 // 15% APY this should be coming from chain API

  const chainDetails = CHAIN_CONFIG[activeChain?.network || "Polkadot"]
  const tokenDecimals = chainDetails?.tokenDecimals || 12 // Defaulting to 12 if not specified

  const [stakeAmount, setStakeAmount] = useState<number>(0)
  const [isCompounding, setIsCompounding] = useState<boolean>(false)

  const calculateReward = (periodInDays: number): number => {
    const principal = stakeAmount
    const rate = APY / 365 // daily rate
    const timesCompounded = isCompounding ? 6 * periodInDays : 1 // Compounded every 4 hours if enabled
    const period = periodInDays

    return isCompounding
      ? principal * Math.pow(1 + rate / timesCompounded, timesCompounded * period) - principal
      : principal * rate * period
  }

  const rewards = {
    daily: calculateReward(1),
    monthly: calculateReward(30),
    yearly: calculateReward(365),
  }

  const formatCurrency = (amount: number, currency: 'DOT' | 'USD'): string => {
    return currency === 'USD' && price
      ? `$${(amount * price).toFixed(2)}`
      : `${amount.toFixed(4)} DOT`
  }

  return (
    <div className="flex flex-col text-white gap-4">
      <Button
        color="danger"
        onClick={() => accountBalance && setStakeAmount(parseBN(accountBalance.freeBalance.toString(), tokenDecimals))}
      >
        Összes elérhető DOT stake-elése
      </Button>
      <div className="flex flex-col gap-2">
        <Label htmlFor="stake-amount" className="font-bold">
          Stake-be helyezett mennyiség (DOT)
        </Label>
        <Input
          id="stake-amount"
          placeholder="Írd be mennyit szeretnél stake-be helyezni"
          value={stakeAmount.toString()}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setStakeAmount(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={isCompounding}
          onCheckedChange={(val) => setIsCompounding(val)}
        />
        <Label htmlFor="auto-compounding" className="font-bold">
          Automatikus újra stake-elés (kamatos kamat 4 óránként újraszámolva)
        </Label>
      </div>

      <div className="flex flex-col gap-2 text-white">
        <div>Jutalmak 1 nap után: {formatCurrency(rewards.daily, 'DOT')} / {formatCurrency(rewards.daily, 'USD')}</div>
        <div>Jutalmak 1 hónap után: {formatCurrency(rewards.monthly, 'DOT')} / {formatCurrency(rewards.monthly, 'USD')}</div>
        <div>Jutalmak 1 év után: {formatCurrency(rewards.yearly, 'DOT')} / {formatCurrency(rewards.yearly, 'USD')}</div>
      </div>
    </div>
  )
}
