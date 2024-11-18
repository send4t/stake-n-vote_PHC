import { Suspense } from "react"

import { fetchLatestVideos } from "@/lib/fetch-latest-videos"
import { CallToAction } from "@/components/CallToAction"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { PrimaryFeatures } from "@/components/PrimaryFeatures"
import { SectionSpaceMonkeys } from "@/components/sections/section-space-monkeys"

const THE_KUS_PLAYLIST_ID = "PLtyd7v_I7PGlMekTepCvnf8WMKVR1nhLZ"

export default async function Home() {
  const data = await fetchLatestVideos(THE_KUS_PLAYLIST_ID)

  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
         <PrimaryFeatures /> important for main page
            <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none pt-10">
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl text-center mt">
              Fejlesztés alatt/Under construction
              </h2>
            </div>
          
        </Suspense>
        
        {/*<CallToAction />*/}
        {/* <SectionSpaceMonkeys /> */}
        {/* <Faqs /> */}
      </main>
      <Footer />
    </>
  )
}
