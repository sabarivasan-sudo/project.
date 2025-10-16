import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TasksScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('PlanView');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskId: 'TSK000001',
      name: 'Site clearance',
      startDate: '04/06/2025',
      endDate: '06/06/2025',
      workCategory: 'Civil',
      status: 'In Progress',
      duration: '3 Days',
      delay: 119,
      progress: 75
    },
    {
      id: 2,
      taskId: 'TSK000002',
      name: 'Excavation',
      startDate: '07/06/2025',
      endDate: '13/06/2025',
      workCategory: 'General',
      status: 'Not Started',
      duration: '7 Days',
      delay: 112,
      progress: 0
    },
    {
      id: 3,
      taskId: 'TSK000003',
      name: 'Foundation',
      startDate: '',
      endDate: '',
      workCategory: 'General',
      status: 'Not Started',
      duration: '1 Day',
      delay: 0,
      progress: 0
    },
    {
      id: 4,
      taskId: 'TSK000004',
      name: '1st floor',
      startDate: '15/09/2025',
      endDate: '17/09/2025',
      workCategory: '',
      status: 'Not Started',
      duration: '3 Days',
      delay: 16,
      progress: 0,
      level: 1
    },
    {
      id: 5,
      taskId: 'TSK000005',
      name: '101',
      startDate: '15/09/2025',
      endDate: '17/09/2025',
      workCategory: '',
      status: 'Not Started',
      duration: '3 Days',
      delay: 16,
      progress: 0,
      level: 2
    },
    {
      id: 6,
      taskId: 'TSK000006',
      name: 'bedroom',
      startDate: '15/09/2025',
      endDate: '17/09/2025',
      workCategory: '',
      status: 'Not Started',
      duration: '3 Days',
      delay: 16,
      progress: 0,
      level: 3
    },
    {
      id: 7,
      taskId: 'TSK000007',
      name: 'brickworj',
      startDate: '',
      endDate: '',
      workCategory: 'General',
      status: 'Not Started',
      duration: '1 Day',
      delay: 0,
      progress: 0,
      level: 3
    }
  ]);

  useEffect(() => {
    loadTasksData();
  }, []);

  const loadTasksData = async () => {
    try {
      setLoading(true);
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error loading tasks data:', error);
    } finally {
      setLoading(false);
    }
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return '#FFE082';
      case 'Not Started':
        return '#E0E0E0';
      case 'Completed':
        return '#C8E6C9';
      default:
        return '#E0E0E0';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'In Progress':
        return '#F57C00';
      case 'Not Started':
        return '#666';
      case 'Completed':
        return '#2E7D32';
      default:
        return '#666';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="list" size={64} color="#2E7D32" />
        <Text style={styles.loadingText}>Loading Tasks...</Text>
        <Text style={styles.loadingSubtext}>Setting up your task management</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.userName}>Gora Lal</Text>
          <View style={styles.syncInfo}>
            <Ionicons name="sync" size={16} color="#666" />
            <Text style={styles.syncText}>Last synced few seconds ago</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color="#666" />
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileText}>B</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.uploadButton}>
          <Ionicons name="cloud-upload" size={20} color="#1976D2" />
          <Text style={styles.uploadText}>Upload Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.generateButton}>
          <Text style={styles.generateText}>Generate Report</Text>
          <Ionicons name="chevron-down" size={16} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Tasks Section */}
      <View style={styles.tasksSection}>
        <View style={styles.tasksHeader}>
          <Text style={styles.tasksTitle}>Tasks</Text>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search tasks by name or ID"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={16} color="#666" />
            <Text style={styles.filterText}>All Filters</Text>
          </TouchableOpacity>
        </View>

        {/* View Tabs */}
        <View style={styles.viewTabs}>
          <TouchableOpacity 
            style={[styles.tab, activeView === 'PlanView' && styles.activeTab]}
            onPress={() => setActiveView('PlanView')}
          >
            <Text style={[styles.tabText, activeView === 'PlanView' && styles.activeTabText]}>
              Plan View
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeView === 'ListView' && styles.activeTab]}
            onPress={() => setActiveView('ListView')}
          >
            <Text style={[styles.tabText, activeView === 'ListView' && styles.activeTabText]}>
              List View
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeView === 'GanttView' && styles.activeTab]}
            onPress={() => setActiveView('GanttView')}
          >
            <Text style={[styles.tabText, activeView === 'GanttView' && styles.activeTabText]}>
              Gantt View
            </Text>
          </TouchableOpacity>
        </View>

        {/* Plan View Options */}
        {activeView === 'PlanView' && (
          <View style={styles.planViewOptions}>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.optionText}>Outline</Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.optionText}>Baseline</Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.optionText}>Scheduled</Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.delayedButton}>
              <Text style={styles.delayedText}>Delayed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.manageButton}>
              <Ionicons name="grid" size={16} color="#666" />
              <Text style={styles.manageText}>Manage Columns</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Task Table */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { width: 40 }]}>#</Text>
            <Text style={[styles.headerCell, { flex: 2 }]}>NAME</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>START DATE</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>END DATE</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>WORK CATEGORY</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>STATUS</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>DURATION</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>PROG</Text>
          </View>

          {tasks.map((task) => (
            <View key={task.id} style={[styles.tableRow, { marginLeft: (task.level || 0) * 20 }]}>
              <View style={[styles.cell, { width: 40 }]}>
                <Text style={styles.cellText}>{task.id}</Text>
              </View>
              <View style={[styles.cell, { flex: 2, alignItems: 'center', justifyContent: 'center' }]}>
                <View style={styles.nameCell}>
                  <TouchableOpacity style={styles.checkbox}>
                    <Ionicons name="checkbox-outline" size={16} color="#666" />
                  </TouchableOpacity>
                  <Text style={styles.nameText}>{task.name}</Text>
                  <TouchableOpacity style={styles.addIcon}>
                    <Ionicons name="add" size={16} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.cell, { flex: 1 }]}>
                <Text style={styles.cellText}>{task.startDate}</Text>
              </View>
              <View style={[styles.cell, { flex: 1 }]}>
                <Text style={styles.cellText}>{task.endDate}</Text>
              </View>
              <View style={[styles.cell, { flex: 1 }]}>
                <Text style={styles.cellText}>{task.workCategory}</Text>
              </View>
              <View style={[styles.cell, { flex: 1 }]}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) }]}>
                  <Text style={[styles.statusText, { color: getStatusTextColor(task.status) }]}>
                    {task.status}
                  </Text>
                </View>
              </View>
              <View style={[styles.cell, { flex: 1 }]}>
                <View style={styles.durationContainer}>
                  {task.delay > 0 && (
                    <Text style={styles.delayText}>{task.delay} days delay</Text>
                  )}
                  <Text style={styles.durationText}>{task.duration}</Text>
                </View>
              </View>
              <View style={[styles.cell, { flex: 1 }]}>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${task.progress}%`,
                          backgroundColor: task.status === 'In Progress' ? '#FFE082' : '#E0E0E0'
                        }
                      ]} 
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.countText}>Count {tasks.length}</Text>
          <TouchableOpacity style={styles.addTaskButton}>
            <Ionicons name="add" size={20} color="white" />
            <Text style={styles.addTaskText}>Add Task</Text>
          </TouchableOpacity>
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
    marginTop: 15,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  syncInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  syncText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  newBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  newBadgeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#1976D2',
    borderRadius: 6,
    gap: 6,
  },
  uploadText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '500',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1976D2',
    borderRadius: 6,
    gap: 6,
  },
  generateText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  moreButton: {
    padding: 10,
  },
  // Tasks Section
  tasksSection: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tasksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  tasksTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    gap: 6,
  },
  filterText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  // View Tabs
  viewTabs: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1976D2',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  // Plan View Options
  planViewOptions: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
    flexWrap: 'wrap',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    gap: 6,
  },
  optionText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  delayedButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#e74c3c',
    borderRadius: 6,
  },
  delayedText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  manageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    gap: 6,
    marginLeft: 'auto',
  },
  manageText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  // Table Styles
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  headerCell: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    minHeight: 48,
  },
  cell: {
    justifyContent: 'center',
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  cellText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  nameCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'center',
    flexShrink: 1,
  },
  checkbox: {
    padding: 2,
  },
  nameText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  addIcon: {
    padding: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'center',
    marginHorizontal: 'auto',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  delayText: {
    fontSize: 10,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 2,
  },
  durationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  durationText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  // Progress Bar Styles
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  countText: {
    fontSize: 14,
    color: '#666',
  },
  addTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 6,
  },
  addTaskText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
