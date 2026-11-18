export type FieldError = "name" | "email" | "empty" | "tooLong";
export type ContactState = {
  status: "idle" | "success" | "invalid" | "failed";
  errors: { name?: FieldError; email?: FieldError; message?: FieldError };
  values: { name: string; email: string; message: string };
};

export const initialContactState: ContactState = { status: "idle", errors: {}, values: { name: "", email: "", message: "" } };
