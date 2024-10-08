"use client"

import { format } from "url"
import { humanReadableBalance } from "@/util"
import type { DeriveBalancesAll } from "@polkadot/api-derive/types"
import type {
  AccountId,
  AccountIndex,
  Address,
} from "@polkadot/types/interfaces"
import { useInkathon } from "@scio-labs/use-inkathon"

import { cn } from "@/lib/utils"
import { useCall } from "@/hooks/use-call"

interface Props {
  children?: React.ReactNode
  className?: string
  label?: React.ReactNode
  params?: AccountId | AccountIndex | Address | string | Uint8Array | null
}

export function AvailableBalance({
  children,
  className,
  label,
  params,
}: Props) {
  const { api, activeChain } = useInkathon()
  const allBalances = useCall<DeriveBalancesAll>(api?.derive?.balances?.all, [
    params,
  ])

  const formattedBalance = humanReadableBalance(
    allBalances?.freeBalance,
    // @ts-ignore
    activeChain?.tokenDecimals,
    // @ts-ignore
    activeChain?.tokenSymbol
  )

  return (
    <span className={cn("text-xs", className)}>
      {allBalances
        ? `${formattedBalance} token elérhető`
        : "Elérhető mennyiség betöltése ..."}
    </span>
  )
}
