"use client"

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

import { NotConnected } from "../not-connected"
import FormDelegate from "./form-delegate"

export function ModalDelegate() {
  const { isDelegateModalOpen, setIsDelegateModalOpen } = useApp()
  const { activeChain, activeAccount } = useInkathon()

  return (
    <Dialog open={isDelegateModalOpen} onOpenChange={setIsDelegateModalOpen}>
      <DialogContent className="sm:max-w-[600px] border-4 border-primary-500 bg-gradient-to-br from-primary-500/50 to-teal-500/50">
        <DialogHeader>
          {/* @ts-ignore */}
          <DialogTitle>Delegálj {activeChain?.tokenSymbol} szavazati erőt a Polkadot Hungary-nek </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-1 flex-col">
            {!activeAccount ? <NotConnected /> : <FormDelegate />}
          </div>
        </div>
        <DialogFooter className="flex-row justify-center sm:justify-center text-center">
        <p className="my-2 text-center text-xs">
                    A Polkadot Hungary csapata aktívan részt vesz a Polkadot formálásában <br />
                    <a
                      className="underline"
                      href="https://t.me/polkadothungary"
                      target="_blank"
                    >
                      Csatlakozz a Telegram csatornánkhoz
                    </a>{" "}
                    delegálás után!
                  </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
