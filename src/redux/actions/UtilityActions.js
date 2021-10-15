import { TOGGLE_RIGHT_NAV } from '../../configs/constants/ActionTypes';

export const toggleRightNav = (collapsed, contentType) => {
  return {
    type: TOGGLE_RIGHT_NAV,
    collapsed,
    contentType,
  };
};
