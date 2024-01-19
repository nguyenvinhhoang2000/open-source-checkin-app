import { GENDER } from "@/constants/gender";
import replacePrefixPhoneNumber from "@/utils/format-phoneNumber";

const renderGender = (id) => GENDER.find((gender) => gender.id === id)?.label;

const TABLE_HEADED = [
  { key: "name", label: "Name" },
  {
    key: "gender",
    label: "Gender",
    format: (item) => renderGender(item),
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
    format: (item) =>
      replacePrefixPhoneNumber(item, { space: true, type: "0x" }),
  },
  { key: "note", label: "Note" },
];

export { renderGender, TABLE_HEADED };
