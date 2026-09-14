/*
 * Standard Indian veg / non-veg dietary mark: a coloured square outline with a
 * filled dot inside (green = vegetarian, maroon = non-vegetarian). Used on every
 * menu item so it reads as a real dietary system, not a decorative badge.
 */
interface DietMarkProps {
  veg: boolean;
  className?: string;
}

export default function DietMark({ veg, className }: DietMarkProps) {
  const color = veg ? "#3f7a4f" : "#9a2f2f";
  return (
    <span
      role="img"
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      className={["inline-grid shrink-0 place-items-center", className ?? ""]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: "0.85rem",
        height: "0.85rem",
        border: `1.5px solid ${color}`,
        borderRadius: 3,
      }}
    >
      <span
        aria-hidden
        style={{
          width: "0.4rem",
          height: "0.4rem",
          borderRadius: "9999px",
          backgroundColor: color,
        }}
      />
    </span>
  );
}
