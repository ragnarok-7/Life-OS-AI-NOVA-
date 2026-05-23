export default function AIInsightCard() {
  return (
    <div className="bg-[#181818] border border-gray-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-4">
        AI Insights
      </h2>

      <div className="space-y-4">

        <div className="bg-[#232323] p-4 rounded-xl">
          <p className="text-gray-300">
            You are most productive between 10 AM and 1 PM.
          </p>
        </div>

        <div className="bg-[#232323] p-4 rounded-xl">
          <p className="text-gray-300">
            Your expenses increased by 18% this week.
          </p>
        </div>

        <div className="bg-[#232323] p-4 rounded-xl">
          <p className="text-gray-300">
            You skipped running twice this week.
          </p>
        </div>

      </div>

    </div>
  );
}