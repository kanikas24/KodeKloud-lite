# KodeKloud Lite - React Native Learning App

This project demonstrates a structured approach to building a course learning application using React Native with Expo. The app is designed to be clean, intuitive, and scalable, while also showcasing best practices in state management, offline handling, and video integration.

I chose Expo for rapid development and streamlined setup, enabling a smooth developer experience without heavy installations. For state management, I integrated Redux Toolkit along with Redux Persist, ensuring predictable state flow and offline-first reliability.

I also paid special attention to keeping the codebase clean and modular, following an MVC-inspired approach to maintain separation of concerns and make the app easy to extend in the future.

Despite the challenges, I truly enjoyed working on this assignment. It not only pushed me to think deeper about layout structures, video handling, and progress tracking, but also gave me a new perspective on structuring and scaling mobile applications.

## 📱 Demo

[Add screenshots or GIF demo here]

### Core Requirements ✅

#### 1. **Browse Courses**

- ✅ Paginated course list fetched from KodeKloud Course API
- ✅ Course cards displaying:
  - Thumbnail image
  - Course title
  - Author name
  - Progress badge (when enrolled)
- ✅ Responsive 2-column grid layout
- ✅ Pull-to-refresh functionality
- ✅ Infinite scroll with loading indicators

#### 2. **Course Detail & Enrollment**

- ✅ Comprehensive course details view showing:
  - Course thumbnail
  - Title, author, and description
  - Lesson count, difficulty level, and plan type
  - Module breakdown with progress indicators
- ✅ Toggle enrollment with "Enroll Now" button
- ✅ Persistent enrollment state using Redux Persist
- ✅ Course content visibility based on enrollment status
- ✅ Floating action button for easy access

#### 3. **Video Playback**

- ✅ Integrated video player supporting Vimeo videos
- ✅ Playback position persistence per lesson
- ✅ Resume functionality on app reopen
- ✅ Video controls (play/pause, seek, fullscreen)
- ✅ Automatic playback position saving

#### 4. **Progress Tracking**

- ✅ Mark lessons as completed with visual indicators
- ✅ Module-level progress calculation
- ✅ Overall course completion percentage
- ✅ Progress sync with mock API
- ✅ Persistent progress across app sessions
- ✅ Visual progress bars and completion badges

### Nice-to-Have Features 🌟

#### **Offline Support** ✅

- ✅ Course list caching for offline browsing
- ✅ Last-viewed lesson persistence
- ✅ Network status indicator in UI
- ✅ Offline-first architecture with Redux Persist
- ✅ Graceful handling of offline scenarios

#### Deep Linking ⏳

_Not implemented in current version_

#### Push Notifications ⏳

_Not implemented in current version_

## 🛠️ Tech Stack

### Core Technologies

- **Framework:** React Native (Expo)
- **Language:** React Native with TypeScript
- **Navigation:** React Navigation (Native Stack)
- **State Management:** Redux Toolkit
- **Persistence:** Redux Persist
- **Storage:** AsyncStorage

### Key Libraries

```json
{
  "dependencies": {
    "react": "^18.x.x",
    "react-native": "0.81.4",
    "expo": "~5x.x.x",
    "@react-navigation/native": "^6.x.x",
    "@react-navigation/native-stack": "^6.x.x",
    "@reduxjs/toolkit": "^2.x.x",
    "react-redux": "^9.x.x",
    "redux-persist": "^6.x.x",
    "@react-native-community/netinfo": "^11.x.x",
    "expo-video": "~3.0.11"
  }
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or expo
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/kanikas24/kodekloud-lite.git
cd kodekloud-lite
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm start
# or
yarn start
```

4. **Run on your device**

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## 📁 Project Structure

```
kodekloud-lite/
├── src/
│   ├── components/
│   │   ├── courseDetails.tsx
│   │   ├── courseList.tsx
│   │   ├── home.tsx
│   │   └── videoPlayer.tsx
│   ├── data/
│   │   ├── hooks/
│   │   │   ├── useInit.ts
│   │   │   ├── useList.ts
│   │   │   └── useVideoProgress.ts
│   │   └── models/
│   │       ├── useCourseDetails.ts
│   │       └── useEnrollment.ts
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── store/
│   │   ├── index.ts
│   │   ├── coursesSlice.ts
│   │   ├── courseDetailsSlice.ts
│   │   └── videoPlaybackSlice.ts
│   └── App.tsx
├── assets/
│   └── images/
├── package.json
└── README.md
```

## 🎯 Key Features Breakdown

### State Management Architecture

- **Redux Toolkit** for centralized state management
- **Redux Persist** for fast, persistent storage
- Separate slices for courses, details, and playback state
- Type-safe actions and reducers with TypeScript

### Offline-First Design

- Course data cached locally using Redux Persist
- Network status monitoring with NetInfo
- Optimistic UI updates with background sync
- Graceful degradation when offline

### Video Player Integration

- Custom video player component with Vimeo support
- Persistent playback position per lesson
- Auto-save progress on pause/exit
- Completion tracking on video end

### Progress Tracking System

- Lesson-level completion tracking
- Module-level progress calculation
- Course-wide completion percentage
- Visual progress indicators (bars, badges, checkmarks)

## 🔧 Configuration

To test out the video player, kindly provide a new video link(url) in courseDetails.tsx on line 186 from hls object in response.

```


## 🐛 Known Issues

1. Video playback may lag on older devices
2. Deep linking not yet implemented
3. Push notifications pending implementation

## 🚧 Future Enhancements

- [ ] Deep linking support (kodekloud://course/123/lesson/4)
- [ ] Push notifications for course reminders
- [ ] Download lessons for offline viewing
- [ ] Certificate generation on course completion
- [ ] Social sharing features
- [ ] Dark mode support
- [ ] Multi-language support

## 🙏 Acknowledgments

Special thanks to the KodeKloud team for providing such an engaging assignment. The offline support feature was particularly interesting to implement and taught me valuable lessons about building resilient mobile applications.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

- GitHub: https://github.com/kanikas24/
- LinkedIn: (https://www.linkedin.com/in/kanika-sharma-a66855118/)
- Email: hi@kanika.sh

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!


```
