import { TaskDashboard } from "@/components/TaskDashboard/TaskDashboard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function AppPage() {
  return (
    <DashboardLayout>
      <TaskDashboard />
    </DashboardLayout>
  );
}

