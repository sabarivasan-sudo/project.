import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { apiService } from '../services/api';

const { width } = Dimensions.get('window');

export default function DashboardScreen({ navigation }) {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalMaterials: 0,
    totalLabour: 0,
    openIssues: 0,
    totalExpenses: 0
  });
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await apiService.dashboard.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      Alert.alert('Error', 'Failed to load dashboard data. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const StatCard = ({ title, value, icon, color, onPress }) => (
    <TouchableOpacity style={[styles.statCard, { borderLeftColor: color }]} onPress={onPress}>
      <View style={styles.statContent}>
        <Ionicons name={icon} size={24} color={color} />
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  const QuickAction = ({ title, icon, color, onPress }) => (
    <TouchableOpacity style={[styles.quickAction, { backgroundColor: color }]} onPress={onPress}>
      <Ionicons name={icon} size={32} color="white" />
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to Construction Manager</Text>
        <Text style={styles.subtitle}>Manage your construction projects efficiently</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Projects"
            value={stats.totalProjects}
            icon="folder"
            color="#2E7D32"
            onPress={() => navigation.navigate('Projects')}
          />
          <StatCard
            title="Active Projects"
            value={stats.activeProjects}
            icon="play-circle"
            color="#1976D2"
            onPress={() => navigation.navigate('Projects')}
          />
          <StatCard
            title="Materials"
            value={stats.totalMaterials}
            icon="cube"
            color="#F57C00"
            onPress={() => navigation.navigate('Materials')}
          />
          <StatCard
            title="Labour"
            value={stats.totalLabour}
            icon="people"
            color="#7B1FA2"
            onPress={() => navigation.navigate('Labour')}
          />
          <StatCard
            title="Open Issues"
            value={stats.openIssues}
            icon="warning"
            color="#D32F2F"
            onPress={() => navigation.navigate('Issues')}
          />
          <StatCard
            title="Total Expenses"
            value={`₹${stats.totalExpenses.toLocaleString()}`}
            icon="cash"
            color="#388E3C"
            onPress={() => navigation.navigate('PettyCash')}
          />
        </View>
      </View>

      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <QuickAction
            title="Add Project"
            icon="add-circle"
            color="#2E7D32"
            onPress={() => navigation.navigate('Projects', { screen: 'AddProject' })}
          />
          <QuickAction
            title="Add Material"
            icon="add-circle"
            color="#F57C00"
            onPress={() => navigation.navigate('Materials', { screen: 'AddMaterial' })}
          />
          <QuickAction
            title="Add Labour"
            icon="add-circle"
            color="#7B1FA2"
            onPress={() => navigation.navigate('Labour', { screen: 'AddLabour' })}
          />
          <QuickAction
            title="Report Issue"
            icon="add-circle"
            color="#D32F2F"
            onPress={() => navigation.navigate('Issues', { screen: 'AddIssue' })}
          />
        </View>
      </View>

      <View style={styles.recentActivityContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <Ionicons name="information-circle" size={20} color="#1976D2" />
          <Text style={styles.activityText}>
            Dashboard connected to MongoDB backend. All data is now synced in real-time.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  header: {
    backgroundColor: '#2E7D32',
    padding: 20,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: (width - 50) / 2,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statContent: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  quickActionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    width: (width - 50) / 2,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  recentActivityContainer: {
    padding: 20,
    paddingTop: 0,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  activityText: {
    marginLeft: 10,
    flex: 1,
    color: '#666',
    lineHeight: 20,
  },
});
