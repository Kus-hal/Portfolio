export function Tags({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-[7px] ${className}`}>
      {items.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line bg-paper px-2.5 py-[3px] text-[12.5px] text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
