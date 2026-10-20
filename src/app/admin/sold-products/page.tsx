"use client";

import EmptyProductListPage from "@/components/admin/EmptyProductListPage";

export default function SoldProductsPage() {
  return (
    <EmptyProductListPage
      title="Sold Products"
      listKey="sold"
      hasStatusColumn={false}
      initialItems={[]}
    />
  );
}
