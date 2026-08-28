import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import type { FormEvent } from "react";
import { Reveal } from "../ui/Reveal";

export function AppointmentSection() {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const whatsapp = String(form.get("whatsapp") || "").trim();
    const email = String(form.get("email") || "").trim();
    const business = String(form.get("business") || "").trim();
    const location = String(form.get("location") || "").trim();
    const message = String(form.get("message") || "").trim();

    const subject = encodeURIComponent(`New ScaleForge enquiry${business ? ` — ${business}` : ""}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `WhatsApp: ${whatsapp}`,
        `Email: ${email}`,
        `Business: ${business}`,
        `Location: ${location}`,
        "",
        "Project / requirement:",
        message,
      ].join("\n")
    );

    window.location.href = `mailto:scaleforgeit@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="sf-section appointment" id="appointment">
      <div className="appointment__glow appointment__glow--one" aria-hidden="true" />
      <div className="appointment__glow appointment__glow--two" aria-hidden="true" />
      <div className="appointment__orbit appointment__orbit--one" aria-hidden="true" />
      <div className="appointment__orbit appointment__orbit--two" aria-hidden="true" />

      <div className="sf-section-shell sf-section-shell--wide appointment__shell">
        <div className="appointment__intro">
          <span className="appointment__eyebrow"><i /> START A CONVERSATION</span>
          <h2>Have an idea? <em>Let’s build it.</em></h2>
          <p>
            Tell ScaleForge what you want to improve, launch, or build. Share a little context and
            our team will get back to you with the right next step.
          </p>

          <div className="appointment__contact-strip">
            <div>
              <span className="appointment__contact-icon"><MessageCircle size={17} /></span>
              <div><small>WHATSAPP</small><strong>Quick conversation</strong></div>
            </div>
            <div>
              <span className="appointment__contact-icon"><Mail size={17} /></span>
              <div><small>EMAIL</small><strong>scaleforgeit@gmail.com</strong></div>
            </div>
            <div>
              <span className="appointment__contact-icon"><MapPin size={17} /></span>
              <div><small>LOCATION</small><strong>Pokhara, Nepal</strong></div>
            </div>
          </div>
        </div>

        <Reveal className="appointment__form-wrap">
          <div className="appointment__form-head">
            <div>
              <span>PROJECT ENQUIRY</span>
              <h3>Tell us about your business.</h3>
            </div>
            <p>All fields are kept simple so you can explain the essentials without a long form.</p>
          </div>

          <form className="appointment__form" onSubmit={submit}>
            <div className="appointment__field">
              <label htmlFor="project-name">FULL NAME</label>
              <input id="project-name" name="name" type="text" placeholder="Your full name" autoComplete="name" required />
            </div>

            <div className="appointment__field">
              <label htmlFor="project-whatsapp">WHATSAPP NUMBER</label>
              <input id="project-whatsapp" name="whatsapp" type="tel" placeholder="+977 98XXXXXXXX" autoComplete="tel" required />
            </div>

            <div className="appointment__field">
              <label htmlFor="project-email">GMAIL / EMAIL</label>
              <input id="project-email" name="email" type="email" placeholder="you@gmail.com" autoComplete="email" required />
            </div>

            <div className="appointment__field">
              <label htmlFor="project-business">BUSINESS NAME</label>
              <input id="project-business" name="business" type="text" placeholder="Your business name" autoComplete="organization" required />
            </div>

            <div className="appointment__field appointment__field--location">
              <label htmlFor="project-location">LOCATION</label>
              <input id="project-location" name="location" type="text" placeholder="City, country" autoComplete="address-level2" required />
            </div>

            <div className="appointment__field appointment__field--wide">
              <label htmlFor="project-message">TELL US WHAT YOU NEED</label>
              <textarea
                id="project-message"
                name="message"
                placeholder="Tell us about your business, what you want to build or improve, and the result you want."
                rows={6}
                required
              />
            </div>

            <div className="appointment__submit">
              <button className="sf-btn sf-btn--primary" type="submit">
                SEND PROJECT ENQUIRY <ArrowUpRight size={17} />
              </button>
              <span>We’ll review your message and get back to you within 24 hours.</span>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
