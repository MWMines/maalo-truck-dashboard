export default function DriverDetailView({ data }) {
    return (
        <div className="text-sm text-gray-700 space-y-6">
            <div>
                <h3 className="text-blue-900 font-semibold mb-2">Driver Personal Details</h3>
                <div className="grid grid-cols-3 gap-4">
                    <Info label="First Name" value={data.firstName} />
                    <Info label="Middle Name" value={data.middleName} />
                    <Info label="Last Name" value={data.lastName} />
                    <Info label="Father's Name" value={data.fatherName} />
                    <Info label="Contact No" value={data.contactNo} />
                    <Info label="Home City" value={data.homeCity} />
                    <Info label="Marital Status" value={data.maritalStatus} />
                    <Info label="Spouse Name" value={data.spouseName} />
                    <Info label="Kids" value={data.kids} />
                    <Info label="Date of Birth" value={data.dob} />
                </div>
            </div>
            <div>
                <h3 className="text-blue-900 font-semibold mb-2">Additional Information</h3>
                <div className="grid grid-cols-3 gap-4">
                    <Info label="Marriage Anniversary" value={data.marriageAnniversary} />
                    <Info label="Favourite Singer" value={data.favouriteSinger} />
                    <Info label="Favourite Food" value={data.favouriteFood} />
                    <Info label="Interested News" value={data.news} />
                </div>
            </div>
            <div>
                <h3 className="text-blue-900 font-semibold mb-2">Address</h3>
                <div className="grid grid-cols-3 gap-4">
                    <Info label="Address" value={data.address} />
                    <Info label="Locality" value={data.locality} />
                    <Info label="District" value={data.district} />
                    <Info label="Landmark" value={data.landmark} />
                    <Info label="Tehsil" value={data.tehsil} />
                    <Info label="State" value={data.state} />
                    <Info label="Pincode" value={data.pincode} />
                </div>
            </div>
        </div>
    );
}

function Info({ label, value }) {
    return (
        <div>
            <p className="text-gray-500 text-xs">{label}</p>
            <p className="text-gray-800 font-medium">{value || '-'}</p>
        </div>
    );
}
