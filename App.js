import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

// Import screens
import DashboardScreen from './src/screens/DashboardScreen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get('window');

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [activeScreen, setActiveScreen] = useState('Dashboard');

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
    { id: 'Materials', icon: 'cube', label: 'Materials' },
    { id: 'Labour', icon: 'people', label: 'Labour' },
    { id: 'Issues', icon: 'warning', label: 'Issues' },
    { id: 'Reports', icon: 'bar-chart', label: 'Reports' },
    { id: 'PettyCash', icon: 'cash', label: 'Petty Cash' },
  ];

  const renderContent = () => {
    switch (activeScreen) {
      case 'Dashboard':
        return <DashboardScreen navigation={{ navigate: () => {} }} />;
      case 'Projects':
        return <DashboardScreen navigation={{ navigate: () => {} }} />;
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
      
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.sidebarHeader}>
          <Text style={styles.sidebarTitle}>Construction Manager</Text>
        </View>
        
        <View style={styles.menuItems}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                activeScreen === item.id && styles.activeMenuItem
              ]}
              onPress={() => setActiveScreen(item.id)}
            >
              <Ionicons
                name={activeScreen === item.id ? item.icon : `${item.icon}-outline`}
                size={24}
                color={activeScreen === item.id ? '#2E7D32' : '#666'}
              />
              <Text style={[
                styles.menuItemText,
                activeScreen === item.id && styles.activeMenuItemText
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
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
  sidebar: {
    width: 280,
    backgroundColor: '#1a1a2e',
    paddingTop: 40,
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1000,
  },
  sidebarHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 20,
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 2,
    borderRadius: 8,
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
    marginLeft: 280,
    backgroundColor: '#f5f5f5',
  },
});
