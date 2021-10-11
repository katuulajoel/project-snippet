import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../components/Avatar';
import { generateUserIntials } from '../../../components/utils/stringUtils';
import IconButton from '../../../components/IconButton';
import { openConfirm, openModal } from '../../../components/utils/modals';
import TestForm from './TestForm';
import { deleteResult, updateResult } from '../../../actions/TestResultsActions';
import ModalHeader from '../../../components/ModalHeader';
import { useDispatch } from 'react-redux';

const propTypes = {
  value: PropTypes.object,
  column: PropTypes.object,
};
const TableCells = (cell) => {
  const cellValues = cell.value;
  const user = cellValues.user_obj;
  const selectionKey = cell.selectionKey;

  const dispatch = useDispatch();

  const deleteTest = (result) => {
    openConfirm({
      message: `
          Are you sure you want to delete this result? This action is permanent and the results will be removed from the
          platform at once.
      `,
      options: {
        ok: 'Yes, delete',
        cancel: 'No, go back',
      },
      header: <ModalHeader style={{ paddingBottom: '8px' }} options={{ title: 'Delete result' }} />,
    }).then(() => {
      deleteResult(result)(dispatch);
    });
  };

  const editTest = (result) => {
    openModal({
      body: <TestForm id="test-form" result={result} />,
      title: 'Edit Result',
      options: {
        className: 'modal-tests',
        ok: `Update`,
        cancel: 'Delete',
        form: {
          type: 'submit',
          form: `test-form`,
        },
        style: { maxWidth: '768px' },
      },
    }).then(
      (data) => {
        let result = data;
        Object.keys(data).forEach((key) => {
          if (!data[key]) {
            delete result[key];
          }
        });
        updateResult(result.id, result, selectionKey)(dispatch);
      },
      () => {
        deleteTest(result.id);
      }
    );
  };

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
