import { useState } from 'react';

export default function DriverForm({ data = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    fatherName: '',
    contactNo: '',
    homeCity: '',
    maritalStatus: '',
    spouseName: '',
    kids: '',
    dob: '',
    marriageAnniversary: '',
    favouriteSinger: '',
    favouriteFood: '',
    news: '',
    address: '',
    locality: '',
    district: '',
    landmark: '',
    tehsil: '',
    state: '',
    pincode: '',
    ...data,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-sm text-gray-800">
      <div>
        <h3 className="text-blue-900 font-semibold mb-2">Driver Personal Details</h3>
        <div className="grid grid-cols-3 gap-4">
          {renderInput('firstName')}
          {renderInput('middleName')}
          {renderInput('lastName')}
          {renderInput('fatherName')}
          {renderInput('contactNo')}
          {renderInput('homeCity')}
          {renderInput('maritalStatus')}
          {renderInput('spouseName')}
          {renderInput('kids')}
          {renderInput('dob')}
        </div>
      </div>

      <div>
        <h3 className="text-blue-900 font-semibold mb-2">Additional Information</h3>
        <div className="grid grid-cols-3 gap-4">
          {renderInput('marriageAnniversary')}
          {renderInput('favouriteSinger')}
          {renderInput('favouriteFood')}
          {renderInput('news')}
        </div>
      </div>

      <div>
        <h3 className="text-blue-900 font-semibold mb-2">Address</h3>
        <div className="grid grid-cols-3 gap-4">
          {renderInput('address')}
          {renderInput('locality')}
          {renderInput('district')}
          {renderInput('landmark')}
          {renderInput('tehsil')}
          {renderInput('state')}
          {renderInput('pincode')}
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 mb-10">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );

  function renderInput(field) {
    return (
      <div key={field}>
        <label className="block text-gray-600 text-xs capitalize mb-1">
          {field.replace(/([A-Z])/g, ' $1')}
        </label>
        <input
          type="text"
          name={field}
          value={form[field]}
          onChange={handleChange}
          className="w-full px-3 py-1.5 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>
    );
  }
}
