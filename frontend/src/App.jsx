import React from 'react';
import { FleetProvider, useFleet } from './context/FleetContext';
import Layout from './components/layout/Layout';
import DashboardOverview from './components/dashboard/DashboardOverview';
import VehiclesModule from './components/modules/VehiclesModule';
import MaintenanceModule from './components/modules/MaintenanceModule';
import InsuranceModule from './components/modules/InsuranceModule';
import GenericModulePlaceholder from './components/modules/GenericModulePlaceholder';

const MainViewRouter = () => {
  const { activeTab } = useFleet();

  switch (activeTab) {
    case 'dashboard':
      return <DashboardOverview />;
    case 'vehicles':
      return <VehiclesModule />;
    case 'maintenance':
      return <MaintenanceModule />;
    case 'insurance':
      return <InsuranceModule />;
    case 'fuel':
    case 'health':
    case 'alerts':
    case 'reports':
      return <GenericModulePlaceholder moduleId={activeTab} />;
    default:
      return <DashboardOverview />;
  }
};

export function App() {
  return (
    <FleetProvider>
      <Layout>
        <MainViewRouter />
      </Layout>
    </FleetProvider>
  );
}

export default App;
