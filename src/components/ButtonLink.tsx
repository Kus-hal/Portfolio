const base =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-[18px] py-[9px] text-[15px] font-medium transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.97]";

const variants = {
  solid: "border-transparent bg-ink text-paper hover:bg-accent",
  ghost: "border-line text-ink hover:border-ink",
} as const;

type ButtonLinkProps = React.ComponentProps<"a"> & {
  variant?: keyof typeof variants;
};

export function ButtonLink({
  variant = "solid",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
