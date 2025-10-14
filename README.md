# 📱 Construction Manager Frontend

A React Native/Expo frontend application for the Construction Manager App with MongoDB backend integration.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- Backend server running on port 5000
- MongoDB running on localhost:27017

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on specific platforms
npm run android    # Android
npm run ios        # iOS
npm run web        # Web browser
```

## 📱 Features

### 🏗️ Project Management
- Create and manage construction projects
- Track project progress and status
- Real-time project updates
- Project timeline and budget tracking

### 📦 Material Management
- Inventory tracking and management
- Material categorization
- Supplier information
- Stock level monitoring

### 👷 Labour Management
- Worker registration and management
- Attendance tracking
- Role-based organization
- Daily wage management

### ⚠️ Issue Management
- Issue reporting and tracking
- Priority-based categorization
- Assignment and resolution tracking
- Real-time issue updates

### 📊 Reports & Analytics
- Comprehensive project reports
- Material usage analytics
- Labour productivity reports
- Expense tracking and analysis

### 💰 Petty Cash Management
- Expense tracking and categorization
- Budget monitoring
- Transaction history
- Project-wise expense allocation

## 🔧 Configuration

### API Configuration
The app connects to the backend API. Update the API URL in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Platform Support
- **Android**: APK generation supported
- **iOS**: iOS app generation supported
- **Web**: Browser-based application

## 📁 Project Structure

```
frontend/
├── src/
│   ├── screens/           # App screens
│   │   ├── DashboardScreen.js
│   │   ├── ProjectsScreen.js
│   │   ├── MaterialsScreen.js
│   │   ├── LabourScreen.js
│   │   ├── IssuesScreen.js
│   │   ├── ReportsScreen.js
│   │   └── PettyCashScreen.js
│   └── services/
│       └── api.js         # API service layer
├── App.js                 # Main app component
├── package.json           # Dependencies
└── README.md
```

## 🚀 Running Commands

### Development
```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

### Building
```bash
# Build for Android
npm run build:android

# Build for Web
npm run build:web
```

## 📱 Screens

### Dashboard
- Overview of all projects and statistics
- Quick actions for common tasks
- Recent activity feed

### Projects
- List of all projects
- Project details and progress tracking
- Add/edit/delete projects

### Materials
- Material inventory management
- Category-based organization
- Stock level monitoring

### Labour
- Worker management
- Attendance tracking
- Role-based organization

### Issues
- Issue tracking and management
- Priority and status management
- Assignment and resolution

### Reports
- Comprehensive analytics
- Project health metrics
- Material and labour reports

### Petty Cash
- Expense tracking
- Category management
- Budget monitoring

## 🔌 API Integration

The frontend uses the `apiService` to communicate with the backend:

```javascript
import { apiService } from '../services/api';

// Get all projects
const projects = await apiService.projects.getAll();

// Create a new project
const newProject = await apiService.projects.create(projectData);

// Update a project
const updatedProject = await apiService.projects.update(id, updateData);
```

## 🎨 UI Components

### Custom Components
- StatCard: Dashboard statistics display
- QuickAction: Action buttons
- ProgressBar: Progress visualization
- CategoryItem: Category display

### Styling
- Consistent color scheme
- Responsive design
- Material Design principles
- Cross-platform compatibility

## 📱 Platform-Specific Features

### Android
- APK generation
- Native Android features
- Material Design components

### iOS
- iOS-specific styling
- Native iOS features
- iOS design guidelines

### Web
- Responsive web design
- Browser compatibility
- Web-specific optimizations

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**
   - Check if backend is running on port 5000
   - Verify API URL in `src/services/api.js`

2. **Expo Issues**
   ```bash
   npx expo start --clear
   ```

3. **Dependencies Issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Build Issues**
   ```bash
   npx expo install --fix
   ```

## 🔧 Development

### Adding New Screens
1. Create screen component in `src/screens/`
2. Add navigation route in `App.js`
3. Update API service if needed

### Adding New Features
1. Create API endpoints in backend
2. Add API service methods
3. Create UI components
4. Integrate with existing screens

## 📊 State Management

The app uses React hooks for state management:
- `useState` for local component state
- `useEffect` for side effects
- API calls for data fetching

## 🎯 Performance

### Optimization
- Lazy loading for large datasets
- Efficient API calls
- Image optimization
- Memory management

### Best Practices
- Component reusability
- Efficient rendering
- Proper error handling
- User feedback

## 🚀 Deployment

### Android APK
```bash
# Build APK
eas build --platform android --profile preview

# Download from Expo dashboard
```

### Web Deployment
```bash
# Build web version
npm run build:web

# Deploy to web hosting
```

### iOS App
```bash
# Build iOS app
eas build --platform ios --profile preview
```

## 📄 License

MIT License - see LICENSE file for details
