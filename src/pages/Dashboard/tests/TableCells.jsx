import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../components/Avatar';
import { generateUserIntials } from '../../../utils/stringUtils';
import IconButton from '../../../components/IconButton';

const propTypes = {
  value: PropTypes.object,
  column: PropTypes.object,
};
const TableCells = (cell) => {
  const cellValues = cell.value;
  const user = cellValues.user_obj;
  const editTest = cell.editTest;

  switch (cell.column.id) {
    case 'user':
      return (
        <div>
          <Avatar
            image={user?.avatar_url}
            initials={generateUserIntials(user)}
            className={`avatar-dash ${user?.avatar_url ? 'avatar-icon' : 'avatar-initials'}`}
          />
          {user.display_name}
          <div className="edit-action">
            <IconButton
              name="circle-edit-outline"
              size="main"
              className="btn-edit"
              onClick={() => {
                editTest(cellValues);
              }}
            />
          </div>
        </div>
      );
    case 'coding-tests':
      return (
        <div className="result">
          {cellValues.map((item, key) => {
            return (
              <span className={item.status} key={`coding-${item.stack}-${key}`}>
                {item.stack} - {item.result}
              </span>
            );
          })}
        </div>
      );
    case 'comms-check':
      return (
        <div className="result">
          <span className={cellValues.status}>{cellValues.result}</span>
        </div>
      );
    case 'mbti-profile':
      return (
        <div className="result">
          <span className="none" style={{ textTransform: 'uppercase' }}>
            {cellValues}
          </span>
        </div>
      );
    case 'iq-tests':
      return (
        <div className="result">
          <span className={cellValues.status}>{cellValues.result}</span>
        </div>
      );
    case 'sa-tests':
      return (
        <div className="result">
          <span className={cellValues.status}>{cellValues.result}</span>
        </div>
      );
    case 'code-of-conduct':
      return (
        <div className="result">
          <span className={cellValues.status}>{cellValues.result}</span>
        </div>
      );
    default:
      return null;
  }
};

TableCells.propTypes = propTypes;

export default TableCells;
