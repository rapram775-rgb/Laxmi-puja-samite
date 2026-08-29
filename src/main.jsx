import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { content as c } from './data/content';
import './styles.css';

const logo = '/assets/laxmi-logo.png';
const founderPhoto = '/assets/founder-jairam-yadav.png';

const memoryPhotos = [
  '/assets/memories/1787957118914.jpg',
  '/assets/memories/1787957125891.jpg',
  '/assets/memories/1787957129891.jpg',
  '/assets/memories/1787957147391.jpg',
  '/assets/memories/1787957362934.jpg',
  '/assets/memories/1787957643024.jpg',
  '/assets/memories/1787957805723.jpg',
  '/assets/memories/1787957814969.jpg',
  '/assets/memories/1787957823242.jpg'
];

function Logo({ footer = false }) {
  return <a className={`brand ${footer ? 'brandFooter' : ''}`} href="#home"><img src={logo} alt="Shree Laxmi Puja Committee logo"/><span>Shree Laxmi <b>Puja Committee</b></span></a>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [['Home','home'],['About','about'],['Committee','committee'],['Donor','donor'],['Program','program'],['Donation','donation'],['Memories','memories'],['Founder','founder'],['Contact','contact']];
  return <header className="navWrap"><nav><Logo/><button className="hamb" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <span className="icon">×</span> : <span className="icon">☰</span>}</button><div className={`navlinks ${open ? 'show' : ''}`}>{links.map(([name,id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{name}</a>)}<a className="navSupport" href="#donation">Support Puja <span className="arrow">→</span></a></div></nav></header>;
}

function Section({ id, eyebrow, title, subtitle, children, light = false }) {
  return <section id={id} className={light ? 'section light' : 'section'}><div className="container"><div className="sectionHead"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>{children}</div></section>;
}

const Photo = ({ label = 'Photo', className = '' }) => <div className={`photoPlaceholder ${className}`}><span>{label}</span></div>;

function Modal({ type, onClose }) {
  const isDonors = type === 'donors';
  const isCommittee = type === 'committee';
  return <div className="modalBackdrop" onMouseDown={onClose}><div className="modal" onMouseDown={e => e.stopPropagation()}><button className="modalClose" onClick={onClose}><span className="icon">×</span></button><span className="eyebrow">{isDonors ? 'Community Supporters' : isCommittee ? 'Leadership Team' : 'Transparency'}</span><h3>{isDonors ? 'Donor Name List' : isCommittee ? 'Committee Members' : 'Puja Expense'}</h3>{isCommittee ? <div className="modalList">{c.committee.map(([role,name],i)=><div key={i}><span>{role}</span><strong>{name}</strong></div>)}</div> : isDonors ? <div className="modalList">{c.donors.map(([deity,name],i)=><div key={i}><span>{deity}</span><strong>{name}</strong></div>)}</div> : <div className="expense"><div><span>Ritual & Puja Materials</span><b>[Amount]</b></div><div><span>Prasad & Food</span><b>[Amount]</b></div><div><span>Cultural Program</span><b>[Amount]</b></div><div><span>Venue & Decoration</span><b>[Amount]</b></div><div><span>Community Service</span><b>[Amount]</b></div><div className="total"><span>Total</span><b>[Total Amount]</b></div></div>}<p className="modalNote">Details can be updated by the committee whenever final records are available.</p></div></div>;
}

function App() {
  const [donorOpen, setDonorOpen] = useState(false);
  const [committeeOpen, setCommitteeOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [showAllDonors, setShowAllDonors] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [showAllMemories, setShowAllMemories] = useState(false);
  const [proofName, setProofName] = useState('');
  const [proofPreview, setProofPreview] = useState('');
  const [proofError, setProofError] = useState('');
  const [showFloatingActions, setShowFloatingActions] = useState(false);
  const visibleDonors = useMemo(() => showAllDonors ? c.donors : c.donors.slice(0,10), [showAllDonors]);

  useEffect(() => {
    const onScroll = () => setShowFloatingActions(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openWhatsApp = () => {
    window.open('https://wa.me/9779705422807', '_blank', 'noopener,noreferrer');
  };

  const callCommittee = () => {
    window.location.href = 'tel:+9779705422807';
  };

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const WhatsAppIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.52 3.48A11.83 11.83 0 0 0 12.08 0C5.54 0 .22 5.32.22 11.87c0 2.09.55 4.13 1.59 5.92L.12 24l6.35-1.66a11.86 11.86 0 0 0 5.61 1.43h.01c6.54 0 11.86-5.32 11.86-11.87 0-3.17-1.23-6.15-3.43-8.42ZM12.09 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.77.98 1.01-3.67-.23-.38a9.85 9.85 0 0 1-1.51-5.27C2.18 6.44 6.62 2 12.08 2c2.65 0 5.15 1.03 7.02 2.9a9.85 9.85 0 0 1 2.91 7.01c0 5.47-4.45 9.89-9.92 9.89Zm5.43-7.4c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.69.15-.2.3-.79.97-.97 1.17-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.5-1.76-1.68-2.06-.18-.3-.02-.46.13-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.69-1.65-.94-2.26-.25-.6-.5-.52-.69-.53h-.58c-.2 0-.53.08-.81.38-.28.3-1.06 1.04-1.06 2.54s1.09 2.95 1.24 3.15c.15.2 2.14 3.27 5.19 4.59.73.32 1.3.51 1.74.65.73.23 1.39.2 1.91.12.58-.09 1.77-.72 2.02-1.42.25-.69.25-1.29.18-1.42-.08-.13-.28-.2-.58-.35Z"/></svg>;
  const PhoneIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"/></svg>;
  const UpIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 4.5 4.75 11.75l1.5 1.5L11 8.5V20h2V8.5l4.75 4.75 1.5-1.5L12 4.5Z"/></svg>;

  return <>
    <Navbar/>
    <main>
      <section id="home" className="hero">
        <div className="heroBackdrop"></div><div className="heroRays"></div>
        <div className="container heroInner"><div className="heroText"><span className="eyebrow">Faith • Prosperity • Community</span><h1>Shree Laxmi<br/><em>Puja Mahotsav</em></h1><p>{c.hero.tagline}</p><div className="heroMeta"><span><span className="miniIcon">▣</span> {c.hero.date}</span><span><span className="miniIcon">⌖</span> {c.hero.location}</span></div><div className="heroActions"><a className="btn gold" href="#program">Explore Program <span className="arrow">→</span></a><a className="btn ghost" href="#donation">Support the Puja</a></div></div><div className="heroLogo"><div className="logoAura"></div><div className="chakraSpin" aria-hidden="true"></div><img src={logo} alt="Goddess Laxmi illustration"/><span className="blinkLid blinkLeft" aria-hidden="true"></span><span className="blinkLid blinkRight" aria-hidden="true"></span><div className="heroBadge">Shree Laxmi<br/><strong>Mahotsav</strong></div></div></div>
      </section>

      <Section
        id="about"
        eyebrow="Tradition • Faith • Service"
        title="Rooted in Tradition, United as a Community"
        subtitle="A shared tradition carried forward through faith, culture, unity and collective effort."
      >
        <div className="aboutGrid aboutGridUpdated">
          <div className="aboutVisual">
            <img className="aboutPujaImage" src="/assets/about-puja.jpg" alt="Shree Laxmi Puja celebration" loading="lazy" />
          </div>
          <div className="aboutCopy">
            <p>We, the youth of Rajbiraj–1, Chanaura, Rampur, have been organizing the Shree Laxmi Puja continuously for the past several years. For us, this is not merely a religious event; it is a celebration of our faith, culture, traditions, harmony, and social unity.</p>
            <p>Every year, we strive to make the Puja more organized, meaningful, and memorable than the year before. Supported by voluntary contributions and donations from our village and community, this celebration is not the initiative of any individual, but a shared effort and collective celebration of our entire community.</p>
            <p>Our purpose is to preserve and pass our religious and cultural traditions on to the younger generation, strengthen brotherhood and unity within our society, and build a distinct sense of identity and pride for our Rampur community.</p>
            <p>What began as a humble effort has now grown into a cherished tradition of our community, carried forward with peace, discipline, mutual respect, and collective spirit. With the continued support, blessings, and participation of everyone, we remain committed to making this tradition more meaningful, dignified, and memorable in the years to come.</p>
            <div className="aboutClosing">
              <h3>This is not just Laxmi Puja—</h3>
              <p>it is our faith, our culture, our unity, and our identity. 🙏</p>
              <strong>Jai Mata Laxmi.</strong>
            </div>
          </div>
        </div>
      </Section>

      <Section id="committee" eyebrow="Leadership • Service • Teamwork" title="Our Committee" subtitle="Meet the ten principal committee members who lead, organize and serve the Shree Laxmi Puja Mahotsav."><div className="committeeGrid">{c.committee.map(([role,name,image],i)=><article className="memberCard" key={i}>{image ? <div className="memberPhoto"><img src={image} alt={`${name} — ${role}`} loading="lazy"/></div> : <Photo label="Photos"/>}<div className="memberInfo"><strong className="memberRole">{role}</strong><h3>{name}</h3></div></article>)}</div><div className="centerAction"><button className="btn outlineDark" type="button" onClick={() => setCommitteeOpen(true)}>सदस्यहरू <span className="arrow">→</span></button></div></Section>

      <Section id="donor" eyebrow="Gratitude • Respect • Support" title="Our Donors" subtitle="Every contribution helps keep the festival welcoming, meaningful and sustainable.">
        <div className="donorGrid donorGridFinal">
          {visibleDonors.map(([deity,name,image],i)=>(
            <article className="donorCard" key={i}>
              <div className="deityPhoto">
                <img src={image} alt={`${deity} deity`} loading="lazy" />
                <span className="deityTag">{deity}</span>
              </div>
              <div className="donorInfo donorInfoFinal">
                <span>Donor By Name</span>
                <h3>{name}</h3>
                <p>Thank You for Supporting</p>
              </div>
            </article>
          ))}
        </div>
        <div className="centerAction">
          {!showAllDonors && <button className="btn outlineDark" type="button" onClick={() => setShowAllDonors(true)}>See More <span className="arrow">⌄</span></button>}
          {showAllDonors && <button className="btn outlineDark" type="button" onClick={() => setShowAllDonors(false)}>Show Less <span className="arrow rotate">⌄</span></button>}
        </div>
      </Section>

      <Section id="program" eyebrow="Schedule • Rituals • Celebration" title="Our Program" subtitle="Seven days of devotion, culture, celebration and community togetherness."><div className="programList">{c.program.map(([date,title,desc,icon],i)=><article className="programItem" key={i}><div className="programDate"><strong>{date}</strong></div><div className="programBody"><div className="programContent"><span className="programIcon" aria-hidden="true">{icon}</span><div><span className="eyebrow">{date}</span><h3>{title}</h3><p>{desc}</p></div></div><span className="programPlace" aria-label="Program symbol">{icon}</span></div></article>)}</div></Section>

      <Section id="donation" eyebrow="SUPPORT • CONTRIBUTE • TRANSPARENCY" title="Make a Donation" subtitle="Support the Puja, share your contribution details and help us keep every donation transparent."><div className="donationGrid"><div className="donationFormCard"><span className="goldLabel">Donor Details</span><h3>Send Your Contribution Details</h3><p className="muted">After making your payment, submit your details and upload a payment screenshot or photo as proof.</p><form onSubmit={e => {e.preventDefault(); const fd = new FormData(e.currentTarget); const name = fd.get('name') || ''; const contact = fd.get('contact') || ''; const amount = fd.get('amount') || ''; const method = fd.get('method') || ''; const reference = fd.get('reference') || ''; const proof = proofName ? `Payment Proof: ${proofName}` : 'Payment Proof: Not uploaded'; const text = `Hello Shree Laxmi Puja Committee,\n\nDonor Name: ${name}\nPhone / Email: ${contact}\nDonation Amount: ${amount}\nPayment Method: ${method}\nMessage / Reference: ${reference}\n${proof}`; setFormSent(true); window.open(`https://wa.me/9779705422807?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');}}><label>Donor Name<input name="name" required placeholder="Your full name"/></label><label>Phone / Email<input name="contact" required placeholder="Phone number or email"/></label><label>Donation Amount<input name="amount" placeholder="Amount"/></label><label>Payment Method<select name="method" defaultValue=""><option value="" disabled>Select payment method</option><option>Bank Transfer</option><option>Digital Wallet</option><option>Cash</option><option>Other</option></select></label><label>Message / Reference<textarea name="reference" placeholder="Transaction reference or message"></textarea></label><label className="proofUpload">Payment Screenshot / Photo<input type="file" name="proof" accept="image/jpeg,image/png,image/webp" onChange={e => {const file = e.target.files?.[0]; setProofError(''); if (!file) {setProofName(''); setProofPreview(''); return;} if (file.size > 1024 * 1024) {e.target.value = ''; setProofName(''); setProofPreview(''); setProofError('Please upload an image of 1 MB or less.'); return;} setProofName(file.name); setProofPreview(URL.createObjectURL(file));}}/><span className="uploadHint">JPG, PNG or WEBP • Maximum 1 MB</span>{proofError && <small className="uploadError" role="alert">{proofError}</small>}</label>{proofPreview && <div className="proofPreview"><img src={proofPreview} alt="Selected payment proof preview"/><div><strong>Proof selected</strong><span>{proofName}</span></div></div>}<button className="btn gold full" type="submit">{formSent ? 'Sent to WhatsApp ✓' : 'Send Details'} <span className="arrow">→</span></button></form></div><div className="qrCard"><div className="qrIntro"><span className="goldLabel">Scan & Support</span><h3>Thank You for Supporting</h3><p>Scan the QR code to receive a simple message of gratitude from the Shree Laxmi Puja Committee.</p></div><div className="qrFrame"><img className="donationQr" src="/assets/donation-thank-you-qr.png" alt="QR code that displays Thank you so much"/><span className="qrScanHint">Scan to see: “Thank you so much ☺️”</span></div><div className="bankDetails"><div><span>Account Holder</span><b>{c.donation.account}</b></div><div><span>Bank</span><b>{c.donation.bank}</b></div><div><span>Account / Wallet</span><b>{c.donation.number}</b></div></div></div></div><div className="donationButtons"><button className="btn gold" onClick={() => setDonorOpen(true)}>Donor Name List <span className="arrow">→</span></button><button className="btn outlineDark" onClick={() => setExpenseOpen(true)}>View Puja Expense <span className="arrow">→</span></button></div></Section>

      <Section id="memories" eyebrow="Memories • Moments • History" title="Memories" subtitle="A collection of moments from our Puja celebrations and community gatherings."><div className="memoryGrid">{memoryPhotos.slice(0, showAllMemories ? memoryPhotos.length : 6).map((image,i)=><article className="memoryCard" key={image}><img src={image} alt={`Shree Laxmi Puja Committee memory ${i + 1}`} loading={i < 3 ? 'eager' : 'lazy'}/></article>)}</div><div className="centerAction"><button className="btn outlineDark" onClick={() => setShowAllMemories(!showAllMemories)}>{showAllMemories ? 'Show Less' : 'See More'} <span className={`arrow ${showAllMemories ? 'rotate' : ''}`}>⌄</span></button></div></Section>

      <Section id="founder" eyebrow="Vision • Contribution • Leadership" title="Founder" subtitle="The story behind the beginning of the Shree Laxmi Puja Committee."><div className="founderGrid"><div className="founderPhoto"><img src={founderPhoto} alt="Jairam Yadav, founder"/><div className="founderSeal" aria-label="Shree Laxmi Puja logo"><img src="/assets/laxmi-logo.webp" alt="Shree Laxmi Puja Committee logo"/></div></div><div className="founderCopy"><span className="eyebrow">The Beginning</span><span className="founderRole">Founder Name</span><h3>{c.founder.name}</h3><div className="founderStory">{c.founder.bio.map((paragraph,i)=><p key={i}>{paragraph}</p>)}</div><blockquote>“This is not just Laxmi Puja—it is our memory, our tradition, and a story that belongs to our entire village.”</blockquote><div className="signature">— Jairam Yadav · Founder’s Story</div></div></div></Section>

      <Section id="contact" eyebrow="CONTACT • LOCATION • PARTICIPATION" title="Find Us" subtitle="Visit the festival, contact the committee or send a message."><div className="contactGrid"><div><div className="mapPlaceholder"><iframe title="Shree Laxmi Puja Committee location" src="https://www.google.com/maps?q=Rajbiraj%20-1%20Rampur%2C%20Saptari%2C%20Nepal&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe><div className="mapOverlay"><strong>Shree Laxmi Puja Committee</strong><span>Rajbiraj - 1, Rampur, Saptari, Nepal</span><a className="mapLink" href="https://maps.app.goo.gl/DzUMSqZmYmLfy8S8A" target="_blank" rel="noreferrer">Get Directions <span className="arrow">↗</span></a></div></div></div><div className="contactSide"><div className="contactCards"><div><span className="iconBox"><span className="miniIcon">⌖</span></span><p><b>Address</b>{c.contact.address}</p></div><div><span className="iconBox"><span className="miniIcon">☎</span></span><p><b>Phone</b><a className="contactPhone" href={`tel:${c.contact.phone}`}>{c.contact.phone}</a></p></div><div><span className="iconBox"><span className="miniIcon">◷</span></span><p><b>Opening / Contact Hours</b>Sun – Sat: 10AM – 10PM</p></div></div><form className="contactForm" onSubmit={e => {e.preventDefault(); const fd = new FormData(e.currentTarget); const name = fd.get('name') || 'Hello'; const contact = fd.get('contact') || ''; const message = fd.get('message') || ''; const text = `Hello Shree Laxmi Puja Committee,\n\nName: ${name}\nPhone / Email: ${contact}\nMessage: ${message}`; window.open(`https://wa.me/9779705422807?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');}}><input name="name" required placeholder="Name"/><input name="contact" required placeholder="Phone / Email"/><textarea name="message" required placeholder="Message"></textarea><button className="btn gold" type="submit">Send Message <span className="arrow">→</span></button></form><div className="socialRow"><span>Contact us on WhatsApp</span><a href="https://wa.me/9779705422807" target="_blank" rel="noreferrer" aria-label="WhatsApp">◔</a><a href="tel:+9779705422807" aria-label="Phone">☎</a></div></div></div></Section>
    </main>
    <footer><div className="container footerGrid"><div><Logo footer/><p>Faith, prosperity and community — together in one sacred celebration.</p></div><div><h4>Quick Navigation</h4><a href="#about">About</a><a href="#committee">Committee</a><a href="#program">Program</a><a href="#donation">Donation</a><a href="#contact">Contact</a></div><div><h4>Contact</h4><p>{c.contact.phone}</p><p>{c.contact.email}</p><p>{c.contact.address}</p></div></div><div className="copyright">© 2026 Shree Laxmi Puja Committee · All rights reserved.</div></footer>
    {showFloatingActions && <div className="floatingActions" aria-label="Quick contact actions">
      <button type="button" onClick={openWhatsApp} title="WhatsApp" aria-label="Open WhatsApp"><WhatsAppIcon /></button>
      <button type="button" onClick={callCommittee} title="Call 9705422807" aria-label="Call 9705422807"><PhoneIcon /></button>
      <button type="button" onClick={backToTop} title="Back to top" aria-label="Back to top"><UpIcon /></button>
    </div>}
    {committeeOpen && <Modal type="committee" onClose={() => setCommitteeOpen(false)}/>} {donorOpen && <Modal type="donors" onClose={() => setDonorOpen(false)}/>} {expenseOpen && <Modal type="expense" onClose={() => setExpenseOpen(false)}/>} 
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
