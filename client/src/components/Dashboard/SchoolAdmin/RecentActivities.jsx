export default function RecentActivities({ activities }) {
  return (
    <div className="bg-card p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-3 rounded-lg"
          >
            <div>
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs ">
                {new Date(activity.date).toDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
