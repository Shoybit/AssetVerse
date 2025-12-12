import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { 
  Printer, 
  FileText, 
  Calendar, 
  Building, 
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Image as ImageIcon
} from "lucide-react";

const AssignedCard = ({ assigned = {} }) => {
  const printRef = useRef(null);

  // Safe data extraction with defaults
  const {
    assetName = "Unnamed Asset",
    assetType = "Unknown",
    status = "Unknown",
    companyName = "N/A",
    assignmentDate = new Date(),
    assetImage,
    requestDate,
    approvalDate,
    id = Date.now()
  } = assigned;

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Asset-${assetName.replace(/\s+/g, '-')}`,
    pageStyle: `
      @media print {
        @page { margin: 20mm; }
        body { -webkit-print-color-adjust: exact; }
        .no-print { display: none !important; }
        .print-only { display: block !important; }
      }
      .print-only { display: none; }
    `,
  });

  // Status configuration
  const statusConfig = {
    assigned: { color: "badge-primary", icon: <CheckCircle size={14} /> },
    pending: { color: "badge-warning", icon: <Clock size={14} /> },
    returned: { color: "badge-success", icon: <CheckCircle size={14} /> },
    damaged: { color: "badge-error", icon: <XCircle size={14} /> },
    default: { color: "badge-info", icon: <Package size={14} /> }
  };

  const statusLower = status?.toLowerCase();
  const { color, icon } = statusConfig[statusLower] || statusConfig.default;

  // Asset type styling
  const isReturnable = assetType?.toLowerCase().includes("returnable");
  const assetTypeColor = isReturnable ? "text-success" : "text-warning";

  // Date formatting helper
  const formatDate = (date) => {
    if (!date) return "N/A";
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return "Invalid Date";
    }
  };

  // Detailed date formatting
  const formatDetailedDate = (date) => {
    if (!date) return "N/A";
    try {
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-base-300">
      <div className="card-body p-6">
        {/* Header with badge */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="card-title text-lg font-bold">
                {assetName}
              </h2>
              <div className={`badge ${color} gap-1`}>
                {icon}
                {status}
              </div>
            </div>
          </div>
          
          <div className={`badge ${assetTypeColor} badge-outline font-semibold`}>
            {assetType}
          </div>
        </div>

        {/* Printable content */}
        <div ref={printRef} className="space-y-4">

          {/* Asset Image */}
          {assetImage ? (
            <div className="mb-4 flex justify-center">
              <div className="w-full h-42 border rounded-lg overflow-hidden">
                <img 
                  src={assetImage} 
                  alt={assetName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-base-200"><ImageIcon className="text-gray-400" size={32} /></div>';
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="mb-4 flex justify-center">
              <div className="w-32 h-32 border rounded-lg bg-base-200 flex items-center justify-center">
                <ImageIcon className="text-gray-400" size={32} />
              </div>
            </div>
          )}

          {/* Asset Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              {/* Asset Name */}
              <div className="flex items-center gap-3">
                <Package size={18} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Asset Name</p>
                  <p className="font-semibold">{assetName}</p>
                </div>
              </div>

              {/* Company */}
              <div className="flex items-center gap-3">
                <Building size={18} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Company</p>
                  <p className="font-semibold">{companyName}</p>
                </div>
              </div>

              {/* Asset Type */}
              <div className="flex items-center gap-3">
                <Package size={18} className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Asset Type</p>
                  <p className="font-semibold">{assetType}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Request Date */}
              {requestDate && (
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Request Date</p>
                    <p className="font-semibold">{formatDate(requestDate)}</p>
                  </div>
                </div>
              )}

              {/* Approval Date */}
              {approvalDate && (
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Approval Date</p>
                    <p className="font-semibold">{formatDate(approvalDate)}</p>
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="flex items-center gap-3">
                {icon}
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold">{status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Date */}
          <div className="mt-4 p-3 bg-base-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="text-primary" size={18} />
              <span className="font-medium">Assignment Date:</span>
              <span className="ml-2 font-semibold">
                {formatDetailedDate(assignmentDate)}
              </span>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="card-actions justify-between items-center mt-6 no-print">
          <div className="text-xs text-gray-500">
            Last updated: {formatDate(new Date())}
          </div>
          
          <div className="flex gap-2">
            
            <button
              onClick={handlePrint}
              className="btn btn-sm btn-primary gap-1 hover:bg-primary-focus"
            >
              <Printer size={16} />
              Print
            </button>
            
            <button
              onClick={handlePrint}
              className="btn btn-sm btn-outline btn-primary gap-1 hover:bg-primary hover:text-white"
            >
              <Download size={16} />
              PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add default props
AssignedCard.defaultProps = {
  assigned: {}
};

export default AssignedCard;