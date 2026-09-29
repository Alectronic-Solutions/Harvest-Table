"use client"

// One job: show every farm we buy from. Core partners get full alternating
// portrait features with their story and the dishes they supply; the rest
// are compact rows. Each farm has an anchor id so menu items can link here.

import Image from "next/image"
import Link from "next/link"
import { asset } from "@/lib/basePath"
import { useRef } from "react"
import { m, useScroll, useTransform } from "framer-motion"
import { FARMERS, FEATURED_FARMERS, PARTNER_FARMERS, type Farmer } from "@/data/farmers"
import { dishesFromFarm } from "@/data/menu"
import { useIsDesktop } from "@/lib/useIsDesktop"
import { ButtonLink } from "@/components/ui/Button"

function DishesFromFarm({ farmId }: { farmId: string }) {
  const dishes = dishesFromFarm(farmId)
  if (!dishes.length) return null
  return (
    <p className="mt-4 font-sans text-sm text-fog-dark">
      <span className="font-mono text-xs uppercase tracking-wide">On the menu: </span>
      {dishes.map((d, i) => (
        <span key={d.name}>
          <Link href={`/menu/#${d.sectionId}`} className="text-forest underline decoration-fog/40 underline-offset-4 hover:decoration-forest">
            {d.name}
          </Link>
          {i < dishes.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  )
}

function FeaturedFarmerCard({ farmer, index }: { farmer: Farmer; index: number }) {
  const imageLeft = index % 2 === 0
  const isDesktop = useIsDesktop()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const rawY = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"])
  const yParallax = useTransform(rawY, (v) => (isDesktop ? v : "0px"))

  return (
    <m.article
      ref={ref}
      id={farmer.id}
      aria-labelledby={`${farmer.id}-name`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16"
    >
      {/* Image column */}
      <div className={`relative aspect-[4/5] overflow-hidden md:aspect-[3/4] ${imageLeft ? "" : "md:order-2"}`}>
        <m.div style={{ y: yParallax }} className="absolute inset-[-20px]">
          <Image
            src={asset(farmer.image ?? "")}
            alt={`${farmer.name} of ${farmer.farm} in ${farmer.location}`}
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
          />
        </m.div>
      </div>

      {/* Content column */}
      <div className={imageLeft ? "" : "md:order-1"}>
        <h2 id={`${farmer.id}-name`} className="font-display text-4xl font-semibold leading-tight text-forest">
          {farmer.farm}
        </h2>
        <p className="mt-1 font-sans text-base text-fog-dark">{farmer.name}</p>

        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-fog-dark">
          {farmer.location} · {farmer.distanceMiles} miles from our kitchen · Since {farmer.partnerSince}
        </p>

        <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-fog-dark">
          {farmer.story}
        </p>

        <div className="mt-6">
          <h3 className="font-mono text-xs uppercase tracking-wide text-fog-dark">What they grow</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {farmer.grows.map((item) => (
              <li
                key={item}
                className="rounded-full border border-fog/40 px-3 py-1 font-sans text-xs text-fog-dark"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <DishesFromFarm farmId={farmer.id} />
      </div>
    </m.article>
  )
}

function PartnerRow({ farmer }: { farmer: Farmer }) {
  return (
    <li id={farmer.id} className="scroll-mt-28 border-b border-fog/15 py-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-2xl font-semibold leading-tight text-forest">{farmer.farm}</h3>
        <p className="font-mono text-xs uppercase tracking-wide text-fog-dark">
          {farmer.location} · {farmer.distanceMiles} mi
        </p>
      </div>
      <p className="mt-1 font-sans text-sm text-fog-dark">
        {farmer.name} · {farmer.grows.join(", ")}
      </p>
      <p className="mt-2 max-w-prose font-sans text-sm leading-relaxed text-fog-dark">{farmer.story}</p>
      <DishesFromFarm farmId={farmer.id} />
    </li>
  )
}

export default function FarmersClient() {
  const isDesktop = useIsDesktop()
  const { scrollY } = useScroll()
  const rawHeroY = useTransform(scrollY, [0, 400], [0, 130])
  const heroY = useTransform(rawHeroY, (v) => (isDesktop ? v : 0))
  const averageMiles = Math.round(FARMERS.reduce((sum, f) => sum + f.distanceMiles, 0) / FARMERS.length)

  return (
    <>
      {/* PART 1: Hero */}
      <section className="relative flex h-[300px] items-center justify-center overflow-hidden md:h-[400px]">
        <m.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <Image
            src={asset("/images/farm-field.webp")}
            alt="Rolling farmland at golden hour"
            fill
            priority
            className="object-cover object-[center_40%]"
            sizes="100vw"
          />
        </m.div>
        <div className="absolute inset-0 bg-forest/65" />
        <div className="relative z-10 px-6 text-center">
          <h1 className="font-display text-5xl font-semibold leading-none text-linen md:text-6xl">
            Our farm partners
          </h1>
          <p className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed text-linen/90 md:text-base">
            We buy from {FARMERS.length} farms, ranches, and makers, all within 60 miles
            of our kitchen. The average delivery travels {averageMiles} miles.
          </p>
        </div>
      </section>

      {/* PART 2: Core partners */}
      <section aria-label="Core partners" className="bg-linen px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex items-center gap-6 md:mb-16">
            <p className="font-mono text-xs uppercase tracking-widest text-fog-dark sm:whitespace-nowrap">
              The {FEATURED_FARMERS.length} farms we work with most closely
            </p>
            <div className="h-px flex-1 bg-fog/20" />
          </div>

          <div className="space-y-20 md:space-y-28">
            {FEATURED_FARMERS.map((farmer, i) => (
              <FeaturedFarmerCard key={farmer.id} farmer={farmer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PART 3: Additional partners */}
      <section aria-labelledby="partners-heading" className="bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 id="partners-heading" className="font-display text-4xl font-semibold text-forest">
            Also on the menu
          </h2>
          <p className="mt-3 max-w-xl font-sans text-base text-fog-dark">
            The ranchers, cheesemakers, beekeepers, and winemakers behind the rest of the plate.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-x-12 md:grid-cols-2">
            {PARTNER_FARMERS.map((farmer) => (
              <PartnerRow key={farmer.id} farmer={farmer} />
            ))}
          </ul>
        </div>
      </section>

      {/* PART 4: Commitment statement */}
      <section className="bg-forest px-6 py-20 text-center">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-light leading-snug text-linen">
            We visit every farm before we put it on the menu. No exceptions.
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm leading-relaxed text-linen/75">
            If you want to know where a specific ingredient comes from, ask your server. They will
            know the answer.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/menu" tone="dark">See the Menu</ButtonLink>
            <ButtonLink href="/contact/?inquiry=farm-partnership" variant="outline" tone="dark">
              Become a Farm Partner
            </ButtonLink>
          </div>
        </m.div>
      </section>
    </>
  )
}
