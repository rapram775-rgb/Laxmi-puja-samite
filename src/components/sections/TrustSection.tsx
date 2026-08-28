import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionIntro } from "./SectionIntro";

const values = ["Clear communication throughout the project", "Design and engineering treated as one discipline", "Practical technology choices over unnecessary complexity", "A product mindset that continues after launch"];

export function TrustSection() {
  return <section className="sf-section trust" id="trust"><div className="sf-section-shell sf-section-shell--wide"><SectionIntro eyebrow="Why Clients Work With Us" title="A small team can still bring a serious product mindset." description="We keep the team close to the work, the decisions visible, and the communication direct."/><div className="trust__grid"><Reveal className="trust__quote"><div className="trust__quote-mark">“</div><p>Good software should make the next step feel obvious.</p><span>ScaleForge product principle</span></Reveal><Reveal className="trust__proof" delay={80}>{values.map(v=><div key={v}><CheckCircle2 size={18}/><span>{v}</span></div>)}<a className="sf-btn sf-btn--secondary" href="#projects">See the work <ArrowUpRight size={17}/></a></Reveal></div></div></section>;
}
