import { SpeakerHigh, Timer, Wallet } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import clothLabIcon from "@/assets/work/clothlab-icon.png";
import type { ProjectId } from "@/content/site";

// Cloth Lab has a real app icon; the others get a tile in their own colour until their icons arrive.
const tiles: Record<
  Exclude<ProjectId, "cloth-lab">,
  { bg: string; Icon: typeof Wallet }
> = {
  omnia: { bg: "bg-[#101114] text-[#e9c46a]", Icon: Wallet },
  loudly: { bg: "bg-[#1d2027] text-white", Icon: SpeakerHigh },
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
  if (id === "cloth-lab")
    return (
      <Image
        src={clothLabIcon}
        alt=""
        width={size}
        height={size}
        style={box}
        className="shrink-0 self-start"
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
