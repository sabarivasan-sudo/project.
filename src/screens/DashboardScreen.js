import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Platform,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { apiService } from '../services/api';

export default function DashboardScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalProjects, setTotalProjects] = useState(2173);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Re Development of Railway Station Complex',
      startDate: '01 Oct, 2025',
      endDate: '01 Mar, 2027',
      progress: 1,
      status: 'In Progress',
      detail: {
        completion: 11,
        earned: 86,
        totalPriceValue: 50000,
        totalEarnedValue: 43250,
        actualStartDate: '05 Jun 2025',
        actualEndDate: '--',
        plannedStartDate: '04 Jun 2025',
        plannedEndDate: '17 Sep 2025',
        totalTasks: 13,
        tasks: {
          notStarted: { total: 12, delayed: 2 },
          inProgress: { total: 1, delayed: 1 },
          completed: { total: 0, delayed: 0 }
        }
      }
    },
    {
      id: 2,
      name: 'Commercial Building Construction',
      startDate: '15 Nov, 2025',
      endDate: '30 Jun, 2026',
      progress: 25,
      status: 'In Progress',
      detail: {
        completion: 25,
        earned: 45,
        totalPriceValue: 75000,
        totalEarnedValue: 33750,
        actualStartDate: '15 Nov 2025',
        actualEndDate: '--',
        plannedStartDate: '15 Nov 2025',
        plannedEndDate: '30 Jun 2026',
        totalTasks: 8,
        tasks: {
          notStarted: { total: 5, delayed: 1 },
          inProgress: { total: 2, delayed: 0 },
          completed: { total: 1, delayed: 0 }
        }
      }
    },
    {
      id: 3,
      name: 'Residential Apartment Complex',
      startDate: '01 Jan, 2026',
      endDate: '31 Dec, 2026',
      progress: 0,
      status: 'Planning',
      detail: {
        completion: 0,
        earned: 0,
        totalPriceValue: 100000,
        totalEarnedValue: 0,
        actualStartDate: '--',
        actualEndDate: '--',
        plannedStartDate: '01 Jan 2026',
        plannedEndDate: '31 Dec 2026',
        totalTasks: 20,
        tasks: {
          notStarted: { total: 20, delayed: 0 },
          inProgress: { total: 0, delayed: 0 },
          completed: { total: 0, delayed: 0 }
        }
      }
    }
  ]);
  const [projectData, setProjectData] = useState({
    projectName: '',
    description: '',
    startDate: '',
    endDate: '',
    addressLine: '',
    state: ''
  });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentDateType, setCurrentDateType] = useState('start'); // 'start' or 'end'
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectDetail, setShowProjectDetail] = useState(false);

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

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateForDisplay = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const openDatePicker = (type) => {
    setCurrentDateType(type);
    if (type === 'start') {
      setShowStartDatePicker(true);
    } else {
      setShowEndDatePicker(true);
    }
  };

  const handleDateSelect = (selectedDate) => {
    if (currentDateType === 'start') {
      setStartDate(selectedDate);
      setProjectData(prev => ({
        ...prev,
        startDate: formatDateForDisplay(selectedDate)
      }));
      setShowStartDatePicker(false);
    } else {
      setEndDate(selectedDate);
      setProjectData(prev => ({
        ...prev,
        endDate: formatDateForDisplay(selectedDate)
      }));
      setShowEndDatePicker(false);
    }
  };

  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      options.push({
        value: date,
        label: formatDateForDisplay(date)
      });
    }
    return options;
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowProjectDetail(true);
  };

  const handleCreateProject = () => {
    if (!projectData.projectName.trim()) {
      Alert.alert('Error', 'Please enter a project name');
      return;
    }

    const newProject = {
      id: Date.now(),
      name: projectData.projectName,
      startDate: projectData.startDate || 'TBD',
      endDate: projectData.endDate || 'TBD',
      progress: 0,
      status: 'Planning'
    };

    setProjects(prev => [newProject, ...prev]);
    setTotalProjects(prev => prev + 1);
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

    Alert.alert('Success', 'Project created successfully!');
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

          {/* Project Cards Section */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.projectsList}
            contentContainerStyle={styles.projectsListContent}
          >
            {projects.map((project) => (
              <TouchableOpacity 
                key={project.id} 
                style={styles.projectCard}
                onPress={() => handleProjectClick(project)}
              >
                {/* Project Header */}
                <View style={styles.projectHeader}>
                  <View style={styles.projectIcon}>
                    <Ionicons name="business" size={24} color="white" />
                  </View>
                  <View style={styles.projectActions}>
                    <TouchableOpacity style={styles.actionIcon}>
                      <Ionicons name="call" size={16} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionIcon}>
                      <Ionicons name="images" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Project Title and Progress */}
                <View style={styles.titleProgressRow}>
                  <Text style={styles.projectTitle} numberOfLines={2}>
                    {project.name}
                  </Text>
                  <View style={styles.progressCircle}>
                    <Text style={styles.progressText}>{project.progress}%</Text>
                  </View>
                </View>

                {/* Project Dates */}
                <View style={styles.projectDates}>
                  <View style={styles.dateRow}>
                    <Text style={styles.dateLabel}>START DATE</Text>
                    <Text style={styles.dateValue}>{project.startDate}</Text>
                  </View>
                  <View style={styles.dateRow}>
                    <Text style={styles.dateLabel}>END DATE</Text>
                    <Text style={styles.dateValue}>{project.endDate}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

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
                        <TouchableOpacity 
                          style={styles.dateInputWrapper}
                          onPress={() => openDatePicker('start')}
                        >
                          <Text style={[
                            styles.dateInput,
                            !projectData.startDate && styles.placeholderText
                          ]}>
                            {projectData.startDate || 'DD/MM/YYYY'}
                          </Text>
                          <Ionicons name="calendar" size={20} color="#666" style={styles.calendarIcon} />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.dateInputContainer}>
                        <Text style={styles.sectionLabel}>End Date</Text>
                        <TouchableOpacity 
                          style={styles.dateInputWrapper}
                          onPress={() => openDatePicker('end')}
                        >
                          <Text style={[
                            styles.dateInput,
                            !projectData.endDate && styles.placeholderText
                          ]}>
                            {projectData.endDate || 'DD/MM/YYYY'}
                          </Text>
                          <Ionicons name="calendar" size={20} color="#666" style={styles.calendarIcon} />
                        </TouchableOpacity>
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

          {/* Project Detail Modal */}
          {showProjectDetail && selectedProject && (
            <View style={styles.modalOverlay}>
              <View style={styles.projectDetailModal}>
                {/* Header */}
                <View style={styles.projectDetailHeader}>
                  <Text style={styles.projectDetailTitle}>Project Status</Text>
                  <TouchableOpacity
                    onPress={() => setShowProjectDetail(false)}
                    style={styles.projectDetailCloseButton}
                  >
                    <Ionicons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                {/* Content */}
                <ScrollView style={styles.projectDetailContent}>
                  {/* Progress Section */}
                  <View style={styles.progressSection}>
                    <View style={styles.progressRingContainer}>
                      <View style={styles.progressRing}>
                        <View style={styles.progressTextContainer}>
                          <Text style={styles.progressPercentage}>{selectedProject.detail.completion}%</Text>
                          <Text style={styles.progressLabel}>complete</Text>
                        </View>
                      </View>
                    </View>
                    
                    <View style={styles.datesSection}>
                      <View style={styles.dateColumn}>
                        <Text style={styles.dateColumnTitle}>Actual</Text>
                        <View style={styles.dateItem}>
                          <View style={styles.dateItemHeader}>
                            <Text style={styles.dateItemLabel}>Actual Start Date</Text>
                            <Ionicons name="information-circle-outline" size={16} color="#999" />
                          </View>
                          <Text style={styles.dateItemValue}>{selectedProject.detail.actualStartDate}</Text>
                        </View>
                        <View style={styles.dateItem}>
                          <View style={styles.dateItemHeader}>
                            <Text style={styles.dateItemLabel}>Actual End Date</Text>
                            <Ionicons name="information-circle-outline" size={16} color="#999" />
                          </View>
                          <Text style={styles.dateItemValue}>{selectedProject.detail.actualEndDate}</Text>
                        </View>
                      </View>
                      
                      <View style={styles.dateColumn}>
                        <Text style={styles.dateColumnTitle}>Planned</Text>
                        <View style={styles.dateItem}>
                          <View style={styles.dateItemHeader}>
                            <Text style={styles.dateItemLabel}>Start Date</Text>
                            <Ionicons name="information-circle-outline" size={16} color="#999" />
                          </View>
                          <Text style={styles.dateItemValue}>{selectedProject.detail.plannedStartDate}</Text>
                        </View>
                        <View style={styles.dateItem}>
                          <View style={styles.dateItemHeader}>
                            <Text style={styles.dateItemLabel}>End Date</Text>
                            <Ionicons name="information-circle-outline" size={16} color="#999" />
                          </View>
                          <Text style={styles.dateItemValue}>{selectedProject.detail.plannedEndDate}</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Financial Section */}
                  <View style={styles.financialSection}>
                    <View style={styles.earnedSection}>
                      <View style={styles.earnedProgressBar}>
                        <View style={[styles.earnedProgressFill, { width: `${selectedProject.detail.earned}%` }]} />
                      </View>
                      <Text style={styles.earnedPercentage}>{selectedProject.detail.earned}%</Text>
                      <Text style={styles.earnedLabel}>earned</Text>
                    </View>
                    
                    <View style={styles.financialValues}>
                      <View style={styles.financialItem}>
                        <Text style={styles.financialLabel}>Total Price Value</Text>
                        <Text style={styles.financialValue}>₹{selectedProject.detail.totalPriceValue.toLocaleString()}.00</Text>
                      </View>
                      <View style={styles.financialItem}>
                        <Text style={styles.financialLabel}>Total Earned Value</Text>
                        <Text style={styles.financialValue}>₹{selectedProject.detail.totalEarnedValue.toLocaleString()}.00</Text>
                      </View>
                    </View>
                  </View>

                  {/* Tasks Section */}
                  <View style={styles.tasksSection}>
                    <View style={styles.totalTasksSection}>
                      <Text style={styles.totalTasksNumber}>{selectedProject.detail.totalTasks}</Text>
                      <Text style={styles.totalTasksLabel}>Tasks</Text>
                    </View>
                    
                    <View style={styles.taskBreakdown}>
                      <View style={styles.taskColumn}>
                        <View style={[styles.taskIndicator, { backgroundColor: '#999' }]} />
                        <Text style={styles.taskColumnTitle}>Not Started</Text>
                        <View style={styles.taskStats}>
                          <View style={styles.taskStatItem}>
                            <Text style={styles.taskStatLabel}>Total</Text>
                            <Text style={styles.taskStatValue}>{selectedProject.detail.tasks.notStarted.total}</Text>
                          </View>
                          <View style={styles.taskStatItem}>
                            <Text style={[styles.taskStatLabel, { color: '#e74c3c' }]}>Delayed</Text>
                            <Text style={[styles.taskStatValue, { color: '#e74c3c' }]}>{selectedProject.detail.tasks.notStarted.delayed}</Text>
                          </View>
                        </View>
                      </View>
                      
                      <View style={styles.taskColumn}>
                        <View style={[styles.taskIndicator, { backgroundColor: '#f39c12' }]} />
                        <Text style={styles.taskColumnTitle}>In Progress</Text>
                        <View style={styles.taskStats}>
                          <View style={styles.taskStatItem}>
                            <Text style={styles.taskStatLabel}>Total</Text>
                            <Text style={styles.taskStatValue}>{selectedProject.detail.tasks.inProgress.total}</Text>
                          </View>
                          <View style={styles.taskStatItem}>
                            <Text style={[styles.taskStatLabel, { color: '#e74c3c' }]}>Delayed</Text>
                            <Text style={[styles.taskStatValue, { color: '#e74c3c' }]}>{selectedProject.detail.tasks.inProgress.delayed}</Text>
                          </View>
                        </View>
                      </View>
                      
                      <View style={styles.taskColumn}>
                        <View style={[styles.taskIndicator, { backgroundColor: '#27ae60' }]} />
                        <Text style={styles.taskColumnTitle}>Completed</Text>
                        <View style={styles.taskStats}>
                          <View style={styles.taskStatItem}>
                            <Text style={styles.taskStatLabel}>Total</Text>
                            <Text style={styles.taskStatValue}>{selectedProject.detail.tasks.completed.total}</Text>
                          </View>
                          <View style={styles.taskStatItem}>
                            <Text style={[styles.taskStatLabel, { color: '#27ae60' }]}>Delayed</Text>
                            <Text style={[styles.taskStatValue, { color: '#27ae60' }]}>{selectedProject.detail.tasks.completed.delayed}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          )}

          {/* Custom Date Picker Modal */}
          <Modal
            visible={showStartDatePicker || showEndDatePicker}
            transparent={true}
            animationType="slide"
            onRequestClose={() => {
              setShowStartDatePicker(false);
              setShowEndDatePicker(false);
            }}
          >
            <View style={styles.datePickerOverlay}>
              <View style={styles.datePickerModal}>
                <View style={styles.datePickerHeader}>
                  <Text style={styles.datePickerTitle}>
                    Select {currentDateType === 'start' ? 'Start' : 'End'} Date
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowStartDatePicker(false);
                      setShowEndDatePicker(false);
                    }}
                    style={styles.datePickerCloseButton}
                  >
                    <Ionicons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.datePickerList}>
                  {generateDateOptions().map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dateOption}
                      onPress={() => handleDateSelect(option.value)}
                    >
                      <Text style={styles.dateOptionText}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>
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
  placeholderText: {
    color: '#999',
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
  // Project Cards Styles
  projectsList: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  projectsListContent: {
    paddingRight: 15,
  },
  projectCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: 280,
    minHeight: 200,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  projectIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
    lineHeight: 22,
    flex: 1,
    marginRight: 10,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  projectDates: {
    gap: 8,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 0.5,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1976D2',
  },
  // Date Picker Modal Styles
  datePickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerModal: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '90%',
    maxHeight: '70%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  datePickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  datePickerCloseButton: {
    padding: 4,
  },
  datePickerList: {
    maxHeight: 400,
  },
  dateOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dateOptionText: {
    fontSize: 16,
    color: '#333',
  },
  // Project Detail Modal Styles
  projectDetailModal: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    height: '100%',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  projectDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  projectDetailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  projectDetailCloseButton: {
    padding: 4,
  },
  projectDetailContent: {
    padding: 20,
  },
  // Progress Section
  progressSection: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  progressRingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 10,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercentage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  progressLabel: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 4,
  },
  datesSection: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  dateColumn: {
    flex: 1,
    marginRight: 20,
  },
  dateColumnTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 15,
  },
  dateItem: {
    marginBottom: 15,
  },
  dateItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateItemLabel: {
    fontSize: 12,
    color: '#999',
    marginRight: 5,
  },
  dateItemValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  // Financial Section
  financialSection: {
    flexDirection: 'row',
    marginBottom: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'flex-start',
  },
  earnedSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earnedProgressBar: {
    width: 60,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginBottom: 10,
  },
  earnedProgressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  earnedPercentage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  earnedLabel: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  financialValues: {
    flex: 1,
    marginLeft: 20,
    flexDirection: 'column',
  },
  financialItem: {
    marginBottom: 15,
  },
  financialLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  financialValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  // Tasks Section
  tasksSection: {
    flexDirection: 'row',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'flex-start',
  },
  totalTasksSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalTasksNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  totalTasksLabel: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  taskBreakdown: {
    flex: 2,
    flexDirection: 'row',
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  taskColumn: {
    flex: 1,
    alignItems: 'center',
  },
  taskIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  taskColumnTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  taskStats: {
    alignItems: 'center',
  },
  taskStatItem: {
    marginBottom: 8,
    alignItems: 'center',
  },
  taskStatLabel: {
    fontSize: 10,
    color: '#999',
    marginBottom: 2,
  },
  taskStatValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
});
