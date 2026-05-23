type ScheduleCardProps = {
  time: string;
  activity: string;
};

export default function ScheduleCard({
  time,
  activity,
}: ScheduleCardProps) {
  return (
    <div className="flex items-center justify-between bg-[#181818] border border-gray-800 rounded-xl p-4">

      <div>
        <p className="text-sm text-gray-400">
          {time}
        </p>

        <h3 className="text-lg font-semibold">
          {activity}
        </h3>
      </div>

      <div className="w-3 h-3 rounded-full bg-green-500" />

    </div>
  );
}