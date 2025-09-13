import React from "react";

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search meals by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="btn btn-outline-secondary" onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  );
}
