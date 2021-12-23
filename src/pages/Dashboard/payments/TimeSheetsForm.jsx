import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import useRightNav from "../../../layouts/RightSideNav/useRightNav";
import { generateUserIntials } from "../../../utils/stringUtils";
import { createTimesheet } from "../../../redux/actions/ProjectActions";
import { formatMonth } from "../../../utils/dateUtil";
import usePrevious from "../../../hooks/usePrevious";

const TimeSheetsForm = ({ timeSheet, project, currentYear, index }) => {
  const dispatch = useDispatch();
  const { isMakingRequest } = useSelector(({ Projects }) => Projects);
  const prevLoading = usePrevious(isMakingRequest.createTimeSheet);
  const { close, status } = useRightNav();
  const usersTimeSheets = timeSheet.data?.users || project.participation;
  const [sheetData, setSheetData] = useState(null);

  useEffect(() => {
    if (!status.collapsed) {
      setSheetData(
        usersTimeSheets.reduce(
          (prev, curr) => ({ ...prev, [curr.user.id]: curr.hours }),
          {}
        )
      );
    }
  }, [status]);

  useEffect(() => {
    if (prevLoading) {
      close();
    }
  }, [prevLoading]);

  const totalMonthlyHours = usersTimeSheets.reduce((prev, curr) => {
    return (
      prev +
      (curr.hours_per_week * 4 ||
        (project.payment_structure?.hours_per_week || 0) * 4)
    );
  }, 0);

  function sum(obj) {
    var sum = 0;
    for (var el in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, el) && obj[el] !== "") {
        sum += parseFloat(obj[el]);
      }
    }
    return sum;
  }

  const getUsersSheetData = () => {
    let users = [];
    for (let userSheet in sheetData) {
      users.push({
        user: { id: userSheet },
        hours: +sheetData[userSheet],
      });
    }
    return users;
  };

  const handleChange = (id, e) => {
    if (e.target.value === null) {
      return 0;
    }
    if (e.target.value > 100) {
      return 0;
    }
    const newObj = {};
    newObj[id] = e.target.value;
    setSheetData({ ...sheetData, ...newObj });
  };

  const onSave = () => {
    if (
      getUsersSheetData().length < usersTimeSheets.length &&
      !(timeSheet.data?.users.length > 0)
    ) {
      Swal.fire({
        icon: "error",
        text: "Please fill for all developers",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    let usersSheetData = getUsersSheetData();

    if (timeSheet.data?.users.length > 0) {
      const unchanged = usersTimeSheets
        .filter((user) => !user.has_invoice)
        .map((p) => `${p.user.id}`);
      usersSheetData = getUsersSheetData().filter((user) =>
        unchanged.includes(user.user.id)
      );
    }

    if (getUsersSheetData().length === 0) {
      return Swal.fire({
        icon: "error",
        text: "You cannot edit an already invoiced timesheet",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    dispatch(
      createTimesheet(
        {
          month: `${currentYear}-${formatMonth(index)}`,
          users: usersSheetData,
        },
        project.id
      )
    );
  };

  return (
    <Wrapper>
      <div className="header">
        <h4>
          {timeSheet.month}, {currentYear}
        </h4>
        <div
          className="arrow"
          onClick={() => {
            setSheetData(null);
            close();
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.75 5.25L5.25 18.75"
              stroke="#7F8C9F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.75 18.75L5.25 5.25"
              stroke="#7F8C9F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <h6>Fill out the timesheet for team members</h6>
      {usersTimeSheets.length > 0 ? (
        usersTimeSheets.map((userTimeSheet, idx) => (
          <div className="inp-div" key={idx}>
            <div className="user">
              <Avatar
                image={userTimeSheet.user?.avatar_url}
                initials={generateUserIntials(userTimeSheet.user)}
                size="dash"
                className={
                  !userTimeSheet.user?.avatar_url ? "avatar-initials" : ""
                }
              />
              {userTimeSheet.user.display_name} &#8212;{" "}
              <span style={{ color: "silver" }}>
                {userTimeSheet.user.is_developer ? "Developer" : "Designer"}
              </span>
            </div>
            <hr />
            <input
              required
              disabled={
                userTimeSheet.has_invoice ||
                currentYear !== new Date().getFullYear() ||
                (currentYear == new Date().getFullYear() &&
                  !(
                    new Date().getMonth() == index ||
                    new Date().getMonth() - 1 == index
                  ))
                  ? true
                  : false
              }
              value={sheetData ? sheetData[userTimeSheet.user.id] : ""}
              defaultValue={Math.trunc(userTimeSheet.hours)}
              onChange={(e) =>
                e.target.value >= 0 && handleChange(userTimeSheet.user.id, e)
              }
              type="number"
              placeholder="Enter total hours worked"
            />
            <span className="span-append">
              /
              {userTimeSheet?.hours_per_week * 4 ||
                userTimeSheet?.payment_structure?.hours_per_week * 4 ||
                0}{" "}
              total hrs
            </span>
          </div>
        ))
      ) : (
        <div>No Developer added to the project yet</div>
      )}
      {usersTimeSheets.length > 0 && (
        <div>
          <input
            className="total-input"
            name="total"
            required
            disabled={true}
            type="number"
            placeholder="Total"
          />
          <span className="span-append-total">
            {sum(sheetData) || 0}/{totalMonthlyHours} total hrs
          </span>
          <div className="btn-flex-end">
            {(new Date().getMonth() === index ||
              new Date().getMonth() - 1 === index) &&
              new Date().getFullYear() == currentYear && (
                <Button
                  className="timesheet"
                  onClick={() => onSave()}
                  disabled={isMakingRequest.createTimeSheet}
                >
                  {isMakingRequest.createTimeSheet
                    ? "Loading..."
                    : "Save timesheet"}
                </Button>
              )}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px;

  .header {
    display: flex;
  }

  h6 {
    margin-bottom: 30px;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .total-input {
    background: #f5f7fa;
    height: 40px;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 4px;
  }
  .btn-flex-end {
    display: flex;
    justify-content: flex-end;
  }

  input,
  input:focus {
    border: none !important;
    border-color: transparent !important;
    outline: none;
    width: 100%;
  }
  .span-append {
    position: absolute;
    right: 0px;
    transform: translateY(-50%);
    padding: 4px 16px;
    color: #777;
    border-radius: 8px;
    margin-top: 10px;
  }
  .span-append-total {
    position: absolute;
    right: 0%;
    transform: translateY(-50%);
    padding: 4px 40px;
    color: #777;
    border-radius: 8px;
    margin-top: 20px;
  }
  .inp-div {
    border: 1px solid #e3e9f2;
    border-radius: 4px;
    position: relative;
    padding: 11px 16px;
    margin-bottom: 16px;
    .user {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }

  .disabled {
    pointer-events: none;
    background: #fafafa !important;
  }
  .right-nav {
    background: #ffffff;
    display: absolute;
  }
  .rate {
    background: rgba(21, 26, 48, 0.05);
    padding: 5px 20px;
    border-radius: 20px;
  }
  .arrow {
    cursor: pointer;
    margin: 0 0 0 auto;
    height: 24px;
  }
  .sheet-flex {
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    border-radius: 6px;
    padding: 0px 20px;
    margin: 10px 0px;
  }

  .sheet-item-flex {
    display: flex;
  }
  button.timesheet {
    background: #da3451;
    border: none;
    box-shadow: none;
    border-radius: 4px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
  }

  .round {
    position: relative;
  }

  .round label {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 26px;
    left: 0;
    position: absolute;
    top: 0;
    width: 26px;
    margin-top: 2px;
  }

  .round label:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: "";
    height: 6px;
    left: 7px;
    opacity: 0;
    position: absolute;
    top: 8px;
    transform: rotate(-45deg);
    width: 12px;
  }

  .round input[type="checkbox"] {
    visibility: hidden;
  }

  .round input[type="checkbox"]:checked + label {
    background-color: #062e64;
    border-color: #062e64;
  }

  .round input[type="checkbox"]:checked + label:after {
    opacity: 1;
  }
`;

TimeSheetsForm.propTypes = {
  currentYear: PropTypes.number,
  index: PropTypes.number,
  project: PropTypes.shape({
    id: PropTypes.number,
    participation: PropTypes.any,
    payment_structure: PropTypes.shape({
      hours_per_week: PropTypes.number,
    }),
  }),
  timeSheet: PropTypes.shape({
    data: PropTypes.shape({
      users: PropTypes.array,
    }),
    month: PropTypes.any,
  }),
};

export default TimeSheetsForm;
