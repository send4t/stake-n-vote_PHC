import { ApiPromise } from "@polkadot/api"
import { Signer } from "@polkadot/api/types"
import { InjectedAccount } from "@polkadot/extension-inject/types"
import { SubstrateChain } from "@scio-labs/use-inkathon"

import { Button } from "@/components/ui/button"
import { nominateTx } from "@/app/txs/txs"

export function AddKusToSet({
  nominators,
  validator,
  api,
  signer,
  activeAccount,
  activeChain,
  tokenSymbol,
}: {
  nominators: string[]
  validator: string
  api: ApiPromise | undefined
  signer: Signer | undefined
  activeAccount: InjectedAccount | null
  activeChain: SubstrateChain | undefined
  tokenSymbol: string
}) {
  return (
    <>
      <p>Remek! Már stake-eled a {tokenSymbol} token-ed</p>
      <p>Szeretnéd hozzáadni a nominator készletedhez?</p>
      <Button
        onClick={async () => {
          const tx = await nominateTx(
            api,
            signer,
            activeChain,
            activeAccount?.address,
            nominators.concat(validator)
          )
        }}
        className="mt-4"
      >
        Hozzáadom a Polkadot Hungary-t a nominator készletemhez.
      </Button>
    </>
  )
}
