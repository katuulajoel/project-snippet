import PropTypes from "prop-types";
import React from "react";
import Button from "./Button";
import Progress from "./Progress";

const LoadMore = ({
  children,
  onLoadMore,
  hasMore = true,
  isLoadingMore = false,
  variant,
  size = "sm",
  type = "button",
}) => {
  return isLoadingMore ? (
    <Progress />
  ) : hasMore ? (
    <div className={`${type == "button" ? "text-center" : "text-link"}`}>
      <Button
        {...(variant ? { variant } : {})}
        {...(size ? { size } : {})}
        size="sm"
        onClick={onLoadMore}
      >
        {children || "Load More"}
      </Button>
    </div>
  ) : null;
};

LoadMore.propTypes = {
  children: PropTypes.string,
  hasMore: PropTypes.bool,
  isLoadingMore: PropTypes.bool,
  onLoadMore: PropTypes.any,
  size: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.any,
};

export default LoadMore;
