import categories from "../categories";

// all income categories
const incomeCategories = categories.filter((inc) => inc.type === "income");

const BudgetMonthIncome = ({
  dataOfYearAndMonth,
  incomes,
  getMonthIncomeTotal,
}) => {
  // only categories of incomes with entries for given month and year
  const relevantIncomeCategories = [];
  incomeCategories.forEach((cat) => {
    if (incomes !== null) {
      incomes.forEach((inc) => {
        if (
          inc !== null &&
          cat.id === inc.category &&
          !relevantIncomeCategories.includes(cat)
        ) {
          relevantIncomeCategories.push(cat);
        }
      });
    }
  });

  // income total of given month and year
  let incomeTotal;
  if (dataOfYearAndMonth.length > 0) {
    incomeTotal = incomes.reduce((acc, rec) => {
      const total = acc + rec.amount;
      return parseFloat(total);
    }, 0);
  } else {
    incomeTotal = 0;
  }

  getMonthIncomeTotal(incomeTotal);

  return (
    <div className="budget-income-month-container">
      <h3>Einkommen</h3>
      <div className="budget-income-month-categories">
        {relevantIncomeCategories.map((inccat, index) => (
          <>
            <div
              key={`${relevantIncomeCategories.id}-${index}`}
              className="budget-income-month-category"
            >
              {inccat.name}
              {incomes.map(
                (inc, index) =>
                  inccat.id === inc.category && (
                    <div
                      key={`${inc.id}${index}-${inc.year}`}
                      className="budget-income-month-category-single"
                    >
                      <div className="budget-income-month-category-single-title">
                        {inc.title}
                      </div>
                      <div className="budget-income-month-category-single-amount">
                        € {inc.amount.toFixed(2)}
                      </div>
                    </div>
                  )
              )}
            </div>
          </>
        ))}
      </div>
      <hr />
      <div className="budget-income-month-total">
        <div className="budget-income-month-total-title">
          Summe aller Einnahmen
        </div>
        <div
          className="
              budget-income-month-total-amount"
        >
          € {incomeTotal.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default BudgetMonthIncome;
