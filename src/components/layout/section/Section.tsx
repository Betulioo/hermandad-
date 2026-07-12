import { cn } from "@/lib/utils/cn";

type SpacingVariant = "none" | "compact" | "default" | "spacious";

interface SectionProps {
  children: React.ReactNode;
  spacing?: SpacingVariant;
  className?: string;
  id?: string;
  as?: "section" | "div" | "article";
}

const spacingClasses: Record<SpacingVariant, string> = {
  none: "",
  compact: "py-8 md:py-12",
  default: "py-12 md:py-16",
  spacious: "py-16 md:py-24",
};

export function Section({
  children,
  spacing = "default",
  className,
  id,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag id={id} className={cn(spacingClasses[spacing], className)}>
      {children}
    </Tag>
  );
}
