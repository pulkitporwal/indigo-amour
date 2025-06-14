"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ColorColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import APIList from "@/components/ui/api-list";

interface ColorClientProps {
  data: ColorColumn[];
}

const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const storeId = params?.storeId; 

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors [${data.length}]`}
          description="Manage colors for your store"
        />
        <Button
          onClick={() => router.push(`/${storeId}/colors/new`)}
          className="mr-2"
        >
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable columns={columns} data={data} searchKey="name" />

      <Heading title="API" description="API calls for Colors" />
      <Separator />
      <APIList entityIdName="colorId" entityName="colors" />
    </>
  );
};

export default ColorClient;
