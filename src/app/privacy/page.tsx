import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "DOGSPA Harrow privacy policy and data protection.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream dark:bg-[#16161A] pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-gold hover:text-gold-dark mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-white dark:bg-charcoal rounded-3xl shadow-sm border border-gold/10 dark:border-gold/20 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-navy dark:text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Privacy Policy
          </h1>
          <p className="text-charcoal/70 dark:text-gray-300 mb-10 text-lg">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>

          <div className="space-y-8 text-charcoal/80 dark:text-gray-200">
            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>1. Information We Collect</h2>
              <p>As part of your booking, you&apos;ll be asked to provide some information about you and your pet. This includes:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Your name, email address, and phone number for communication purposes.</li>
                <li>Your pet&apos;s name, breed, age, and any relevant medical, behavioural, or sensitivity information to ensure their safety during grooming.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>2. How We Use Your Information</h2>
              <p>We use the information we collect strictly to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Schedule and manage your grooming appointments.</li>
                <li>Communicate with you regarding your bookings, including sending reminders or updates.</li>
                <li>Provide the safest and most tailored grooming experience for your pet.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>3. Account Registration</h2>
              <p>If you choose to create an account, we will store your information securely so you don&apos;t have to enter it every time you book. You may request to have your account deleted at any time by contacting us.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>4. Data Protection & Sharing</h2>
              <p>We are committed to keeping your personal data safe. We will never sell, distribute, or lease your personal information to third parties unless we have your explicit permission or are required by law to do so.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>5. Photography & Media</h2>
              <p>We occasionally take photos or videos of pets during their spa day for our portfolio and social media. We will always ask for your consent before sharing any images of your pet online.</p>
            </section>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gold/20 dark:border-gold/40 text-sm text-charcoal/60 dark:text-gray-400">
            <p>If you have any questions about how your data is handled, please get in touch with us.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
