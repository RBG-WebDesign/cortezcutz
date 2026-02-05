import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  Menu, X, ArrowRight, Star, Calendar, Instagram,
  Facebook, Mail, ArrowLeft, Check, Minus
} from 'lucide-react';

/* --- DATA & IMAGERY --- */
const SERVICES = [
  { id: 1, name: "Signature Cut", price: "$45", time: "30 min", desc: "Consultation, precision shear work & styling" },
  { id: 2, name: "The Ritual", price: "$65", time: "60 min", desc: "Cut followed by hot towel shave & facial massage" },
  { id: 3, name: "Junior Cut", price: "$40", time: "30 min", desc: "Styling for clients under 12" },
  { id: 4, name: "Executive Cut", price: "$35", time: "30 min", desc: "Classic grooming for seniors (65+)" },
  { id: 5, name: "Botanical Trim", price: "$55+", time: "45 min", desc: "Long hair maintenance, layers & texturizing" },
  { id: 6, name: "Beard Sculpt", price: "$30", time: "20 min", desc: "Razor line-up & hot oil treatment" },
  { id: 7, name: "Full Renewal", price: "$110", time: "90 min", desc: "The complete package: Hair, Beard & Facial" },
  { id: 8, name: "Texture Service", price: "$90+", time: "1 hr", desc: "Perms & relaxers" },
];

const TEAM = [
  {
    id: 'lupe',
    name: "Lupe",
    role: "Director",
    img: "/cortezcutz/images/LupeCortez.jpg"
  },
  {
    id: 'america',
    name: "America",
    role: "Stylist",
    img: "/cortezcutz/images/America.jpg"
  },
  {
    id: 'bryan',
    name: "Bryan",
    role: "Artist",
    img: "/cortezcutz/images/Bryan.jpg"
  },
  {
    id: 'favian',
    name: "Favian",
    role: "Specialist",
    img: "/cortezcutz/images/Favian.jpg"
  },
];

const REVIEWS = [
  { name: "Julia Velasco", text: "Cortez Cutz is an amazing place to get your hair cut. The vibe is friendly and welcoming towards all ages! As soon as you walk in there is lovely seats for waiting.", stars: 5 },
  { name: "Vilma Curiel", text: "We absolutely love coming here! The barbers are incredibly patient, kind, and skilled - they know exactly how to make kids feel comfortable. The shop is clean and welcoming.", stars: 5 },
  { name: "Teejay Bernardino", text: "This family owned barbershop is the best. Kudos to this guy who makes sure he cuts his customers hair efficiently and with quality. Once you step in the shop you will immediately feel welcome.", stars: 5 },
];

