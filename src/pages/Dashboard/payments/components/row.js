export const tableData = (data) => [
  ...data?.map((invoice) => {
    let row = {
      batch_action: invoice,
      created_at: invoice.created_at,
      title: { title: invoice.title, project: invoice.project },
      invoice: {
        id: invoice.id,
        number: invoice.number,
        paid: invoice.paid,
        finalized: invoice.finalized,
        last_sent_at: invoice.last_sent_at,
      },
      amount: {
        total_amount: invoice.total_amount,
        amount: invoice.amount,
        type: invoice.type,
      },
      due_date: { due_at: invoice.due_at, paid: invoice.paid },
      status: {
        id: invoice.id,
        due_at: invoice.due_at,
        paid: invoice.paid,
      },
      actions: { ...invoice },
    };
    return row;
  }),
];
