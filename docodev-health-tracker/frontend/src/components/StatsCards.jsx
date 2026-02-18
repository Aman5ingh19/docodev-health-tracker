import { FileText, Activity, Droplet, Weight, Heart } from 'lucide-react';

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Records',
      value: stats?.totalRecords || 0,
      icon: FileText,
      color: 'bg-blue-500',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Avg Blood Pressure',
      value: stats?.avgBloodPressure 
        ? `${stats.avgBloodPressure.systolic}/${stats.avgBloodPressure.diastolic}` 
        : '0/0',
      unit: 'mmHg',
      icon: Activity,
      color: 'bg-red-500',
      iconColor: 'text-red-600 dark:text-red-400'
    },
    {
      title: 'Avg Blood Sugar',
      value: stats?.avgBloodSugar || 0,
      unit: 'mg/dL',
      icon: Droplet,
      color: 'bg-purple-500',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Avg Weight',
      value: stats?.avgWeight || 0,
      unit: 'kg',
      icon: Weight,
      color: 'bg-green-500',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Avg Heart Rate',
      value: stats?.avgHeartRate || 0,
      unit: 'BPM',
      icon: Heart,
      color: 'bg-pink-500',
      iconColor: 'text-pink-600 dark:text-pink-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`${card.color} w-12 h-12 rounded-full flex items-center justify-center bg-opacity-10 dark:bg-opacity-20`}>
                <IconComponent className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {card.value} {card.unit && <span className="text-sm text-gray-500 dark:text-gray-400">{card.unit}</span>}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
