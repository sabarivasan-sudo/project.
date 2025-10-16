import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

// Import screens
import DashboardScreen from './src/screens/DashboardScreen';
import TasksScreen from './src/screens/TasksScreen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get('window');

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [activeScreen, setActiveScreen] = useState('Dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [showTasksDropdown, setShowTasksDropdown] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

      const menuItems = [
        { id: 'Dashboard', icon: 'home', label: 'Dashboard' },
        { id: 'Projects', icon: 'folder', label: 'Projects' },
        { id: 'Tasks', icon: 'list', label: 'Tasks', hasDropdown: true },
        { id: 'Materials', icon: 'cube', label: 'Materials' },
        { id: 'Labour', icon: 'people', label: 'Labour' },
        { id: 'Issues', icon: 'warning', label: 'Issues' },
        { id: 'Reports', icon: 'bar-chart', label: 'Reports' },
        { id: 'PettyCash', icon: 'cash', label: 'Petty Cash' },
      ];

      const taskViews = [
        { id: 'PlanView', icon: 'grid', label: 'Plan View' },
        { id: 'ListView', icon: 'list', label: 'List View' },
        { id: 'GanttView', icon: 'calendar', label: 'Gantt View' },
      ];

  const renderContent = () => {
    switch (activeScreen) {
      case 'Dashboard':
        return <DashboardScreen navigation={{ navigate: () => {} }} />;
      case 'Projects':
        return <DashboardScreen navigation={{ navigate: () => {} }} />;
      case 'PlanView':
        return <TasksScreen navigation={{ navigate: () => {} }} />;
      case 'ListView':
        return <TasksScreen navigation={{ navigate: () => {} }} />;
      case 'GanttView':
        return <TasksScreen navigation={{ navigate: () => {} }} />;
      case 'Materials':
        return <DashboardScreen navigation={{ navigate: () => {} }} />;
      case 'Labour':
        return <DashboardScreen navigation={{ navigate: () => {} }} />;
      case 'Issues':
        return <DashboardScreen navigation={{ navigate: () => {} }} />;
      case 'Reports':
        return <DashboardScreen navigation={{ navigate: () => {} }} />;
      case 'PettyCash':
        return <DashboardScreen navigation={{ navigate: () => {} }} />;
      default:
        return <DashboardScreen navigation={{ navigate: () => {} }} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Hamburger Menu Button */}
      <TouchableOpacity 
        style={styles.hamburgerButton}
        onPress={() => setSidebarVisible(!sidebarVisible)}
      >
        <Ionicons 
          name={sidebarVisible ? "close" : "menu"} 
          size={24} 
          color="white" 
        />
      </TouchableOpacity>

      {/* Sidebar */}
      <View style={[
        styles.sidebar,
        !sidebarVisible && styles.sidebarCollapsed
      ]}>
        <View style={styles.sidebarHeader}>
          {sidebarVisible && (
            <Text style={styles.sidebarTitle}>Construction Manager</Text>
          )}
          {!sidebarVisible && (
            <Ionicons name="construct" size={32} color="white" />
          )}
        </View>
        
            <View style={styles.menuItems}>
              {menuItems.map((item) => (
                <View key={item.id} style={styles.menuItemContainer}>
                  <TouchableOpacity
                    style={[
                      styles.menuItem,
                      activeScreen === item.id && styles.activeMenuItem,
                      !sidebarVisible && styles.menuItemCollapsed
                    ]}
                    onPress={() => {
                      if (item.hasDropdown) {
                        setShowTasksDropdown(!showTasksDropdown);
                      } else {
                        setActiveScreen(item.id);
                        setShowTasksDropdown(false);
                        // Close sidebar on mobile after selection
                        if (width < 768) {
                          setSidebarVisible(false);
                        }
                      }
                    }}
                  >
                    <Ionicons
                      name={activeScreen === item.id ? item.icon : `${item.icon}-outline`}
                      size={24}
                      color={activeScreen === item.id ? 'white' : '#666'}
                    />
                    {sidebarVisible && (
                      <Text style={[
                        styles.menuItemText,
                        activeScreen === item.id && styles.activeMenuItemText
                      ]}>
                        {item.label}
                      </Text>
                    )}
                    {item.hasDropdown && sidebarVisible && (
                      <Ionicons
                        name={showTasksDropdown ? "chevron-up" : "chevron-down"}
                        size={16}
                        color="#666"
                        style={styles.dropdownIcon}
                      />
                    )}
                  </TouchableOpacity>

                  {/* Tasks Dropdown */}
                  {item.id === 'Tasks' && showTasksDropdown && sidebarVisible && (
                    <View style={styles.dropdownMenu}>
                      <Text style={styles.dropdownTitle}>TASKS</Text>
                      {taskViews.map((taskView) => (
                        <TouchableOpacity
                          key={taskView.id}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setActiveScreen(taskView.id);
                            setShowTasksDropdown(false);
                            // Close sidebar on mobile after selection
                            if (width < 768) {
                              setSidebarVisible(false);
                            }
                          }}
                        >
                          <Ionicons
                            name={taskView.icon}
                            size={20}
                            color="#666"
                            style={styles.dropdownItemIcon}
                          />
                          <Text style={styles.dropdownItemText}>{taskView.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
        
        {!sidebarVisible && (
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>v1.0</Text>
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={[
        styles.mainContent,
        !sidebarVisible && styles.mainContentFullWidth
      ]}>
        {renderContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  hamburgerButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1001,
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
      sidebar: {
        width: width < 768 ? 280 : 280,
        backgroundColor: '#1a1a2e',
        paddingTop: width < 768 ? 80 : 60,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
        transition: 'width 0.3s ease',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
      },
      sidebarCollapsed: {
        width: width < 768 ? 0 : 70,
      },
  sidebarHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 20,
    alignItems: 'center',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  menuItems: {
    paddingHorizontal: 10,
  },
      menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: width < 768 ? 18 : 15,
        paddingHorizontal: width < 768 ? 24 : 20,
        marginVertical: 4,
        borderRadius: 12,
        justifyContent: 'center',
        minHeight: 56,
      },
      menuItemCollapsed: {
        paddingHorizontal: width < 768 ? 20 : 15,
        justifyContent: 'center',
        minHeight: 56,
      },
  activeMenuItem: {
    backgroundColor: '#2E7D32',
  },
  menuItemText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 15,
    fontWeight: '500',
  },
  activeMenuItemText: {
    color: 'white',
    fontWeight: 'bold',
  },
      mainContent: {
        flex: 1,
        marginLeft: width < 768 ? 0 : 280,
        backgroundColor: '#f5f5f5',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh',
      },
      mainContentFullWidth: {
        marginLeft: width < 768 ? 0 : 70,
      },
  versionContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  versionText: {
    color: '#666',
    fontSize: 12,
  },
  // Dropdown Styles
  menuItemContainer: {
    position: 'relative',
  },
  dropdownIcon: {
    marginLeft: 'auto',
  },
  dropdownMenu: {
    position: 'absolute',
    left: 280,
    top: 0,
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    padding: 12,
    minWidth: 200,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
  },
  dropdownTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  dropdownItemIcon: {
    marginRight: 12,
  },
  dropdownItemText: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '500',
  },
});
