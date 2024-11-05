// stat-bar.js
export default function StatBar({ value, text }) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-sm w-16">{text}</div>
        <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#45e5d6] rounded-full"
            style={{ width: `${value}%` }}
          />
        </div>
        <div className="text-sm w-12">{value}%</div>
      </div>
    );
}
  