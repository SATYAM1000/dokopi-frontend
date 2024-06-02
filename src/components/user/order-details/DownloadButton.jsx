import { Button } from "@/components/ui/button";
import axios from "axios";
import { Download } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { API_DOMAIN } from "@/lib/constants";
import { ClipLoader } from "react-spinners";

const DownloadButton = ({ id }) => {
  const [loading, setLoading] = React.useState(false);
  const handleDownload = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_DOMAIN}/api/v1/invoice/${id}`, {
        responseType: "blob",
      });
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toast.error("Failed to download invoice");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" pt-6 flex items-center justify-center ">
      <div className="space-y-4 text-center fixed overflow-hidden bottom-2  p-4 bg-blue-600 rounded-md ">
        <Button
          type="button"
          onClick={handleDownload}
          className="w-full rounded-md bg-white hover:bg-white/90 px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm "
        >
          Download Invoice
          {loading ? (
            <>
              <ClipLoader color="#2563eb" size={18} className="ml-2" />
            </>
          ) : (
            <Download className="ml-2 h-4 w-4" />
          )}
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
