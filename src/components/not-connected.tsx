import { ConnectButton } from "./ConnectButton"

export function NotConnected() {
  return (
    <>
      <p className="text-lg">⚡️ Nincs tárcád csatlakoztatva</p>
      <p>
        Kérlek kattints a Tárca csatlakoztatására a jobb felső sarokban, vagy
        telepítsd a tárcád, ha még nincs.
      </p>
    </>
  )
}
