import { Button } from "@/components/ui/button";

export default function ReservationsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-8 py-24">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-serif mb-12 text-center">Make a Reservation</h1>
          
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="date" className="block mb-2">Date</label>
                <input
                  type="date"
                  id="date"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block mb-2">Time</label>
                <input
                  type="time"
                  id="time"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="guests" className="block mb-2">Number of Guests</label>
                <select
                  id="guests"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
                  required
                >
                  <option value="">Select number of guests</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="occasion" className="block mb-2">Occasion</label>
                <select
                  id="occasion"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
                >
                  <option value="">Select occasion</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="business">Business</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="notes" className="block mb-2">Special Requests</label>
              <textarea
                id="notes"
                rows={4}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white"
              ></textarea>
            </div>

            <div className="text-center">
              <Button type="submit" className="px-8 py-3 bg-white text-black uppercase">
                Book Now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 