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

export { TABLE_HEADED };
