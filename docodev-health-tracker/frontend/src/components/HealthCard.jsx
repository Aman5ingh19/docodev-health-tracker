const HealthCard = ({ record }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {formatDate(record.date)}
        </h3>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Recorded
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Blood Pressure</p>
          <p className="text-lg font-semibold text-gray-800">
            {record.bloodPressure.systolic}/{record.bloodPressure.diastolic}
          </p>
          <p className="text-xs text-gray-400">mmHg</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Blood Sugar</p>
          <p className="text-lg font-semibold text-gray-800">{record.bloodSugar}</p>
          <p className="text-xs text-gray-400">mg/dL</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Weight</p>
          <p className="text-lg font-semibold text-gray-800">{record.weight}</p>
          <p className="text-xs text-gray-400">kg</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Heart Rate</p>
          <p className="text-lg font-semibold text-gray-800">{record.heartRate}</p>
          <p className="text-xs text-gray-400">BPM</p>
        </div>
      </div>
      
      {record.notes && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">Notes</p>
          <p className="text-sm text-gray-700 mt-1">{record.notes}</p>
        </div>
      )}
    </div>
  );
};

export default HealthCard;
