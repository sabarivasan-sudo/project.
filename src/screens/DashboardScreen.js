import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { apiService } from '../services/api';

export default function DashboardScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalProjects] = useState(2173);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectData, setProjectData] = useState({
    projectName: '',
    description: '',
    startDate: '',
    endDate: '',
    addressLine: '',
    state: ''
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Simple loading simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateProject = () => {
    // Handle project creation logic here
    console.log('Creating project:', projectData);
    setShowCreateModal(false);
    // Reset form
    setProjectData({
      projectName: '',
      description: '',
      startDate: '',
      endDate: '',
      addressLine: '',
      state: ''
    });
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="construct" size={64} color="#2E7D32" />
        <Text style={styles.loadingText}>Loading Construction Manager...</Text>
        <Text style={styles.loadingSubtext}>Setting up your dashboard</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to Construction Manager</Text>
        <Text style={styles.subtitle}>Manage your construction projects efficiently</Text>
      </View>

      <View style={styles.projectsSection}>
        {/* Top Row: Title and Action Buttons */}
        <View style={styles.topRow}>
          <Text style={styles.projectsTitle}>Your projects ({totalProjects})</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.newProjectButton}
              onPress={() => setShowCreateModal(true)}
            >
              <Ionicons name="add" size={20} color="white" />
              <Text style={styles.newProjectText}>New Project</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.exportButton}>
              <Ionicons name="download" size={20} color="#1976D2" />
              <Text style={styles.exportText}>Export Excel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Row: Search and Filter Buttons */}
        <View style={styles.bottomRow}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search projects"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.filterSection}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Created Date</Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="filter" size={16} color="#666" />
              <Text style={styles.filterButtonText}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Create Project Modal */}
      {showCreateModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Project</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowCreateModal(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Modal Body */}
            <ScrollView style={styles.modalBody}>
              {/* Project Details Section */}
              <View style={styles.formSection}>
                <Text style={styles.sectionLabel}>Project Name</Text>
                <TextInput
                  style={[styles.textInput, styles.focusedInput]}
                  value={projectData.projectName}
                  onChangeText={(value) => handleInputChange('projectName', value)}
                  placeholder="Enter project name"
                  placeholderTextColor="#999"
                />

                <Text style={styles.sectionLabel}>Description</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={projectData.description}
                  onChangeText={(value) => handleInputChange('description', value)}
                  placeholder="Enter project description"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={3}
                />

                <View style={styles.dateRow}>
                      <View style={styles.dateInputContainer}>
                        <Text style={styles.sectionLabel}>Start Date</Text>
                        <View style={styles.dateInputWrapper}>
                          <TextInput
                            style={styles.dateInput}
                            value={projectData.startDate}
                            onChangeText={(value) => handleInputChange('startDate', value)}
                            placeholder="DD/MM/YYYY"
                            placeholderTextColor="#999"
                          />
                          <Ionicons name="calendar" size={20} color="#666" style={styles.calendarIcon} />
                        </View>
                      </View>

                      <View style={styles.dateInputContainer}>
                        <Text style={styles.sectionLabel}>End Date</Text>
                        <View style={styles.dateInputWrapper}>
                          <TextInput
                            style={styles.dateInput}
                            value={projectData.endDate}
                            onChangeText={(value) => handleInputChange('endDate', value)}
                            placeholder="DD/MM/YYYY"
                            placeholderTextColor="#999"
                          />
                          <Ionicons name="calendar" size={20} color="#666" style={styles.calendarIcon} />
                        </View>
                      </View>
                </View>
              </View>

              {/* Project Address & Contact Details Section */}
              <View style={styles.formSection}>
                <Text style={styles.sectionHeader}>PROJECT ADDRESS & CONTACT DETAILS</Text>
                
                <View style={styles.mapCard}>
                  <View style={styles.mapCardContent}>
                    <View style={styles.mapIconContainer}>
                      <View style={styles.mapIcon}>
                        <View style={styles.mapIconDot} />
                        <View style={styles.mapIconLine1} />
                        <View style={styles.mapIconLine2} />
                        <View style={styles.mapIconLine3} />
                        <View style={styles.mapIconLine4} />
                      </View>
                    </View>
                    <View style={styles.mapCardText}>
                      <Text style={styles.mapCardTitle}>Add map location & site radius</Text>
                      <Text style={styles.mapCardSubtitle}>Required to Set up Team attendance. You can add later as well</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.addMapButton}>
                    <Text style={styles.addMapButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.sectionLabel}>Address Line</Text>
                <TextInput
                  style={styles.textInput}
                  value={projectData.addressLine}
                  onChangeText={(value) => handleInputChange('addressLine', value)}
                  placeholder="Enter address"
                  placeholderTextColor="#999"
                />

                <Text style={styles.sectionLabel}>State</Text>
                <TextInput
                  style={styles.textInput}
                  value={projectData.state}
                  onChangeText={(value) => handleInputChange('state', value)}
                  placeholder="Enter state"
                  placeholderTextColor="#999"
                />
              </View>
            </ScrollView>

            {/* Modal Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.createButton}
                onPress={handleCreateProject}
              >
                <Text style={styles.createButtonText}>CREATE PROJECT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
      projectsSection: {
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 16,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 10,
  },
  projectsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
      searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginRight: 15,
        height: 48,
        maxWidth: '70%',
        minHeight: 48,
      },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
      newProjectButton: {
        backgroundColor: '#1976D2',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
        minHeight: 48,
        elevation: 2,
        shadowColor: '#1976D2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
  newProjectText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
      exportButton: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#1976D2',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
        minHeight: 48,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
  exportText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '600',
  },
  filterSection: {
    flexDirection: 'row',
    gap: 8,
  },
      filterButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 10,
        gap: 8,
        minHeight: 48,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
  filterButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  modalContent: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: '16px 0 0 16px',
    width: '100%',
    maxWidth: 500,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    flex: 1,
    padding: 20,
    overflow: 'auto',
  },
  formSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 15,
    marginTop: 20,
    letterSpacing: 0.5,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'white',
    minHeight: 48,
  },
  focusedInput: {
    borderColor: '#1976D2',
    borderWidth: 2,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'stretch',
    width: '100%',
  },
  dateInputContainer: {
    flex: 1,
    minWidth: 0,
  },
      dateInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: 'white',
        minHeight: 48,
        flex: 1,
        width: '100%',
      },
  dateInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 0,
    fontSize: 16,
    color: '#333',
    borderWidth: 0,
    minWidth: 0,
  },
  calendarIcon: {
    marginLeft: 8,
  },
  mapCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  mapCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mapIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIcon: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  mapIconDot: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 4,
    height: 4,
    backgroundColor: '#1976D2',
    borderRadius: 2,
  },
  mapIconLine1: {
    position: 'absolute',
    top: 10,
    left: 2,
    width: 16,
    height: 1,
    backgroundColor: '#1976D2',
    transform: [{ rotate: '0deg' }],
  },
  mapIconLine2: {
    position: 'absolute',
    top: 10,
    left: 2,
    width: 16,
    height: 1,
    backgroundColor: '#1976D2',
    transform: [{ rotate: '45deg' }],
  },
  mapIconLine3: {
    position: 'absolute',
    top: 10,
    left: 2,
    width: 16,
    height: 1,
    backgroundColor: '#1976D2',
    transform: [{ rotate: '90deg' }],
  },
  mapIconLine4: {
    position: 'absolute',
    top: 10,
    left: 2,
    width: 16,
    height: 1,
    backgroundColor: '#1976D2',
    transform: [{ rotate: '135deg' }],
  },
  mapCardText: {
    marginLeft: 12,
    flex: 1,
  },
  mapCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  mapCardSubtitle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  addMapButton: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addMapButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  createButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 56,
    elevation: 3,
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
