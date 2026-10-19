"use client";

import EmptyProductListPage from "@/components/admin/EmptyProductListPage";

export default function HiddenProductsPage() {
  return (
    <EmptyProductListPage
      title="Hidden Products"
      listKey="hidden"
      hasStatusColumn={false}
      initialItems={[]}
    />
  );
}
