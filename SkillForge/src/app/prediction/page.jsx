// components/ForecastDisplay.jsx
import React from 'react';
import Link from 'next/link';

const ForecastDisplay = ({ forecastData }) => {
  if (!forecastData) return <div className="text-center py-8">Loading...</div>;

  const { forecast } = forecastData;
  const { categories, total_monthly_projections, average_monthly, periods } = forecast;

  return (
    <>
    <div className='h-screen w-full  '>
 <nav className="fixed top-0 h-20 w-full flex items-center justify-between px-10 gap-10 bg-white z-10">
        <div>
          <h1 className="text-3xl">FinBubby</h1>
        </div>
        <div className="flex gap-10 items-center justify-center text-blue-800">
          <Link href="/dashboard">
            <h1 className="cursor-pointer">Home</h1>
          </Link>  
          <Link href="/spending">
            <h1>Spendings</h1>
          </Link>
          <Link href="/forecast">
            <h1>Forecast</h1>
          </Link>
          <Link href="/prediction">
            <h1>Predition </h1>
          </Link>
          {/* <div className="h-10 w-10 rounded-3xl overflow-hidden">
            <img src={img || ""} alt="User" />
          </div> */}
        </div>
      </nav>
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Financial Forecast
      </h1>
      
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {Object.entries(categories).map(([category, data]) => (
          <div 
            key={category} 
            className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold text-gray-800 capitalize mb-3">{category}</h2>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Current: <span className="font-semibold text-gray-800">${data.current_month.toFixed(2)}</span>
              </p>
              <p className="text-sm text-gray-600">
                Average: <span className="font-semibold text-gray-800">${data.average.toFixed(2)}</span>
              </p>
              <p className="text-sm text-gray-600">
                Trend: 
                <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  data.trend === 'up' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {data.trend} {data.trend === 'up' ? '↑' : '↓'}
                </span>
              </p>
              <div className="pt-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Projections:</p>
                <div className="space-y-1">
                  {data.projected.map((value, index) => (
                    <div 
                      key={index}
                      className="flex justify-between text-sm bg-gray-50 p-2 rounded-md"
                    >
                      <span className="text-gray-600">{periods[index]}:</span>
                      <span className="font-medium text-gray-800">${value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Monthly Projections */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Monthly Projections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {total_monthly_projections.map((value, index) => (
            <div 
              key={index}
              className="bg-white p-3 rounded-lg text-center"
            >
              <p className="text-sm text-gray-600">{periods[index]}</p>
              <p className="text-lg font-semibold text-gray-800 Angled text-gray-800">$ {value.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Average Monthly: <span className="font-semibold text-gray-800">${average_monthly.toFixed(2)}</span>
        </p>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-500 mt-6 text-center">
        Generated: {new Date(forecast.generated_at).toLocaleString()}
      </p>
    </div>

    </div>
    </>
  );
};

// Page Component (pages/index.jsx)
const Home = () => {
  const forecastData = {
    "status": "success",
    "forecast": {
      "categories": {
        "Shopping": {"current_month": 85.0, "average": 73.33333333333333, "trend": "up", "projected": [77.0, 80.67, 84.33]},
        "Food": {"current_month": 32.8, "average": 36.31666666666667, "trend": "down", "projected": [38.13, 39.95, 41.76]},
        "Subscription": {"current_month": 9.99, "average": 10.99, "trend": "down", "projected": [11.54, 12.09, 12.64]},
        "Transportation": {"current_month": 57.0, "average": 64.0, "trend": "down", "projected": [67.2, 70.4, 73.6]},
        "Utilities": {"current_month": 150.0, "average": 135.0, "trend": "up", "projected": [141.75, 148.5, 155.25]},
        "Entertainment": {"current_month": 30.0, "average": 45.0, "trend": "down", "projected": [47.25, 49.5, 51.75]},
        "Health": {"current_month": 45.0, "average": 36.666666666666664, "trend": "up", "projected": [38.5, 40.33, 42.17]}
      },
      "total_monthly_projections": [421.37, 441.44, 461.50000000000006],
      "average_monthly": 441.43666666666667,
      "method": "3-month moving average with 5% monthly growth factor",
      "periods": ["Month 1", "Month 2", "Month 3"],
      "generated_at": "2025-04-03T15:40:00.741036"
    },
    "period_months": 3
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-12 px-4">
      <ForecastDisplay forecastData={forecastData} />
    </div>
  );
};

export default Home;