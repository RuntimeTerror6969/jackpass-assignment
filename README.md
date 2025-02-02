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

## Project Structure

/src
├── assets
│ └── gallery.png # Default placeholder image
├── components
│ ├── EventForm.jsx # Event creation component
│ └── EventList.jsx # Event display component
├── utils
│ └── mediaUtils.js # Media processing functions
├── App.jsx # Main application component
└── index.js # Entry point

````

## Setup Instructions

1. **Clone Repository**
   ```bash
   git clone [repository-url]
   cd jackpass-events
````

2. **Install Dependencies**

   ```bash
   npm install
   npm install react-datepicker react-icons
   ```

3. **Run Application**
   ```bash
   npm start
   ```

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

## Areas for Improvement

### Immediate Enhancements

- Add file size validation (5MB limit)
- Implement edit/delete functionality
- Add search/filter capabilities

### Technical Debt

- Media storage optimization (IndexedDB)
- Accessibility improvements
- Performance optimizations
- Proper error boundaries

### Future Features

- User authentication
- Cloud media storage
- Social sharing
- Calendar integration

## Development Notes

- **Media Processing**: Uses client-side resizing to avoid server dependencies
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Validation**: Comprehensive form validation before submission
- **Error Handling**: Graceful error recovery and user notifications

## License

MIT License - Free for modification and reuse. Please attribute if used as reference.

```

This README:
1. Follows the original assignment requirements
2. Highlights core functionality
3. Provides clear setup instructions
4. Explains technical implementation
5. Identifies improvement areas
6. Maintains professional structure
7. Includes all requested sections
8. Uses proper markdown formatting

Would you like me to make any specific adjustments or add additional sections?
```
