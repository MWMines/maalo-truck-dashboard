import { Driver } from "@/types/driver";

import InfoRow from "../../../../../components/ui/InfoRow";
import SectionCard from "../../../../../components/ui/SectionCard";

type Props = {
  driverInfo: Driver;
};

export default function DriverSection({ driverInfo }: Props) {
  if (!driverInfo) {
    return null;
  }

  return (
    <SectionCard title="Driver Information">
      <div className="grid grid-cols-2 gap-4">
        <InfoRow label="Driver Name" value={driverInfo.name} />
        <InfoRow label="Contact No." value={driverInfo.contactNo} />
        <InfoRow label="Assigned Level" value={driverInfo.assignedLevel} />
        <InfoRow label="Father Name" value={driverInfo.fatherName} />
        <InfoRow label="Address" value={driverInfo.address} />
        <InfoRow label="Landmark" value={driverInfo.landmark} />
        <InfoRow label="Locality" value={driverInfo.locality} />
        <InfoRow label="Tehsil" value={driverInfo.tehsil} />
        <InfoRow label="District" value={driverInfo.district} />
        <InfoRow label="State" value={driverInfo.state} />
        <InfoRow label="Pincode" value={driverInfo.pincode} />
      </div>
    </SectionCard>
  );
}
