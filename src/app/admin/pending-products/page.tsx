"use client";

import EmptyProductListPage from "@/components/admin/EmptyProductListPage";

export default function PendingProductsPage() {
  return (
    <EmptyProductListPage
      title="Pending Products"
      listKey="pending"
      hasStatusColumn={true}
      initialItems={[]}
    />
  );
}
