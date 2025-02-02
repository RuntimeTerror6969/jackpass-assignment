import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { resizeMedia } from "../utils/mediaUtils";
import galleryPlaceholder from "../assets/gallery.png";

const EventForm = ({ addEvent }) => {
  const [formData, setFormData] = useState({
    community: "Indiranagar Run Club",
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    location: "",
    description: "",
    media: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.community) newErrors.community = "Community is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.startDate > formData.endDate)
      newErrors.dates = "End date must be after start";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.media) newErrors.media = "Media is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const mediaData = await resizeMedia(formData.media.file);
      const newEvent = {
        ...formData,
        id: Date.now(),
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
        media: {
          type: formData.media.type,
          data: mediaData,
        },
      };
      addEvent(newEvent);
      setFormData({
        community: "Indiranagar Run Club",
        title: "",
        startDate: new Date(),
        endDate: new Date(),
        location: "",
        description: "",
        media: null,
      });
      setErrors({});
      setSuccessMessage("Event created successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error processing media:", error);
      setErrors({ media: "Error processing media" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      setErrors({ ...errors, media: "Invalid file type" });
      return;
    }

    setFormData({
      ...formData,
      media: { file, type: file.type.startsWith("image/") ? "image" : "video" },
    });
    setErrors({ ...errors, media: null });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto relative">
      {/* Success Message Overlay */}
      {successMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md text-center animate-bounce-in">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{successMessage}</h3>
            <p className="text-gray-600">Your event is now live!</p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-center mb-8">Create New Event</h2>

      {/* Media Upload Section - Fixed 4:5 ratio */}
      <div className="mb-8 relative bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl aspect-[4/5] flex items-center justify-center">
        {formData.media ? (
          formData.media.type === "image" ? (
            <img
              src={URL.createObjectURL(formData.media.file)}
              alt="Preview"
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <video
              src={URL.createObjectURL(formData.media.file)}
              className="w-full h-full object-cover rounded-xl"
              controls
            />
          )
        ) : (
          <img
            src={galleryPlaceholder}
            alt="Event placeholder"
            className="w-full h-full object-contain p-8 opacity-75"
          />
        )}

        <label className="absolute bottom-4 px-6 py-2 bg-white/90 backdrop-blur-sm text-gray-600 rounded-full cursor-pointer shadow-sm hover:bg-white transition-all">
          {formData.media ? "🖼 Change Media" : "📸 Add Media"}
          <input
            type="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Rest of the form remains the same */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Community Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Community
          </label>
          <select
            value={formData.community}
            onChange={(e) =>
              setFormData({ ...formData, community: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Indiranagar Run Club">Indiranagar Run Club</option>
            <option value="Tech Community">Tech Community</option>
            <option value="Art Collective">Art Collective</option>
            <option value="Book Lovers">Book Lovers</option>
          </select>
          {errors.community && (
            <p className="text-red-500 text-sm mt-1">{errors.community}</p>
          )}
        </div>

        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.title ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter event title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Date & Time Picker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date & Time
            </label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => setFormData({ ...formData, startDate: date })}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className={`w-full px-4 py-3 border rounded-xl ${
                errors.dates ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date & Time
            </label>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => setFormData({ ...formData, endDate: date })}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className={`w-full px-4 py-3 border rounded-xl ${
                errors.dates ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>
        {errors.dates && (
          <p className="text-red-500 text-sm mt-1">{errors.dates}</p>
        )}

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.location ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter event location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows="4"
            className={`w-full px-4 py-3 border rounded-xl ${
              errors.description ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500`}
            placeholder="Describe your event..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
