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
import { getPaymentsFilters } from "../../../components/utils/payments";

const InvoiceListContainer = (props) => {
  const {
    children,
    match: {
      params: { filter },
    },
    types,
    type,
  } = props;
  const { isMakingRequest, list } = useSelector(({ Invoice }) => Invoice);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPageIndex, setLastPageIndex] = useState(0);
  const [useDefaultPageIndex, setuseDefaultPageIndex] = useState(false);
  const prevIsMakingRequest = usePrevious(isMakingRequest);
  const prevFilter = usePrevious(filter);

  useEffect(() => {
    getList();
  }, []);

  const getList = (prevFilters = {}) => {
    let filters_ = {
      ...getPaymentsFilters(filter),
      ...(types ? { types } : { type }),
      ...prevFilters,
    };
    console.log(filters_);
    setFilters(filters_); // memoization of filters
    listInvoices(filters_)(dispatch);
  };

  useEffect(() => {
    if (prevFilter && prevFilter != filter) {
      getList();
    }

    if (!(Object.keys(isMakingRequest).length === 0 || isMakingRequest?.list)) {
      getList(filters);
    }

    if (prevFilter != filter && lastPageIndex !== 0) {
      setuseDefaultPageIndex(true);
    }
  }, [filter, prevIsMakingRequest]);

  const renderChildren = () => {
    return addPropsToChildren(children, {
      ...list,
      onLoadMore: (page) => {
        // this is begin used by payments cause of pagination
        let updatedFilters = { ...filters, page: page + 1 };
        if (page !== currentPage) {
          setCurrentPage(page);
          getList(updatedFilters);
        }
      },
      fetchMoreInvoices: (url) => {
        // this is begin used by payouts cause it has no pagination
        if (url && url !== list.next) {
          listMoreInvoices(url);
        }
      },
      hasMore: !!list.next, // TODO: i dont think this is need
      trackPagination: (index) => {
        setLastPageIndex(useDefaultPageIndex ? 0 : index);
        if (useDefaultPageIndex) {
          setuseDefaultPageIndex(false);
        }
      },
      lastPageIndex: lastPageIndex,
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
