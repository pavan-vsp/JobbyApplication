import './index.css'

const RenderFilters = props => {
  const renderFilterEmpTypeList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map((empType, index) => {
      const {onClickOnType, onRemoveTypeId} = props
      const onClickOnTypeBtn = event => {
        if (event.target.checked === true) {
          onClickOnType(empType.employmentTypeId)
        } else {
          onRemoveTypeId(empType.employmentTypeId)
        }
      }
      return (
        <li key={empType.employmentTypeId} className="checkBoxContainer">
          <input
            type="checkbox"
            className="checkbox"
            onChange={onClickOnTypeBtn}
            id={`checkbox${index}`}
          />
          <label htmlFor={`checkbox${index}`}>{empType.label}</label>
        </li>
      )
    })
  }
  const renderFilterSalaryRangeList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map((range, index) => {
      const {onClickOnRange} = props
      const onClickOnRangeBtn = event => {
        if (event.target.checked === true) {
          onClickOnRange(range.salaryRangeId)
        }
      }
      return (
        <li key={range.salaryRangeId} className="radioContainer">
          <input
            type="radio"
            className="radio"
            onClick={onClickOnRangeBtn}
            name="range"
            id={`radio${index}`}
          />
          <label htmlFor={`radio${index}`}>{range.label}</label>
        </li>
      )
    })
  }
  return (
    <div className="allFiltersContainer">
      <div className="EmploymentTypeFilter">
        <h1 className="typeHeading">Type Of Employment</h1>
        <ul> {renderFilterEmpTypeList()}</ul>
      </div>
      <div className="SalaryRangeFilter">
        <h1 className="rangeHeading">Salary Range</h1>
        <ul> {renderFilterSalaryRangeList()}</ul>
      </div>
    </div>
  )
}

export default RenderFilters
