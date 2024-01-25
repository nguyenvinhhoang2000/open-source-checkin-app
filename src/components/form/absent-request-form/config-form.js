import { SCHEMAS } from "@/components/schemas";

const ABSENT_FORM = {
  TYPE_ABSENT: { name: "absentType", label: "Type Absent" },

  REASON: { name: "reasonType", label: "Reason" },

  FORM_DATE: { name: "fromAt", label: "From" },

  TO_DATE: { name: "toAt", label: "To" },

  DESCRIPTION: { name: "description", label: "Description" },
};

const absentTypes = [SCHEMAS.REQUIRED_SELECT(ABSENT_FORM.TYPE_ABSENT.label)];

const reasonType = [SCHEMAS.REQUIRED_SELECT(ABSENT_FORM.REASON.label)];

const fromAt = [SCHEMAS.REQUIRED_INPUT(ABSENT_FORM.FORM_DATE.label)];

const toAt = [SCHEMAS.REQUIRED_INPUT(ABSENT_FORM.TO_DATE.label)];

const description = [SCHEMAS.REQUIRED_INPUT(ABSENT_FORM.DESCRIPTION.label)];

export { ABSENT_FORM, absentTypes, reasonType, description, fromAt, toAt };
