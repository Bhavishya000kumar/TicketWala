import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../hooks/useBooking';
import Button from '../components/ui/Button';
import { Ticket, Film, Calendar, MapPin, Clock, CreditCard, ChevronLeft, AlertCircle } from 'lucide-react';

const Checkout = () => {
  const { booking, selectedTheatre, selectedDate, selectedShowtime, selectedSeats } = useBooking();
  const navigate = useNavigate();

  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const [fullNameTouched, setFullNameTouched] = React.useState(false);
  const [emailTouched, setEmailTouched] = React.useState(false);
  const [phoneTouched, setPhoneTouched] = React.useState(false);

  // Validation rules check
  const isNameValid = fullName.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = /^\d{10}$/.test(phone);
  const isFormValid = isNameValid && isEmailValid && isPhoneValid;

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, ''); // numbers only
    if (val.length <= 10) {
      setPhone(val);
    }
  };

  // Resolve movie details
  const movie = booking?.movie;
  
  // Resolve theatre details
  const theatre = selectedTheatre || booking?.cinema;
  const theatreName = theatre?.name || 'Not Selected';
  const theatreLocation = theatre?.location || '';

  // Resolve date details
  const dateObj = selectedDate || booking?.date;
  const dateLabel = dateObj 
    ? (typeof dateObj === 'string' ? dateObj : `${dateObj.label}, ${dateObj.dateString}`) 
    : 'Not Selected';

  // Resolve showtime details
  const showtimeObj = selectedShowtime || booking?.showtime;
  const showtimeLabel = showtimeObj
    ? (typeof showtimeObj === 'string' ? showtimeObj : showtimeObj.time)
    : 'Not Selected';

  // Normalize selected seats (handle both objects and raw IDs arrays)
  const normalizedSeats = React.useMemo(() => {
    if (selectedSeats && selectedSeats.length > 0) {
      return selectedSeats;
    }
    if (booking?.selectedSeats && booking.selectedSeats.length > 0) {
      return booking.selectedSeats.map(id => {
        const row = id.charAt(0);
        let type = 'regular';
        if (row === 'A' || row === 'B') type = 'recliner';
        else if (row === 'C' || row === 'D') type = 'premium';
        return { id, row, type };
      });
    }
    return [];
  }, [selectedSeats, booking?.selectedSeats]);

  const hasBookingData = movie && theatre && dateObj && showtimeObj && normalizedSeats.length > 0;

  // Pricing calculations
  const getSeatPrice = (type) => {
    if (type === 'recliner') return 350;
    if (type === 'premium') return 250;
    return 180;
  };

  const selectedSeatsSummary = React.useMemo(() => {
    return normalizedSeats.reduce((acc, seat) => {
      const seatType = seat.type || 'regular';
      acc[seatType] = (acc[seatType] || 0) + 1;
      return acc;
    }, { regular: 0, premium: 0, recliner: 0 });
  }, [normalizedSeats]);

  const regularCount = selectedSeatsSummary.regular || 0;
  const premiumCount = selectedSeatsSummary.premium || 0;
  const reclinerCount = selectedSeatsSummary.recliner || 0;

  const regularTotal = regularCount * 180;
  const premiumTotal = premiumCount * 250;
  const reclinerTotal = reclinerCount * 350;

  const subtotal = regularTotal + premiumTotal + reclinerTotal;
  const convenienceFee = normalizedSeats.length * 30;
  const gst = Math.round((subtotal + convenienceFee) * 0.18);
  const grandTotal = subtotal + convenienceFee + gst;

  if (!hasBookingData) {
    return (
      <div className="bg-zinc-950 min-h-screen text-zinc-100 flex flex-col items-center justify-center px-4 font-sans py-20 text-center">
        <div className="bg-zinc-900/40 border border-zinc-850 p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-6 backdrop-blur-sm">
          <div className="mx-auto w-16 h-16 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold tracking-tight font-display text-white">No booking information available</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Please select your movie, showtime, and seats before visiting the checkout screen.
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              onClick={() => navigate('/movies')}
              className="w-full flex items-center justify-center gap-2 py-3.5 font-bold cursor-pointer"
            >
              Back to Movies
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 font-sans pb-16 pt-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-white font-display border-l-4 border-brand-red pl-4 tracking-wide uppercase">
              Checkout Review
            </h2>
            <p className="text-xs text-zinc-500 mt-1 pl-4">Confirm your selected show details and information before booking.</p>
          </div>
          <Link 
            to={`/movie/${movie.id}`} 
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors font-bold uppercase tracking-wider self-start sm:self-center"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Movie Details
          </Link>
        </div>

        {/* Checkout columns grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Ticket Details & Customer Details Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Ticket Review Block */}
            <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm space-y-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800/40 pb-4">
                <Ticket className="w-5.5 h-5.5 text-brand-red" />
                Ticket Details
              </h3>

              <div className="flex flex-col sm:flex-row gap-6">
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  className="w-28 aspect-[2/3] object-cover rounded-xl shadow-md border border-zinc-800 shrink-0 mx-auto sm:mx-0" 
                />
                
                <div className="space-y-4 flex-grow">
                  <div>
                    <h4 className="font-extrabold text-xl text-white tracking-wide">{movie.title}</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">{movie.genre}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-zinc-950/40 p-4 rounded-xl border border-zinc-850">
                    <div className="space-y-1">
                      <span className="text-[9px] text-zinc-500 block uppercase font-bold tracking-wider">Date</span>
                      <span className="flex items-center gap-1.5 font-semibold text-white">
                        <Calendar className="w-3.5 h-3.5 text-brand-red shrink-0" />
                        <span>{dateLabel}</span>
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-zinc-500 block uppercase font-bold tracking-wider">Cinema</span>
                      <span className="flex items-center gap-1.5 font-semibold text-white">
                        <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                        <span className="truncate">{theatreName}</span>
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-zinc-500 block uppercase font-bold tracking-wider">Showtime</span>
                      <span className="flex items-center gap-1.5 font-semibold text-white">
                        <Clock className="w-3.5 h-3.5 text-brand-red shrink-0" />
                        <span>{showtimeLabel}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wider mb-1">Seats Selected</span>
                      <p className="text-base font-bold text-white font-mono tracking-wider">
                        {normalizedSeats.map(s => s.id).join(', ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wider mb-1">Total Seats</span>
                      <p className="text-lg font-black text-brand-red">
                        {normalizedSeats.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Customer Details Form */}
            <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm space-y-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800/40 pb-4">
                Customer Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={() => setFullNameTouched(true)}
                    className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:border-brand-red focus:bg-zinc-950/80 transition-colors focus:outline-none"
                  />
                  {fullNameTouched && !isNameValid && (
                    <p className="text-brand-red text-xs font-semibold mt-1">
                      {fullName.trim().length === 0 ? "Full Name is required" : "Full Name must be at least 3 characters"}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:border-brand-red focus:bg-zinc-950/80 transition-colors focus:outline-none"
                  />
                  {emailTouched && !isEmailValid && (
                    <p className="text-brand-red text-xs font-semibold mt-1">
                      Please enter a valid email address
                    </p>
                  )}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={() => setPhoneTouched(true)}
                    maxLength={10}
                    className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:border-brand-red focus:bg-zinc-950/80 transition-colors focus:outline-none"
                  />
                  {phoneTouched && !isPhoneValid && (
                    <p className="text-brand-red text-xs font-semibold mt-1">
                      Please enter a valid 10-digit mobile number
                    </p>
                  )}
                </div>
              </div>

              {/* Confirm Booking CTA Section */}
              <div className="pt-4 border-t border-zinc-800/40 flex justify-end">
                <Button
                  variant="primary"
                  size="lg"
                  disabled={!isFormValid}
                  onClick={() => {}}
                  className={`w-full sm:w-auto font-bold tracking-wider py-3.5 px-8 transition-all ${
                    isFormValid
                      ? 'shadow-md shadow-brand-red/10 cursor-pointer hover:scale-[1.02] bg-brand-red border-transparent text-white'
                      : 'bg-zinc-850 border-zinc-800 text-zinc-500 cursor-not-allowed opacity-40'
                  }`}
                >
                  Confirm Booking
                </Button>
              </div>
            </div>

          </div>

          {/* Right Column: Price Summary & Booking Notes */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* 3. Price Summary Block */}
            <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm space-y-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider border-b border-zinc-800/40 pb-4">
                Price Summary
              </h3>

              <div className="space-y-4">
                {/* Seat Breakdown */}
                <div className="space-y-2.5">
                  <span className="text-zinc-550 text-[10px] font-bold uppercase tracking-widest block mb-1">
                    Seat Charges
                  </span>
                  <div className="space-y-1.5 text-xs text-zinc-300 font-semibold">
                    <div className="flex justify-between">
                      <span>Regular ({regularCount} × ₹180)</span>
                      <span className="font-mono">₹{regularTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Premium ({premiumCount} × ₹250)</span>
                      <span className="font-mono">₹{premiumTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recliner ({reclinerCount} × ₹350)</span>
                      <span className="font-mono">₹{reclinerTotal}</span>
                    </div>
                  </div>
                </div>

                {/* Subtotals & Fees */}
                <div className="border-t border-zinc-800/60 pt-4 space-y-2.5 text-xs text-zinc-400 font-bold">
                  <div className="flex justify-between">
                    <span>Ticket Subtotal</span>
                    <span className="font-mono text-white">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Convenience Fee (₹30 per seat)</span>
                    <span className="font-mono text-white">₹{convenienceFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span className="font-mono text-white">₹{gst}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="border-t border-zinc-855 pt-4 flex justify-between items-center text-sm font-extrabold">
                  <span className="text-white uppercase tracking-wider">Grand Total</span>
                  <span className="text-brand-red font-mono text-lg font-black">₹{grandTotal}</span>
                </div>
              </div>
            </div>

            {/* 4. Booking Notes Section */}
            <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Booking Policy & Notes
              </h4>
              
              <ul className="space-y-2.5 text-xs text-zinc-400 list-disc pl-4 leading-relaxed font-semibold">
                <li>Tickets once booked cannot be cancelled.</li>
                <li>Arrive at least 15 minutes before showtime.</li>
                <li>Carry valid ID if required.</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;
