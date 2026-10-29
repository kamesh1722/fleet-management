import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dashboardService } from '../services/api';

const FleetContext = createContext(null);

export const FleetProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dashboard Data State
  const [summary, setSummary] = useState(null);
  const [recentVehicles, setRecentVehicles] = useState([]);
  const [reminders, setReminders] = useState({ upcomingServices: [], expiringInsurances: [], criticalAlerts: [] });
  const [analytics, setAnalytics] = useState(null);
  
  // Loading & Error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // Modal states
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Fetch full dashboard data
  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [summaryRes, activityRes, remindersRes, analyticsRes] = await Promise.allSettled([
        dashboardService.getSummary(),
        dashboardService.getRecentActivity(),
        dashboardService.getReminders(),
        dashboardService.getAnalytics(),
      ]);

      if (summaryRes.status === 'fulfilled' && summaryRes.value.success) {
        setSummary(summaryRes.value.data);
      }
      if (activityRes.status === 'fulfilled' && activityRes.value.success) {
        setRecentVehicles(activityRes.value.data);
      }
      if (remindersRes.status === 'fulfilled' && remindersRes.value.success) {
        setReminders(remindersRes.value.data);
      }
      if (analyticsRes.status === 'fulfilled' && analyticsRes.value.success) {
        setAnalytics(analyticsRes.value.data);
      }

      setLastRefreshed(new Date());
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError('Unable to synchronize live fleet data from backend service.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const value = {
    activeTab,
    setActiveTab,
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    searchQuery,
    setSearchQuery,
    summary,
    recentVehicles,
    setRecentVehicles,
    reminders,
    analytics,
    loading,
    error,
    lastRefreshed,
    refreshData: loadDashboardData,
    isAddVehicleOpen,
    setIsAddVehicleOpen,
    selectedVehicle,
    setSelectedVehicle,
  };

  return <FleetContext.Provider value={value}>{children}</FleetContext.Provider>;
};

export const useFleet = () => {
  const context = useContext(FleetContext);
  if (!context) {
    throw new Error('useFleet must be used within a FleetProvider');
  }
  return context;
};
