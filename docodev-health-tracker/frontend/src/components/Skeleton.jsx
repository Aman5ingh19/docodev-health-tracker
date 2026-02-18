// Base Skeleton Component
export const Skeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}></div>
  );
};

// Stats Card Skeleton
export const StatsCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-8 w-20" />
    </div>
  );
};

// Table Row Skeleton
export const TableRowSkeleton = () => {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-16" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-16" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-16" />
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
      </td>
    </tr>
  );
};

// Table Skeleton
export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left">
                <Skeleton className="h-3 w-16" />
              </th>
              <th className="px-6 py-3 text-left">
                <Skeleton className="h-3 w-24" />
              </th>
              <th className="px-6 py-3 text-left">
                <Skeleton className="h-3 w-20" />
              </th>
              <th className="px-6 py-3 text-left">
                <Skeleton className="h-3 w-16" />
              </th>
              <th className="px-6 py-3 text-left">
                <Skeleton className="h-3 w-20" />
              </th>
              <th className="px-6 py-3 text-left">
                <Skeleton className="h-3 w-16" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {Array.from({ length: rows }).map((_, index) => (
              <TableRowSkeleton key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Form Skeleton
export const FormSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Skeleton className="w-8 h-8 rounded" />
        <Skeleton className="h-6 w-48" />
      </div>
      
      {/* Form fields */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      ))}
      
      {/* Buttons */}
      <div className="flex space-x-4 pt-4">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 flex-1 rounded-md" />
      </div>
    </div>
  );
};

// Dashboard Skeleton
export const DashboardSkeleton = () => {
  return (
    <div className="p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-dark-card border border-dark-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <Skeleton className="w-12 h-12 rounded-lg bg-dark-border" />
              <Skeleton className="h-6 w-16 rounded-full bg-dark-border" />
            </div>
            <Skeleton className="h-4 w-24 mb-2 bg-dark-border" />
            <Skeleton className="h-8 w-20 bg-dark-border" />
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-32 bg-dark-border" />
          <Skeleton className="h-4 w-16 bg-dark-border" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-10 h-10 rounded-lg bg-dark-border" />
                <div>
                  <Skeleton className="h-4 w-32 mb-2 bg-dark-border" />
                  <Skeleton className="h-3 w-24 bg-dark-border" />
                </div>
              </div>
              <Skeleton className="h-4 w-20 bg-dark-border" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
