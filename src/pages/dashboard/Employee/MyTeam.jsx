import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import Skeleton from "../../../components/Skeleton";
import { 
  FiUsers, 
  FiCalendar, 
  FiMail, 
  FiBriefcase, 
  FiEye,
  FiChevronRight,
  FiStar,
  FiCamera,
  FiActivity
} from "react-icons/fi";
import { FcIcons8Cup } from "react-icons/fc";

export default function MyTeam() {
      useEffect(() => {
    document.title = "MyTeam | AssetVerse";
  }, []);
  const [affiliations, setAffiliations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [company, setCompany] = useState("all");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/affiliations/my");
      const items = res.data.items || res.data || [];
      setAffiliations(items);
      setFiltered(items);
    } catch (err) {
      console.error("Failed to load team", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Get unique companies
  const companies = Array.from(
    new Set(affiliations.map((a) => a.companyName).filter(Boolean))
  );

  // Filter by company and search
  useEffect(() => {
    let result = affiliations;
    
    if (company !== "all") {
      result = result.filter(a => a.companyName === company);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(a => 
        a.employeeName?.toLowerCase().includes(searchLower) ||
        a.position?.toLowerCase().includes(searchLower) ||
        a.employeeEmail?.toLowerCase().includes(searchLower)
      );
    }
    
    setFiltered(result);
  }, [company, search, affiliations]);

  // Get birthdays for current month
  const currentMonth = new Date().getMonth();
  const birthdays = affiliations.filter(a => {
    if (!a.dateOfBirth) return false;
    return new Date(a.dateOfBirth).getMonth() === currentMonth;
  });

  // Format date to show day and month only
  const formatBirthday = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-12/12 mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-blue-100 rounded-xl">
            <FiUsers className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">Team</span></h1>
            <p className="text-gray-600">View your colleagues and team members</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Members</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{affiliations.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiUsers className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Unique Companies</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{companies.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FiBriefcase className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">This Month's Birthdays</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{birthdays.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiCamera className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Members
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUsers className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, position, or email..."
                className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Company Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Company
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiBriefcase className="text-gray-400" />
              </div>
              <select
                className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              >
                <option value="all">All Companies</option>
                {companies.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FiChevronRight className="text-gray-400 rotate-90" />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filtered.length}</span> members
              {search && ` for "${search}"`}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Team Members List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiUsers className="text-gray-500" />
                  <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  {filtered.length} members
                </span>
              </div>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton count={5} />
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <FiUsers className="text-gray-400 text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No members found</h3>
                  <p className="text-gray-600">
                    {search ? "Try a different search term" : "No team members available"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all"
                    >
                      <div className="shrink-0">
                        <div className="w-14 h-14 rounded-full border-2 border-white shadow overflow-hidden">
                          <img
                            src={item.photo}
                            alt={item.employeeName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/avatar.png";
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.employeeName}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              {item.position && (
                                <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                                  <FiBriefcase className="text-xs" />
                                  {item.position}
                                </span>
                              )}
                              {item.companyName && (
                                <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                                  <FiStar className="text-xs" />
                                  {item.companyName}
                                </span>
                              )}
                            </div>
                          </div>
                          {item.dateOfBirth && (
                            <div className="text-right">
                              <div className="text-xs text-gray-500">Birthday</div>
                              <div className="text-sm font-medium text-gray-900">
                                {formatBirthday(item.dateOfBirth)}
                              </div>
                            </div>
                          )}
                        </div>

                        {item.employeeEmail && (
                          <div className="flex items-center gap-2 mt-2">
                            <FiMail className="text-gray-400 text-sm" />
                            <span className="text-sm text-gray-600 truncate">{item.employeeEmail}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Birthdays & Info */}
        <div className="space-y-8">
          {/* Birthdays Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <FiActivity className="text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">This Month's Birthdays</h2>
              </div>
            </div>

            <div className="p-6">
              {loading ? (
                <Skeleton count={3} />
              ) : birthdays.length === 0 ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-sm">No birthdays this month</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {birthdays.map((b) => (
                    <div
                      key={b._id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 border border-purple-100"
                    >
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                          <FcIcons8Cup className="text-purple-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{b.employeeName}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-gray-600">{b.position}</span>
                          <span className="text-sm font-medium text-purple-700">
                            {formatBirthday(b.dateOfBirth)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-lg">
                <FiEye className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Information</h3>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              This page is read-only. You can view your colleagues and upcoming birthdays, 
              but cannot edit or manage team members.
            </p>
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <FiEye />
              <span>View only access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}