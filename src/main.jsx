import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, CalendarDays, Check, ChevronDown, Copy, Heart, Landmark,
  Mail, MapPin, Menu, Phone, Quote, Sparkles, Users, X
} from 'lucide-react';
import { content as c } from './data/content';
import './styles.css';

const heroVideo = '/assets/laxmi-meditation.mp4';

const navItems = [
  ['Home', 'home'], ['About', 'about'], ['Committee', 'committee'], ['Donor', 'donor'],
  ['Program', 'program'], ['Donation', 'donation'], ['Memories', 'memories'],
  ['Founder', 'founder'], ['Contact', 'contact']
];

const SectionTitle = ({ eyebrow, title, nepali, light = false }) => (
  <div className="sectionTitle">
    <div className="eyebrowLine"><span className="eyebrowDot" />{eyebrow}<span className="eyebrowDot" /></div>
    <h2>{title}</h2>
    <p className="npTitle">{nepali}</p>
  </div>
);

const PhotoPlaceholder = ({ label = 'PHOTOS', className = '' }) => (
  <div className={`photoPlaceholder ${className}`}>
    <div className="photoFrame">
      <span>{label}</span>
      <small>Replace with official photo</small>
    </div>
  </div>
);

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navInner">
        <a className="brand" href="#home" onClick={() => setOpen(false)}>
          <span className="brandOm">ॐ</span>
          <span><strong>Laxmi Puja</strong><small>श्री लक्ष्मी पूजा समिति</small></span>
        </a>
        <button className="menuButton" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        <nav className={`navLinks ${open ? 'open' : ''}`}>
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="navCta" href="#donation" onClick={() => setOpen(false)}>Support Puja <ArrowRight /></a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <video className="heroVideo" autoPlay muted loop playsInline preload="metadata" poster="/assets/laxmi-hero-golden.webp" aria-hidden="true">
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="heroShade" />
      <div className="heroOrnament ornamentOne" />
      <div className="heroOrnament ornamentTwo" />
      <div className="container heroInner">
        <div className="heroContent">
          <div className="kicker"><Sparkles size={14} /> Shubh Deepawali <span>•</span> Shubh Laxmi Puja</div>
          <p className="heroNepali">शुभ दीपावली • शुभ लक्ष्मी पूजा</p>
          <h1><span>Shree Laxmi Puja</span><em>Mahotsav</em></h1>
          <p className="heroLead">A sacred celebration of <strong>faith, prosperity and togetherness.</strong></p>
          <p className="heroNepaliLead">श्रद्धा, समृद्धि र एकताको पवित्र उत्सव</p>
          <div className="heroMeta">
            <span><CalendarDays /> {c.hero.date.replace('मिति: ', 'Date: ')}</span>
            <span><MapPin /> {c.hero.location.replace('स्थान: ', 'Venue: ')}</span>
          </div>
          <div className="heroActions">
            <a className="btn btnGold" href="#program">View Program <ArrowRight /></a>
            <a className="btn btnGhost" href="#donation">Support the Puja <Heart /></a>
          </div>
          <div className="heroNote"><span /> Open to the community <b>•</b> सबैको हार्दिक स्वागत</div>
        </div>
      </div>
      <a className="scrollHint" href="#about"><span>Scroll to explore</span><ChevronDown /></a>
    </section>
  );
}

function About() {
  return <section id="about" className="section creamSection">
    <div className="container">
      <SectionTitle eyebrow="OUR TRADITION" title="About the Puja" nepali="हाम्रो पूजा बारे" />
      <div className="aboutGrid">
        <PhotoPlaceholder label="PHOTOS" className="largePhoto" />
        <div className="aboutCopy">
          <p className="leadText">Laxmi Puja is a meaningful religious and cultural tradition that brings our community together through devotion, service and shared celebration.</p>
          <p>{c.about.text}</p>
          <div className="featureGrid">
            {[
              [Heart, 'Collective Worship', 'सामूहिक पूजा'],
              [Landmark, 'Sacred Tradition', 'धार्मिक परम्परा'],
              [Users, 'Community Participation', 'समुदायको सहभागिता'],
              [Sparkles, 'Prasad Distribution', 'प्रसाद वितरण']
            ].map(([Icon, en, np]) => <div className="feature" key={en}><Icon /><span><strong>{en}</strong><small>{np}</small></span></div>)}
          </div>
        </div>
      </div>
    </div>
  </section>;
}

