import GenericModal from "../components/GenericModal";
import { createConfirmation } from "react-confirm";

export const confirm = createConfirmation(GenericModal);

export const openGenericModal = (modalContent, options = {}, modalHeader) => {
  return confirm({ modalHeader, modalContent, options: { ...options } });
};

const safeClassNameOptions = (className, options) => {
  let safeOptions = options || {};
  if (safeOptions.className) {
    safeOptions.className = `${className} ${safeOptions.className}`;
  } else {
    safeOptions.className = className;
  }
  return safeOptions;
};

export const openConfirm = ({
  message = null,
  title = "",
  canClose = true,
  options = { ok: "Yes", cancel: "Cancel" },
  header = null,
} = {}) => {
  return openGenericModal(
    message,
    {
      mustRespond: !canClose,
      title,
      ...safeClassNameOptions("modal-confirm", options),
    },
    header
  );
};

export const openModal = ({
  body = null,
  title = "",
  canClose = true,
  options = null,
  header = null,
  hideActions = false,
} = {}) => {
  return openGenericModal(
    body,
    {
      hideActions,
      mustRespond: !canClose,
      title,
      ...(options || {}),
    },
    header
  );
};
