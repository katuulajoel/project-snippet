import { createConfirmation } from "react-confirm";
import GenericModal from "../components/GenericModal";

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
  message = "",
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

export const openAlert = (body, canClose = false, options = null) => {
  return openGenericModal(body, {
    hideCancel: true,
    mustRespond: !canClose,
    ...safeClassNameOptions("modal-alert", options),
  });
};
