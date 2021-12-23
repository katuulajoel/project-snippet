import React, { useState } from "react";
import PropTypes from "prop-types";

const proptypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const NavContext = React.createContext([{}, () => {}]);

const NavProvider = (props) => {
  const [state, setState] = useState({
    collapsed: true,
    content: null,
  });
  return (
    <NavContext.Provider value={[state, setState]}>
      {props.children}
    </NavContext.Provider>
  );
};

NavProvider.propTypes = proptypes;

export { NavContext, NavProvider };
