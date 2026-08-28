import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
export function Reveal({ children, className="", delay=0 }: { children:ReactNode; className?:string; delay?:number }) {
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{ const node=ref.current; if(!node)return; if(!('IntersectionObserver' in window)){node.dataset.visible="true";return;} const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){node.dataset.visible="true";observer.disconnect();}},{threshold:.12}); observer.observe(node); return()=>observer.disconnect(); },[]);
  return <div ref={ref} className={`sf-reveal ${className}`} style={{"--reveal-delay":`${delay}ms`} as CSSProperties}>{children}</div>;
}
