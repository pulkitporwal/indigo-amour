"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import APIList from "@/components/ui/api-list";

interface CategoryClientProps {
  data: CategoryColumn[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const storeId = params?.storeId; 

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories [${data.length}]`}
          description="Manage categories for your store"
        />
        <Button
          onClick={() => router.push(`/${storeId}/categories/new`)}
          className="mr-2"
        >
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable columns={columns} data={data} searchKey="name" />

      <Heading title="API" description="API calls for Categories" />
      <Separator />
      <APIList entityIdName="categoryId" entityName="categories" />
    </>
  );
};

export default CategoryClient;
