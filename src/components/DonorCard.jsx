function DonorCard({ donor, requestStatus, handleRequest }) {
  return (
    <div className="card">
      <h3>{donor.name}</h3>
      <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
      <p><strong>City:</strong> {donor.city}</p>
      <p>
        <strong>Availability:</strong>{" "}
        {donor.available ? "Available ✅" : "Not Available ❌"}
      </p>

      <button
        disabled={requestStatus[donor.id]}
        onClick={() => handleRequest(donor.id)}
      >
        {requestStatus[donor.id]
          ? "Request Sent ✅"
          : "Request Help"}
      </button>
    </div>
  );
}

export default DonorCard;