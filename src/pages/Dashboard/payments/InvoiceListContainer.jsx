/* eslint-disable no-unused-vars */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

/* -------------------------- Internel Dependencies ------------------------- */
import Progress from "../../../components/Progress";
import { addPropsToChildren } from "../../../components/utils/children";
import {
  listInvoices,
  listMoreInvoices,
} from "../../../actions/InvoiceActions";
import usePrevious from "../../../hooks/usePrevious";
import {
  INVOICE_TYPE_SALE,
  INVOICE_TYPE_CREDIT_NOTE,
  INVOICE_TYPE_PURCHASE,
} from "../../../actions/utils/api";
import { getPaymentsFilters } from "./utils/utils";

const InvoiceListContainer = ({
  children,
  match: {
    params: { filter },
  },
  type, // invoice type
}) => {
  const { isMakingRequest, list } = useSelector(({ Invoice }) => Invoice);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(0); // react table pagination page
  const prevIsMakingRequest = usePrevious(isMakingRequest);
  const prevFilter = usePrevious(filter);

  useEffect(() => {
    getList();
  }, []);

  const getList = (prevFilters = {}) => {
    let filters_ = {
      ...getPaymentsFilters(filter),
      ...(type === "in"
        ? { types: [INVOICE_TYPE_SALE, INVOICE_TYPE_CREDIT_NOTE].join(",") }
        : { type: INVOICE_TYPE_PURCHASE }),
      ...prevFilters,
    };
    setFilters(filters_); // memoization of filters
    listInvoices(filters_)(dispatch);
  };

  useEffect(() => {
    if (prevFilter && prevFilter != filter) {
      setCurrentPage(0);
      getList();
    }

    if (
      prevIsMakingRequest &&
      Object.keys(prevIsMakingRequest).length > 0 &&
      !prevIsMakingRequest.list
    ) {
      // getList(filters);
    }
  }, [filter, prevIsMakingRequest]);

  const renderChildren = () => {
    return addPropsToChildren(children, {
      ...list,
      filter: filter,
      ...(type === "in"
        ? {
            onLoadMore: (page) => {
              let updatedFilters = { ...filters, page: page + 1 };
              if (page !== currentPage) {
                setCurrentPage(page);
                getList(updatedFilters);
              }
            },
            currentPage: currentPage,
          }
        : {
            onLoadMore: async (url) => {
              console.log(url, list.next);
              if (url !== list.next) {
                listMoreInvoices(url)(dispatch);
              }
              // listMoreInvoices(url)(dispatch);
            },
          }),
    });
  };

  return Object.keys(isMakingRequest).length > 0 ? (
    <Progress style={{ textAlign: "center" }} />
  ) : (
    renderChildren()
  );
};

InvoiceListContainer.propTypes = {
  type: PropTypes.string,
  types: PropTypes.any,
  match: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object]),
};

export default InvoiceListContainer;
