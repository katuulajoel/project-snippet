import PropTypes from "prop-types";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { listTimesheets } from "../../../redux/actions/ProjectActions";
import { months } from "../../../configs/constants/projectConstants";
import useRightNav from "../../../layouts/RightSideNav/useRightNav";
import TimeSheetsForm from "./TimeSheetsForm";
import usePrevious from "../../../hooks/usePrevious";

const Timesheets = ({ currentYear }) => {
  const dispatch = useDispatch();
  const {
    timesheets: { results: timesheetResults },
    project,
    isMakingRequest,
  } = useSelector(({ Projects }) => Projects);
  const prevLoading = usePrevious(isMakingRequest.createTimeSheet);

  const { open } = useRightNav();

  useEffect(() => {
    dispatch(listTimesheets(project.id, currentYear));
  }, [currentYear, prevLoading]);

  const monthTimeSheetList = months.map((month, i) => {
    return {
      month,
      data: timesheetResults.find(
        (d) => parseInt(d.month.split("-")[1]) === i + 1
      ),
    };
  });

  return (
    <TimeSheetLayout>
      {monthTimeSheetList.map((monthTimeSheet, index) => (
        <div
          className={`sheet-flex 
          ${
            new Date().getMonth() < index &&
            new Date().getFullYear() == currentYear
              ? "disabled"
              : ""
          }`}
          key={index}
        >
          <div>{monthTimeSheet.month}</div>
          <div className="sheet-item-flex" key={monthTimeSheet}>
            {monthTimeSheet.data && (
              <div className="rate">
                <strong>{monthTimeSheet.data?.participant_used_hours}</strong>/
                {monthTimeSheet.data?.participant_total_hours} hrs
              </div>
            )}
            <div className="mx-4">
              <div className="round">
                <input
                  type="checkbox"
                  id={monthTimeSheet.month}
                  checked={
                    monthTimeSheet.data?.participant_used_hours ? true : false
                  }
                />
                <label htmlFor={monthTimeSheet.month}></label>
              </div>
            </div>
            <div
              className="arrow"
              onClick={() =>
                open(
                  <TimeSheetsForm
                    timeSheet={monthTimeSheet}
                    currentYear={currentYear}
                    project={project}
                    index={index}
                  />
                )
              }
            >
              <ArrowRight />
            </div>
          </div>
        </div>
      ))}
    </TimeSheetLayout>
  );
};

export function ArrowRight() {
  return (
    <div>
      <svg
        width="10"
        height="18"
        viewBox="0 0 10 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1.5L8.5 9L1 16.5"
          stroke="#7F8C9F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
const TimeSheetLayout = styled.div`
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
    right: 8px;
    transform: translateY(-50%);
    padding: 4px 16px;
    color: #777;
    border-radius: 8px;
    margin-top: 10px;
  }
  .span-append-total {
    position: absolute;
    right: 15%;
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
    width: 30rem;
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
    margin-top: 5px;
    margin-left: 20px;
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

Timesheets.propTypes = {
  currentYear: PropTypes.number,
};

export default Timesheets;
