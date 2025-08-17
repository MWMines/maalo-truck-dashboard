import { Owner } from "@/types/owner";
import { Truck } from "@/types/truck";

import InfoRow from "../../../../../components/ui/InfoRow";
import SectionCard from "../../../../../components/ui/SectionCard";

type Props = {
  truckInfo: Truck;
  ownerInfo?: Owner;
};

export default function TruckInfoCard({ truckInfo }: any) {
  console.log("TruckInfoCard1", truckInfo);
  if (truckInfo.truckNumber === undefined) {
    return;
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <SectionCard title="Truck Information">
        <div className="grid grid-cols-2 gap-4">
          Trucknumber:{truckInfo.truckNumber + 1}
          <InfoRow label="Truck No." value={truckInfo.truckNumber} />
          <InfoRow label="Vehicle class" value={truckInfo.vehicleClass} />
          <InfoRow label="Engine No" value={truckInfo.engineNo} />
          <InfoRow label="Chassis No" value={truckInfo.chasisNo} />
          <InfoRow label="Laiden Weight (ULW)" value={truckInfo.unlaidenWeight} />
          <InfoRow label="Makers Description" value={truckInfo.makerDescription} />
        </div>
        <div className="mt-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            View more
          </a>
        </div>
      </SectionCard>

      <SectionCard title="Owner Information">
        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="Owner Name" value={truckInfo.owner?.name} />
          <InfoRow label="Company Name" value={truckInfo.owner?.address} />
          <InfoRow label="GST NO" value={truckInfo.owner?.gstNo} />
          <InfoRow label="PAN No" value={truckInfo.owner?.panNo} />
          <InfoRow label="Email Id" value={truckInfo.owner?.emailId} />
          <InfoRow label="Contact No" value={truckInfo.owner?.contactNo} />
        </div>
        <div className="mt-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            View more
          </a>
        </div>
      </SectionCard>
    </div>
  );
}
