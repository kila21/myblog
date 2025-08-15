export function getFieldError(
  error: string | Record<string, string[]> | null,
  field: string
) {
    if (error && typeof error !== "string" && field in error) {            
        if (field === "non_field_errors") {
            return (error as Record<string, string[]>)[field][0];
        }
        return (error as Record<string, string[]>)[field]?.join(", ");
    }
  return null;
}