import { GENDER } from "@/constants/gender";

const renderGender = (id) => GENDER.find((gender) => gender.id === id)?.label;

const TABLE_HEADED = [
  { key: "name", label: "Name" },
  {
    key: "gender",
    label: "Gender",
  },
  { key: "position", label: "Position" },
  {
    key: "branch",
    label: "Branch",
    child: { NAME: "name", ADDRESS: "address" },
  },
  { key: "email", label: "Email" },
  {
    key: "phoneNumber",
    label: "Phone",
  },
  { key: "note", label: "Note" },
];

export { renderGender, TABLE_HEADED };
