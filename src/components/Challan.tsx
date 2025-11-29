import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ChallanProps {
  registration: any;
  userId: string;
}

export const Challan = ({ registration, userId }: ChallanProps) => {
  const handleDownload = () => {
    // This triggers the browser's print dialog, which allows saving as PDF.
    window.print();
  };

  const formattedDate = new Date(registration.created_at).toLocaleString(
    "en-PK",
    {
      dateStyle: "long",
      timeStyle: "short",
    }
  );

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      {/* Screen View: Download Button */}
      <div className="mb-6 no-print">
        <Button
          onClick={handleDownload}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          <Download className="mr-2" size={20} />
          Download Challan
        </Button>
      </div>

      {/* Challan Document Content */}
      <div className="bg-white text-black p-12 rounded-lg shadow-2xl print:shadow-none" id="challan">
        
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-4 border-purple-600">
          <h1 className="text-4xl font-bold text-purple-700 mb-2">EPSILON VI</h1>
          <p className="text-lg font-semibold text-gray-700">
            STEM Olympiad 2026
          </p>
          <p className="text-sm text-gray-600">Pakistan Science Foundation</p>
        </div>

        {/* Payment Challan Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            PAYMENT CHALLAN
          </h2>
          <div className="inline-block px-6 py-2 bg-purple-100 border-2 border-purple-600 rounded">
            <p className="text-sm font-semibold text-gray-700">
              Registration ID
            </p>
            <p className="text-lg font-mono font-bold text-purple-700">
              {registration.id}
            </p>
          </div>
        </div>

        {/* Registration Details */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Team Leader Name
              </p>
              <p className="text-base font-semibold text-gray-800">
                {registration.team_leader_name}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Email Address
              </p>
              <p className="text-base text-gray-800">{registration.email}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                User ID
              </p>
              <p className="text-xs font-mono text-gray-600 break-all">
                {userId}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                School/Institution
              </p>
              <p className="text-base font-semibold text-gray-800">
                {registration.school}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Team Size
              </p>
              <p className="text-base text-gray-800">
                {registration.team_size} {registration.team_size === 1 ? "Member" : "Members"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Registration Date & Time
              </p>
              <p className="text-sm text-gray-800">{formattedDate}</p>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="mb-8 p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
          <h3 className="font-bold text-gray-800 mb-3">Event Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Event Name:</p>
              <p className="font-semibold text-gray-800">EPSILON VI</p>
            </div>
            <div>
              <p className="text-gray-600">Event Dates:</p>
              <p className="font-semibold text-gray-800">January 16-18, 2026</p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="mb-8 p-6 bg-green-50 rounded-lg border-2 border-green-600">
          <h3 className="font-bold text-gray-800 mb-4 text-center">
            Payment Amount
          </h3>
          <div className="text-center">
            <p className="text-5xl font-bold text-green-700">PKR 3,000</p>
            <p className="text-sm text-gray-600 mt-2">
              (Pakistani Rupees Three Thousand Only)
            </p>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-300">
          <h3 className="font-bold text-gray-800 mb-3">Payment Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>Visit any HBL/MCB/Allied Bank branch</li>
            <li>Present this challan to the bank teller</li>
            <li>Make payment of PKR 3,000</li>
            <li>Keep the bank receipt as proof of payment</li>
            <li>
              Email the receipt to{" "}
              <span className="font-semibold">payments@epsilon.org.pk</span>
            </li>
          </ol>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pt-6 border-t border-gray-300">
          <p className="mb-1">
            For queries, contact: info@epsilon.org.pk | +92 300 1234567
          </p>
          <p>© 2026 Epsilon STEM Olympiad. All Rights Reserved.</p>
        </div>
      </div>

      {/* Print Styles: FIX APPLIED HERE */}
      <style>{`
        @media print {
          /* Hide everything outside of the challan */
          body * {
            visibility: hidden;
          }
          /* Make the challan and its content visible */
          #challan, #challan * {
            visibility: visible;
          }
          /* Position the challan for printing */
          #challan {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important; /* Remove shadow in print */
            padding: 0 !important; /* Adjust padding for print */
          }
          /* Hide the download button */
          .no-print {
            display: none !important;
          }
          /* Set page margins */
          @page {
            margin: 1cm;
          }
        }
      `}</style>
    </div>
  );
};
