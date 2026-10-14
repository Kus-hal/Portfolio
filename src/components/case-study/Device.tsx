import Image, { type StaticImageData } from "next/image";

/** A phone frame around a real screen. `children` sit on top of the screen (hotspots, overlays). */
export function Device({
  screen,
  alt,
  preload = false,
  className = "",
  sizes = "290px",
  children,
}: {
  screen: StaticImageData;
  alt: string;
  preload?: boolean;
  className?: string;
  sizes?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative aspect-[290/600] w-[290px] rounded-[46px] bg-[linear-gradient(145deg,#2a2c31,#0e0f11_60%)] p-2.5 shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.12),0_50px_80px_-40px_rgb(23_24_28/0.55),0_20px_30px_-24px_rgb(23_24_28/0.35)] ${className}`}
    >
      <div className="relative size-full overflow-hidden rounded-[37px] bg-paper">
        <Image
          src={screen}
          alt={alt}
          sizes={sizes}
          preload={preload}
          className="size-full object-cover object-top"
        />
        {children}
      </div>
    </div>
  );
}
