// import { isPayAdmin } from "../../../../components/utils/auth";

//TODO: check if use is pay admin to active batch actions, add ...isPayAdmin() && on line 6

export const getTableColumns = (filter) => [
  ...(!(filter === "archived" || filter === "paid")
    ? [
        {
          Header: " ",
          accessor: "batch_action",
        },
      ]
    : []),
  {
    Header: "Date Created",
    accessor: "created_at",
  },
  {
    Header: "Client / Project / Payment Title",
    accessor: "title",
  },
  {
    Header: "Invoice No.",
    accessor: "invoice",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  ...(filter !== "paid"
    ? [
        {
          Header: "Due Date",
          accessor: "due_date",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        ...(filter !== "archived"
          ? [
              {
                Header: "",
                accessor: "actions",
              },
            ]
          : []),
      ]
    : []),
];
