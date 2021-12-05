import categories from "../categories";

// all expense categories
const expenseCategories = categories.filter((exp) => exp.type === "expense");

const BudgetMonthExpense = ({
  dataOfYearAndMonth,
  expenses,
  getMonthExpenseTotal,
}) => {
  // only categories of expenses with entries for given month and year
  const relevantExpenseCategories = [];
  expenseCategories.forEach((cat) => {
    if (expenses !== null) {
      expenses.forEach((exp) => {
        if (
          cat.id === exp.category &&
          !relevantExpenseCategories.includes(cat)
        ) {
          relevantExpenseCategories.push(cat);
        }
      });
    }
  });

  // expense total of given month and year
  let expenseTotal;
  if (dataOfYearAndMonth.length > 0) {
    expenseTotal = expenses.reduce((acc, rec) => {
      const total = acc + rec.amount;
      return parseFloat(total);
    }, 0);
  } else {
    expenseTotal = 0;
  }

  getMonthExpenseTotal(expenseTotal);

  return (
    <div className="budget-expense-month-container">
      <h3>Ausgaben</h3>
      <div className="budget-expense-month-categories">
        {relevantExpenseCategories.map((expcat, index) => (
          <div
            key={`${relevantExpenseCategories.id}-${index}`}
            className="budget-expense-month-category"
          >
            {expcat.name}
            {expenses.map(
              (exp, index) =>
                expcat.id === exp.category && (
                  <div
                    key={`${exp.id}${index}-${exp.year}`}
                    className="budget-expense-month-category-single"
                  >
                    <div className="budget-expense-month-category-single-title">
                      {exp.title}
                    </div>
                    <div className="budget-expense-month-category-single-amount">
                      € {exp.amount.toFixed(2)}
                    </div>
                  </div>
                )
            )}
          </div>
        ))}
      </div>
      <hr />
      <div className="budget-expense-month-total">
        <div className="budget-expense-month-total-title">
          Summe aller Ausgaben
        </div>
        <div
          className="
              budget-expense-month-total-amount"
        >
          € {expenseTotal.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default BudgetMonthExpense;
