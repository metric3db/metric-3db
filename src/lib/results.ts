// Camera-local MPJPE (mm), lower is better. One source for the table and the headline tiles.
export const DATASETS = ["BEDLAM2", "CMU Panoptic", "HuMMan", "EgoBody"] as const;

export type Row = {
  name: string;
  note?: string;
  kind: "baseline" | "ours";
  color: string;
  values: number[];
};

export const COLORS = {
  sam: "#FFA033",
  rgb: "#4DB8FF",
  ground: "#82C860",
  depth: "#FF5C8A",
};

export const ROWS: Row[] = [
  { name: "SAM 3D Body", kind: "baseline", color: COLORS.sam, values: [266.7, 122.9, 76.7, 97.4] },
  { name: "SAM 3D Body + depth correction", kind: "baseline", color: COLORS.sam, values: [184.5, 102.0, 52.7, 70.2] },
  { name: "Ours (RGB)", kind: "ours", color: COLORS.rgb, values: [188.2, 104.6, 81.2, 90.1] },
  { name: "Ours (RGB + Ground)", kind: "ours", color: COLORS.ground, values: [147.0, 78.5, 50.1, 96.0] },
  { name: "Ours (RGB-D)", kind: "ours", color: COLORS.depth, values: [166.1, 98.5, 39.7, 47.5] },
];

// Best of our modes against the plain SAM 3D Body row, per dataset.
export function headline() {
  const base = ROWS[0];
  const ours = ROWS.filter((r) => r.kind === "ours");
  return DATASETS.map((dataset, j) => {
    const best = ours.reduce((a, b) => (b.values[j] < a.values[j] ? b : a));
    return {
      dataset,
      mode: best.name.replace(/^Ours \((.*)\)$/, "$1"),
      color: best.color,
      from: base.values[j],
      to: best.values[j],
      drop: Math.round((1 - best.values[j] / base.values[j]) * 100),
    };
  });
}
