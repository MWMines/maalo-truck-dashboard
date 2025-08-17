type InfoRowProps = {
  label: string;
  value: string |number|null;
  bold?: boolean;
};

export default function InfoRow({ label, value, bold = true }: InfoRowProps) {
  const displayValue = value == "null" ||
    value == null || value === undefined || value === "" ? "NA" : value;
  console.log("InfoRow", label, displayValue);

  return (
    <div className="flex flex-col text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={bold ? 'font-semibold text-slate-800' : 'text-slate-700'}>
        {displayValue}
      </span>
    </div>
  );
}