import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
import { cn } from "./lib/utils"
import { ArrowRight, Phone, Mail, MapPin, ChevronDown, Menu, X, Star, Check } from "lucide-react"

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

const SERVICES = [
  { icon: "💎", title: "Body Piercing", desc: "Safe, precise piercings by a trained professional using only implant-grade jewelry. Every body welcome.", tag: "Book Now" },
  { icon: "✨", title: "Lash Services", desc: "From classic to volume, our lash artists craft sets that frame your eyes and fit your lifestyle perfectly.", tag: "Book Now" },
  { icon: "🌿", title: "Threading & Brow Shaping", desc: "Defined, clean brows using the ancient art of threading — gentle on skin, lasting in results.", tag: "Book Now" },
  { icon: "✂️", title: "Licensed Hairstyling", desc: "Cuts, colour, and styling by licensed professionals who listen first and transform second.", tag: "Book Now" },
  { icon: "💍", title: "Fine Jewelry", desc: "A thoughtfully curated selection of premium gold and gemstone pieces for every occasion and piercing.", tag: "Shop Now" },
  { icon: "♻️", title: "Refillery", desc: "Zero-waste home and body care — Canadian-made, plastic-free, and refillable right in our studio.", tag: "Refill Now" },
]

const GALLERY = [
  { img: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?ixlib=rb-4.1.0&w=800&q=85&fit=crop&auto=format", caption: "Clean, welcoming studio environment" },
  { img: "https://images.unsplash.com/photo-1633681926035-ec1ac984418a?ixlib=rb-4.1.0&w=800&q=85&fit=crop&auto=format", caption: "Premium fine jewelry curations" },
  { img: "https://images.unsplash.com/photo-1706629503650-cade709d15e3?ixlib=rb-4.1.0&w=800&q=85&fit=crop&auto=format", caption: "All-natural home and body products" },
  { img: "https://images.unsplash.com/photo-1633681926019-03bd9325ec20?ixlib=rb-4.1.0&w=800&q=85&fit=crop&auto=format", caption: "Professional body piercing studio" },
  { img: "https://images.unsplash.com/photo-1706629506571-a6d86798916b?ixlib=rb-4.1.0&w=800&q=85&fit=crop&auto=format", caption: "Licensed hairstyling services" },
]

const REFILLERY_CATS = [
  { title: "Shampoo Bars", emoji: "🧴" },
  { title: "Conditioning Bars", emoji: "💧" },
  { title: "Soap Bars", emoji: "🫧" },
  { title: "Skin Care", emoji: "🌸" },
  { title: "Reusable Containers", emoji: "♻️" },
]

const VALUES = [
  { icon: "🌈", title: "A Space for Everyone", body: "No matter your race, gender, identity, orientation, body, age, or background — you are welcome here, exactly as you are. Kindness and dignity are non-negotiable in our studio." },
  { icon: "🌱", title: "Zero-Waste by Design", body: "We choose Canadian brands committed to plastic-free packaging, natural formulas, and sustainable sourcing. Every refill is a step toward a lighter footprint." },
  { icon: "🪶", title: "Land Acknowledgement", body: "We respectfully acknowledge we operate on Treaty 6 and Treaty 8 territory and honour the First Nations, Metis, and Inuit peoples of Turtle Island who have cared for these lands since time immemorial." },
]

const TESTIMONIALS = [
  { name: "Margot L.", quote: "I drove over an hour to get my piercing done here and it was absolutely worth it. The space is spotless, the team is kind, and the jewelry selection is gorgeous.", rating: 5 },
  { name: "Priya S.", quote: "My lashes have never looked this good. The attention to detail is incredible and I felt completely at ease the whole time. Will not go anywhere else!", rating: 5 },
  { name: "Danielle R.", quote: "I love that I can get my hair done AND refill my shampoo in the same visit. It feels good to support a business that actually cares about people and the planet.", rating: 5 },
  { name: "Cass T.", quote: "The threading here is painless compared to everywhere else I have tried. My brows look amazing and it took less than 15 minutes. Total game-changer.", rating: 5 },
]

const SHOP_LINKS = ["Shop All", "Conditioning Bars", "Containers", "Shampoo Bars", "Skin Care", "Soap Bars"]
const SERVICE_LINKS = ["Lashes", "Piercing", "Threading", "Refillery"]

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [formSent, setFormSent] = useState(false)

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -120])

  useEffect(() => {
    const unsub = scrollY.onChange((v) => setScrolled(v > 40))
    return unsub
  }, [scrollY])

  function handleSubmit(e) {
    e.preventDefault()
    setFormSent(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setFormSent(false), 4000)
  }

  return (
    <div className="bg-[#faf7f4] text-[#2c2c2c] font-sans overflow-x-hidden">
      {/* Announcement Bar */}
      <div className="bg-[#a07850] text-[#faf7f4] text-center text-xs sm:text-sm py-2 px-4 font-medium tracking-wide z-50 relative">
        Now open at our new location — 312 Birchwood Ave, Westgrove, AB &nbsp;|&nbsp; New hours in effect!
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-8 left-0 right-0 z-50 w-full transition-all duration-300",
          scrolled ? "backdrop-blur-xl bg-white/80 border-b border-black/10 shadow-sm" : "bg-[#2c2c2c]"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className={cn("text-xl font-bold tracking-tight transition-colors", scrolled ? "text-[#2c2c2c]" : "text-[#faf7f4]")}>
            <span className="text-[#a07850]">Ember</span> &amp; Elm
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Home", href: "#" },
            ].map((l) => (
              <a key={l.label} href={l.href} className={cn("text-sm font-medium hover:text-[#a07850] transition-colors", scrolled ? "text-[#2c2c2c]" : "text-[#faf7f4]")}>
                {l.label}
              </a>
            ))}

            {/* Shop Dropdown */}
            <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
              <button className={cn("flex items-center gap-1 text-sm font-medium hover:text-[#a07850] transition-colors", scrolled ? "text-[#2c2c2c]" : "text-[#faf7f4]")}>
                Shop <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {shopOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#e8e0d8] py-2 z-50"
                  >
                    {SHOP_LINKS.map((l) => (
                      <a key={l} href="#" className="block px-4 py-2 text-sm text-[#2c2c2c] hover:bg-[#faf7f4] hover:text-[#a07850] transition-colors">{l}</a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#refillery" className={cn("text-sm font-medium hover:text-[#a07850] transition-colors", scrolled ? "text-[#2c2c2c]" : "text-[#faf7f4]")}>Refillery</a>

            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button className={cn("flex items-center gap-1 text-sm font-medium hover:text-[#a07850] transition-colors", scrolled ? "text-[#2c2c2c]" : "text-[#faf7f4]")}>
                Services <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-[#e8e0d8] py-2 z-50"
                  >
                    {SERVICE_LINKS.map((l) => (
                      <a key={l} href="#services" className="block px-4 py-2 text-sm text-[#2c2c2c] hover:bg-[#faf7f4] hover:text-[#a07850] transition-colors">{l}</a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#a07850] text-[#faf7f4] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#8a6640] transition-colors"
            >
              Book Now
            </motion.a>
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={cn("md:hidden transition-colors", scrolled ? "text-[#2c2c2c]" : "text-[#faf7f4]")}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#2c2c2c] z-40 flex flex-col pt-28 px-8 gap-6"
          >
            {["Home", "Shop", "Refillery", "Services", "Contact"].map((l, i) => (
              <motion.a
                key={l}
                href={l === "Contact" ? "#contact" : l === "Refillery" ? "#refillery" : l === "Services" ? "#services" : "#"}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="text-[#faf7f4] text-3xl font-bold hover:text-[#a07850] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {l}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 bg-[#a07850] text-[#faf7f4] px-8 py-4 rounded-full text-lg font-semibold w-fit"
              onClick={() => setMenuOpen(false)}
            >
              Book Your Appointment
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 scale-110"
        >
          <img
            src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?ixlib=rb-4.1.0&w=1600&q=85&fit=crop&auto=format"
            alt="Ember and Elm studio interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2c2c2c]/80 via-[#2c2c2c]/50 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="text-[#a07850] text-sm font-semibold uppercase tracking-[0.2em] mb-4">Westgrove, Alberta</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#faf7f4] leading-tight mb-6" style={{ fontFamily: "Georgia, serif" }}>
              Beauty, Body &amp;<br />
              <span className="italic text-[#a07850]">Beyond</span> — All<br />
              Under One Roof
            </h1>
            <p className="text-[#f5f0eb]/80 text-lg mb-8 leading-relaxed max-w-lg">
              Your full-service beauty destination in Westgrove — piercings, lashes, threading, hairstyling, fine jewelry, and zero-waste refillery products.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#a07850] text-[#faf7f4] px-7 py-3.5 rounded-full font-semibold flex items-center gap-2 hover:bg-[#8a6640] transition-colors"
              >
                Book Your Appointment <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="border border-[#faf7f4]/60 text-[#faf7f4] px-7 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Explore Services
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Social Proof Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 bg-[#2c2c2c]/80 backdrop-blur-sm border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-8 sm:gap-12">
            {[["1,200+", "Happy Clients"], ["4.9★", "Average Rating"], ["6", "Expert Specialists"], ["100%", "Canadian Products"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-[#a07850] font-bold text-lg">{num}</div>
                <div className="text-[#faf7f4]/60 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section className="py-24 bg-[#f5f0eb]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1633681926035-ec1ac984418a?ixlib=rb-4.1.0&w=800&q=85&fit=crop&auto=format"
                alt="Inside Ember and Elm studio"
                className="rounded-2xl w-full aspect-[4/3] object-cover shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#a07850] text-[#faf7f4] rounded-2xl px-6 py-4 shadow-lg">
                <div className="text-2xl font-bold">Est. 2021</div>
                <div className="text-sm opacity-80">Westgrove, AB</div>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div>
              <p className="text-[#a07850] text-sm font-semibold uppercase tracking-[0.2em] mb-3">About Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: "Georgia, serif" }}>
                Where Skill Meets<br />
                <span className="italic text-[#a07850]">Intention</span>
              </h2>
              <p className="text-[#2c2c2c]/70 leading-relaxed mb-4">
                Ember and Elm Body Studio was born from a simple belief: that great beauty services and conscious living should coexist in the same space. Our studio brings together a team of passionate specialists — piercers, lash artists, stylists, and estheticians — each dedicated to making you feel genuinely seen and expertly cared for.
              </p>
              <p className="text-[#2c2c2c]/70 leading-relaxed mb-8">
                We pair our services with a fully stocked zero-waste refillery, carrying only Canadian-made, plastic-free products. Everything under one roof, everything done with care.
              </p>
              <div className="flex flex-wrap gap-4">
                {["Inclusive Environment", "Canadian Products", "Expert Specialists"].map((tag) => (
                  <div key={tag} className="flex items-center gap-2 bg-[#faf7f4] border border-[#e8e0d8] px-4 py-2 rounded-full text-sm">
                    <Check size={14} className="text-[#a07850]" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-[#faf7f4]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-[#a07850] text-sm font-semibold uppercase tracking-[0.2em] mb-3">What We Offer</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
                Professional Services,<br /><span className="italic text-[#a07850]">Dedicated Spaces</span>
              </h2>
              <p className="text-[#2c2c2c]/60 max-w-lg mx-auto">Every service has its own thoughtfully designed space, so you always feel like the only priority.</p>
            </div>
          </FadeUp>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SERVICES.map((svc) => (
              <motion.div
                key={svc.title}
                variants={item}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-[#faf7f4] border border-[#e8e0d8] rounded-2xl p-7 cursor-pointer group"
              >
                <div className="text-4xl mb-4">{svc.icon}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#a07850] transition-colors">{svc.title}</h3>
                <p className="text-[#2c2c2c]/60 text-sm leading-relaxed mb-5">{svc.desc}</p>
                <a href="#contact" className="inline-flex items-center gap-1 text-[#a07850] text-sm font-semibold hover:gap-2 transition-all">
                  {svc.tag} <ArrowRight size={14} />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-[#f5f0eb]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="text-[#a07850] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Inside the Studio</p>
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
                A Space You Will<br /><span className="italic text-[#a07850]">Love to Visit</span>
              </h2>
            </div>
          </FadeUp>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {GALLERY.map((g, i) => (
              <motion.div
                key={g.caption}
                variants={item}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn("relative overflow-hidden rounded-2xl group cursor-pointer", i === 0 ? "md:col-span-2 row-span-1" : "")}
              >
                <img
                  src={g.img}
                  alt={g.caption}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2c2c]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <p className="text-[#faf7f4] font-medium text-sm">{g.caption}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Refillery Spotlight */}
      <section id="refillery" className="py-24 bg-[#2c2c2c]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <FadeUp>
              <img
                src="https://images.unsplash.com/photo-1706629503650-cade709d15e3?ixlib=rb-4.1.0&w=800&q=85&fit=crop&auto=format"
                alt="Zero-waste refillery products"
                className="rounded-2xl w-full aspect-[4/3] object-cover shadow-2xl"
              />
            </FadeUp>
            <FadeUp delay={0.15}>
              <div>
                <p className="text-[#a07850] text-sm font-semibold uppercase tracking-[0.2em] mb-3">The Refillery</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#faf7f4] mb-6" style={{ fontFamily: "Georgia, serif" }}>
                  Zero-Waste, Natural,<br /><span className="italic text-[#a07850]">Canadian-Made</span>
                </h2>
                <p className="text-[#faf7f4]/60 leading-relaxed mb-4">
                  Our refillery is more than a product shop — it is a commitment. We carry a thoughtfully curated range of home and body care essentials from Canadian makers who share our values: no single-use plastic, honest ingredients, and genuine performance.
                </p>
                <p className="text-[#faf7f4]/60 leading-relaxed mb-8">
                  Bring your own containers or pick one up in-store. Fill exactly what you need, pay only for what you take, and leave without the guilt. Simple, honest, and better for everyone.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["All Canadian Brands", "No Single-Use Plastic", "Pay by Weight", "Mail-In Available"].map((f) => (
                    <div key={f} className="flex items-center gap-2 border border-[#a07850]/40 text-[#faf7f4]/80 px-4 py-2 rounded-full text-sm">
                      <Check size={13} className="text-[#a07850]" />
                      {f}
                    </div>
                  ))}
                </div>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-[#a07850] text-[#faf7f4] px-7 py-3.5 rounded-full font-semibold hover:bg-[#8a6640] transition-colors"
                >
                  Start Refilling <ArrowRight size={16} />
                </motion.a>
              </div>
            </FadeUp>
          </div>

          {/* Product Category Cards */}
          <FadeUp>
            <h3 className="text-[#faf7f4]/60 text-sm font-semibold uppercase tracking-[0.2em] text-center mb-8">Browse Product Categories</h3>
          </FadeUp>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {REFILLERY_CATS.map((cat) => (
              <motion.a
                key={cat.title}
                href="#"
                variants={item}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-[#faf7f4]/5 border border-[#faf7f4]/10 rounded-2xl p-6 text-center hover:bg-[#a07850]/20 hover:border-[#a07850]/40 transition-colors group"
              >
                <div className="text-3xl mb-3">{cat.emoji}</div>
                <div className="text-[#faf7f4] text-sm font-medium group-hover:text-[#a07850] transition-colors">{cat.title}</div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#faf7f4]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-[#a07850] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Our Commitments</p>
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
                What We Stand For,<br /><span className="italic text-[#a07850]">Every Single Day</span>
              </h2>
            </div>
          </FadeUp>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {VALUES.map((v) => (
              <motion.div
                key={v.title}
                variants={item}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-[#f5f0eb] border border-[#e8e0d8] rounded-2xl p-8"
              >
                <div className="text-4xl mb-5">{v.icon}</div>
                <h3 className="text-lg font-bold mb-3">{v.title}</h3>
                <p className="text-[#2c2c2c]/60 text-sm leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#f5f0eb]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-[#a07850] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Client Love</p>
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
                Hear It From the<br /><span className="italic text-[#a07850]">People Who Matter</span>
              </h2>
            </div>
          </FadeUp>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={item}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-[#faf7f4] border border-[#e8e0d8] rounded-2xl p-7"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-[#a07850] text-[#a07850]" />
                  ))}
                </div>
                <p className="text-[#2c2c2c]/70 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/150?img=${i + 10}`}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-[#2c2c2c]/40 text-xs">Verified Client</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking CTA Banner */}
      <section className="py-20 bg-[#a07850]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#faf7f4] mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Ready to Book Your Experience?
            </h2>
            <p className="text-[#faf7f4]/80 mb-8 text-lg">Limited appointment slots available this week. Secure yours today.</p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-[#faf7f4] text-[#a07850] px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors"
            >
              Book an Appointment <ArrowRight size={18} />
            </motion.a>
          </FadeUp>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-[#faf7f4]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <FadeUp>
            <div>
              <p className="text-[#a07850] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Get in Touch</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ fontFamily: "Georgia, serif" }}>
                We Would Love<br /><span className="italic text-[#a07850]">to Hear from You</span>
              </h2>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#a07850]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-[#a07850]" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">Phone</div>
                    <a href="tel:+15876201842" className="text-[#2c2c2c]/60 hover:text-[#a07850] transition-colors">+1 (587) 620-1842</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#a07850]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[#a07850]" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">Email</div>
                    <a href="mailto:hello@emberelm.ca" className="text-[#2c2c2c]/60 hover:text-[#a07850] transition-colors">hello@emberelm.ca</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#a07850]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#a07850]" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">Location</div>
                    <p className="text-[#2c2c2c]/60">312 Birchwood Ave, Westgrove, AB T9R 2K4</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#f5f0eb] border border-[#e8e0d8] rounded-2xl p-6">
                <h4 className="font-bold mb-4 text-sm uppercase tracking-wide">Studio Hours</h4>
                <div className="space-y-2 text-sm">
                  {[
                    ["Monday", "Closed"],
                    ["Tuesday – Friday", "10:00 AM – 6:00 PM"],
                    ["Saturday", "10:00 AM – 5:00 PM"],
                    ["Sunday", "Closed"],
                  ].map(([day, hrs]) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-[#2c2c2c]/60">{day}</span>
                      <span className={hrs === "Closed" ? "text-[#a07850] font-medium" : "font-medium"}>{hrs}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="bg-[#f5f0eb] border border-[#e8e0d8] rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "Georgia, serif" }}>Send Us a Message</h3>
              {formSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="text-lg font-bold mb-2">Message Sent!</h4>
                  <p className="text-[#2c2c2c]/60 text-sm">We will be in touch within one business day.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#faf7f4] border border-[#e8e0d8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#a07850] transition-colors"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#faf7f4] border border-[#e8e0d8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#a07850] transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#faf7f4] border border-[#e8e0d8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#a07850] transition-colors resize-none"
                      placeholder="Tell us what you are looking for..."
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-[#a07850] text-[#faf7f4] py-3.5 rounded-xl font-semibold hover:bg-[#8a6640] transition-colors flex items-center justify-center gap-2"
                  >
                    Send Message <ArrowRight size={16} />
                  </motion.button>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c2c2c] text-[#faf7f4]">
        <div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold mb-3">
              <span className="text-[#a07850]">Ember</span> &amp; Elm
            </div>
            <p className="text-[#faf7f4]/50 text-sm leading-relaxed mb-5">Your full-service beauty and body studio in Westgrove, Alberta.</p>
            <div className="flex gap-3">
              {["f", "ig"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 bg-[#faf7f4]/10 hover:bg-[#a07850] rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                >
                  {s === "f" ? "f" : "✦"}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] mb-5 text-[#a07850]">Shop</h4>
            <ul className="space-y-3">
              {SHOP_LINKS.map((l) => (
                <li key={l}><a href="#" className="text-[#faf7f4]/60 text-sm hover:text-[#a07850] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] mb-5 text-[#a07850]">Services</h4>
            <ul className="space-y-3">
              {["Lashes", "Piercing", "Threading", "Hairstyling", "Refillery"].map((l) => (
                <li key={l}><a href="#services" className="text-[#faf7f4]/60 text-sm hover:text-[#a07850] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] mb-5 text-[#a07850]">Info</h4>
            <ul className="space-y-3">
              {["About Us", "FAQ", "Testimonials", "Contact Us", "Privacy Policy", "Refund Policy", "Terms of Service"].map((l) => (
                <li key={l}><a href="#" className="text-[#faf7f4]/60 text-sm hover:text-[#a07850] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Safe Space + Copyright */}
        <div className="border-t border-[#faf7f4]/10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-[#faf7f4]/5 border border-[#faf7f4]/10 rounded-full px-4 py-2">
              <span className="text-lg">🏳️‍🌈</span>
              <span className="text-[#faf7f4]/60 text-xs">Proud to be an inclusive, welcoming space for all.</span>
            </div>
            <p className="text-[#faf7f4]/40 text-xs text-center">
              &copy; {new Date().getFullYear()} Ember &amp; Elm Body Studio | Westgrove, AB
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
