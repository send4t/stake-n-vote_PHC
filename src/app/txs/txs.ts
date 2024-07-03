import { ApiPromise } from "@polkadot/api"
import { Signer } from "@polkadot/types/types/extrinsic"
import { BN } from "@polkadot/util"
import { SubstrateChain } from "@scio-labs/use-inkathon"
import { ToastType } from "react-hot-toast"
import { toast } from "sonner"

import { DEFAULT_TOAST, sendAndFinalize } from "./send-and-finalize"

export async function sendDelegateTx(
  api: ApiPromise | undefined,
  signer: any,
  activeChain: SubstrateChain | undefined,
  address: string | undefined,
  tracks: string[] = ["0"],
  target: string,
  conviction: number,
  value: BN
) {
  if (tracks.length === 0 || !api || !signer || !address) {
    return
  }

  const txs = Array.from(tracks).map((track) =>
    api?.tx.convictionVoting.delegate(track, target, conviction, value)
  )

  const tx = api?.tx.utility.batchAll(txs)

  const res = await sendAndFinalize({
    api,

    tx,
    signer,
    address,
    activeChain,
    toastConfig: {
      ...DEFAULT_TOAST,
      title: "Szavazat delegálása",
      messages: {
        ...DEFAULT_TOAST.messages,
        success: "Delegáció sikeres",
      },
    },
  })

  return res
}

export async function nominateTx(
  api: ApiPromise | undefined,
  signer: any,
  activeChain: SubstrateChain | undefined,
  address: string | undefined,
  targets: string[]
) {
  const tx = api?.tx.staking.nominate(targets)
  const res = await sendAndFinalize({
    api,
    tx,
    signer,
    activeChain,
    address,
    toastConfig: {
      ...DEFAULT_TOAST,
      messages: {
        ...DEFAULT_TOAST.messages,
        success: "Sikeres nominálás",
      },
    },
  })
  return res
}

export async function bondAndNominateTx(
  api: ApiPromise | undefined,
  signer: any,
  activeChain: SubstrateChain | undefined,
  address: string | undefined,
  targets: string[],
  amount: BN
) {
  const tx = api?.tx.utility.batch([
    api?.tx.staking.bond(amount, "Staked"),
    api?.tx.staking.nominate(targets),
  ])

  const res = await sendAndFinalize({
    api,
    tx,
    signer,
    address,
    activeChain,
    toastConfig: {
      ...DEFAULT_TOAST,
      // @ts-ignore
      title: `Staking ${activeChain?.tokenSymbol}`,
      messages: {
        ...DEFAULT_TOAST.messages,
        success: "Stake-elés sikeres",
      },
    },
  })
  return res
}

export async function joinPool(
  api: ApiPromise | undefined,
  signer: any,
  activeChain: SubstrateChain | undefined,
  address: string | undefined,
  amount: BN,
  poolId: number
) {
  const tx = api?.tx.nominationPools.join(amount.toString(), poolId)
  const res = await sendAndFinalize({ api, tx, signer, address, activeChain })
  return res
}
