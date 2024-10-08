import Image from "next/image"
import logo from "@/images/logos/polkadotHU.png"

import { cn } from "@/lib/utils"

export function Loader({ className }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="Polkadot Hungary Logo"
      className={cn("animate-spin-slow inline-block w-12 w-12", className)}
    />
  )
}
