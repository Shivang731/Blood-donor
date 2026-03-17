import { useState, useEffect } from "react";
import DonorCard from "./components/DonorCard";
import FilterBar from "./components/FilterBar";

function App() {
  // ------------------ STATE MANAGEMENT ------------------

  const [donors, setDonors] = useState([]);
  const [selectedBlood, setSelectedBlood] = useState("All");
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState({});
  const [sortAvailable, setSortAvailable] = useState(false); // NEW SORT STATE

  // ------------------ API CALL ------------------

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];

        const mappedDonors = data.map((user) => ({
          id: user.id,
          name: user.name,
          city: user.address.city,
          bloodGroup:
            bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
          available: Math.random() > 0.3,
        }));

        setDonors(mappedDonors);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ------------------ FILTERING ------------------

  const filteredDonors = donors.filter((donor) => {
    const bloodMatch =
      selectedBlood === "All" || donor.bloodGroup === selectedBlood;

    const cityMatch = donor.city
      .toLowerCase()
      .includes(searchCity.toLowerCase());

    return bloodMatch && cityMatch;
  });

  // ------------------ SORTING ------------------

  const sortedDonors = sortAvailable
    ? [...filteredDonors].sort((a, b) => b.available - a.available)
    : filteredDonors;

  // ------------------ REQUEST TOGGLE ------------------

  const handleRequest = (id) => {
    setRequestStatus((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // ------------------ AVAILABLE COUNT ------------------

  const availableCount = sortedDonors.filter(
    (d) => d.available
  ).length;

  // ------------------ UI ------------------

  return (
    <div className="container">
      <h1>🩸 Community Blood Donor Finder</h1>

      <FilterBar
        selectedBlood={selectedBlood}
        setSelectedBlood={setSelectedBlood}
        searchCity={searchCity}
        setSearchCity={setSearchCity}
      />

      {/* SORT BUTTON */}
      <button
        style={{ marginBottom: "15px" }}
        onClick={() => setSortAvailable(!sortAvailable)}
      >
        {sortAvailable
          ? "Showing Available First ✅"
          : "Sort by Availability"}
      </button>

      <h3>Total Available Donors: {availableCount}</h3>

      {/* Loading UI */}
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && sortedDonors.length === 0 && (
        <div className="empty-state">
          <p>No donors found</p>
        </div>
      )}

      {/* Donor Cards */}
      {!loading &&
        sortedDonors.length > 0 &&
        sortedDonors.map((donor) => (
          <DonorCard
            key={donor.id}
            donor={donor}
            requestStatus={requestStatus}
            handleRequest={handleRequest}
          />
        ))}
    </div>
  );
}

export default App;