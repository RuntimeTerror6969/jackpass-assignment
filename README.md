# JackPass Events Manager

A React-based event management application that allows users to create and view events with media upload capabilities. Built for the JackPass Frontend Developer position assessment.

## Features

### Core Requirements

- **Event Creation Form**

  - Community selection dropdown
  - Event title, location, and description fields
  - Start/end datetime pickers
  - Media upload (image/video) with 4:5 aspect ratio handling
  - Form validation with error messages
  - Preview for uploaded media

- **Event Listing**

  - Scrollable list of events
  - Community display with icons
  - Date/time formatting
  - Responsive thumbnail display
  - Empty state handling

- **Data Persistence**

  - LocalStorage integration
  - Base64 media storage
  - Data survives page refresh

- **UI/UX**
  - Responsive design
  - Tailwind CSS styling
  - React icons integration
  - Loading states
  - Error handling

### Technical Implementation

- **React** component-based architecture
- **Tailwind CSS** for styling
- **react-datepicker** for datetime selection
- **Canvas API** for media resizing
- **LocalStorage** for data persistence
- **React Icons** for visual elements

## Setup Instructions

1. **Clone Repository**

   ```bash
   git clone https://github.com/RuntimeTerror6969/jackpass-assignment/
   cd jackpass-assignment
   ```

2. **Install Dependencies**

   ```bash
   npm install
   npm install react-datepicker react-icons
   ```

3. **Run Application**
   ```bash
   npm run dev
   ```
   The applications runs locally on `http://localhost:5173/`

## Key Implementation Details

### Event Creation

- **Form Validation**: Real-time validation with error highlighting
- **Media Handling**:
  - Image resizing to 4:5 aspect ratio using Canvas API
  - Video thumbnail generation
  - Client-side file processing
- **State Management**: Unified form state object
- **Error Handling**: Comprehensive error catching and user feedback

### Event Display

- Responsive grid layout
- Smart date formatting
- Media-adaptive display (images/videos)
- Line-clamping for long descriptions
- Hover effects and transitions

### Data Management

- LocalStorage integration with JSON serialization
- Media storage as base64 strings
- Data structure versioning ready

## Development Notes

- **Media Processing**: Uses client-side resizing to avoid server dependencies
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Validation**: Comprehensive form validation before submission
- **Error Handling**: Graceful error recovery and user notifications

## License

MIT License - Free for modification and reuse. Please attribute if used as reference.
