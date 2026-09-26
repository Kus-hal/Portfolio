import { stack } from "@/content/site";
import { Section } from "./Section";

export function Stack() {
  return (
    <Section id="stack" kicker={stack.kicker} heading={stack.heading}>
      <div className="grid gap-x-10 gap-y-[26px] min-[521px]:grid-cols-2 min-[821px]:grid-cols-3">
        {stack.groups.map(({ name, items }) => (
          <div key={name}>
            <h3 className="mb-3 font-display text-base font-semibold">
              {name}
            </h3>
            <ul className="flex flex-wrap gap-[7px]">
              {items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-line bg-surface px-[11px] py-1 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