function Committee() {
  return <section id="committee" className="section wineSection">
    <div className="container">
      <SectionTitle eyebrow="THE TEAM" title="Puja Management Committee" nepali="पूजा व्यवस्थापन समिति" />
      <div className="committeeGrid">
        {c.committee.map(([role, name], i) => <article className="memberCard" key={i}>
          <div className="memberNumber">0{i + 1}</div>
          <div className="memberAvatar">ॐ</div>
          <span className="memberRole">{role} <b>•</b> Committee Member</span>
          <h3>{name}</h3>
          <p>{role}</p>
        </article>)}
      </div>
    </div>
  </section>;
}

function Donor() {
  return <section id="donor" className="section creamSection">
    <div className="container">
      <SectionTitle eyebrow="WITH GRATITUDE" title="Honouring Our Donor" nepali="श्री लक्ष्मी मूर्ति दाता" />
      <div className="donorGrid">
        <PhotoPlaceholder label="PHOTOS" className="donorPhoto" />
        <div className="donorCopy">
          <span className="goldPill">{c.donor.title} • DONOR</span>
          <h3>{c.donor.name}</h3>
          <p>{c.donor.text}</p>
          <p className="enMuted">With heartfelt gratitude to the donor family for supporting the sacred Laxmi Murti and helping keep this tradition alive.</p>
          <div className="ornamentRule"><span /> ✦ ✦ ✦ <span /></div>
        </div>
      </div>
    </div>
  </section>;
}

