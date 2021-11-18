const Alert = (msg, success = true) => {
  const body = document.querySelector("body");

  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
  }

  let uuid = Date.now();
  const div = document.createElement("div");

  div.className = `alert alert-${success ? "success" : "danger"} toast-${uuid}`;
  div.innerHTML = msg;

  toastContainer.prepend(div);
  body.prepend(toastContainer);

  setTimeout(function () {
    let now = document.querySelector(`.toast-${uuid}`);
    // now.style.display = "none";
    if (now) {
      now.remove();
    }

    // Check if alerts are finished and remove toast container
    if (!document.querySelector(".alert")) {
      let toast = document.querySelector(".toast-container");
      toast.remove();
    }
  }, 5000);
};

export default Alert;
