import { ABSENT_MODAL_NAME } from "@/constants/absent-form-name";

export default function seletecButtonPopupName(modalName, isEdit) {
  switch (modalName) {
    case ABSENT_MODAL_NAME.VIEW:
      return isEdit ? "Edit" : "OK";

    case ABSENT_MODAL_NAME.EDIT:
      return "Edit";

    case ABSENT_MODAL_NAME.CREATE:
      return "Save";

    default:
      return "OK";
  }
}
