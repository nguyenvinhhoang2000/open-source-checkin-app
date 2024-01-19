import { formatPhoneUi } from "@/utils/format-phoneNumber";

export const formatInfo = (item, data, user) => {
  switch (item.key) {
    case "phoneNumber":
      return formatPhoneUi(user[item.key]).replace(
        /(\d{4})(\d{3})(\d{3})/,
        "$1 $2 $3",
      );

    case "branch":
      return `${user.branch.name}, ${user.branch.address}`;

    default:
      return user[item?.key];
  }
};
