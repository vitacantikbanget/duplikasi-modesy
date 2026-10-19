"use client";

import EmptyProductListPage from "@/components/admin/EmptyProductListPage";

export default function ExpiredProductsPage() {
  return (
    <EmptyProductListPage
      title="Expired Products"
      listKey="expired"
      hasStatusColumn={false}
      initialItems={[]}
    />
  );
}
