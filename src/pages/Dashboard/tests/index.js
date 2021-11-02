import React from "react";
import { useSelector } from "react-redux";
import { toggleRightNav } from "../../../redux/actions/UtilityActions";
import DashboardLayout from "../../../layouts/DashboardLayout";
import TestsContainer from "./TestContainer";

const TestsPage = () => {
  const testResults = useSelector((state) => state.TestResults);

  return (
    <DashboardLayout>
      <TestsContainer
        TestResults={testResults}
        collapseRightNav={toggleRightNav}
      />
    </DashboardLayout>
  );
};

export default TestsPage;