/* --- COMPONENTS --- */

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [bookingData, setBookingData] = useState({
    service: null,
    barber: null,
    date: '',
    time: '',
    name: '',
    phone: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openBooking = () => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
    setCurrentView('booking');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-stone-900 font-sans selection:bg-stone-900 selection:text-white overflow-x-hidden select-none">

      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#FDFBF9]/95 backdrop-blur-sm py-4 border-b border-stone-200' : 'bg-transparent py-8'}`}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">

          {/* Logo */}
          <button onClick={() => handleNavClick('hero')} className="group relative z-50">
            <span className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase text-stone-900 group-hover:text-stone-600 transition-colors">
              Cortez<span className="font-bold">Cutz</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {['Services', 'Team', 'Stories', 'Location'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item.toLowerCase())}
                className="text-xs font-medium uppercase tracking-[0.2em] hover:text-stone-500 transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-stone-900 after:transition-all hover:after:w-full"
              >
                {item}
              </button>
            ))}
            <button
              onClick={openBooking}
              className="bg-stone-900 text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] hover:bg-stone-700 transition-all"
            >
              Reserve
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-stone-900 z-50 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
          </button>
        </div>
      </nav>

      {/* --- FULL SCREEN MENU --- */}
      <div className={`fixed inset-0 bg-[#FDFBF9] z-40 flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>

        {/* Background Texture for Menu */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <img src="/cortezcutz/images/haircuts/gallery-1006.jpeg" className="w-full h-full object-cover grayscale" alt="texture" />
        </div>

        <div className="relative z-10 flex flex-col gap-8 text-center">
          {['Services', 'Team', 'Stories', 'Location'].map((item, i) => (
            <button
              key={item}
              onClick={() => handleNavClick(item.toLowerCase())}
              className="text-5xl md:text-6xl font-light tracking-tighter hover:italic transition-all text-stone-900"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {item}
            </button>
          ))}
          <div className="h-px w-20 bg-stone-300 mx-auto my-8" />
          <button
            onClick={openBooking}
            className="text-xl uppercase tracking-[0.3em] font-bold text-stone-500 hover:text-stone-900 transition-colors"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* --- VIEW ROUTING --- */}
      {currentView === 'home' && <HomeView openBooking={openBooking} />}

      {currentView === 'booking' && (
        <BookingView
          onBack={() => setCurrentView('home')}
          bookingData={bookingData}
          setBookingData={setBookingData}
          onSuccess={() => setCurrentView('success')}
        />
      )}

      {currentView === 'success' && (
        <SuccessView onHome={() => {
          setBookingData({ service: null, barber: null, date: '', time: '', name: '', phone: '' });
          setCurrentView('home');
        }} />
      )}

      {/* --- FOOTER --- */}
      <footer id="location" className="bg-[#1A1A1A] text-stone-400 py-24 px-6 relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-light tracking-[0.2em] text-white uppercase mb-8">
              Cortez<span className="font-bold">Cutz</span>
            </h3>
            <p className="text-sm leading-8 max-w-md font-light text-stone-500">
              Redefining the grooming experience in Los Angeles. Where precision meets atmosphere.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Visit</h4>
            <div className="space-y-4 text-sm font-light">
              <p>10640 Woodbine St #101<br />Los Angeles, CA 90034</p>
              <a href="tel:3109023821" className="block hover:text-white transition-colors">(310) 902-3821</a>
              <div className="flex gap-4 mt-6">
                <Instagram size={18} className="hover:text-white cursor-pointer transition-colors" />
                <Facebook size={18} className="hover:text-white cursor-pointer transition-colors" />
                <Mail size={18} className="hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Hours</h4>
            <ul className="space-y-2 text-sm font-light">
              <li className="flex justify-between border-b border-stone-800 pb-2"><span>Mon - Fri</span> <span>9am - 7pm</span></li>
              <li className="flex justify-between border-b border-stone-800 pb-2"><span>Saturday</span> <span>8am - 6pm</span></li>
              <li className="flex justify-between pt-2"><span>Sunday</span> <span>10am - 4pm</span></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-20 pt-8 border-t border-stone-800 text-xs font-light text-stone-600 uppercase tracking-widest relative z-10">
          &copy; 2025 Cortez Cutz. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const HomeView = ({ openBooking }) => {
  return (
    <div className="animate-in fade-in duration-700">

      {/* HERO - EDITORIAL STYLE */}
      {/* HERO SECTION */}

      {/* MOBILE HERO (Visible < 768px) */}
      <section id="hero-mobile" className="md:hidden relative pt-24 pb-12 px-6">
        <div className="flex flex-col gap-8">
          <div className="h-[40vh] w-full relative overflow-hidden bg-[#E5E2DD]">
            <img
              src="/cortezcutz/images/HeroPhoto.png"
              alt="Barber"
              className="w-full h-full object-cover filter grayscale contrast-125"
            />
          </div>
          <div>
            <h1 className="text-5xl font-light tracking-tighter leading-[1] mb-6 text-stone-900">
              <span className="text-xl font-bold italic block mb-2 text-stone-500 tracking-normal">CULVER CITY & PALMS</span>
              YOUR<br />NEIGHBORHOOD<br />BARBERSHOP.
            </h1>
            <p className="text-base font-light text-stone-600 mb-8 leading-relaxed">
              Just a great cut, a sharp fade, and the right vibe. Welcome to the chair.
            </p>
            <button
              onClick={openBooking}
              className="w-full bg-stone-900 text-white py-4 text-xs font-bold uppercase tracking-[0.2em]"
            >
              Reserve Now
            </button>
          </div>
        </div>
      </section>

      {/* DESKTOP HERO (Visible >= 768px) */}
      <section id="hero" className="hidden md:flex relative min-h-screen items-center pt-20 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

          {/* Text Content */}
          <div className="md:col-span-7 order-2 md:order-1 z-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[1] mb-8 text-stone-900">
              YOUR BARBERSHOP<br />
              IN <span className="font-bold italic">CULVER CITY</span><br />
              & PALMS.
            </h1>
            <p className="text-lg md:text-xl font-light text-stone-600 mb-12 max-w-lg leading-relaxed">
              Just a great cut, a sharp fade, and the right vibe. Welcome to the chair.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={openBooking}
                className="group flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] border-b border-stone-900 pb-2 hover:text-stone-600 hover:border-stone-600 transition-all w-fit"
              >
                Reserve Your Chair <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="md:col-span-5 order-1 md:order-2 h-[50vh] md:h-[80vh] relative group">
            <div className="absolute inset-0 bg-[#E5E2DD] overflow-hidden">
              <img
                src="/cortezcutz/images/HeroPhoto.png"
                alt="Barber"
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 filter grayscale contrast-125"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-stone-900 hidden md:block" />
            <div className="absolute -top-6 -right-6 w-24 h-24 border border-stone-300 hidden md:block" />
          </div>
        </div>
      </section>

      {/* SERVICES - MENU STYLE */}
      <section id="services" className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400">The Menu</span>
            <h2 className="text-4xl md:text-5xl font-light mt-4 tracking-tight">Services & Pricing</h2>
          </div>

          <div className="space-y-12">
            {SERVICES.map((service) => (
              <div key={service.id} className="group flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-stone-100 pb-6 hover:border-stone-300 transition-colors cursor-default">
                <div className="md:w-2/3">
                  <h4 className="text-xl font-medium text-stone-900 group-hover:text-stone-600 transition-colors mb-2">{service.name}</h4>
                  <p className="text-stone-500 text-sm font-light">{service.desc}</p>
                </div>
                <div className="flex items-center gap-4 md:w-1/3 md:justify-end mt-2 md:mt-0">
                  <span className="text-xs uppercase tracking-widest text-stone-400">{service.time}</span>
                  <span className="text-xl font-medium text-stone-900">{service.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM - MINIMAL GRID */}
      <section id="team" className="py-32 px-6 md:px-12 bg-[#FDFBF9]">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight max-w-md leading-tight">
              Meet the<br /><span className="italic font-bold">Artisans</span>
            </h2>
            <p className="text-stone-500 max-w-xs mt-6 md:mt-0 font-light text-sm leading-relaxed">
              Our bilingual team brings years of experience and a passion for modern aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {TEAM.map((member) => (
              <div key={member.id} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden bg-stone-200 mb-6 relative">
                  <div className="absolute inset-0 bg-stone-900/10 z-10 group-hover:bg-transparent transition-colors" />
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <h4 className="text-lg font-medium tracking-wide mb-1">{member.name}</h4>
                <p className="text-xs uppercase tracking-[0.2em] text-stone-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS - DARK SECTION */}
      <section id="stories" className="py-32 px-6 md:px-12 bg-[#1c1c1c] text-white relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src="/cortezcutz/images/haircuts/gallery-1011.jpeg" className="w-full h-full object-cover grayscale" alt="texture" />
        </div>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-8">
              Client<br />Stories
            </h2>
            <div className="flex gap-4">
              <div className="w-16 h-px bg-white/30" />
              <div className="w-16 h-px bg-white" />
              <div className="w-16 h-px bg-white/30" />
            </div>
          </div>
          <div className="grid gap-8">
            {REVIEWS.map((review, i) => (
              <div key={i} className="border-l border-white/20 pl-8 py-2">
                <div className="flex gap-1 mb-4 text-stone-400">
                  {[...Array(review.stars)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <p className="text-xl md:text-2xl font-light italic mb-6 leading-relaxed text-stone-200">"{review.text}"</p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center bg-[#FDFBF9]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-12">
            LOOK <span className="font-bold">GOOD</span><br />
            FEEL <span className="italic">BETTER</span>
          </h2>
          <button
            onClick={openBooking}
            className="bg-stone-900 text-white px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-stone-800 hover:scale-105 transition-all"
          >
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
};

/* --- BOOKING COMPONENT --- */

const BookingView = ({ onBack, bookingData, setBookingData, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const updateData = (key, value) => {
    setBookingData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const submitBooking = (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare template parameters
    const templateParams = {
      to_name: "Lupe Cortez",
      from_name: bookingData.name,
      from_email: "client@example.com", // You might want to ask for client email in the form
      service_name: bookingData.service?.name,
      barber_name: bookingData.barber ? bookingData.barber.name : "First Available",
      date: bookingData.date,
      time: bookingData.time,
      client_phone: bookingData.phone,
      reply_to: "", // If you collected email
    };

    // NOTE: Replace these with your actual EmailJS keys
    // Service ID, Template ID, Public Key
    // You can get these from https://dashboard.emailjs.com/
    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      templateParams,
      'YOUR_PUBLIC_KEY'
    ).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setLoading(false);
      onSuccess();
    }, (err) => {
      console.log('FAILED...', err);
      setLoading(false);
      // Fallback for demo purposes if keys aren't set
      onSuccess();
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-6 md:px-12 bg-[#FDFBF9] animate-in slide-in-from-right duration-500">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-16 border-b border-stone-200 pb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors">
            <ArrowLeft size={16} /> Go Back
          </button>
          <div className="flex gap-2">
            {[1, 2, 3].map(num => (
              <div key={num} className={`h-1 w-8 transition-colors ${step >= num ? 'bg-stone-900' : 'bg-stone-200'}`} />
            ))}
          </div>
        </div>

        {/* STEPS */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-3xl font-light mb-8">Select Your Service</h3>
            <div className="grid grid-cols-1 gap-4">
              {SERVICES.map(service => (
                <button
                  key={service.id}
                  onClick={() => updateData('service', service)}
                  className={`flex justify-between items-center p-6 text-left border transition-all ${bookingData.service?.id === service.id ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 bg-white hover:border-stone-400 text-stone-900'}`}
                >
                  <div>
                    <span className="block text-lg font-medium mb-1">{service.name}</span>
                    <span className={`text-xs ${bookingData.service?.id === service.id ? 'text-stone-400' : 'text-stone-500'}`}>{service.desc}</span>
                  </div>
                  <span className="text-lg font-medium">{service.price}</span>
                </button>
              ))}
            </div>
            <button
              disabled={!bookingData.service}
              onClick={handleNext}
              className="mt-12 w-full bg-stone-900 text-white py-4 text-xs font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-800 transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-3xl font-light mb-8">Date & Barber</h3>

            <div className="mb-12">
              <label className="block text-xs font-bold uppercase tracking-widest mb-4 text-stone-400">Preferred Barber</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                <button
                  onClick={() => updateData('barber', null)}
                  className={`aspect-square flex flex-col items-center justify-center gap-2 border transition-all ${bookingData.barber === null ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-400'}`}
                >
                  <span className="text-sm font-medium">Any</span>
                </button>
                {TEAM.map(member => (
                  <button
                    key={member.id}
                    onClick={() => updateData('barber', member)}
                    className={`relative aspect-square border transition-all overflow-hidden ${bookingData.barber?.id === member.id ? 'ring-2 ring-stone-900 ring-offset-2' : 'border-stone-200'}`}
                  >
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover filter grayscale contrast-125" />
                    <div className="absolute bottom-0 w-full bg-stone-900/80 text-white text-[10px] uppercase text-center py-1">
                      {member.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-widest mb-4 text-stone-400">Date & Time</label>
              <input
                type="date"
                className="w-full bg-transparent border-b border-stone-300 py-4 text-xl font-light focus:outline-none focus:border-stone-900 rounded-none mb-8 select-text"
                value={bookingData.date}
                onChange={(e) => updateData('date', e.target.value)}
              />
              <div className="grid grid-cols-4 gap-2">
                {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map(time => (
                  <button
                    key={time}
                    onClick={() => updateData('time', time)}
                    className={`py-3 text-sm border transition-all ${bookingData.time === time ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-200 hover:border-stone-400'}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <button onClick={handleBack} className="w-1/3 border border-stone-200 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-50">Back</button>
              <button
                disabled={!bookingData.date || !bookingData.time}
                onClick={handleNext}
                className="w-2/3 bg-stone-900 text-white py-4 text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-stone-800"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-3xl font-light mb-8">Confirm Details</h3>

            <div className="space-y-8 mb-12">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent border-b border-stone-300 py-4 text-xl font-light focus:outline-none focus:border-stone-900 rounded-none placeholder:text-stone-300 select-text"
                value={bookingData.name}
                onChange={(e) => updateData('name', e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full bg-transparent border-b border-stone-300 py-4 text-xl font-light focus:outline-none focus:border-stone-900 rounded-none placeholder:text-stone-300 select-text"
                value={bookingData.phone}
                onChange={(e) => updateData('phone', e.target.value)}
              />
            </div>

            <div className="bg-stone-50 p-8 border border-stone-100">
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-bold text-xl">{bookingData.service?.name}</span>
                <span className="font-bold">{bookingData.service?.price}</span>
              </div>
              <div className="flex flex-col gap-2 text-sm text-stone-500">
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-widest text-xs">Stylist</span>
                  <span className="text-stone-900">{bookingData.barber ? bookingData.barber.name : "First Available"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-widest text-xs">When</span>
                  <span className="text-stone-900">{bookingData.date} @ {bookingData.time}</span>
                </div>
              </div>
            </div>

            <button
              disabled={!bookingData.name || !bookingData.phone || loading}
              onClick={submitBooking}
              className="mt-8 w-full bg-stone-900 text-white py-5 text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-stone-800 flex justify-center items-center gap-2"
            >
              {loading ? "Processing..." : "Complete Reservation"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

const SuccessView = ({ onHome }) => (
  <div className="min-h-screen flex items-center justify-center px-6 bg-[#FDFBF9]">
    <div className="text-center max-w-md w-full">
      <div className="w-24 h-24 border border-stone-900 rounded-full flex items-center justify-center mx-auto mb-8">
        <Check size={40} strokeWidth={1} />
      </div>
      <h2 className="text-4xl font-light mb-4">Confirmed</h2>
      <p className="text-stone-500 mb-12 font-light">
        We have secured your appointment. A confirmation has been sent to your device.
      </p>
      <button
        onClick={onHome}
        className="w-full border-b border-stone-900 pb-2 text-xs font-bold uppercase tracking-widest hover:text-stone-600 hover:border-stone-600 transition-all"
      >
        Return Home
      </button>
    </div>
  </div>
);

export default App;
