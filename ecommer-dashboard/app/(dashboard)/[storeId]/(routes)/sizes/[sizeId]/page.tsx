import prismadb from "@/lib/prismadb";
import React from "react";
import { SizeForm } from "./components/size-form";

const SizePage = async ({
  params,
}: {
  params: { sizeId: string };
}) => {
  let sizes = null;

  if (params.sizeId !== "new") {
    sizes = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">

        <SizeForm initialData={sizes} />

      </div>
    </div>
  );
};

export default SizePage;
