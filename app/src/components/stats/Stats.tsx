import { EntityStats } from "@/types/EntityStats";

export default function Stats({
  base,
  invested,
  bonus,
  capital,
}: {
  base: EntityStats;
  invested: EntityStats;
  bonus: EntityStats;
  capital: number;
}) {
  return (
    <div style={{ marginTop: "20px", padding: "20px", color: "black" }}>
      <h3 style={{ color: "white" }}>Entity Stats ({capital} capital)</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#e0e0e0" }}>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Stat
            </th>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                textAlign: "center",
              }}
            >
              Base
            </th>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                textAlign: "center",
              }}
            >
              Invested
            </th>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                textAlign: "center",
              }}
            >
              Bonus
            </th>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                textAlign: "center",
                backgroundColor: "#d4edda",
              }}
            >
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(base).map((statKey) => {
            const key = statKey as keyof EntityStats;
            const total = base[key] + invested[key] + bonus[key];

            return (
              <tr key={statKey}>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  <img
                    src={`/assets/images/stats/${key}.png`}
                    alt={key}
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "8px",
                      verticalAlign: "middle",
                    }}
                  />
                  {key}
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {base[key]}
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {invested[key]}
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {bonus[key]}
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    backgroundColor: "#d4edda",
                  }}
                >
                  {total}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
