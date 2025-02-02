import { FaMapMarkerAlt, FaClock, FaUserFriends } from "react-icons/fa";
import { format, formatDistanceToNow, parseISO } from "date-fns";

const EventList = ({ events }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mx-auto max-w-4xl w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Upcoming Events</h2>
      <div className="space-y-6 max-h-[600px] overflow-y-auto">
        {events.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No upcoming events. Let's create your first event!
          </p>
        ) : (
          events.map((event) => {
            // Only parse and format if startDate exists.
            let relativeTime = "No start date provided";
            let formattedDateTime = "";
            if (event.startDate) {
              const parsedDate = parseISO(event.startDate);
              relativeTime = formatDistanceToNow(parsedDate, {
                addSuffix: true,
              });
              formattedDateTime = format(parsedDate, "MMMM d, yyyy h:mm aa");
            }

            return (
              <div
                key={event.id}
                className="border rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Media Thumbnail - Fixed aspect ratio container */}
                  {event.media && (
                    <div className="w-32 h-48 flex-shrink-0 relative overflow-hidden rounded-lg">
                      {event.media.type === "image" ? (
                        <img
                          src={event.media.data}
                          alt="Event media"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={event.media.data}
                          className="w-full h-full object-cover"
                          controls
                        />
                      )}
                    </div>
                  )}

                  {/* Event Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <FaUserFriends className="text-blue-600" />
                      <span className="font-medium text-gray-700">
                        By {event.community}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold">{event.title}</h3>

                    <div className="flex flex-col text-gray-600">
                      <div className="flex items-center">
                        <FaClock className="mr-2 flex-shrink-0 text-yellow-500" />
                        <span>{relativeTime}</span>
                      </div>
                      {formattedDateTime && (
                        <span className="ml-8 text-sm text-gray-500">
                          {formattedDateTime}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 flex-shrink-0 text-red-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EventList;
