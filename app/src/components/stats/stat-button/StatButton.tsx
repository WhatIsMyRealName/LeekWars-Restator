export default function StatButton({
  name,
  amount,
  onClick,
  disabled,
}: {
  name: "add" | "minus";
  amount: number;
  onClick: (change: number) => void;
  disabled: boolean;
}) {
  const imgSrc =
    amount > 1
      ? `/assets/images/icons/${name}_${amount}.png`
      : `/assets/images/icons/${name}.png`;
  return (
    <img
      src={imgSrc}
      alt={name}
      style={{ cursor: disabled ? "not-allowed" : "pointer", marginLeft: 5 }}
      onClick={() => {
        if (!disabled) {
          onClick(name === "add" ? amount : -amount);
        }
      }}
    />
  );
}
