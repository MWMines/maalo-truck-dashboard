import SectionCard from './SectionCard';
import InfoRow from './InfoRow';

type TruckInfo = {
    truckNo: string;
    vehicleClass: string;
    engineNo: string;
    chassisNo: string;
    ulw: string;
    makerDesc: string;
};

type OwnerInfo = {
    ownerName: string;
    companyName: string;
    gstNo: string;
    panNo: string;
    email: string;
    contactNo: string;
};

type Props = {
    truckInfo: TruckInfo;
    ownerInfo: OwnerInfo;
};

export default function TruckInfoCard({ truckInfo, ownerInfo }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionCard title="Truck Information">
                <div className="grid grid-cols-2 gap-4">
                    <InfoRow label="Truck No." value={truckInfo.truckNo} />
                    <InfoRow label="Vehicle class" value={truckInfo.vehicleClass} />
                    <InfoRow label="Engine No" value={truckInfo.engineNo} />
                    <InfoRow label="Chassis No" value={truckInfo.chassisNo} />
                    <InfoRow label="Laiden Weight (ULW)" value={truckInfo.ulw} />
                    <InfoRow label="Makers Description" value={truckInfo.makerDesc} />
                </div>
                <div className="mt-4">
                    <a href="#" className="text-blue-600 text-sm hover:underline">View more</a>
                </div>
            </SectionCard>

            <SectionCard title="Owner Information">
                <div className="grid grid-cols-2 gap-4">
                    <InfoRow label="Owner Name" value={ownerInfo.ownerName} />
                    <InfoRow label="Company Name" value={ownerInfo.companyName} />
                    <InfoRow label="GST NO" value={ownerInfo.gstNo} />
                    <InfoRow label="PAN No" value={ownerInfo.panNo} />
                    <InfoRow label="Email Id" value={ownerInfo.email} />
                    <InfoRow label="Contact No" value={ownerInfo.contactNo} />
                </div>
                <div className="mt-4">
                    <a href="#" className="text-blue-600 text-sm hover:underline">View more</a>
                </div>
            </SectionCard>
        </div>
    );
}
