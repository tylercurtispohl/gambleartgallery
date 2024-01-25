import { fetchEvents } from "@/app/lib/data";

export default async function Page() {
  const events = await fetchEvents();

  return (
    <div className="text-blue-900 tracking-wide flex flex-col gap-6">
      {events.length ? (
        <>
          {events.map((e) => (
            <div key={`event_${e._id}`}>
              <h1 className="text-xl">{e.name}</h1>
              <p className="mt-2">{e.location}</p>
              <p>{e.date}</p>
              <p className="mt-2">{e.description}</p>
              {e.link && (
                <p className="mt-2 underline">
                  <a href={e.link} target="_blank">
                    Click here for more info
                  </a>
                </p>
              )}
            </div>
          ))}
        </>
      ) : (
        <div>
          <h1>No upcoming events</h1>
        </div>
      )}
    </div>
  );
}
