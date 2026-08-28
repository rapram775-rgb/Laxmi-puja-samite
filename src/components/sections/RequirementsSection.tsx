import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionIntro } from "./SectionIntro";

const checklist = ["What are you trying to improve?", "Who will use the product?", "What must the first version do?", "What systems already exist?", "What timeline and budget are you working with?"];

export function RequirementsSection() {
  return <section className="sf-section requirements" id="requirements"><div className="sf-section-shell sf-section-shell--wide"><SectionIntro eyebrow="Customer Requirements" title="Bring the problem. We’ll help shape the solution." description="You do not need a perfect technical brief. A clear explanation of the business problem is enough to start."/><div className="requirements__grid"><Reveal className="requirements__visual"><div className="requirements__window"><div className="requirements__window-bar"><span/><span/><span/><b>Project Brief / ScaleForge</b></div><div className="requirements__flow"><div className="flow-box flow-box--active">Business goal</div><ArrowRight/><div className="flow-box">User needs</div><ArrowRight/><div className="flow-box">Product system</div></div><div className="requirements__signal"><span>CLARITY</span><strong>→</strong><span>BUILD</span><strong>→</strong><span>VALUE</span></div></div></Reveal><Reveal className="requirements__copy" delay={90}><p className="requirements__lead">The first conversation is about outcomes—not jargon.</p><ul>{checklist.map((item)=><li key={item}><CheckCircle2 size={17}/>{item}</li>)}</ul><a className="sf-btn sf-btn--primary" href="#appointment">Start a project brief <ArrowRight size={17}/></a></Reveal></div></div></section>;
}
