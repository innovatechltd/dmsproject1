import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './utils/theme';
import { LanguageProvider } from './utils/lang';

// Layouts
import DashboardLayout from './pages/_dashboard';
import { AuthShell as AuthLayout } from './components/auth/AuthShell';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import IndexPage from './pages/index';
import CareersPage from './pages/careers';
import LoginPage from './pages/login';
import OtpPage from './pages/otp';
import ForgotPasswordPage from './pages/forgot-password';
import ResetPasswordPage from './pages/reset-password';
import ChangePasswordPage from './pages/change-password';

// Dashboard Pages
import DashboardOverview from './pages/_dashboard.dashboard';
import AccountActivity from './pages/_dashboard.account.activity';
import AccountProfile from './pages/_dashboard.account.profile';
import AccountChangePassword from './pages/_dashboard.account.change-password';
import AccountSettings from './pages/_dashboard.account.settings';
import AccountSecurity from './pages/_dashboard.account.security';
import AccountNotifications from './pages/_dashboard.account.notifications';

import HRLeave from './pages/_dashboard.hr.leave';
import HRPayroll from './pages/_dashboard.hr.payroll';
import HRPerformance from './pages/_dashboard.hr.performance';
import HRRecruitment from './pages/_dashboard.hr.recruitment';
import HRTraining from './pages/_dashboard.hr.training';
import HRCandidates from './pages/_dashboard.hr.candidates';
import HROffences from './pages/_dashboard.hr.offences';

import FinanceInvoices from './pages/_dashboard.finance.invoices';
import FinanceMissionClearance from './pages/_dashboard.finance.mission-clearance';
import FinancePayments from './pages/_dashboard.finance.payments';
import FinancePettyCash from './pages/_dashboard.finance.petty-cash';
import FinanceRequests from './pages/_dashboard.finance.requests';

import FleetFuel from './pages/_dashboard.fleet.fuel';
import FleetVehicles from './pages/_dashboard.fleet.vehicles';

import InventoryAssets from './pages/_dashboard.inventory.assets';
import InventoryStock from './pages/_dashboard.inventory.stock';

import ProcurementAuctions from './pages/_dashboard.procurement.auctions';
import ProcurementRFQ from './pages/_dashboard.procurement.rfq';

import ReportsDaily from './pages/_dashboard.reports.daily';
import ReportsWeekly from './pages/_dashboard.reports.weekly';
import ReportsMonthly from './pages/_dashboard.reports.monthly';
import ReportsFinancial from './pages/_dashboard.reports.financial';
import ReportsHR from './pages/_dashboard.reports.hr';

import SupportContact from './pages/_dashboard.support.contact';
import SupportDocs from './pages/_dashboard.support.docs';
import SupportHelp from './pages/_dashboard.support.help';

import AdminPermissions from './pages/_dashboard.admin.permissions';
import AdminRoles from './pages/_dashboard.admin.roles';
import AdminSettings from './pages/_dashboard.admin.settings';
import AdminUsers from './pages/_dashboard.admin.users';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/careers" element={<CareersPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />

            {/* Dashboard Routes */}
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<DashboardOverview />} />
              
              <Route path="account/activity" element={<AccountActivity />} />
              <Route path="account/profile" element={<AccountProfile />} />
              <Route path="account/change-password" element={<AccountChangePassword />} />
              <Route path="account/settings" element={<AccountSettings />} />
              <Route path="account/security" element={<AccountSecurity />} />
              <Route path="account/notifications" element={<AccountNotifications />} />
              
              <Route path="hr/leave" element={<HRLeave />} />
              <Route path="hr/payroll" element={<HRPayroll />} />
              <Route path="hr/performance" element={<HRPerformance />} />
              <Route path="hr/recruitment" element={<HRRecruitment />} />
              <Route path="hr/training" element={<HRTraining />} />
              <Route path="hr/candidates" element={<HRCandidates />} />
              <Route path="hr/offences" element={<HROffences />} />
              
              <Route path="finance/invoices" element={<FinanceInvoices />} />
              <Route path="finance/mission-clearance" element={<FinanceMissionClearance />} />
              <Route path="finance/payments" element={<FinancePayments />} />
              <Route path="finance/petty-cash" element={<FinancePettyCash />} />
              <Route path="finance/requests" element={<FinanceRequests />} />
              
              <Route path="fleet/fuel" element={<FleetFuel />} />
              <Route path="fleet/vehicles" element={<FleetVehicles />} />
              
              <Route path="inventory/assets" element={<InventoryAssets />} />
              <Route path="inventory/stock" element={<InventoryStock />} />
              
              <Route path="procurement/auctions" element={<ProcurementAuctions />} />
              <Route path="procurement/rfq" element={<ProcurementRFQ />} />
              
              <Route path="reports/daily" element={<ReportsDaily />} />
              <Route path="reports/weekly" element={<ReportsWeekly />} />
              <Route path="reports/monthly" element={<ReportsMonthly />} />
              <Route path="reports/financial" element={<ReportsFinancial />} />
              <Route path="reports/hr" element={<ReportsHR />} />
              
              <Route path="support/contact" element={<SupportContact />} />
              <Route path="support/docs" element={<SupportDocs />} />
              <Route path="support/help" element={<SupportHelp />} />
              
              <Route path="admin/permissions" element={<AdminPermissions />} />
              <Route path="admin/roles" element={<AdminRoles />} />
              <Route path="admin/settings" element={<AdminSettings />} />
              <Route path="admin/users" element={<AdminUsers />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
