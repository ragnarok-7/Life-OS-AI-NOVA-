type DashboardCardProps = {
  title: string;
  value: string;
};

export default function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="bg-[#181818] p-6 rounded-2xl border border-gray-800">

      <h3 className="text-gray-400 mb-2">
        {title}
      </h3>

      <p className="text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}