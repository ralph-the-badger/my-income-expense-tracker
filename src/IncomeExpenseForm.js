import { useState } from "react";

const IncomeExpenseForm = ({ data, categories, onSaveIncomeExpense }) => {
  const [incexpRadioButtonValue, setIncexpRadioButtonValue] =
    useState("income");
  const initialCategory = incexpRadioButtonValue === "income" ? 1 : 11;
  const [incexpCategoryValue, setIncexpCategoryValue] =
    useState(initialCategory);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const incexpRadioButtonHandler = (event) => {
    setIncexpRadioButtonValue(event.target.value);
    // if user changes radio button the initial category won't change. if this assignment is missing, the category will stay 1, even if it is an expense
    event.target.value === "income"
      ? setIncexpCategoryValue(1)
      : setIncexpCategoryValue(11);
  };

  const incexpDropdownCategoryHandler = (event) => {
    setIncexpCategoryValue(event.target.value);
  };

  const filteredCategories =
    incexpRadioButtonValue === "income"
      ? categories.filter((cat) => cat.id < 11) // income: id 1-10
      : categories.filter((cat) => cat.id > 10); // expense: id 11-20

  filteredCategories.sort((a, b) => (a.id > b.id ? 1 : -1));

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newId = data.reduce((previous, current) =>
      previous.id > current.id ? previous : current
    );

    const newIncomeExpense = {
      id: newId,
      type: incexpRadioButtonValue,
      category: parseInt(incexpCategoryValue),
      title: enteredTitle,
      amount: parseFloat(enteredAmount),
      date: new Date(enteredDate),
    };

    onSaveIncomeExpense(newIncomeExpense);

    // clear form after submitting with two-way-binding
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  const cancelInput = () => {
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <div className="income-expense-input-canvas">
      <h2>Eingabe einer neuen Einnahme/Ausgabe</h2>
      <form onSubmit={submitHandler}>
        <div className="incexp-radio">
          <div className="incexp__inner incexp-radio__inner">
            <span className="incexp-label">
              Möchten Sie eine Einnahme oder Ausgabe eingeben?
            </span>
            <div className="incexp-radio-input">
              <input
                type="radio"
                id="radio-income"
                onChange={incexpRadioButtonHandler}
                value="income"
                checked={incexpRadioButtonValue === "income"}
              />
              <label>Einnahme</label>
            </div>
            <div className="incexp-radio-input">
              <input
                type="radio"
                id="radio-expense"
                onChange={incexpRadioButtonHandler}
                value="expense"
                checked={incexpRadioButtonValue === "expense"}
              />
              <label>Ausgabe</label>
            </div>
          </div>
        </div>
        <div className="incexp-dropdown-categories">
          <div className="incexp__inner incexp-dropdown-categories__inner">
            <span className="incexp-label">
              Bitte wählen Sie eine Kategorie der Einnahme/Ausgabe:
            </span>
            <select
              id="category-select"
              name="incexpDropdown"
              onChange={incexpDropdownCategoryHandler}
            >
              {filteredCategories.map((option, index) => (
                <option value={option.id} key={`${option.id}-${index}`}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="incexp-input-type">
          <div className="incexp__inner incexp-input-type__inner">
            <span className="incexp-label">
              Bitte benennen der Einnahme/Ausgabe
            </span>
            <input
              id="type-input"
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
        </div>
        <div className="incexp-input-amount">
          <div className="incexp__inner incexp-input-amount__inner">
            <span className="incexp-label">
              Höhe der Einnahme/Ausgabe{" "}
              <span className="incexp-label-specification">
                (Betrag in € ohne +/-)
              </span>
            </span>
            <input
              id="amount-input"
              type="number"
              value={enteredAmount}
              onChange={amountChangeHandler}
            />
          </div>
        </div>
        <div className="incexp-input-date">
          <div className="incexp__inner incexp-input-date__inner">
            <span className="incexp-label">Datum der Einnahme/Ausgabe</span>
            <input
              id="date-input"
              type="date"
              value={enteredDate}
              onChange={dateChangeHandler}
            />
          </div>
        </div>
        <div className="incexp-button">
          <button className="button" id="submit" type="submit">
            Einnahme/Ausgabe hinzufügen
          </button>
          {/* onClick={onCancel} */}
          <button
            className="button"
            id="cancel"
            type="button"
            onClick={cancelInput}
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeExpenseForm;
