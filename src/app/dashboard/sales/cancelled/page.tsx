import VendorSalesPage from "@/app/dashboard/sales/page";

export default function CancelledSalesPage() {
  return <VendorSalesPage statusFilter="cancelled" pageTitle="Cancelled Sales" />;
}
