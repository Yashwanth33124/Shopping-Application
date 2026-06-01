import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Phone, Mail, MessageCircle, Clock, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import './HelpCenter.css';
import { getImgUrl } from '../../utils/imagePath';
import FastImage from '../../components/FastImage';

const FAQS = [
  { q: 'How do I place an order?', a: 'Browse products, add items to your bag, go to checkout and follow the payment steps.' },
  { q: 'How can I track my order?', a: 'Open the Orders section in your account or use the tracking link sent to your email.' },
  { q: 'How do I cancel an order?', a: 'Go to Orders, select the order and choose Cancel if eligible.' },
  { q: 'How can I request a refund?', a: 'Start a return from your Orders page or contact support with your order details.' },
  { q: 'Which payment methods are accepted?', a: 'We accept credit/debit cards, netbanking, UPI and popular wallets.' },
  { q: 'How do I change my delivery address?', a: 'Before shipping, edit the address at Checkout or in your Account -> Addresses.' },
  { q: 'What should I do if my payment fails?', a: 'Retry, check card details, or contact your bank. Contact support if problem persists.' },
  { q: 'How do I contact customer support?', a: 'Use Email, Phone, or Live Chat from this page.' }
];

const HelpCenter = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);
  const [dark, setDark] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    document.title = 'Help — VogueCart';
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return FAQS;
    const q = query.toLowerCase();
    return FAQS.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [query]);

  const sections = [
    { id: 'orders', title: 'Order Support', items: ['Track Orders','Cancel Orders','Return Orders','Exchange Products'], img: getImgUrl('/images/help-orders.avif') },
    { id: 'payments', title: 'Payment & Refund Help', items: ['Payment methods','Failed transactions','Refund processing time','Secure payments information'], img: getImgUrl('/images/help-payments.avif') },
    { id: 'shipping', title: 'Shipping & Delivery', items: ['Delivery timelines','Shipping charges','Delivery areas','Delayed shipments'], img: getImgUrl('/images/help-shipping.avif') },
    { id: 'contact', title: 'Contact Support', items: ['Email Support','Phone Support','Live Chat','Support Working Hours'], img: getImgUrl('/images/help-contact.avif') },
    { id: 'report', title: 'Report an Issue', items: ['Wrong Product Received','Damaged Product','Missing Product','Technical Website Issues'], img: getImgUrl('/images/help-report.avif') },
    { id: 'policies', title: 'Policies', items: ['Privacy Policy','Terms & Conditions','Return & Refund Policy'], img: getImgUrl('/images/help-policies.avif') }
  ];

  const scrollTo = (id) => {
    const el = containerRef.current?.querySelector(`#${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`help-page ${dark ? 'help-dark' : ''}`} ref={containerRef}>
      <header className="help-hero">
        <div className="hero-inner">
          <h1>How Can We Help You?</h1>
          <p>Find answers to common questions and get support.</p>

          <div className="help-search">
            <Search size={18} />
            <input
              aria-label="Search help"
              placeholder="Search FAQs and help articles"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="hero-actions">
            <button className="btn icon" onClick={() => scrollTo('contact')}><MessageCircle size={16}/> Live Chat</button>
            <button className="btn outline" onClick={() => scrollTo('contact')}><Phone size={16}/> Phone Support</button>
            <button className="btn outline" onClick={() => scrollTo('contact')}><Mail size={16}/> Email Support</button>
            <div className="theme-toggle">
              <label className="toggle">
                <input type="checkbox" checked={dark} onChange={() => setDark(s => !s)} />
                <span>Dark</span>
              </label>
            </div>
          </div>
        </div>
      </header>

      <main className="help-main">
        <section className="help-grid">
          <div className="left">
            <div className="cards">
              {sections.map(s => (
                <article key={s.id} className="help-card" onClick={() => scrollTo(s.id)}>
                  <div className="card-media">
                    <FastImage src={s.img} alt={s.title} />
                  </div>
                  <div className="card-body">
                    <h4>{s.title}</h4>
                    <p>{s.items.slice(0,3).join(' • ')}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="faqs">
              <h3>Frequently Asked Questions</h3>
              <div className="faq-list">
                {filtered.map((f, i) => (
                  <div key={i} className={`faq-item ${openIndex===i? 'open':''}`} onClick={() => setOpenIndex(openIndex===i?null:i)}>
                    <button className="q">{f.q}</button>
                    <div className="a">{f.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="right">
            <div className="support-panel">
              <h4>Order Support</h4>
              <ul>
                <li onClick={() => scrollTo('orders')}>Track Orders</li>
                <li onClick={() => scrollTo('orders')}>Cancel Orders</li>
                <li onClick={() => scrollTo('orders')}>Return Orders</li>
                <li onClick={() => scrollTo('orders')}>Exchange Products</li>
              </ul>
            </div>

            <div className="support-panel">
              <h4>Payment & Refund Help</h4>
              <ul>
                <li onClick={() => scrollTo('payments')}>Payment methods</li>
                <li onClick={() => scrollTo('payments')}>Failed transactions</li>
                <li onClick={() => scrollTo('payments')}>Refund processing time</li>
                <li onClick={() => scrollTo('payments')}>Secure payments information</li>
              </ul>
            </div>

            <div className="contact-box" id="contact">
              <h4>Contact Support</h4>
              <p><Mail size={14}/> Email: support@voguecart.example</p>
              <p><Phone size={14}/> Phone: +91 80000 00000</p>
              <p><Clock size={14}/> Hours: Mon–Sat 9:00–18:00</p>
              <button className="btn live" onClick={() => alert('Starting live chat...')}>Start Live Chat</button>
            </div>
          </aside>
        </section>

        {/* Detailed sections */}
        <section className="help-details">
          {sections.map(s => (
            <div className="detail-section" id={s.id} key={s.id}>
              <div className="detail-head">
                <h2>{s.title}</h2>
                <FastImage src={s.img} alt={s.title} />
              </div>
              <div className="detail-cards">
                {s.items.map((it, idx) => (
                  <div className="detail-card" key={idx}>
                    <div className="icon"><CheckCircle size={20}/></div>
                    <div>
                      <h5>{it}</h5>
                      <p>Helpful step-by-step guidance for {it.toLowerCase()} and common scenarios.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="policies" id="policies">
          <h3>Policies</h3>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Return & Refund Policy</li>
          </ul>
        </section>

        <footer className="help-footer">
          <p>Need more help? Contact our support team anytime.</p>
          <div className="footer-actions">
            <button className="btn outline" onClick={() => navigate('/contact')}>Contact Us</button>
            <button className="btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top</button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HelpCenter;
