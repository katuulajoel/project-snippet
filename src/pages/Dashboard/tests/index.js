import React from "react";
import { useSelector } from "react-redux";
import { toggleRightNav } from "../../../actions/UtilityActions";
import DashboardLayout from "../../../layouts/DashboardLayout";
import TestsContainer from "./TestContainer";
import { deleteResult, fetchResults, updateResult } from "../../../actions/TestResultsActions";

const TestsPage = () => {
  const testResults = useSelector((state) => state.TestResults);
  const testResultsActions = { deleteResult, fetchResults, updateResult };

  return (
    <DashboardLayout>
      <TestsContainer
        TestResults={testResults}
        collapseRightNav={toggleRightNav}
        TestResultsActions={testResultsActions}
      />
    </DashboardLayout>
  );
};

export default TestsPage;
