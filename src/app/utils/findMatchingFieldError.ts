import { ZodFieldError } from "../types";

// T is the type of field property
export function findMatchingFieldError<T extends string = string>(
  field: T,
  errors: ZodFieldError[]
): ZodFieldError | undefined {
  return errors.find((err) => err.field === field);
}
