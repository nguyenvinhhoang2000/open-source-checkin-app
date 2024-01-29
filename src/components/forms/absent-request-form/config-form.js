import { SCHEMAS } from "@/components/schemas";

const ABSENT_FORM = {
  TYPE_ABSENT: {
    name: "absentType",
    label: "Type Absent",
    placeholder: "Select type",
  },

  REASON: {
    name: "reasonType",
    label: "Reason",
    placeholder: "Select reason",
  },

  FORM_DATE: {
    name: "fromAt",
    label: "From",
    placeholder: "Pick time",
  },

  TO_DATE: {
    name: "toAt",
    label: "To",
    placeholder: "Pick time",
  },

  DESCRIPTION: {
    name: "description",
    label: "Description",
    placeholder: "Enter your Description",
  },
};

const absentTypes = [
  SCHEMAS.RULE_REQUIRED_SELECT(ABSENT_FORM.TYPE_ABSENT.label),
];

const reasonType = [SCHEMAS.RULE_REQUIRED_SELECT(ABSENT_FORM.REASON.label)];

const fromAt = [SCHEMAS.RULE_REQUIRED_INPUT(ABSENT_FORM.FORM_DATE.label)];

const toAt = [SCHEMAS.RULE_REQUIRED_INPUT(ABSENT_FORM.TO_DATE.label)];

const description = [
  SCHEMAS.RULE_REQUIRED_INPUT(ABSENT_FORM.DESCRIPTION.label),
];

export { ABSENT_FORM, absentTypes, reasonType, description, fromAt, toAt };
