import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Menu, X, Heart, MapPin, Phone, Mail, ArrowRight, Landmark, CalendarDays, Users, Clock3, ExternalLink, ChevronRight, Copy, Sparkles, IndianRupee, Instagram, Facebook, MessageCircle, Navigation, ArrowUp, CheckCircle2 } from 'lucide-react';
import { content as c } from './data/content';
import './styles.css';

const logo = '/assets/laxmi-logo.png';

function BilingualTitle({ english, nepali, prefix = 'Our ' }) {
  return <div className="bilingualTitle"><h2><span>{prefix}</span>{english}</h2><p>{nepali}</p></div>;
}

function Section({ id, eyebrow, english, nepali, children, light = false, className = '', prefix = 'Our ' }) {
  return <section id={id} className={`${light ? 'light' : ''} ${className}`}>
    <div className="container">
      {eyebrow && <div className="sectionEyebrow">{eyebrow}</div>}
      <BilingualTitle english={english} nepali={nepali} prefix={prefix} />
      {children}
    </div>
  </section>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [['Home','home'],['About','about'],['Committee','committee'],['Donor','donor'],['Program','program'],['Donation','donation'],['Memories','memories'],['Founder','founder'],['Contact','contact']];
  return <nav className="navbar">
    <a className="brand" href="#home"><img src={logo} alt="Shree Laxmi Puja logo"/><span>Shree Laxmi Puja</span></a>
    <button className="hamb" aria-label="Open menu" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    <div className={`navlinks ${open ? 'show' : ''}`}>
      {links.map(([name,id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{name}</a>)}
      <a className="navdonate" href="#donation" onClick={() => setOpen(false)}>Support Puja <ArrowRight size={15}/></a>
    </div>
  </nav>;
}

function Hero() {
  return <section id="home" className="heroSection">
    <div className="heroGlow glowOne"/><div className="heroGlow glowTwo"/>
    <div className="heroPattern">ॐ</div>
    <div className="container heroInner">
      <div className="heroCopy">
        <div className="heroKicker"><Sparkles size={16}/> शुभ दीपावली • शुभ लक्ष्मी पूजा</div>
        <div className="heroTitleWrap"><h1>{c.hero.title}</h1><h2>{c.hero.nepaliTitle}</h2></div>
        <p className="heroLead">{c.hero.tagline}</p>
        <p className="heroDescription">A community celebration of devotion, tradition, gratitude and togetherness.</p>
        <div className="heroMeta"><span><CalendarDays/> {c.hero.date}</span><span><MapPin/> {c.hero.location}</span></div>
        <div className="heroActions"><a className="btn gold" href="#program">View Program <ArrowRight/></a><a className="btn outline" href="#donation">Support Puja</a></div>
      </div>
      <div className="heroLogoCard"><div className="logoRing"><img src={logo} alt="Laxmi Puja logo"/></div><span>श्रद्धा • समृद्धि • एकता</span><small>Faith • Prosperity • Unity</small></div>
    </div>
    <div className="scrollHint">Scroll to explore <ChevronRight size={15}/></div>
  </section>;
}

function AboutSection() {
  return <Section id="about" eyebrow={c.about.eyebrow} english={c.about.title} nepali={c.about.nepaliTitle} prefix="" light>
    <div className="aboutLayout">
      <div className="photoPlaceholder large"><span>Photos</span><small>About / Puja moments</small></div>
      <div className="aboutCopy"><p>{c.about.text}</p><p>{c.about.nepaliText}</p><div className="featureGrid">{c.about.highlights.map(([en,np],i)=><div className="feature" key={i}><div className="iconBox">{[Heart,Landmark,Users,CheckCircle2][i]({size:21})}</div><div><strong>{en}</strong><span>{np}</span></div></div>)}</div></div>
    </div>
  </Section>;
}

function CommitteeSection() {
  return <Section id="committee" eyebrow="OUR TEAM • हाम्रो टोली" english="Committee" nepali="पूजा व्यवस्थापन समिति" className="creamSection" light>
    <div className="committeeGrid">{c.committee.map(([role,np],i)=><article className="committeeCard" key={i}><div className="personPhoto"><span>Photos</span></div><div className="committeeBody"><h3>{role}</h3><p>{np}</p><small>Committee Member</small></div></article>)}</div>
  </Section>;
}

function DonorSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleDonors = showAll ? c.donors : c.donors.slice(0, 10);
  return <Section id="donor" eyebrow="GRATITUDE • आभार • सम्मान" english="Donor" nepali="दाता सम्मान">
    <p className="sectionIntro">Every contribution helps preserve the spirit of the festival. Each card below is ready for a donor photo and name when the real details are available.</p>
    <div className="donorGrid">{visibleDonors.map(([deity,np],i)=><article className="donorCard" key={i}><div className="donorPhoto"><span>Photos</span></div><div className="donorBody"><span className="deity">{deity}</span><strong>Donor Name</strong><small>{np}</small><div className="donorLine"/></div></article>)}</div>
    {!showAll && <button className="moreBtn" type="button" onClick={() => setShowAll(true)}>See More Donors <ArrowRight size={17}/></button>}
  </Section>;
}

function ProgramSection() {
  return <Section id="program" eyebrow="FESTIVAL SCHEDULE • समय • विधि • उत्सव" english="Program" nepali="७ दिने पूजा तथा सांस्कृतिक कार्यक्रम" prefix="" light>
    <div className="programIntro"><p>Seven days of prayer, preparation, culture, service and community celebration. Dates and venue details can be updated once finalized.</p></div>
    <div className="programGrid">{c.program.map(([day,title,desc],i)=><article className={`programCard ${i===2?'featured':''}`} key={day}><div className="dayBadge">{day}</div><div className="programNumber">0{i+1}</div><h3>{title}</h3><p>{desc}</p><span><Clock3 size={15}/> Schedule to be updated</span></article>)}</div>
  </Section>;
}

function DonationSection() {
  const [copied, setCopied] = useState('');
  const copy = (value, key) => { navigator.clipboard?.writeText(value); setCopied(key); setTimeout(() => setCopied(''), 1200); };
  const rows = [['Account Holder',c.donation.account],['Bank',c.donation.bank],['Account Number',c.donation.number],['Digital Wallet',c.donation.wallet],['Phone',c.donation.phone]];
  return <Section id="donation" eyebrow="DONATE • सेवा • सहयोग • पारदर्शिता" english="Donation" nepali="पूजा सहयोग" prefix="">
    <div className="donationLayout">
      <div className="donationInfo"><span className="miniLabel">SUPPORT THE PUJA</span><h3>Send your contribution details</h3><p>Please use the official payment details when provided, then share your donor information with the committee.</p><div className="detailRows">{rows.map(([k,v])=><div className="detailRow" key={k}><span>{k}</span><strong>{v}</strong><button type="button" aria-label={`Copy ${k}`} onClick={() => copy(v,k)}>{copied===k ? <CheckCircle2 size={16}/> : <Copy size={16}/>}</button></div>)}</div></div>
      <div className="qrPanel"><div className="qrPlaceholder"><span>QR</span><small>Payment QR</small></div><h3>Scan & Support</h3><p>Scan the official QR code to contribute to the puja.</p><span className="qrNote">QR will be replaced with the committee payment QR.</span></div>
    </div>
    <div className="donationActions"><button className="secondaryAction" type="button"><Users/> Donor Name List <ArrowRight/></button><button className="secondaryAction" type="button"><IndianRupee/> View Puja Expense <ArrowRight/></button></div>
  </Section>;
}

function MemoriesSection() {
  return <Section id="memories" eyebrow="MEMORIES • सम्झना • क्षण • इतिहास" english="Memories" nepali="विगतका पूजा तथा महोत्सवका झलकहरू" prefix="" light>
    <p className="sectionIntro dark">Past-year photos will be added here. The placeholders are intentionally kept as “Photos” until the committee provides the real gallery.</p>
    <div className="memoryGrid">{c.memories.map((year,i)=><article className="memoryCard" key={year}><div className="memoryPhoto"><span>Photos</span></div><div className="memoryCaption"><span>Festival Archive</span><strong>{year}</strong></div></article>)}</div>
  </Section>;
}

function FounderSection() {
  return <Section id="founder" eyebrow="VISION • CONTRIBUTION • LEADERSHIP" english="Founder" nepali="समिति संस्थापक" prefix="">
    <div className="founderLayout"><div className="photoPlaceholder founderPhoto"><span>Photos</span><small>Founder portrait</small></div><div className="founderCopy"><span className="miniLabel">{c.founder.title}</span><h3>{c.founder.name}</h3><p>{c.founder.bio}</p><p>{c.founder.nepaliBio}</p><blockquote>“A tradition becomes stronger when a community carries it forward together.”</blockquote></div></div>
  </Section>;
}

function ContactSection() {
  return <Section id="contact" eyebrow="CONTACT • सम्पर्क • स्थान • सहभागिता" english="Find Us" nepali="सम्पर्क तथा स्थान" prefix="" light>
    <div className="contactLayout"><div><div className="mapPlaceholder"><MapPin size={38}/><strong>Google Maps</strong><span>Map location will be added here</span></div><a className="directionBtn" href="#contact">Get Directions <ArrowRight/></a></div><div className="contactCards"><div className="contactCard"><div className="contactIcon"><MapPin/></div><div><strong>Address</strong><p>{c.contact.address}</p></div></div><div className="contactCard"><div className="contactIcon"><Phone/></div><div><strong>Phone</strong><p>{c.contact.phone}</p></div></div><div className="contactCard"><div className="contactIcon"><Clock3/></div><div><strong>Opening Hours</strong><p>{c.contact.hours}</p></div></div><div className="contactCard"><div className="contactIcon"><Mail/></div><div><strong>Email</strong><p>{c.contact.email}</p></div></div></div></div>
  </Section>;
}

function FloatingActions() { return <div className="floatingActions"><a className="float whatsapp" href="https://wa.me/9770000000000" aria-label="WhatsApp"><MessageCircle/></a><a className="float phone" href="tel:+9770000000000" aria-label="Phone"><Phone/></a><a className="float top" href="#home" aria-label="Back to top"><ArrowUp/></a></div>; }

function Footer() { return <footer><div className="container footerGrid"><div><div className="footerBrand"><img src={logo} alt="Laxmi Puja"/><div><strong>Shree Laxmi Puja</strong><span>श्री लक्ष्मी पूजा महोत्सव</span></div></div><p>Faith, prosperity and community — श्रद्धा, समृद्धि र एकता।</p></div><div><h4>Quick Navigation</h4><a href="#about">About</a><a href="#committee">Committee</a><a href="#donor">Donor</a><a href="#program">Program</a><a href="#donation">Donation</a></div><div><h4>Contact</h4><p>{c.contact.phone}</p><p>{c.contact.email}</p><div className="footerSocial"><Facebook/><Instagram/></div></div></div><div className="copyright">© 2026 Shree Laxmi Puja Committee • Designed for the community</div></footer>; }

function App() { return <><Navbar/><main><Hero/><AboutSection/><CommitteeSection/><DonorSection/><ProgramSection/><DonationSection/><MemoriesSection/><FounderSection/><ContactSection/></main><Footer/><FloatingActions/></>; }

createRoot(document.getElementById('root')).render(<App/>);