function Program() {
  return <section id="program" className="section wineSection">
    <div className="container narrow">
      <SectionTitle eyebrow="TIME • RITUAL • CELEBRATION" title="Puja Program" nepali="पूजा कार्यक्रम" />
      <div className="timeline">
        {c.program.map(([time, title, desc], i) => <article className="timelineItem" key={i}>
          <div className="timelineRail"><span>{String(i + 1).padStart(2, '0')}</span><i /></div>
          <div className="eventCard">
            <div className="eventTop"><time>{time}</time><span>PROGRAM {String(i + 1).padStart(2, '0')}</span></div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <small>Venue: [Add location] <b>•</b> स्थान: [यहाँ स्थान राख्नुहोस्]</small>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}

function Donation() {
  const rows = [['Account Holder', c.donation.account], ['Bank', c.donation.bank], ['Account Number', c.donation.number], ['Digital Wallet', c.donation.wallet], ['Phone', c.donation.phone]];
  const copyValue = async (value) => { try { await navigator.clipboard.writeText(value); } catch {} };
  return <section id="donation" className="section wineDeep">
    <div className="container">
      <SectionTitle eyebrow="SERVICE • SUPPORT • TRANSPARENCY" title="Support the Puja" nepali="पूजा सहयोग गर्नुहोस्" />
      <div className="donationGrid">
        <div className="bankCard">
          <div className="cardLabel">DONATION DETAILS</div>
          <h3>Make a contribution</h3>
          <p>पूजा आयोजनाका लागि आफ्नो इच्छाअनुसार सहयोग गर्नुहोस्।</p>
          <div className="detailRows">{rows.map(([label, value]) => <div className="detailRow" key={label}><span>{label}</span><strong>{value}</strong><button onClick={() => copyValue(value)} aria-label={`Copy ${label}`}><Copy size={15} /></button></div>)}</div>
        </div>
        <div className="qrCard">
          <div className="qrPlaceholder"><div className="qrPattern" /><span>QR</span></div>
          <div className="qrText"><span className="goldPill">SCAN & SUPPORT</span><h3>Support with QR</h3><p>QR Scan गरी पूजा आयोजनामा आफ्नो योगदान गर्नुहोस्।</p><a className="btn btnGold" href="#contact">Get Donation Info <ArrowRight /></a></div>
        </div>
      </div>
    </div>
  </section>;
}

function Memories() {
  return <section id="memories" className="section creamSection">
    <div className="container">
      <SectionTitle eyebrow="MEMORIES • MOMENTS • HISTORY" title="Past Puja Memories" nepali="विगतका पूजा सम्झनाहरू" />
      <div className="memoryGrid">{c.memories.map((year, i) => <article className="memoryCard" key={year}><PhotoPlaceholder label="PHOTOS" /><div className="memoryCaption"><span>PUJA YEAR</span><strong>{year}</strong><b>View memory <ArrowRight /></b></div></article>)}</div>
    </div>
  </section>;
}

function Founder() {
  return <section id="founder" className="section wineSection">
    <div className="container">
      <SectionTitle eyebrow="VISION • CONTRIBUTION • LEADERSHIP" title="Committee Founder" nepali="समिति संस्थापक" />
      <div className="founderGrid">
        <PhotoPlaceholder label="PHOTOS" className="founderPhoto" />
        <div className="founderCopy"><span className="goldPill">{c.founder.title} • FOUNDER</span><h3>{c.founder.name}</h3><p>{c.founder.bio}</p><blockquote><Quote />{c.founder.quote}</blockquote><p className="enMuted">Keeping faith, culture and community connected across generations is at the heart of this committee.</p></div>
      </div>
    </div>
  </section>;
}

function Contact() {
  return <section id="contact" className="section wineDeep">
    <div className="container">
      <SectionTitle eyebrow="CONNECT • VISIT • PARTICIPATE" title="Contact & Location" nepali="सम्पर्क तथा स्थान" />
      <div className="contactGrid">
        <div className="mapPlaceholder"><MapPin /><strong>Google Map</strong><span>{c.contact.map}</span><small>Map embed can be added here</small></div>
        <div className="contactSide">
          <div className="contactDetails">
            <div><MapPin /><span><b>Address</b>{c.contact.address}</span></div>
            <div><Phone /><span><b>Phone</b>{c.contact.phone}</span></div>
            <div><Mail /><span><b>Email</b>{c.contact.email}</span></div>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="formTwo"><input placeholder="Your name / नाम" /><input placeholder="Phone or Email / फोन वा इमेल" /></div>
            <textarea placeholder="Your message / तपाईंको सन्देश" />
            <button className="btn btnGold" type="submit">Send Message <ArrowRight /></button>
          </form>
        </div>
      </div>
    </div>
  </section>;
}

function Footer() {
  return <footer><div className="container footerGrid"><div><a className="brand footerBrand" href="#home"><span className="brandOm">ॐ</span><span><strong>Laxmi Puja</strong><small>श्री लक्ष्मी पूजा समिति</small></span></a><p>A sacred celebration of faith, prosperity and togetherness.</p><p>श्रद्धा, समृद्धि र एकताको पवित्र उत्सव।</p></div><div><h4>Quick Navigation</h4>{navItems.slice(1, 6).map(([n, id]) => <a key={id} href={`#${id}`}>{n}</a>)}</div><div><h4>Contact</h4><p>{c.contact.phone}</p><p>{c.contact.email}</p><a href="#contact">Visit contact section <ArrowRight /></a></div></div><div className="copyright">© 2026 Laxmi Puja Committee <span>•</span> Designed & Developed with devotion</div></footer>;
}

function App() {
  return <><Navbar /><main><Hero /><About /><Committee /><Donor /><Program /><Donation /><Memories /><Founder /><Contact /></main><Footer /></>;
}

createRoot(document.getElementById('root')).render(<App />);
