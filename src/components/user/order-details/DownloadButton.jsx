import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import React from "react";

const DownloadButton = ({ generateMyInvoice }) => {
  return (
    <div className=" pt-6 flex items-center justify-center ">
      <div className="space-y-4 text-center fixed overflow-hidden bottom-2  p-4 bg-blue-600 rounded-md ">
        <Button
          type="button"
          onClick={generateMyInvoice}
          className="w-full rounded-md bg-white hover:bg-white/90 px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm "
        >
          Download Invoice
          <Download className="ml-2 h-4 w-4" />
        </Button>
        <Link
          href="/stores"
          className="inline-block text-sm  transition text-white/90 underline underline-offset-4"
        >
          Continue exploring stores &rarr;
        </Link>
      </div>
    </div>
  );
};

export default DownloadButton;
