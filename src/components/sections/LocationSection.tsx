import { ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const scaleForgeAddress = "Bhandari Residence, 6X6H+346, Pokhara 33700, Nepal";
const phoneNumber = "+977 9762770837";
const emailAddress = "scaleforgeit@gmail.com";
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(scaleForgeAddress)}&travelmode=driving`;
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent("ScaleForge IT, 6X6H+346, Pokhara, Nepal")}&output=embed&z=17`;

export function LocationSection() {
  return (
    <section className="sf-section location location--visit" id="location">
      <div className="location__ambient location__ambient--one" aria-hidden="true" />
      <div className="location__ambient location__ambient--two" aria-hidden="true" />
      <div className="location__orbit" aria-hidden="true" />

      <div className="sf-section-shell sf-section-shell--wide location__shell">
        <Reveal className="location__headline">
          <span className="location__eyebrow"><i /> FIND US IN POKHARA</span>
          <h2>Come say <em>hello.</em></h2>
          <p>Meet ScaleForge IT in Pokhara, or reach us online from anywhere. We are here for projects, ideas, and practical digital conversations.</p>
        </Reveal>

        <div className="location__main-grid">
          <Reveal className="location__info-card">
            <div className="location__card-top">
              <span className="location__card-icon"><MapPin size={21} /></span>
              <div>
                <span className="location__mini-label">SCALEFORGE IT</span>
                <h3>Our studio &amp; office</h3>
              </div>
            </div>

            <div className="location__details">
              <div className="location__detail">
                <span className="location__detail-icon"><MapPin size={18} /></span>
                <div>
                  <small>OUR LOCATION</small>
                  <p>{scaleForgeAddress}</p>
                </div>
              </div>

              <div className="location__detail">
                <span className="location__detail-icon"><MessageCircle size={18} /></span>
                <div>
                  <small>CALL / WHATSAPP</small>
                  <a href="https://wa.me/9779762770837" target="_blank" rel="noopener noreferrer">{phoneNumber}</a>
                </div>
              </div>

              <div className="location__detail">
                <span className="location__detail-icon"><Mail size={18} /></span>
                <div>
                  <small>EMAIL</small>
                  <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
                </div>
              </div>

              <div className="location__detail">
                <span className="location__detail-icon"><Clock3 size={18} /></span>
                <div>
                  <small>WORKING HOURS</small>
                  <p>Sun – Fri · 9:00 AM – 6:00 PM</p>
                  <span className="location__status"><i /> Available for consultations</span>
                </div>
              </div>
            </div>

            <div className="location__actions">
              <a className="sf-btn sf-btn--primary" href={directionsUrl} target="_blank" rel="noopener noreferrer">
                GET DIRECTIONS <ArrowUpRight size={17} />
              </a>
              <a className="location__whatsapp" href="https://wa.me/9779762770837" target="_blank" rel="noopener noreferrer">
                <Phone size={16} /> Call / WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal className="location__map-card" delay={90}>
            <div className="location__map-head">
              <div>
                <span className="location__mini-label">LOCATION</span>
                <strong>Pokhara, Nepal</strong>
              </div>
              <span className="location__map-live"><i /> MAP</span>
            </div>

            <div className="location__map-frame" aria-label={`Google Map showing ScaleForge IT at ${scaleForgeAddress}`}>
              <iframe
                className="location__iframe"
                title="ScaleForge IT location on Google Maps"
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <a className="location__map-link" href={directionsUrl} target="_blank" rel="noopener noreferrer">
              Open in Google Maps <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
