import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <>
      {/* Dark hero */}
      <section className="pt-32 pb-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#228DC1] mb-4">Contact Us</p>
          <h1 className="font-serif-display text-[#0a1628] leading-tight mb-6" style={{ fontSize: '40px', lineHeight: 1.1 }}>
            Let&apos;s Start a Conversation
          </h1>
          <p className="text-[#0a1628]/60 text-[16px] max-w-xl font-normal leading-relaxed">
            Whether you have a project in mind or just want to explore what&apos;s possible, our experts are ready to help.
          </p>
        </div>
      </section>

      {/* Contact form + info grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 grid lg:grid-cols-2 gap-20">
          {/* Form */}
          <div>
            <h2 className="font-serif-display text-[#0a1628] mb-8" style={{ fontSize: '32px', lineHeight: 1.1 }}>Send Us a Message</h2>
            {submitted ? (
              <div className="p-8 bg-[#f0f5ff] border border-[#228DC1]/20 text-[#0a1628]">
                <p className="font-semibold text-lg mb-2">Thank you for getting in touch.</p>
                <p className="text-[#0a1628]/75 font-normal">A member of our team will respond within 2 business hours.</p>
              </div>
            ) : (
              <form
                aria-label="Contact form"
                onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="c-first" className="block text-xs font-semibold uppercase tracking-widest text-[#0a1628]/60 mb-2">First Name *</label>
                    <input id="c-first" required className="w-full border border-gray-200 px-4 py-3 text-sm text-[#0a1628] focus:outline-2 focus:outline-[#228DC1] bg-white" placeholder="Jane" />
                  </div>
                  <div>
                    <label htmlFor="c-last" className="block text-xs font-semibold uppercase tracking-widest text-[#0a1628]/60 mb-2">Last Name *</label>
                    <input id="c-last" required className="w-full border border-gray-200 px-4 py-3 text-sm text-[#0a1628] focus:outline-2 focus:outline-[#228DC1] bg-white" placeholder="Smith" />
                  </div>
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-xs font-semibold uppercase tracking-widest text-[#0a1628]/60 mb-2">Work Email *</label>
                  <input id="c-email" type="email" required className="w-full border border-gray-200 px-4 py-3 text-sm text-[#0a1628] focus:outline-2 focus:outline-[#228DC1] bg-white" placeholder="jane@company.com" />
                </div>
                <div>
                  <label htmlFor="c-org" className="block text-xs font-semibold uppercase tracking-widest text-[#0a1628]/60 mb-2">Organisation *</label>
                  <input id="c-org" required className="w-full border border-gray-200 px-4 py-3 text-sm text-[#0a1628] focus:outline-2 focus:outline-[#228DC1] bg-white" placeholder="Company name" />
                </div>
                <div>
                  <label htmlFor="c-interest" className="block text-xs font-semibold uppercase tracking-widest text-[#0a1628]/60 mb-2">Area of Interest</label>
                  <select id="c-interest" className="w-full border border-gray-200 px-4 py-3 text-sm text-[#0a1628] focus:outline-2 focus:outline-[#228DC1] bg-white">
                    <option value="">Select a topic</option>
                    <option>Private 5G / LTE Networks</option>
                    <option>Telecoms AI</option>
                    <option>Generative AI</option>
                    <option>Smart Cities</option>
                    <option>Consultancy</option>
                    <option>Engineering Services</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="c-message" className="block text-xs font-semibold uppercase tracking-widest text-[#0a1628]/60 mb-2">Message *</label>
                  <textarea id="c-message" required rows={5} className="w-full border border-gray-200 px-4 py-3 text-sm text-[#0a1628] focus:outline-2 focus:outline-[#228DC1] bg-white resize-none" placeholder="Tell us about your project or question..." />
                </div>
                <button type="submit" className="px-8 py-3.5 bg-[#228DC1] text-white text-[13px] font-medium tracking-wide hover:bg-[#1a6e99] transition-colors">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div>
            <h2 className="font-serif-display text-[#0a1628] mb-8" style={{ fontSize: '32px', lineHeight: 1.1 }}>Get in Touch Directly</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-[#228DC1] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#0a1628]/60 mb-1">Email</p>
                  <a href="mailto:info@awtg.co.uk" className="text-[#0a1628] font-medium hover:text-[#228DC1] transition-colors">info@awtg.co.uk</a>
                  <p className="text-sm text-[#0a1628]/60 mt-0.5 font-normal">Typically reply within 2 hours</p>
                </div>
              </div>
              <div className="flex gap-4">
                <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-[#228DC1] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#0a1628]/60 mb-1">Phone</p>
                  <a href="tel:+442074000000" className="text-[#0a1628] font-medium hover:text-[#228DC1] transition-colors">+44 (0) 207 400 0000</a>
                  <p className="text-sm text-[#0a1628]/60 mt-0.5 font-normal">Mon to Fri, 8:30am to 6:00pm GMT</p>
                </div>
              </div>
              <div className="flex gap-4">
                <FontAwesomeIcon icon={faLocationDot} className="w-5 h-5 text-[#228DC1] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#0a1628]/60 mb-1">Head Office</p>
                  <p className="text-[#0a1628] font-medium">London, United Kingdom</p>
                  <p className="text-sm text-[#0a1628]/60 mt-0.5 font-normal">Registered in England &amp; Wales</p>
                </div>
              </div>
              <div className="flex gap-4">
                <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-[#228DC1] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#0a1628]/60 mb-1">Response Time</p>
                  <p className="text-[#0a1628] font-medium">Within 2 business hours</p>
                  <p className="text-sm text-[#0a1628]/60 mt-0.5 font-normal">For urgent matters, please call</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-[#f7f8fa] border border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0a1628]/60 mb-3">Regional Offices</p>
              <div className="space-y-2 text-sm text-[#0a1628]/70 font-normal">
                <p>Manchester &mdash; Birmingham &mdash; Edinburgh</p>
                <p>Dubai &mdash; Singapore &mdash; Nairobi</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
