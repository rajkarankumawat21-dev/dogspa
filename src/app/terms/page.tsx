import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "DOGSPA Harrow booking policies and terms of service.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream dark:bg-[#16161A] pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-gold hover:text-gold-dark mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="bg-white dark:bg-charcoal rounded-3xl shadow-sm border border-gold/10 dark:border-gold/20 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-navy dark:text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Terms of Service & Policies
          </h1>
          <p className="text-charcoal/70 dark:text-gray-300 mb-10 text-lg">
            To ensure a calm, safe and fair experience for every dog, the following policies apply to all bookings.
          </p>

          <div className="space-y-8 text-charcoal/80 dark:text-gray-200">
            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>1. Booking & Deposit</h2>
              <p>A <strong>£15 deposit</strong> is required to secure your grooming appointment. The balance is payable at drop-off by cash or card.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>2. Cancellations & Changes</h2>
              <p>To respect your time and mine: <strong>24 hours’ notice</strong> is required to cancel or reschedule without losing your deposit. Cancelling or changing with less than 24 hours’ notice will result in loss of deposit. This ensures appointment slots are available for other clients.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>3. Late Arrival & Collection</h2>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Late Arrival:</strong> If you arrive late for your appointment, I may need to reduce the grooming service provided due to schedule constraints. The full balance for the booked service is still payable.</li>
                <li><strong>Late Collection:</strong> Dogs must be collected at the agreed time. £10 per 10 minutes will be charged for late collection to cover extra care and time.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>4. Your Dog’s Comfort & Safety</h2>
              <p>Your dog’s wellbeing is always the priority. Please disclose any medical conditions, allergies, anxieties, behavioural issues, aggression, or sensitivities when booking or at drop-off.</p>
              <p className="mt-2">If your dog requires special handling or extra care, a fee <strong>from £5</strong> may apply. If a groom cannot safely continue due to behaviour or health, I will contact you to collect your dog. The full service fee remains payable.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>5. Coat Condition & Matting</h2>
              <p>Knots or mats requiring extra attention will incur an additional charge <strong>starting from £5</strong>.</p>
              <p className="mt-2">If a coat is matted and cannot be brushed out safely, it may need to be shaved down for the dog’s comfort. This will incur a <strong>shaving fee from £20</strong>. Severe matting may reveal skin issues; I will always explain this before proceeding.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>6. Missed Appointments</h2>
              <p>If you do not attend your appointment without notice, your deposit will be forfeited. Future bookings may require payment in advance.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>7. Grooming Maintenance</h2>
              <p>Regular grooming helps keep your dog comfortable and prevents matting. If appointments are spaced too far apart, extra time and products may be needed, which can affect pricing.</p>
            </section>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gold/20 dark:border-gold/40 text-sm text-charcoal/60 dark:text-gray-400">
            <p>These policies are in place to ensure a positive experience for your dog and all clients. If you have any questions, I’m always happy to help.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
