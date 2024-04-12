import { ZodFieldError } from "../types";

export function findMatchingFieldError(
  field: string,
  errors: ZodFieldError[]
): ZodFieldError | undefined {
  return errors.find((err) => err.field === field);
}
