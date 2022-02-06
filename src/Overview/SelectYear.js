const SelectYear = ({ selectedYear, onDropdownChangeHandler }) => {
  const dropdownChangeHandler = (e) => {
    const dropdownChangeValue = e.target.value;
    onDropdownChangeHandler(dropdownChangeValue);
  };

  return (
    <div className="budget-year-select">
      <div className="budget__inner budget-year-select__inner">
        <label className="budget-label">Jahr anzeigen</label>
        <select
          value={selectedYear}
          onChange={dropdownChangeHandler}
          id="year-select"
        >
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
      </div>
    </div>
  );
};

export default SelectYear;
