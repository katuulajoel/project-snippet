import { createConfirmation } from "react-confirm";
import GenericModal from "../GenericModal";

const confirm = createConfirmation(GenericModal);

export function openGenericModal(modalContent, options = {}, modalHeader) {
  return confirm({ modalHeader, modalContent, options: { ...options } });
}

function safeClassNameOptions(className, options) {
  let safeOptions = options || {};
  if (safeOptions.className) {
    safeOptions.className = `${className} ${safeOptions.className}`;
  } else {
    safeOptions.className = className;
  }
  return safeOptions;
}

export function openConfirm(
  body,
  title = null,
  canClose = false,
  options = null,
  header
) {
  return openGenericModal(
    body,
    {
      mustRespond: !canClose,
      title,
      ...safeClassNameOptions("modal-confirm", options),
    },
    header
  );
}

export function openModal(
  body,
  title = null,
  canClose = true,
  options = null,
  header = null,
  hideActions = true
) {
  return openGenericModal(
    body,
    {
      hideActions: hideActions,
      mustRespond: !canClose,
      title,
      ...(options || {}),
    },
    header
  );
}
