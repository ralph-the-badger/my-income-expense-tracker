import { useState } from "react";
import BudgetMonthIncome from "./BudgetMonthIncome";
import BudgetMonthExpense from "./BudgetMonthExpense";

const BudgetMonthDisplay = ({ selectedYear, data, monthInformation }) => {
  // data for given month and year
  const dataOfYearAndMonth = [];
  for (const item of data) {
    if (
      item.date.getFullYear() === parseInt(selectedYear) &&
      item.date.getMonth() === monthInformation.monthId
    ) {
      const obj = {
        id: item.id,
        type: item.type,
        category: item.category,
        title: item.title,
        amount: parseFloat(item.amount),
        day: item.date.getDay(),
        month: item.date.getMonth(),
        year: item.date.getFullYear(),
      };
      dataOfYearAndMonth.push(obj);
    }
  }

  // all incomes and expenses for given month and year
  let incomes;
  let expenses;
  if (dataOfYearAndMonth.length > 0) {
    incomes = dataOfYearAndMonth.filter(
      (inc) => inc.type === "income" && inc.year === parseInt(selectedYear)
    );
    expenses = dataOfYearAndMonth.filter(
      (exp) => exp.type === "expense" && exp.year === parseInt(selectedYear)
    );
  } else {
    incomes = null;
    expenses = null;
  }

  // // all income and expense categories
  // const incomeCategories = categories.filter((inc) => inc.type === "income");
  // const expenseCategories = categories.filter((exp) => exp.type === "expense");

  // // only categories of incomes with entries for given month and year
  // const relevantIncomeCategories = [];
  // incomeCategories.forEach((cat) => {
  //   if (incomes !== null) {
  //     incomes.forEach((inc) => {
  //       if (
  //         inc !== null &&
  //         cat.id === inc.category &&
  //         !relevantIncomeCategories.includes(cat)
  //       ) {
  //         relevantIncomeCategories.push(cat);
  //       }
  //     });
  //   }
  // });

  // // only categories of expenses with entries for given month and year
  // const relevantExpenseCategories = [];
  // expenseCategories.forEach((cat) => {
  //   if (expenses !== null) {
  //     expenses.forEach((exp) => {
  //       if (
  //         cat.id === exp.category &&
  //         !relevantExpenseCategories.includes(cat)
  //       ) {
  //         relevantExpenseCategories.push(cat);
  //       }
  //     });
  //   }
  // });

  // // income and expense total of given month and year
  // let incomeTotal;
  // let expenseTotal;
  // if (dataOfYearAndMonth.length > 0) {
  //   incomeTotal = incomes.reduce((acc, rec) => {
  //     const total = acc + rec.amount;
  //     return total;
  //   }, 0);
  //   expenseTotal = expenses.reduce((acc, rec) => {
  //     const total = acc + rec.amount;
  //     return total;
  //   }, 0);
  // } else {
  //   incomeTotal = 0;
  //   expenseTotal = 0;
  // }

  // const getMonthIncomeTotal = (total) => {
  //   console.log(total);
  // };
  // const getMonthExpenseTotal = (total) => {
  //   console.log(total);
  // };

  const [monthIncomeTotal, setMonthIncomeTotal] = useState(0);
  const [monthExpenseTotal, setMonthExpenseTotal] = useState(0);

  // const bubu = (totalMonthIncome) => {
  //   console.log(totalMonthIncome, "bubu");
  //   setMonthIncomeTotal(totalMonthIncome);
  // };

  // const overallTotal = incomeTotal - expenseTotal;
  const overallTotal = monthIncomeTotal - monthExpenseTotal;

  // TODO: local storage (https://developer.mozilla.org/de/docs/Web/API/Window/localStorage)

  if (dataOfYearAndMonth.length === 0) {
    return (
      <div className="no-data-available">
        Für den Monat {monthInformation.fullLabel} {selectedYear} liegen keine
        Daten vor.
      </div>
    );
  } else {
    return (
      <div className="budget-month-canvas">
        <h2>
          Einnahmen/Ausgaben für {monthInformation.fullLabel} {selectedYear}
        </h2>
        <div className="budget-month-container">
          <BudgetMonthIncome
            dataOfYearAndMonth={dataOfYearAndMonth}
            incomes={incomes}
            getMonthIncomeTotal={setMonthIncomeTotal}
          />
          <BudgetMonthExpense
            dataOfYearAndMonth={dataOfYearAndMonth}
            expenses={expenses}
            getMonthExpenseTotal={setMonthExpenseTotal}
          />
        </div>
        <div className="budget-month-total">
          {overallTotal >= 0 ? (
            <div className="budget-month-total-income">
              <span>
                Gesamtgewinn für {monthInformation.fullLabel} {selectedYear}
                :&nbsp;
              </span>
              <span className="budget-month-positive-total">
                € {overallTotal.toFixed(2)}
              </span>
            </div>
          ) : (
            <div className="budget-month-total-income">
              <span>
                Gesamtverlust für {monthInformation.fullLabel} {selectedYear}
                :&nbsp;
              </span>
              <span className="budget-month-negative-total">
                € {overallTotal.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default BudgetMonthDisplay;
