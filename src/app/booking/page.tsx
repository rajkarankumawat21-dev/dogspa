"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  Sunrise,
  Sun,
  Sunset,
} from "lucide-react";
import { services, servicePackages } from "@/data/services";

type Step = 1 | 2 | 3 | 4 | 5;

const steps = [
  { num: 1, label: "Service" },
  { num: 2, label: "Date & Time" },
  { num: 3, label: "Pet Details" },
  { num: 4, label: "Your Details" },
  { num: 5, label: "Confirm" },
];

const timeCategories = [
  {
    label: "Morning",
    icon: Sunrise,
    slots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
  },
  {
    label: "Afternoon",
    icon: Sun,
    slots: ["12:00", "13:00", "13:30", "14:00", "14:30"],
  },
  {
    label: "Evening",
    icon: Sunset,
    slots: ["15:00", "15:30", "16:00", "16:30"],
  },
];

export default function BookingPage() {
  const [step, setStep] = useState<Step>(1);
  const [booking, setBooking] = useState({
    serviceId: "",
    serviceName: "",
    servicePrice: 0,
    date: "",
    time: "",
    petName: "",
    petType: "dog",
    breed: "",
    notes: "",
    pickupRequired: false,
    customerName: "",
    email: "",
    phone: "",
    paymentType: "deposit" as "deposit" | "full",
    paymentMethod: "card" as "card" | "paypal",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  const [currentMonthDate, setCurrentMonthDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [confirmed, setConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [refNum, setRefNum] = useState("");

  const selectService = (id: string, name: string, price: number) => {
    setBooking({ ...booking, serviceId: id, serviceName: name, servicePrice: price });
  };

  const depositAmount = Math.round(booking.servicePrice * 0.2);
  const fullAmount = Math.round(booking.servicePrice * 0.95);

  const canProceed = () => {
    switch (step) {
      case 1: return booking.serviceId !== "";
      case 2: return booking.date !== "" && booking.time !== "";
      case 3: return booking.petName !== "" && booking.petType !== "";
      case 4: return booking.customerName !== "" && booking.email !== "" && booking.phone !== "";
      case 5: 
        if (booking.paymentMethod === "card") {
          return booking.cardName.length > 0 && booking.cardNumber.length >= 15 && booking.cardExpiry.length >= 4 && booking.cardCvc.length >= 3;
        }
        return true;
      default: return false;
    }
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      if (res.ok) {
        const data = await res.json();
        setRefNum(`DS-${data.booking.id.substring(0, 6).toUpperCase()}`);
        setConfirmed(true);
      } else {
        console.error("Booking failed");
      }
    } catch (error) {
      console.error("Error submitting booking", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Calendar logic
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday
  
  const previousMonthLastDay = new Date(year, month, 0).getDate();
  
  const calendarDays = [];
  
  // Previous month padded days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      date: new Date(year, month - 1, previousMonthLastDay - i),
      isCurrentMonth: false,
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }
  
  // Next month padded days to complete grid (42 cells max)
  const remainingCells = 42 - calendarDays.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarDays.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  if (confirmed) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-cream px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-elevated p-8 sm:p-12 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1
            className="text-3xl font-bold text-navy mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Booking Confirmed! 🎉
          </h1>
          <p className="text-charcoal/60 mb-6">
            Your spa day is booked. We can&apos;t wait to pamper {booking.petName}!
          </p>

          <div className="bg-cream rounded-xl p-5 mb-6 text-left space-y-2">
            <p className="text-sm">
              <strong>Reference:</strong> {refNum}
            </p>
            <p className="text-sm">
              <strong>Service:</strong> {booking.serviceName}
            </p>
            <p className="text-sm">
              <strong>Date:</strong>{" "}
              {new Date(booking.date).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-sm">
              <strong>Time:</strong> {booking.time}
            </p>
            <p className="text-sm">
              <strong>Pet:</strong> {booking.petName} ({booking.breed || booking.petType})
            </p>
            {booking.pickupRequired && (
              <p className="text-sm">
                <strong>Pickup:</strong> Yes — we&apos;ll collect {booking.petName}!
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={`https://wa.me/447000000000?text=Hi%20DOGSPA!%20My%20booking%20ref%20is%20${refNum}.%20Looking%20forward%20to%20${booking.petName}'s%20spa%20day!`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center"
            >
              <span>💬 Confirm on WhatsApp</span>
            </a>
            <Link href="/" className="btn-secondary justify-center">
              <span>Back to Home</span>
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      <section className="min-h-screen bg-cream pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-3xl sm:text-4xl font-bold text-navy mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Book Your Spa Day
            </h1>
            <p className="text-charcoal/60">
              Complete the form below to reserve your pet&apos;s luxury grooming
              session.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-10 max-w-md mx-auto">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s.num
                      ? "bg-gold text-white"
                      : "bg-gold/10 text-gold/50"
                    }`}
                >
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-6 sm:w-10 h-0.5 mx-1 transition-all ${step > s.num ? "bg-gold" : "bg-gold/10"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-3xl shadow-card p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2
                    className="text-xl font-bold text-navy mb-6"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Choose Your Service
                  </h2>

                  <div className="space-y-3 mb-6">
                    <h3 className="text-sm font-semibold text-gold uppercase tracking-wide">
                      Individual Services
                    </h3>
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => selectService(s.id, s.name, s.priceFrom)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${booking.serviceId === s.id
                            ? "border-gold bg-gold/5"
                            : "border-gold/10 hover:border-gold/30"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{s.icon}</span>
                            <div>
                              <span className="font-semibold text-navy block">
                                {s.name}
                              </span>
                              <span className="text-xs text-charcoal/50">
                                {s.duration}
                              </span>
                            </div>
                          </div>
                          <span className="text-gold font-bold">{s.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gold uppercase tracking-wide">
                      Packages
                    </h3>
                    {servicePackages.map((p) => (
                      <button
                        key={p.id}
                        onClick={() =>
                          selectService(p.id, `${p.name} Package`, p.price)
                        }
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${booking.serviceId === p.id
                            ? "border-gold bg-gold/5"
                            : "border-gold/10 hover:border-gold/30"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-navy block">
                              {p.name} Package
                            </span>
                            <span className="text-xs text-charcoal/50">
                              {p.tagline}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-gold font-bold block">
                              {p.priceLabel}
                            </span>
                            {p.badge && (
                              <span className="text-xs text-gold/70">
                                {p.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2
                    className="text-xl font-bold text-navy mb-6"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Choose Date &amp; Time
                  </h2>

                  {/* Calendar Grid */}
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-navy dark:text-white">
                        {currentMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </h3>
                      <div className="flex items-center gap-2 sm:gap-4">
                        <button 
                          onClick={() => {
                            const d = new Date();
                            d.setDate(1);
                            setCurrentMonthDate(d);
                          }}
                          className="text-[11px] sm:text-xs font-bold text-gold hover:text-gold-dark tracking-wider"
                        >
                          TODAY
                        </button>
                        <div className="flex gap-1 sm:gap-2">
                          <button 
                            onClick={() => setCurrentMonthDate(new Date(year, month - 1, 1))}
                            className="p-1 text-charcoal/80 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => setCurrentMonthDate(new Date(year, month + 1, 1))}
                            className="p-1 text-charcoal/80 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-y-4 text-center">
                      {/* Day Headers */}
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={i} className="text-sm font-semibold text-charcoal/60 dark:text-gray-400 pb-2">
                          {day}
                        </div>
                      ))}

                      {/* Date Cells */}
                      {calendarDays.map((dayObj, i) => {
                        const d = dayObj.date;
                        // Safe timezone formatting
                        const offset = d.getTimezoneOffset() * 60000;
                        const dateStr = new Date(d.getTime() - offset).toISOString().split("T")[0];
                        
                        const isSelected = booking.date === dateStr;
                        const isSunday = d.getDay() === 0;
                        
                        const today = new Date();
                        today.setHours(0,0,0,0);
                        const isPast = d < today;
                        const isDisabled = isPast || isSunday;

                        let textClass = "text-charcoal dark:text-gray-200 font-medium";
                        if (!dayObj.isCurrentMonth) textClass = "text-charcoal/30 dark:text-gray-600";
                        if (isDisabled) textClass = "text-charcoal/30 dark:text-gray-600 cursor-not-allowed";
                        if (isSelected) textClass = "text-gold font-bold";

                        return (
                          <div key={i} className="flex justify-center items-center h-12">
                            <button
                              disabled={isDisabled}
                              onClick={() => setBooking({ ...booking, date: dateStr })}
                              className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center transition-all ${
                                isSelected 
                                  ? "border-2 border-gold text-gold" 
                                  : isDisabled
                                    ? ""
                                    : "hover:bg-cream dark:hover:bg-charcoal hover:text-gold dark:hover:text-gold"
                              } ${textClass}`}
                            >
                              {/* Display Month Abbr for first days of padded months like the screenshot */}
                              {!dayObj.isCurrentMonth && d.getDate() === 1 && (
                                <span className="text-[9px] text-charcoal/40 dark:text-gray-500 font-medium leading-[0.5] mb-0.5">
                                  {d.toLocaleString('default', { month: 'short' })}
                                </span>
                              )}
                              <span>{d.getDate()}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-navy flex items-center gap-2 border-b border-gold/10 pb-2">
                      <Clock className="w-4 h-4 text-gold" />
                      Select a Time
                    </h3>
                    
                    {timeCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <div key={category.label} className="space-y-3">
                          <div className="flex items-center gap-2 text-sm font-medium text-charcoal/70">
                            <Icon className="w-4 h-4" />
                            {category.label}
                          </div>
                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            {category.slots.map((time) => {
                              const isSelected = booking.time === time;
                              return (
                                <button
                                  key={time}
                                  onClick={() => setBooking({ ...booking, time })}
                                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                                    isSelected
                                      ? "bg-navy border-navy text-white shadow-md transform -translate-y-0.5"
                                      : "bg-white border-gray-200 hover:border-gold hover:text-gold text-charcoal"
                                  }`}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Pet Details */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2
                    className="text-xl font-bold text-navy mb-6"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Pet Details
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Pet&apos;s Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={booking.petName}
                        onChange={(e) =>
                          setBooking({ ...booking, petName: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                        placeholder="Biscuit"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1.5">
                          Pet Type *
                        </label>
                        <select
                          value={booking.petType}
                          onChange={(e) =>
                            setBooking({ ...booking, petType: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                        >
                          <option value="dog">🐶 Dog</option>
                          <option value="cat">🐱 Cat</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1.5">
                          Breed
                        </label>
                        <input
                          type="text"
                          value={booking.breed}
                          onChange={(e) =>
                            setBooking({ ...booking, breed: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                          placeholder="Cockapoo"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Special Notes
                      </label>
                      <textarea
                        rows={3}
                        value={booking.notes}
                        onChange={(e) =>
                          setBooking({ ...booking, notes: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all resize-none"
                        placeholder="Any allergies, anxiety, or special requirements..."
                      />
                    </div>

                    <label className="flex items-center gap-3 p-4 rounded-xl bg-blush-light cursor-pointer">
                      <input
                        type="checkbox"
                        checked={booking.pickupRequired}
                        onChange={(e) =>
                          setBooking({
                            ...booking,
                            pickupRequired: e.target.checked,
                          })
                        }
                        className="w-5 h-5 rounded text-gold focus:ring-gold"
                      />
                      <div>
                        <span className="font-medium text-navy">
                          🚐 Pickup &amp; Drop-off Required
                        </span>
                        <span className="block text-xs text-charcoal/50">
                          We&apos;ll collect and return your pet within the Harrow
                          area
                        </span>
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Customer Details */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2
                    className="text-xl font-bold text-navy mb-6"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Your Details
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={booking.customerName}
                        onChange={(e) =>
                          setBooking({
                            ...booking,
                            customerName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={booking.email}
                        onChange={(e) =>
                          setBooking({ ...booking, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={booking.phone}
                        onChange={(e) =>
                          setBooking({ ...booking, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                        placeholder="+44 7000 000 000"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Summary & Payment */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2
                    className="text-xl font-bold text-navy mb-6"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Booking Summary
                  </h2>

                  <div className="bg-cream rounded-xl p-5 mb-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-charcoal/60">Service</span>
                      <span className="font-semibold text-navy">
                        {booking.serviceName}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-charcoal/60">Date</span>
                      <span className="font-semibold text-navy">
                        {new Date(booking.date).toLocaleDateString("en-GB", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-charcoal/60">Time</span>
                      <span className="font-semibold text-navy">
                        {booking.time}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-charcoal/60">Pet</span>
                      <span className="font-semibold text-navy">
                        {booking.petName}{" "}
                        {booking.breed && `(${booking.breed})`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-charcoal/60">Customer</span>
                      <span className="font-semibold text-navy">
                        {booking.customerName}
                      </span>
                    </div>
                    {booking.pickupRequired && (
                      <div className="flex justify-between text-sm">
                        <span className="text-charcoal/60">Pickup</span>
                        <span className="font-semibold text-navy">
                          🚐 Yes
                        </span>
                      </div>
                    )}
                    <div className="border-t border-gold/20 pt-3 flex justify-between">
                      <span className="font-semibold text-navy">Total</span>
                      <span className="text-2xl font-bold text-gold">
                        £{booking.servicePrice}
                      </span>
                    </div>
                  </div>

                  {/* Payment Options */}
                  <h3 className="text-sm font-semibold text-navy mb-3">
                    Payment Option
                  </h3>
                  <div className="space-y-3 mb-6">
                    <button
                      onClick={() =>
                        setBooking({ ...booking, paymentType: "deposit" })
                      }
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${booking.paymentType === "deposit"
                          ? "border-gold bg-gold/5"
                          : "border-gold/10"
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-semibold text-navy block">
                            Pay 20% Deposit
                          </span>
                          <span className="text-xs text-charcoal/50">
                            Secure your slot — pay the rest on the day
                          </span>
                        </div>
                        <span className="text-gold font-bold text-lg">
                          £{depositAmount}
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() =>
                        setBooking({ ...booking, paymentType: "full" })
                      }
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${booking.paymentType === "full"
                          ? "border-gold bg-gold/5"
                          : "border-gold/10"
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-semibold text-navy block">
                            Pay in Full
                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              Save 5%
                            </span>
                          </span>
                          <span className="text-xs text-charcoal/50">
                            Full payment with automatic 5% discount
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-gold font-bold text-lg block">
                            £{fullAmount}
                          </span>
                          <span className="text-xs text-charcoal/40 line-through">
                            £{booking.servicePrice}
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Payment Method */}
                  <h3 className="text-sm font-semibold text-navy mb-3 mt-8">
                    Select Payment Method
                  </h3>
                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={() =>
                        setBooking({ ...booking, paymentMethod: "card" })
                      }
                      className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2 ${
                        booking.paymentMethod === "card"
                          ? "border-gold bg-gold/5 text-navy"
                          : "border-gold/10 text-charcoal hover:border-gold/30"
                      }`}
                    >
                      💳 Credit Card
                    </button>
                    <button
                      onClick={() =>
                        setBooking({ ...booking, paymentMethod: "paypal" })
                      }
                      className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2 ${
                        booking.paymentMethod === "paypal"
                          ? "border-gold bg-gold/5 text-navy"
                          : "border-gold/10 text-charcoal hover:border-gold/30"
                      }`}
                    >
                      🔵 PayPal
                    </button>
                  </div>

                  <AnimatePresence>
                    {booking.paymentMethod === "card" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 overflow-hidden mb-6"
                      >
                        <div>
                          <label className="block text-xs font-medium text-charcoal/70 mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            value={booking.cardName}
                            onChange={(e) =>
                              setBooking({ ...booking, cardName: e.target.value })
                            }
                            className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-charcoal/70 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            maxLength={19}
                            value={booking.cardNumber}
                            onChange={(e) => {
                              // Auto format with spaces
                              let val = e.target.value.replace(/\D/g, "");
                              val = val.replace(/(.{4})/g, "$1 ").trim();
                              setBooking({ ...booking, cardNumber: val });
                            }}
                            className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                            placeholder="0000 0000 0000 0000"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-charcoal/70 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              maxLength={5}
                              value={booking.cardExpiry}
                              onChange={(e) => {
                                let val = e.target.value.replace(/\D/g, "");
                                if (val.length >= 2) {
                                  val = val.slice(0, 2) + "/" + val.slice(2);
                                }
                                setBooking({ ...booking, cardExpiry: val });
                              }}
                              className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-charcoal/70 mb-1">
                              CVC
                            </label>
                            <input
                              type="text"
                              maxLength={4}
                              value={booking.cardCvc}
                              onChange={(e) =>
                                setBooking({
                                  ...booking,
                                  cardCvc: e.target.value.replace(/\D/g, ""),
                                })
                              }
                              className="w-full px-4 py-2.5 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gold/10">
              {step > 1 ? (
                <button
                  onClick={() => setStep((step - 1) as Step)}
                  className="flex items-center gap-2 text-charcoal/60 hover:text-navy transition-colors font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  onClick={() => canProceed() && setStep((step + 1) as Step)}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all ${canProceed()
                      ? "bg-gold text-white hover:bg-gold-dark"
                      : "bg-gold/20 text-gold/50 cursor-not-allowed"
                    }`}
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleConfirm}
                  disabled={!canProceed() || isProcessing}
                  className={`flex items-center gap-2 py-3 px-8 rounded-xl font-semibold shadow-gold transition-all duration-300 ${
                    canProceed() && !isProcessing
                      ? "bg-gold text-white hover:bg-gold-dark hover:-translate-y-0.5 hover:shadow-lg"
                      : "bg-gold/40 text-white cursor-not-allowed"
                  }`}
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                  <span>
                    {isProcessing ? "Processing..." : `Confirm & Pay £${booking.paymentType === "deposit" ? depositAmount : fullAmount}`}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
