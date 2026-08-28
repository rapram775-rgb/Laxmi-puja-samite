import { ArrowUpRight } from "lucide-react";
import { stories } from "../../data/content";
import { Reveal } from "../ui/Reveal";
import { SectionIntro } from "./SectionIntro";

export function StoriesSection() {
  return <section className="sf-section stories sf-section--surface" id="stories"><div className="sf-section-shell sf-section-shell--wide"><SectionIntro eyebrow="Insights" title="What we are learning while building." description="Practical notes on product design, software delivery, business systems, and technology—written from the work itself."/><div className="story-grid">{stories.map((story,index)=><Reveal className="story sf-card" delay={index*55} key={story.number}><div className="story__visual"><img src={story.image} alt={story.imageAlt} loading="lazy" width="1536" height="1024"/><span>{story.number}</span></div><div className="story__meta"><span>{story.category}</span><span>{story.readingTime}</span></div><h3>{story.title}</h3><p>{story.excerpt}</p><a href="#contact">Read the perspective <ArrowUpRight size={16}/></a></Reveal>)}</div></div></section>;
}
