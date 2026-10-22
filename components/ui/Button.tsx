import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
  external?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

const styles = {
  base: "pressable inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap disabled:opacity-50",
  primary: "bg-accent text-accent-fg hover:bg-[#d2f65a] shadow-[0_8px_30px_-10px_rgb(198_244_50/0.35)]",
  ghost: "bg-white/5 text-fg hover:bg-white/10",
  outline: "border border-line bg-transparent text-fg hover:bg-surface-2",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function Button({ href, variant = "primary", size = "md", className, children, external, onClick, ...rest }: Props) {
  const cls = cn(styles.base, styles[variant], styles[size], className);
  if (href) {
    if (external || href.startsWith("http"))
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
          {children}
        </a>
      );
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
