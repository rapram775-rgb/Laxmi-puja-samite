import { Reveal } from "../ui/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  level?: "h1" | "h2";
  align?: "left" | "center";
};

export function SectionIntro({ eyebrow, title, description, level = "h2", align = "left" }: Props) {
  const Heading = level;
  return (
    <Reveal className={`sf-section-heading sf-section-heading--${align}`}>
      <span className="sf-eyebrow-badge">{eyebrow}</span>
      <Heading className="sf-section-heading__title">{title}</Heading>
      {description && <p className="sf-section-heading__description">{description}</p>}
    </Reveal>
  );
}
