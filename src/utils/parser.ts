export const parseStringOrArray = (val: unknown): string[] => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    return val
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);
  }
  return [];
};
