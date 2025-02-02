import { useState, useEffect } from "react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";

function App() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("create");

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    setEvents(storedEvents);
  }, []);

  const addEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <button
                onClick={() => setView("create")}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  view === "create"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Create Event
              </button>
              <button
                onClick={() => setView("list")}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  view === "list"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Events
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="min-h-[calc(100vh-4rem)] py-6">
        {view === "create" ? (
          <EventForm addEvent={addEvent} />
        ) : (
          <EventList events={events} />
        )}
      </main>
    </div>
  );
}

export default App;
