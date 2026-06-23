import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  const location = p.slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  return {
    title: `${location} | DOGSPA Harrow`,
    description: `Looking for ${location}? DOGSPA Harrow offers premium, luxury pet grooming tailored to your pet's needs. Book a session today.`,
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const title = p.slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 bg-gradient-navy text-white text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt={title}
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-navy/80 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-gold text-sm font-semibold uppercase tracking-widest block mb-4">
            Premium Service
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            {title}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            DOGSPA is Harrow&apos;s premier destination for luxury pet wellness. If you&apos;re looking for {title.toLowerCase()}, our expert stylists provide a calming, cage-free experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/booking" className="btn-primary">
              <span>Book Online</span>
            </Link>
            <Link href="/services" className="btn-secondary">
              <span>View All Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Factors */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Why Choose DOGSPA?
            </h2>
            <p className="text-charcoal/60">The ultimate standard in pet grooming and care.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cream p-8 rounded-2xl text-center">
              <div className="w-16 h-16 mx-auto bg-blush text-gold flex items-center justify-center rounded-full text-2xl mb-6">
                ✂️
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Expert Styling</h3>
              <p className="text-charcoal/70">Our master groomers are trained in breed-specific cuts and creative styling, ensuring your pet looks perfect.</p>
            </div>
            <div className="bg-cream p-8 rounded-2xl text-center">
              <div className="w-16 h-16 mx-auto bg-blush text-gold flex items-center justify-center rounded-full text-2xl mb-6">
                🛁
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Spa Treatments</h3>
              <p className="text-charcoal/70">From mud baths to pawdicures, we use only premium, organic products that nourish the skin and coat.</p>
            </div>
            <div className="bg-cream p-8 rounded-2xl text-center">
              <div className="w-16 h-16 mx-auto bg-blush text-gold flex items-center justify-center rounded-full text-2xl mb-6">
                🧘‍♀️
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Calm Environment</h3>
              <p className="text-charcoal/70">A 1-to-1, cage-free experience designed to reduce anxiety and make grooming a positive experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
