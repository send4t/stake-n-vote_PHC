"use client"

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  SubstrateWallet,
  useInkathon,
} from "@scio-labs/use-inkathon"

import { ModalDelegate } from "@/components/delegate/modal-delegate"
import { ModalStake } from "@/components/stake/modal-stake"
import ModalCalc from "@/components/calculator/modal-calculator"  // Import the new calculator modal

// Define the context shape
interface AppContextType {
  isEffectTrue: boolean
  enableEffect: () => void // Changed from toggleEffect to enableEffect for clarity
  isStakingModalOpen: boolean
  setIsStakingModalOpen: (isOpen: boolean) => void
  isDelegateModalOpen: boolean
  setIsDelegateModalOpen: (isOpen: boolean) => void
  isCalcModalOpen: boolean
  setIsCalcModalOpen: (isOpen: boolean) => void
  activeExtension: SubstrateWallet | undefined
  setActiveExtension: (wallet: SubstrateWallet | undefined) => void
  connectDropdownOpen: boolean
  setConnectDropdownOpen: (isOpen: boolean) => void
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isEffectTrue, setIsEffectTrue] = useState(false)
  const [isStakingModalOpen, _setIsStakingModalOpen] = useState(false)
  const [isDelegateModalOpen, _setIsDelegateModalOpen] = useState(false)
  const [isCalcModalOpen, _setIsCalcModalOpen] = useState(false)  // Add state for calculator modal
  const [connectDropdownOpen, setConnectDropdownOpen] = useState(false)
  const [activeExtension, setActiveExtension] = useState<SubstrateWallet | undefined>(undefined)

  const { connect, accounts, activeAccount, activeExtension: _activeExtension, activeChain, setActiveAccount } = useInkathon()

  const setIsStakingModalOpen = (isOpen: boolean) => {
    _setIsDelegateModalOpen(false)
    _setIsStakingModalOpen(isOpen)
  }

  const setIsDelegateModalOpen = (isOpen: boolean) => {
    _setIsStakingModalOpen(false)
    _setIsDelegateModalOpen(isOpen)
  }

  const setIsCalcModalOpen = (isOpen: boolean) => {  // Add setter for calculator modal
    _setIsDelegateModalOpen(false)
    _setIsStakingModalOpen(false)
    _setIsCalcModalOpen(isOpen)
  }

  const enableEffect = () => setIsEffectTrue(true)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isEffectTrue) {
      timer = setTimeout(() => {
        setIsEffectTrue(false)
      }, 1000)
    }
    return () => clearTimeout(timer) // Cleanup to avoid memory leaks
  }, [isEffectTrue])

  return (
    <AppContext.Provider
      value={{
        isEffectTrue,
        enableEffect,
        isStakingModalOpen,
        setIsStakingModalOpen,
        isDelegateModalOpen,
        setIsDelegateModalOpen,
        isCalcModalOpen,  // Provide the state for calculator modal
        setIsCalcModalOpen,  // Provide the setter for calculator modal
        activeExtension,
        setActiveExtension,
        connectDropdownOpen,
        setConnectDropdownOpen,
      }}
    >
      {children}
      <ModalStake />
      <ModalDelegate />
      <ModalCalc />  
    </AppContext.Provider>
  )
}

// Custom hook to use the boolean context
export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider")
  }
  return context
}
