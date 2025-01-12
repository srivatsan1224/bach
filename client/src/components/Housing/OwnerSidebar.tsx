import { User, Mail, Phone, MapPin, Building2, Calendar } from "lucide-react";

export const OwnerSidebar = () => {
  return (
    <div className="w-80 bg-white shadow-lg rounded-xl p-6 sticky top-24 h-fit border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="space-y-6">
        {/* Owner Profile */}
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center ring-4 ring-emerald-50">
            <User className="w-12 h-12 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 tracking-tight">John Smith</h3>
          <p className="text-sm text-gray-500 mt-1">Property Owner</p>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <div className="space-y-4">
            {/* Contact Details */}
            <div className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 transition-colors group cursor-pointer">
              <Phone className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
              <span className="text-sm">+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 transition-colors group cursor-pointer">
              <Mail className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
              <span className="text-sm">john.smith@example.com</span>
            </div>

            {/* Property Details */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-900 mb-3 tracking-wide uppercase">Property Details</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Building2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm">3 Story Building</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm">Chromepet, Chennai</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm">Available from June 1st</span>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 mt-4 shadow-sm hover:shadow-md">
              Contact Owner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};