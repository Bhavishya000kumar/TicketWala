import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../hooks/useBooking';
import { useAuth } from '../hooks/useAuth';
import { offerService } from '../services/offer.service';
import { paymentService } from '../services/payment.service';
import Button from '../components/ui/Button';
import { Ticket, CreditCard, Tag, Check, AlertCircle, Sparkles, ChevronLeft, Calendar, MapPin, Clock } from 'lucide-react';

const Checkout = () => {
  const { booking, confirmBooking, clearBooking } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isPaying, setIsPaying] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);

  // Computations
  const subtotal = booking.totalAmount;
  const gst = Math.round(subtotal * 0.18);
  const totalAmount = subtotal + gst;
  const finalPayable = Math.max(50, totalAmount - discount);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode) return;
    setCouponError('');
    setCouponSuccess('');

    try {
      const res = await offerService.validateCoupon(couponCode, subtotal);
      setDiscount(res.discount);
      setCouponSuccess(res.message);
    } catch (err) {
      setCouponError(err.message);
      setDiscount(0);
    }
  };

  const handlePaymentSubmit = async () => {
    setIsPaying(true);
    
    const userDetails = {
      name: user?.name || 'CineVerse Guest',
      email: user?.email || 'guest@cineverse.com',
      phone: '9999999999'
    };

    const bookingDetails = {
      movie: booking.movie,
      date: booking.date,
      cinema: booking.cinema,
      showtime: booking.showtime,
      selectedSeats: booking.selectedSeats,
      totalAmount: finalPayable
    };

    const onSuccess = async (verifyResult) => {
      setIsPaying(false);
      
      // Store checkout receipt
      setTicketDetails({
        ...bookingDetails,
        id: verifyResult.id || 'CV_' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        paymentId: verifyResult.paymentId,
        paymentMethod: verifyResult.paymentMethod || 'Razorpay',
        bookingTime: new Date().toISOString()
      });
    };

    const onFailure = (error) => {
      setIsPaying(false);
      alert(`Payment checkout failed: ${error.message}`);
    };

    // Invoke Razorpay Integration flow
    await paymentService.processCheckout(
      bookingDetails,
      userDetails,
      onSuccess,
      onFailure
    );
  };

  if (!booking.movie || !booking.cinema || booking.selectedSeats.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <AlertCircle className="w-12 h-12 text-zinc-400 mx-auto" />
        <h1 className="text-2xl font-bold text-zinc-950 font-display">No Checkout Session</h1>
        <p className="text-sm text-zinc-500 max-w-sm mx-auto">Please select a movie and seating coordinates before checkout.</p>
        <Link to="/">
          <Button variant="primary">Return to Homepage</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 py-12 font-sans text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation back */}
        <Link to="/seats" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-800 transition-colors font-bold uppercase tracking-wider">
          <ChevronLeft className="w-4 h-4" />
          Back to Seat Selection
        </Link>

        {/* Success confirmation overlay (when ticketDetails exist) */}
        {ticketDetails ? (
          <div className="bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden max-w-xl mx-auto animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-zinc-950 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-6 h-6 text-green-500" />
                <span className="font-display font-bold text-lg">Booking Confirmed!</span>
              </div>
              <span className="text-xs bg-zinc-800 text-zinc-300 font-mono px-2.5 py-1 rounded">
                Ticket ID: {ticketDetails.id}
              </span>
            </div>

            {/* Ticket body */}
            <div className="p-6 space-y-6">
              <div className="flex gap-4 pb-4 border-b border-zinc-150">
                <img src={ticketDetails.movie.poster} alt={ticketDetails.movie.title} className="w-16 h-24 rounded-lg object-cover shadow-sm border border-zinc-200" />
                <div>
                  <h3 className="font-bold text-lg text-zinc-950 leading-snug">{ticketDetails.movie.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{ticketDetails.movie.genre}</p>
                  <p className="text-xs font-semibold text-zinc-700 mt-1.5">{ticketDetails.movie.duration}</p>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="text-xs text-zinc-400 block uppercase font-semibold">Cinema Venue</span>
                  <span className="font-bold text-zinc-800">{ticketDetails.cinema.name}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block uppercase font-semibold">Date & Showtime</span>
                  <span className="font-bold text-zinc-800">
                    {ticketDetails.date.fullDateString || ticketDetails.date.dateNum + ' ' + ticketDetails.date.monthLabel}
                    <br />
                    <span className="text-brand-red">{ticketDetails.showtime}</span>
                  </span>
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block uppercase font-semibold">Seat coordinates</span>
                  <span className="font-bold text-zinc-850 font-mono">{ticketDetails.selectedSeats.join(', ')}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block uppercase font-semibold">Payment Status</span>
                  <span className="font-bold text-green-700 flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Paid via {ticketDetails.paymentMethod}</span>
                  </span>
                </div>
              </div>

              {/* API notes */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 text-[11px] text-zinc-500 space-y-1">
                <p className="font-bold text-zinc-700">Production Integrations completed:</p>
                <p>• Razorpay Transaction: <span className="font-mono">{ticketDetails.paymentId}</span></p>
                <p>• Database Sync: Document generated and pushed to customer profile history.</p>
              </div>
            </div>

            {/* Footer actions */}
            <div className="bg-zinc-50 px-6 py-4.5 border-t border-zinc-150 flex gap-4">
              <Button variant="outline" className="flex-1 cursor-pointer" onClick={() => {
                clearBooking();
                navigate('/');
              }}>
                Book More
              </Button>
              <Button variant="secondary" className="flex-1 cursor-pointer" onClick={() => {
                clearBooking();
                navigate('/bookings');
              }}>
                View Tickets History
              </Button>
            </div>
          </div>
        ) : (
          /* Normal Checkout Review Layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left: Ticket Details Summary */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-zinc-950 flex items-center gap-2 border-b border-zinc-100 pb-4">
                  <Ticket className="w-5.5 h-5.5 text-brand-red" />
                  Review Ticket Reservation
                </h2>

                <div className="flex flex-col sm:flex-row gap-5">
                  <img src={booking.movie.poster} alt={booking.movie.title} className="w-28 aspect-[2/3] object-cover rounded-lg shadow-sm border border-zinc-200 shrink-0 mx-auto sm:mx-0" />
                  <div className="space-y-4 flex-grow text-left">
                    <div>
                      <h3 className="font-bold text-xl text-zinc-950">{booking.movie.title}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">{booking.movie.genre} • UA</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-zinc-700 bg-zinc-50 p-4.5 rounded-lg border border-zinc-200/65">
                      <div className="space-y-1">
                        <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Date</span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-brand-red shrink-0" />
                          <span>{booking.date.fullDateString || booking.date.dateNum + ' ' + booking.date.monthLabel}</span>
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Cinema</span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-brand-red shrink-0" />
                          <span className="truncate">{booking.cinema.name.split(',')[0]}</span>
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Show Time</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-brand-red shrink-0" />
                          <span>{booking.showtime}</span>
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Selected seats</span>
                      <p className="text-sm font-bold text-zinc-900 font-mono mt-1">
                        {booking.selectedSeats.join(', ')} ({booking.selectedSeats.length} ticket(s))
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coupon Panel */}
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-zinc-950 uppercase tracking-wider flex items-center gap-2">
                  <Tag className="w-4 h-4 text-brand-red" />
                  Promo Codes & Bank Vouchers
                </h3>
                
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code (e.g. CINECC20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="bg-zinc-50 border border-zinc-250 rounded-lg px-4 py-2.5 text-sm text-zinc-800 focus:outline-none focus:bg-white focus:border-brand-red w-full uppercase"
                  />
                  <Button type="submit" variant="secondary" className="shrink-0 font-bold px-6">
                    APPLY
                  </Button>
                </form>

                {couponError && <p className="text-xs text-red-600 font-bold">{couponError}</p>}
                {couponSuccess && <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                  <Sparkles className="w-4 h-4 fill-current text-green-500" />
                  {couponSuccess}
                </p>}

                {/* Offer list info */}
                <div className="pt-2">
                  <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider">Try Vouchers:</p>
                  <div className="flex gap-4.5 mt-2.5 text-xs text-zinc-600">
                    <div>
                      <code className="bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded font-mono font-bold">CINECC20</code>
                      <span className="text-[11px] text-zinc-400 block mt-0.5">20% Bank discount</span>
                    </div>
                    <div>
                      <code className="bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded font-mono font-bold">CINESTUDENT</code>
                      <span className="text-[11px] text-zinc-400 block mt-0.5">Rs 150 Student off</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bill details */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
                <h3 className="font-bold text-zinc-950 text-base uppercase tracking-wider border-b border-zinc-100 pb-3">Bill Details</h3>
                
                <div className="space-y-3.5 text-xs text-zinc-650 font-semibold">
                  <div className="flex justify-between">
                    <span>Ticket Cost ({booking.selectedSeats.length} seats)</span>
                    <span className="font-mono text-zinc-800">Rs. {subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Integrated CGST/SGST (18%)</span>
                    <span className="font-mono text-zinc-800">Rs. {gst}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>Voucher Discount Applied</span>
                      <span className="font-mono">- Rs. {discount}</span>
                    </div>
                  )}
                  <div className="border-t border-zinc-150 pt-4 flex justify-between text-sm font-extrabold text-zinc-900">
                    <span>Total Amount Payable</span>
                    <span className="font-mono text-brand-red text-base">Rs. {finalPayable}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full font-bold tracking-wider py-4 shadow-md shadow-brand-red/10 cursor-pointer flex items-center justify-center gap-1.5"
                  loading={isPaying}
                  onClick={handlePaymentSubmit}
                >
                  <CreditCard className="w-5 h-5" />
                  PAY NOW WITH RAZORPAY
                </Button>

                <p className="text-[10px] text-zinc-400 text-center leading-normal">
                  By clicking Pay Now, you agree to CineVerse Terms of Service. Booking fees is non-refundable.
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
