export default function UpcomingEvents({ events, loading, showAll = false }) {
  return (
    <div className="bg-card p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Upcoming Events</h3>
        {!showAll && (
          <button className="text-sm text-primary hover:underline">
            View All
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No upcoming events
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 bg-background rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
