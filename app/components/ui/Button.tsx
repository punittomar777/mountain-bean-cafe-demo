import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_10px_30px_-12px_rgba(169,104,58,0.7)] hover:bg-accent-hover hover:-translate-y-0.5",
  secondary:
    "border border-border-strong bg-transparent text-foreground hover:border-accent hover:text-accent hover:bg-accent-soft",
  ghost: "text-foreground hover:text-accent",
  whatsapp:
    "bg-[#25D366] text-[#0b141a] shadow-[0_10px_30px_-12px_rgba(37,211,102,0.6)] hover:bg-[#20c65e] hover:-translate-y-0.5",
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type LinkProps = StyleProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className"
  >;

type NativeButtonProps = StyleProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className"
  >;

function classes(variant: Variant, size: Size, className?: string) {
  return [base, sizes[size], variants[variant], className]
    .filter(Boolean)
    .join(" ");
}

export default function Button(props: LinkProps | NativeButtonProps) {
  if (props.href !== undefined) {
    const {
      variant = "primary",
      size = "md",
      className,
      children,
      ...rest
    } = props;
    // Same-page anchors use a native <a>: next/link skips the scroll when the
    // URL already has that hash (e.g. clicking "Reserve a Table" twice), while
    // the browser re-scrolls and honours CSS smooth scroll + scroll-padding-top.
    if (rest.href.startsWith("#")) {
      return (
        <a className={classes(variant, size, className)} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link className={classes(variant, size, className)} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
