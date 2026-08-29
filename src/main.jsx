import React, { useMemo, useState } from 'react';
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
  return <div className="modalBackdrop" onMouseDown={onClose}><div className="modal" onMouseDown={e => e.stopPropagation()}><button className="modalClose" onClick={onClose}><span className="icon">×</span></button><span className="eyebrow">{isDonors ? 'Community Supporters' : 'Transparency'}</span><h3>{isDonors ? 'Donor Name List' : 'Puja Expense'}</h3>{isDonors ? <div className="modalList">{c.donors.map(([deity,name],i)=><div key={i}><span>{deity}</span><strong>{name}</strong></div>)}</div> : <div className="expense"><div><span>Ritual & Puja Materials</span><b>[Amount]</b></div><div><span>Prasad & Food</span><b>[Amount]</b></div><div><span>Cultural Program</span><b>[Amount]</b></div><div><span>Venue & Decoration</span><b>[Amount]</b></div><div><span>Community Service</span><b>[Amount]</b></div><div className="total"><span>Total</span><b>[Total Amount]</b></div></div>}<p className="modalNote">Details can be updated by the committee whenever final records are available.</p></div></div>;
}

function App() {
  const [donorOpen, setDonorOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [showAllDonors, setShowAllDonors] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [showAllMemories, setShowAllMemories] = useState(false);
  const [proofName, setProofName] = useState('');
  const [proofPreview, setProofPreview] = useState('');
  const [proofError, setProofError] = useState('');
  const visibleDonors = useMemo(() => showAllDonors ? c.donors : c.donors.slice(0,10), [showAllDonors]);

  return <>
    <Navbar/>
    <main>
      <section id="home" className="hero">
        <div className="heroBackdrop"></div><div className="heroRays"></div>
        <div className="container heroInner"><div className="heroText"><span className="eyebrow">Faith • Prosperity • Community</span><h1>Shree Laxmi<br/><em>Puja Mahotsav</em></h1><p>{c.hero.tagline}</p><div className="heroMeta"><span><span className="miniIcon">▣</span> {c.hero.date}</span><span><span className="miniIcon">⌖</span> {c.hero.location}</span></div><div className="heroActions"><a className="btn gold" href="#program">Explore Program <span className="arrow">→</span></a><a className="btn ghost" href="#donation">Support the Puja</a></div></div><div className="heroLogo"><div className="logoAura"></div><img src={logo} alt="Goddess Laxmi illustration"/><div className="heroBadge">Shree Laxmi<br/><strong>Mahotsav</strong></div></div></div>
      </section>

      <Section id="about" eyebrow="Tradition • Faith • Service" title="About Our Puja" subtitle="A celebration built around devotion, heritage and community."><div className="aboutGrid"><div className="aboutVisual"><Photo label="Photos"/><div className="aboutStamp"><span className="miniIcon">♥</span><span>Since<br/><b>[Year]</b></span></div></div><div className="aboutCopy"><p>{c.about.text}</p><div className="featureGrid"><div><span className="miniIcon">♥</span><h3>Collective Worship</h3><p>A shared spiritual experience for families and devotees.</p></div><div><span className="miniIcon">⌂</span><h3>Living Tradition</h3><p>Keeping cultural and religious practices meaningful.</p></div><div><span className="miniIcon">♙</span><h3>Community</h3><p>Bringing generations together through participation.</p></div><div><span className="miniIcon">◷</span><h3>Festival Spirit</h3><p>Rituals, aarti, prasad and cultural celebration.</p></div></div></div></div></Section>

      <Section id="committee" eyebrow="Leadership • Service • Teamwork" title="Our Committee" subtitle="Meet the people who help organize and serve the Mahotsav."><div className="committeeGrid">{c.committee.map(([role,name],i)=><article className="memberCard" key={i}><Photo label="Photos"/><div className="memberInfo"><span>{role}</span><h3>{name}</h3><p>Committee Member</p></div></article>)}</div></Section>

      <Section id="donor" eyebrow="Gratitude • Respect • Support" title="Our Donors" subtitle="Every contribution helps keep the festival welcoming, meaningful and sustainable."><div className="donorGrid">{visibleDonors.map(([deity,name,image],i)=><article className="donorCard" key={i}><div className="deityPhoto"><img src={image} alt={`${deity} deity`} loading="lazy"/><span className="deityTag">{deity}</span></div><div className="donorInfo"><span>Donor by Name</span><h3>{name}</h3><p>{deity} Puja Support</p></div></article>)}</div><div className="centerAction">{!showAllDonors && <button className="btn outlineDark" onClick={() => setShowAllDonors(true)}>See More <span className="arrow">⌄</span></button>}{showAllDonors && <button className="btn outlineDark" onClick={() => setShowAllDonors(false)}>Show Less <span className="arrow rotate">⌄</span></button>}</div></Section>

      <Section id="program" eyebrow="Schedule • Rituals • Celebration" title="Our Program" subtitle="A seven-day festival journey. Final timings and venues can be added later."><div className="programList">{c.program.map(([day,title,desc],i)=><article className="programItem" key={i}><div className="programDay">{String(i+1).padStart(2,'0')}<span>{day}</span></div><div className="programBody"><div><span className="eyebrow">{day}</span><h3>{title}</h3><p>{desc}</p></div><span className="programPlace">Venue: [Location]</span></div></article>)}</div></Section>

      <Section id="donation" eyebrow="SUPPORT • CONTRIBUTE • TRANSPARENCY" title="Make a Donation" subtitle="Support the Puja, share your contribution details and help us keep every donation transparent."><div className="donationGrid"><div className="donationFormCard"><span className="goldLabel">Donor Details</span><h3>Send Your Contribution Details</h3><p className="muted">After making your payment, submit your details and upload a payment screenshot or photo as proof.</p><form onSubmit={e => {e.preventDefault(); const fd = new FormData(e.currentTarget); const name = fd.get('name') || ''; const contact = fd.get('contact') || ''; const amount = fd.get('amount') || ''; const method = fd.get('method') || ''; const reference = fd.get('reference') || ''; const proof = proofName ? `Payment Proof: ${proofName}` : 'Payment Proof: Not uploaded'; const text = `Hello Shree Laxmi Puja Committee,\n\nDonor Name: ${name}\nPhone / Email: ${contact}\nDonation Amount: ${amount}\nPayment Method: ${method}\nMessage / Reference: ${reference}\n${proof}`; setFormSent(true); window.open(`https://wa.me/9779705422807?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');}}><label>Donor Name<input name="name" required placeholder="Your full name"/></label><label>Phone / Email<input name="contact" required placeholder="Phone number or email"/></label><label>Donation Amount<input name="amount" placeholder="Amount"/></label><label>Payment Method<select name="method" defaultValue=""><option value="" disabled>Select payment method</option><option>Bank Transfer</option><option>Digital Wallet</option><option>Cash</option><option>Other</option></select></label><label>Message / Reference<textarea name="reference" placeholder="Transaction reference or message"></textarea></label><label className="proofUpload">Payment Screenshot / Photo<input type="file" name="proof" accept="image/jpeg,image/png,image/webp" onChange={e => {const file = e.target.files?.[0]; setProofError(''); if (!file) {setProofName(''); setProofPreview(''); return;} if (file.size > 1024 * 1024) {e.target.value = ''; setProofName(''); setProofPreview(''); setProofError('Please upload an image of 1 MB or less.'); return;} setProofName(file.name); setProofPreview(URL.createObjectURL(file));}}/><span className="uploadHint">JPG, PNG or WEBP • Maximum 1 MB</span>{proofError && <small className="uploadError" role="alert">{proofError}</small>}</label>{proofPreview && <div className="proofPreview"><img src={proofPreview} alt="Selected payment proof preview"/><div><strong>Proof selected</strong><span>{proofName}</span></div></div>}<button className="btn gold full" type="submit">{formSent ? 'Sent to WhatsApp ✓' : 'Send Details'} <span className="arrow">→</span></button></form></div><div className="qrCard"><div className="qrIntro"><span className="goldLabel">Scan & Support</span><h3>Thank You for Supporting</h3><p>Scan the QR code to receive a simple message of gratitude from the Shree Laxmi Puja Committee.</p></div><div className="qrFrame"><img className="donationQr" src="/assets/donation-thank-you-qr.png" alt="QR code that displays Thank you so much"/><span className="qrScanHint">Scan to see: “Thank you so much ☺️”</span></div><div className="bankDetails"><div><span>Account Holder</span><b>{c.donation.account}</b></div><div><span>Bank</span><b>{c.donation.bank}</b></div><div><span>Account / Wallet</span><b>{c.donation.number}</b></div></div></div></div><div className="donationButtons"><button className="btn gold" onClick={() => setDonorOpen(true)}>Donor Name List <span className="arrow">→</span></button><button className="btn outlineDark" onClick={() => setExpenseOpen(true)}>View Puja Expense <span className="arrow">→</span></button></div></Section>

      <Section id="memories" eyebrow="Memories • Moments • History" title="Memories" subtitle="A collection of moments from our Puja celebrations and community gatherings."><div className="memoryGrid">{memoryPhotos.slice(0, showAllMemories ? memoryPhotos.length : 6).map((image,i)=><article className="memoryCard" key={image}><img src={image} alt={`Shree Laxmi Puja Committee memory ${i + 1}`} loading={i < 3 ? 'eager' : 'lazy'}/></article>)}</div><div className="centerAction"><button className="btn outlineDark" onClick={() => setShowAllMemories(!showAllMemories)}>{showAllMemories ? 'Show Less' : 'See More'} <span className={`arrow ${showAllMemories ? 'rotate' : ''}`}>⌄</span></button></div></Section>

      <Section id="founder" eyebrow="Vision • Contribution • Leadership" title="Founder" subtitle="The story behind the beginning of the Shree Laxmi Puja Committee."><div className="founderGrid"><div className="founderPhoto"><img src={founderPhoto} alt="Jairam Yadav, founder"/><div className="founderSeal">Founder<br/><b>Story</b></div></div><div className="founderCopy"><span className="eyebrow">The Beginning</span><span className="founderRole">Founder Name</span><h3>{c.founder.name}</h3><div className="founderStory">{c.founder.bio.map((paragraph,i)=><p key={i}>{paragraph}</p>)}</div><blockquote>“This is not just Laxmi Puja—it is our memory, our tradition, and a story that belongs to our entire village.”</blockquote><div className="signature">— Jairam Yadav · Founder’s Story</div></div></div></Section>

      <Section id="contact" eyebrow="CONTACT • LOCATION • PARTICIPATION" title="Find Us" subtitle="Visit the festival, contact the committee or send a message."><div className="contactGrid"><div><div className="mapPlaceholder"><iframe title="Shree Laxmi Puja Committee location" src="https://www.google.com/maps?q=Rajbiraj%20-1%20Rampur%2C%20Saptari%2C%20Nepal&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe><div className="mapOverlay"><strong>Shree Laxmi Puja Committee</strong><span>Rajbiraj - 1, Rampur, Saptari, Nepal</span><a className="mapLink" href="https://maps.app.goo.gl/DzUMSqZmYmLfy8S8A" target="_blank" rel="noreferrer">Get Directions <span className="arrow">↗</span></a></div></div></div><div className="contactSide"><div className="contactCards"><div><span className="iconBox"><span className="miniIcon">⌖</span></span><p><b>Address</b>{c.contact.address}</p></div><div><span className="iconBox"><span className="miniIcon">☎</span></span><p><b>Phone</b><a className="contactPhone" href={`tel:${c.contact.phone}`}>{c.contact.phone}</a></p></div><div><span className="iconBox"><span className="miniIcon">◷</span></span><p><b>Opening / Contact Hours</b>Sun – Sat: 10AM – 10PM</p></div></div><form className="contactForm" onSubmit={e => {e.preventDefault(); const fd = new FormData(e.currentTarget); const name = fd.get('name') || 'Hello'; const contact = fd.get('contact') || ''; const message = fd.get('message') || ''; const text = `Hello Shree Laxmi Puja Committee,\n\nName: ${name}\nPhone / Email: ${contact}\nMessage: ${message}`; window.open(`https://wa.me/9779705422807?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');}}><input name="name" required placeholder="Name"/><input name="contact" required placeholder="Phone / Email"/><textarea name="message" required placeholder="Message"></textarea><button className="btn gold" type="submit">Send Message <span className="arrow">→</span></button></form><div className="socialRow"><span>Contact us on WhatsApp</span><a href="https://wa.me/9779705422807" target="_blank" rel="noreferrer" aria-label="WhatsApp">◔</a><a href="tel:+9779705422807" aria-label="Phone">☎</a></div></div></div></Section>
    </main>
    <footer><div className="container footerGrid"><div><Logo footer/><p>Faith, prosperity and community — together in one sacred celebration.</p></div><div><h4>Quick Navigation</h4><a href="#about">About</a><a href="#committee">Committee</a><a href="#program">Program</a><a href="#donation">Donation</a><a href="#contact">Contact</a></div><div><h4>Contact</h4><p>{c.contact.phone}</p><p>{c.contact.email}</p><p>{c.contact.address}</p></div></div><div className="copyright">© 2026 Shree Laxmi Puja Committee · All rights reserved.</div></footer>
    <div className="floatingActions"><a href="#contact" title="WhatsApp">◔</a><a href="#contact" title="Phone"><span className="miniIcon">☎</span></a><a href="#home" title="Back to top">↑</a></div>
    {donorOpen && <Modal type="donors" onClose={() => setDonorOpen(false)}/>} {expenseOpen && <Modal type="expense" onClose={() => setExpenseOpen(false)}/>} 
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
