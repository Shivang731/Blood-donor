function FilterBar({
  selectedBlood,
  setSelectedBlood,
  searchCity,
  setSearchCity,
}) {
  return (
    <div className="filter-bar">
      <select
        value={selectedBlood}
        onChange={(e) => setSelectedBlood(e.target.value)}
      >
        <option value="All">All</option>
        <option value="A+">A+</option>
        <option value="B+">B+</option>
        <option value="O+">O+</option>
        <option value="AB+">AB+</option>
        <option value="A-">A-</option>
        <option value="B-">B-</option>
        <option value="O-">O-</option>
        <option value="AB-">AB-</option>
      </select>

      <input
        type="text"
        placeholder="Search by city"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />
    </div>
  );
}

export default FilterBar;