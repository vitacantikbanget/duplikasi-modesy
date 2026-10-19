"use client";

import EmptyProductListPage from "@/components/admin/EmptyProductListPage";

export default function DeletedProductsPage() {
  return (
    <EmptyProductListPage
      title="Deleted Products"
      listKey="deleted"
      hasStatusColumn={false}
      initialItems={[]}
    />
  );
}
