import { useState, type FormEvent } from "react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionIntro } from "./SectionIntro";

type Field = "name" | "email" | "projectType" | "message";
const types = ["Website", "Web Application", "Mobile Application", "Business Software", "AI Product", "Design / UX", "Other"];

export function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const n: Partial<Record<Field, string>> = {};
    if (!String(d.get("name") || "").trim()) n.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(d.get("email") || ""))) n.email = "Please enter a valid email address.";
    if (!d.get("projectType")) n.projectType = "Please choose a project type.";
    if (!String(d.get("message") || "").trim()) n.message = "Please tell us a little about the project.";
    setErrors(n);
    setStatus(Object.keys(n).length ? "Please review the highlighted fields." : "Thanks — your project brief is ready to connect to the preferred email/CRM service.");
  };
  const ep = (n: Field) => ({ "aria-invalid": !!errors[n], "aria-describedby": errors[n] ? `${n}-error` : undefined });
  return <form className="contact-form" onSubmit={submit} noValidate><div className="form-field"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" {...ep("name")}/>{errors.name&&<span id="name-error">{errors.name}</span>}</div><div className="form-field"><label htmlFor="email">Work email</label><input id="email" name="email" type="email" autoComplete="email" {...ep("email")}/>{errors.email&&<span id="email-error">{errors.email}</span>}</div><div className="form-field"><label htmlFor="company">Company <em>Optional</em></label><input id="company" name="company" autoComplete="organization"/></div><div className="form-field"><label htmlFor="projectType">What are you building?</label><select id="projectType" name="projectType" defaultValue="" {...ep("projectType")}><option value="" disabled>Select a project type</option>{types.map(t=><option key={t}>{t}</option>)}</select>{errors.projectType&&<span id="projectType-error">{errors.projectType}</span>}</div><div className="form-field form-field--wide"><label htmlFor="message">Tell us about the problem</label><textarea id="message" name="message" rows={6} placeholder="What are you trying to build, improve, or automate?" {...ep("message")}/>{errors.message&&<span id="message-error">{errors.message}</span>}</div><div className="contact-form__submit"><button className="sf-btn sf-btn--primary" type="submit">Send project brief <ArrowRight size={18}/></button><p role="status">{status}</p></div></form>;
}

export function ContactSection() {
  return <section className="sf-section contact" id="contact"><div className="sf-section-shell sf-section-shell--wide"><SectionIntro eyebrow="Contact ScaleForge" title="Tell us what you want to build." description="Whether you have a complete brief or only the first idea, start the conversation. We’ll help you find the clearest next step."/><div className="contact__layout"><Reveal className="contact__details"><div className="contact__detail"><span className="sf-icon-tile"><Mail size={19}/></span><div><small>Email</small><a href="mailto:scaleforgeit@gmail.com">scaleforgeit@gmail.com</a></div></div><div className="contact__detail"><span className="sf-icon-tile"><Phone size={19}/></span><div><small>Phone / WhatsApp</small><a href="tel:+9779762770837">+977 9762770837</a></div></div><div className="contact__detail"><span className="sf-icon-tile"><MapPin size={19}/></span><div><small>Location</small><span>Pokhara, Nepal · working with clients online</span></div></div></Reveal><Reveal delay={90}><ContactForm/></Reveal></div></div></section>;
}
