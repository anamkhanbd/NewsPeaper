import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-10">
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tighter uppercase text-gray-900">
              Get in <span className="text-emerald-600">Touch</span>
            </h1>
            <p className="text-gray-500 font-medium text-lg">
              Have a story tip or a question? We'd love to hear from you. Our team is here to help.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Email Us</h4>
                <p className="text-gray-500 text-sm">contact@newspeaper.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Call Us</h4>
                <p className="text-gray-500 text-sm">+1 (234) 567-890</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Visit Us</h4>
                <p className="text-gray-500 text-sm">123 News Street, Media City, NY 10001</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl text-sm outline-none transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                <input type="email" className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl text-sm outline-none transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Subject</label>
              <input type="text" className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl text-sm outline-none transition-all" placeholder="How can we help?" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Message</label>
              <textarea rows={6} className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl text-sm outline-none transition-all resize-none" placeholder="Your message here..."></textarea>
            </div>
            <button className="w-full py-4 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2">
              <Send className="h-5 w-5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
