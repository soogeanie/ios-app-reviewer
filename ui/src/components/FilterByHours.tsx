const PAST_HOURS_OPTIONS = [12, 24, 48, 72]

type FilterByHoursProps = {
  pastHours: number;
  onPastHoursChange: (pastHours: number) => void;
}

const FilterByHours = ({ pastHours, onPastHoursChange }: FilterByHoursProps) => {
  const handleOnChange = (selected: string) => {
    onPastHoursChange(parseInt(selected))
  }

  return (
    <div>
      <label htmlFor="filterByHours" className="sr-only">Filter By Hours</label>

      <select
        id="filterByHours"
        name="filterByHours"
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-300"
        defaultValue={pastHours}
        onChange={(event) => handleOnChange(event.target.value)}
      >
        {PAST_HOURS_OPTIONS.map((hourOption) => (
          <option key={hourOption} value={hourOption}>{hourOption} hours</option>
        ))}
      </select>
    </div>
  )
}

export default FilterByHours