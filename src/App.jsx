import React, { useState } from "react";

const App = () => {
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    address: "",
    branch: "",
    age: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "dob") {
      const birthDate = new Date(value);
      const today = new Date();

      if (!isNaN(birthDate.getTime())) {
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        setForm((prev) => ({
          ...prev,
          age: isNaN(age) ? "" : age.toString(),
        }));
      } else {
        setForm((prev) => ({ ...prev, age: "" }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, dob, address, branch } = form;

    const isNameValid = /^[A-Za-z ]+$/.test(fullName);
    const isDOBValid = dob && new Date(dob) < new Date();
    const isAddressValid = address.length >= 10;
    const isBranchValid = branch !== "";

    if (!isNameValid) return alert("❌ Name should contain only alphabets!");
    if (!isDOBValid) return alert("❌ DOB should be a valid past date!");
    if (!isAddressValid) return alert("❌ Address must be at least 10 characters!");
    if (!isBranchValid) return alert("❌ Please select a branch!");

    setMessage("🎉 Registration successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 w-full max-w-md rounded-xl shadow-lg p-8 space-y-5 border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-4">
          Student Registration
        </h2>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full border border-gray-700 bg-black text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full border border-gray-700 bg-black text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Address
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter address"
            minLength={10}
            className="w-full border border-gray-700 bg-black text-white rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Branch
          </label>
          <select
            name="branch"
            value={form.branch}
            onChange={handleChange}
            className="w-full border border-gray-700 bg-black text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">-- Select Branch --</option>
            <option value="CS">CS</option>
            <option value="IT">IT</option>
            <option value="E&TC">E&TC</option>
            <option value="Mechanical">Mechanical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Age
          </label>
          <input
            type="text"
            value={form.age}
            readOnly
            placeholder="Calculated Age"
            className="w-full border border-gray-700 bg-gray-800 text-white cursor-not-allowed p-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
        >
          Submit
        </button>

        {message && (
          <div className="text-green-400 font-medium text-center">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default App;
