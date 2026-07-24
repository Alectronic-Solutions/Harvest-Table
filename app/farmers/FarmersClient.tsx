"use client"
// /app/farmers/page.tsx
// Showcases our farm partners: featured full-bleed alternating layouts,
// smaller partner cards, and a closing commitment statement.

import Image from "next/image"
import { asset } from '@/lib/basePath'
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FARMERS, type Farmer } from "@/data/farmers"

const featured = FARMERS.filter((f) => f.featured)
const additional = FARMERS.filter((f) => !f.featured)

function FeaturedFarmerCard({ farmer, index }: { farmer: Farmer; index: number }) {
  const imageLeft = index % 2 === 0
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-28 ${
        !imageLeft ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""
      }`}
    >
      {/* Image column */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <motion.div
          style={{ y: yParallax }}
          className="absolute inset-0 hidden md:block"
        >
          <motion.div
            initial={{ scale: 1.06 }}
            whileInView={{ scale: 1.0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={asset(farmer.image)}
              alt={`${farmer.name} of ${farmer.farm}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </motion.div>
        {/* Mobile: no parallax */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={asset(farmer.image)}
            alt={`${farmer.name} of ${farmer.farm}`}
            fill
            className="object-cover object-top"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Content column */}
      <div>
        <h2 className="font-display font-semibold text-forest text-4xl leading-tight">
          {farmer.farm}
        </h2>
        <p className="font-sans text-fog-dark text-base mt-1">{farmer.name}</p>

        <div className="mt-3 space-y-0.5">
          <p className="font-mono text-fog-dark text-xs uppercase tracking-widest">
            {farmer.distanceMiles} miles from our kitchen
          </p>
          <p className="font-mono text-fog-dark text-xs uppercase tracking-widest">
            Partners since {farmer.partnerSince}
          </p>
        </div>

        <p className="font-sans text-fog-dark text-base mt-6 leading-relaxed max-w-sm">
          {farmer.story}
        </p>

        <div className="mt-6">
          <p className="font-mono text-fog-dark text-xs uppercase tracking-wide">What they grow</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {farmer.grows.map((item) => (
              <span
                key={item}
                className="border border-fog/40 text-fog-dark font-sans text-xs px-3 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function AdditionalFarmerCard({ farmer }: { farmer: Farmer }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex gap-5 items-start border-b border-fog/15 pb-6"
    >
      <div className="relative flex-shrink-0 w-[120px] h-[120px] overflow-hidden">
        <Image
          src={asset(farmer.image)}
          alt={`${farmer.name} of ${farmer.farm}`}
          fill
          className="object-cover object-top"
          sizes="120px"
        />
      </div>
      <div className="min-w-0">
        <h3 className="font-display font-medium text-forest text-xl leading-tight">{farmer.farm}</h3>
        <p className="font-sans text-fog-dark text-sm mt-0.5">{farmer.name}</p>
        <p className="font-mono text-fog-dark text-xs mt-1">{farmer.distanceMiles} miles</p>
        <p className="font-sans text-fog-dark text-xs mt-2 line-clamp-1">
          {farmer.grows.join(", ")}
        </p>
      </div>
    </motion.div>
  )
}

export default function FarmersClient() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 400], [0, 130])

  return (
    <>
      {/* PART 1 - Hero */}
      <section className="relative h-[280px] md:h-[380px] overflow-hidden flex items-center justify-center">
        {/* Parallax image - desktop only */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 scale-110 hidden md:block"
        >
          <Image
            src={asset('/images/farm-field.webp')}
            alt="Rolling farmland at golden hour"
            fill
            priority
            className="object-cover object-[center_40%]"
            sizes="100vw"
          />
        </motion.div>
        {/* Mobile: static */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={asset('/images/farm-field.webp')}
            alt="Rolling farmland at golden hour"
            fill
            priority
            className="object-cover object-[center_40%]"
            sizes="100vw"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-forest/65" />
        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <h1 className="font-display font-semibold text-white text-5xl md:text-6xl leading-none">
            Our farm partners
          </h1>
          <p className="font-sans text-white/90 text-sm max-w-md mx-auto mt-4 leading-relaxed">
            We source from 12 farms within 60 miles of our kitchen. These are the five we work
            with most closely.
          </p>
        </div>
      </section>

      {/* PART 2 - Featured farmers */}
      <section className="bg-linen py-24">
        <div className="max-w-5xl mx-auto px-6">
          {/* Section label */}
          <div className="flex items-center gap-6 mb-16">
            <span className="font-mono text-fog-dark text-xs uppercase tracking-widest whitespace-nowrap">
              Core partners
            </span>
            <div className="flex-1 h-px bg-fog/20" />
          </div>

          {featured.map((farmer, i) => (
            <FeaturedFarmerCard key={farmer.id} farmer={farmer} index={i} />
          ))}
        </div>
      </section>

      {/* PART 3 - Additional partners */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Section label */}
          <div className="flex items-center gap-6 mb-12">
            <span className="font-mono text-fog-dark text-xs uppercase tracking-widest whitespace-nowrap">
              Also on the menu
            </span>
            <div className="flex-1 h-px bg-fog/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additional.map((farmer) => (
              <AdditionalFarmerCard key={farmer.id} farmer={farmer} />
            ))}
          </div>
        </div>
      </section>

      {/* PART 4 - Commitment statement */}
      <section className="bg-forest py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="px-6"
        >
          <h2 className="font-display font-light text-white text-4xl max-w-2xl mx-auto leading-relaxed">
            We visit every farm before we put it on the menu. No exceptions.
          </h2>
          <p className="font-sans text-fog-dark text-sm mt-4 max-w-lg mx-auto">
            If you want to know where a specific ingredient comes from, ask your server. They will
            know the answer.
          </p>
        </motion.div>
      </section>
    </>
  )
}
