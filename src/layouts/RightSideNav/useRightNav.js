import { useContext } from "react";
import { NavContext } from "./NavContext";

const useRightNav = () => {
  const [status, setStatus] = useContext(NavContext);

  function open(content = null) {
    setStatus({ ...status, collapsed: false, content });
  }

  function close() {
    setStatus({ ...status, collapsed: true });
  }

  return {
    status,
    setStatus,
    open,
    close,
  };
};

export default useRightNav;
