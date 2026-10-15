import { Timer } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import clothLabIcon from "@/assets/work/clothlab-icon.png";
import loudlyIcon from "@/assets/work/loudly-icon.png";
import omniaIcon from "@/assets/work/omnia-icon.png";
import type { ProjectId } from "@/content/site";

// Cloth Lab, OMNIA and Loudly have real app icons; the others get a tile in their own colour until theirs arrive.
const icons = {
  "cloth-lab": clothLabIcon,
  omnia: omniaIcon,
  loudly: loudlyIcon,
} as const;
const hasIcon = (id: ProjectId): id is keyof typeof icons => id in icons;
const tiles: Record<
  Exclude<ProjectId, keyof typeof icons>,
  { bg: string; Icon: typeof Timer }
> = {
  ting: { bg: "bg-accent text-white", Icon: Timer },
};

/** A project's app icon at `size` px (64 on the work cards, 44 in the stack panel). */
export function ProjectIcon({
  id,
  size = 64,
}: {
  id: ProjectId;
  size?: number;
}) {
  const box = { width: size, height: size, borderRadius: size / 4 };
  if (hasIcon(id))
    return (
      <Image
        src={icons[id]}
        alt=""
        width={size}
        height={size}
        style={box}
        // A hairline keeps light icons (OMNIA's cream tile) from melting into the page.
        className="shrink-0 self-start shadow-[0_0_0_1px_rgb(23_24_28/0.08)]"
      />
    );
  const { bg, Icon } = tiles[id];
  return (
    <span
      aria-hidden="true"
      style={box}
      className={`grid shrink-0 place-items-center self-start ${bg}`}
    >
      <Icon size={size * 0.46} />
    </span>
  );
}
