import GenericModal from "../components/GenericModal";
import ModalContainer from "../ModalContainer";
import { confirmable, createConfirmation } from "react-confirm";

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

export function openConfirm({
  message = "",
  title = "",
  canClose = true,
  options = { ok: "Yes", cancel: "Cancel" },
  header = null,
} = {}) {
  return openGenericModal(
    message,
    {
      mustRespond: !canClose,
      title,
      ...safeClassNameOptions("modal-confirm", options),
    },
    header
  );
}

export function openModal({
  body = null,
  title = "",
  canClose = true,
  options = null,
  header = null,
  hideActions = false,
} = {}) {
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
}

export function createModal(
  title,
  confirmation,
  proceedLabel = "Save Settings",
  cancelLabel = "cancel",
  options = {}
) {
  return createConfirmation(confirmable(ModalContainer))({
    title,
    confirmation,
    proceedLabel,
    cancelLabel,
    ...options,
  });
}
