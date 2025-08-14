import { Star, UserRound } from "lucide-react";
import Link from "next/link";

type Driver = {
  name: string;
  rating: number;
  efficiency: number;
  contact: string;
  totalTrips: number;
  totalEarnings: string;
  link: string;
};

interface Props {
  driver: Driver;
  openModal: (modeType: string, data?: any) => void;
}

const dummyDriver = {
    firstName: 'Suresh',
    middleName: 'K',
    lastName: 'Goyal',
    fatherName: 'Kishore K',
    contactNo: '9988776655',
    homeCity: 'Gurgaon',
    maritalStatus: 'Married',
    spouseName: 'Sita',
    kids: '2',
    dob: '29/9/1889',
    marriageAnniversary: '20/10/2000',
    favouriteSinger: 'Arijit Singh',
    favouriteFood: 'Biryani',
    news: 'News, Employement',
    address: 'H.No-1, Plot23, street4, street 656, near abc location, opp ABC appt',
    locality: 'MH15 12345',
    district: 'Flat bed Truck',
    landmark: 'Sample Description',
    tehsil: 'Other Goods Vehicles',
    state: 'Flat bed Truck',
    pincode: 'MH15 12345',
  };

export const DriverCard = ({ driver, openModal }: Props) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-2" >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
          <UserRound className="w-4 h-4" />
          <Link href={driver.link} className="underline">
            {driver.name}
          </Link>
        </div>
        <div className="flex items-center gap-1 text-green-600 text-sm">
          <Star className="w-4 h-4 fill-green-500 stroke-green-600" />
          {driver.rating}
        </div>
      </div>

      {/* Efficiency */}
      <div className="text-sm text-gray-700">Predicted Efficiency</div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="h-2 bg-blue-600 rounded-full"
            style={{ width: `${driver.efficiency}%` }}
          />
        </div>
        <span className="text-sm font-medium">{driver.efficiency}%</span>
      </div>

      {/* Info Row */}
      <div className="flex justify-between text-sm text-gray-600">
        <div>
          <div className="font-medium text-gray-900">Contact No</div>
          {driver.contact}
        </div>
        <div>
          <div className="font-medium text-gray-900">Total Trips</div>
          {driver.totalTrips}
        </div>
        <div>
          <div className="font-medium text-gray-900">Total Earnings</div>
          {driver.totalEarnings}
        </div>
      </div>

      {/* Link */}
      <button onClick={() => openModal('view', dummyDriver)} className="text-blue-600 text-sm underline font-medium">
        View full details
      </button>
    </div>
  );
};
