type InfoRowProps = {
  label: string;
  value: string;
  bold?: boolean;
};

export default function InfoRow({ label, value, bold = true }: InfoRowProps) {
  return (
    <div className="flex flex-col text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={bold ? 'font-semibold text-slate-800' : 'text-slate-700'}>
        {value}
      </span>
    </div>
  );
}