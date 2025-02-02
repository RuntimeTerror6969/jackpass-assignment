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
        community: "Fitness Club",
        title: "",
        startDate: new Date(),
        endDate: new Date(),
        location: "",
        description: "",
        media: null,
      });
      setErrors({});
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
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Create New Event</h2>
      {/* Media Upload Section */}
      <div
        className="mb-8 relative w-full overflow-hidden rounded-xl"
        style={{ paddingBottom: "125%" }} // 4:5 aspect ratio
      >
        {formData.media ? (
          formData.media.type === "image" ? (
            <img
              src={URL.createObjectURL(formData.media.file)}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <video
              src={URL.createObjectURL(formData.media.file)}
              className="absolute inset-0 w-full h-full object-cover"
              controls
            />
          )
        ) : (
          <img
            src={galleryPlaceholder}
            alt="Event placeholder"
            className="absolute inset-0 w-full h-full object-cover opacity-75"
          />
        )}

        <label className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-white/90 backdrop-blur-sm text-gray-600 rounded-full cursor-pointer shadow-sm hover:bg-white transition-all">
          {formData.media ? "🖼 Change Media" : "📸 Add Media"}
          <input
            type="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
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
            <option value="Bhag Club">Bhag Club</option>
            <option value="Art Club">Art Club</option>
            <option value="Book Lovers Club">Book Lovers Club</option>
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
