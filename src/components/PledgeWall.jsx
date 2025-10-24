import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllPledges } from '../utils/storage';

/**
 * PledgeWall Component
 * Displays public pledges with pagination and filtering
 */
const PledgeWall = ({ refreshTrigger = 0 }) => {
  const [pledges, setPledges] = useState([]);
  const [filteredPledges, setFilteredPledges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterState, setFilterState] = useState('all');

  const pledgesPerPage = 50;

  useEffect(() => {
    loadPledges();
  }, [refreshTrigger]);

  useEffect(() => {
    applyFilters();
  }, [pledges, searchTerm, filterType, filterState]);

  const loadPledges = () => {
    const allPledges = getAllPledges();
    setPledges(allPledges);
  };

  const applyFilters = () => {
    let filtered = [...pledges];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(pledge =>
        pledge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pledge.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Profile type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(pledge => pledge.profileType === filterType);
    }

    // State filter
    if (filterState !== 'all') {
      filtered = filtered.filter(pledge => pledge.state === filterState);
    }

    setFilteredPledges(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  const renderStars = (count) => {
    return '⭐'.repeat(count);
  };

  // Pagination
  const indexOfLastPledge = currentPage * pledgesPerPage;
  const indexOfFirstPledge = indexOfLastPledge - pledgesPerPage;
  const currentPledges = filteredPledges.slice(indexOfFirstPledge, indexOfLastPledge);
  const totalPages = Math.ceil(filteredPledges.length / pledgesPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of pledge wall
    document.getElementById('pledge-wall')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get unique states from pledges
  const uniqueStates = [...new Set(pledges.map(p => p.state))].sort();

  return (
    <section id="pledge-wall" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Wall of <span className="text-primary-600">Champions</span>
          </h2>
          <p className="text-xl text-gray-600 flex items-center justify-center gap-2">
            <Users className="w-6 h-6" />
            Celebrating {filteredPledges.length.toLocaleString()} Climate Action Heroes
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
                Search by Name or ID
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                />
              </div>
            </div>

            {/* Profile Type Filter */}
            <div>
              <label htmlFor="profileFilter" className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Profile
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  id="profileFilter"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 appearance-none"
                >
                  <option value="all">All Profiles</option>
                  <option value="Student">Students</option>
                  <option value="Working Professional">Working Professionals</option>
                  <option value="Other">Others</option>
                </select>
              </div>
            </div>

            {/* State Filter */}
            <div>
              <label htmlFor="stateFilter" className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by State
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  id="stateFilter"
                  value={filterState}
                  onChange={(e) => setFilterState(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 appearance-none"
                >
                  <option value="all">All States</option>
                  {uniqueStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Active filters display */}
          {(searchTerm || filterType !== 'all' || filterState !== 'all') && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchTerm && (
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  Search: "{searchTerm}"
                </span>
              )}
              {filterType !== 'all' && (
                <span className="bg-ocean-100 text-ocean-700 px-3 py-1 rounded-full text-sm font-medium">
                  Profile: {filterType}
                </span>
              )}
              {filterState !== 'all' && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  State: {filterState}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                  setFilterState('all');
                }}
                className="text-red-600 hover:text-red-700 text-sm font-medium underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Pledge Cards Grid */}
        {currentPledges.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentPledges.map((pledge, index) => (
                <div
                  key={pledge.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {pledge.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-mono">
                        {pledge.id}
                      </p>
                    </div>
                    <div className="bg-primary-50 px-3 py-1 rounded-full">
                      <p className="text-xs font-semibold text-primary-700">
                        {pledge.profileType}
                      </p>
                    </div>
                  </div>

                  {/* Location and Date */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <span>📍 {pledge.state}</span>
                    <span>📅 {formatDate(pledge.timestamp)}</span>
                  </div>

                  {/* Love for Planet */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Love for Planet
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl">
                        {renderStars(pledge.stars)}
                      </p>
                      <p className="text-sm font-bold text-gray-600">
                        {pledge.commitments.length} commitment{pledge.commitments.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                {/* Page numbers */}
                <div className="flex gap-2">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                          currentPage === pageNum
                            ? 'bg-primary-500 text-white'
                            : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        aria-label={`Page ${pageNum}`}
                        aria-current={currentPage === pageNum ? 'page' : undefined}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  aria-label="Next page"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Results info */}
            <div className="mt-6 text-center text-gray-600">
              <p>
                Showing {indexOfFirstPledge + 1}-{Math.min(indexOfLastPledge, filteredPledges.length)} of{' '}
                {filteredPledges.length.toLocaleString()} pledges
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-xl text-gray-600 font-semibold mb-2">
              No pledges found
            </p>
            <p className="text-gray-500">
              Try adjusting your filters or search criteria
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PledgeWall;
