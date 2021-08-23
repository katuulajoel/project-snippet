export const getPaymentsFilters = (filter) => {
  switch (filter) {
    case "paid":
      return { paid: "True" };
    case "pending":
      return { paid: "False", overdue: "False" };
    case "overdue":
      return { overdue: "True", paid: "False" };
    case "archived":
      return { archived: "True" };
    default:
      return {};
  }
};
