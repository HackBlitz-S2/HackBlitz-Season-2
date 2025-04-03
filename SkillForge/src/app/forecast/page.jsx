"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowBigRightDash } from "lucide-react";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import Link from "next/link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Static API response data (keeping this for charts)
const apiResponse = {
  status: "success",
  charts: {
    pie_chart: {
      labels: ["Food", "Shopping", "Entertainment", "Transportation", "Subscription", "Utilities", "Health"],
      datasets: [{
        data: [108.95, 220.0, 135.0, 192.0, 32.97, 270.0, 110.0],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#8AC24A", "#EA5F89"]
      }]
    },
    line_graph: {
      labels: ["2023-01", "2023-02", "2023-03"],
      datasets: [{
        label: "Monthly Spending",
        data: [403.19, 255.94, 409.79],
        borderColor: "#36A2EB",
        tension: 0.1,
        fill: false
      }]
    },
    histogram: {
      labels: ["0-50", "50-100", "100-150", "150-200", "200+"],
      datasets: [{
        label: "Daily Spending Distribution",
        data: [20, 5, 1, 1, 0],
        backgroundColor: "#FFCE56"
      }]
    }
  },
  analysis: {
    total_spendings: 27,
    total_amount: 1068.92,
    average_monthly: 356.31
  }
};

// Shimmer Effect Component
const ShimmerCard = () => (
  <div className="p-5 bg-gray-100 rounded-xl w-full md:w-1/3 lg:w-1/4 animate-pulse">
    <div className="flex items-center mb-2">
      <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
      <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
    </div>
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
    <div className="flex justify-between">
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </div>
  </div>
);

function Page() {
  const [img, setImg] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Use static data for charts
  const analysisData = apiResponse;

  // Fetch suggestions from API
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/suggestions/');
        const data = await response.json();
        if (data.status === "success") {
          setSuggestions(data.ai_suggestions);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        // Fallback to empty array if API fails
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  // Prepare chart data from static response
  const pieChartData = analysisData.charts.pie_chart;
  const lineChartData = analysisData.charts.line_graph;
  const barChartData = analysisData.charts.histogram;

  return (
    <div className="h-screen w-full text-blue-600">
      {/* Navigation remains the same */}
      <nav className="fixed top-0 h-20 w-full flex items-center justify-between px-10 gap-10 bg-white">
        <div>
          <h1 className="text-3xl">FinBubby</h1>
        </div>
        <div className="flex gap-10 items-center justify-center">
          <Link href="/dashboard"><h1 className="cursor-pointer">Home</h1></Link>  
          <Link href="/spending"><h1>Spendings</h1></Link>
          <Link href="/forecast"><h1>Forecast</h1></Link>
          <Link href="/prediction"><h1>Predition</h1></Link>
          <div className="h-10 w-10 rounded-3xl overflow-hidden bg-gray-100 flex items-center justify-center">
            {img ? (
              <img src={img} alt="User profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-xs">User</span>
            )}
          </div>
        </div>
      </nav>

      <div className="h-full w-full py-20 px-10 overflow-y-auto">
        <h1 className="text-5xl text-blue-600 flex items-center gap-1">
          Forecast <ArrowBigRightDash size={70} />
        </h1>
        
        {/* Summary Cards remain the same */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-500">Total Spendings</h3>
            <p className="text-3xl font-bold">${analysisData.analysis.total_amount.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{analysisData.analysis.total_spendings} transactions</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-500">Average Monthly</h3>
            <p className="text-3xl font-bold">${analysisData.analysis.average_monthly.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-500">Suggestions</h3>
            <p className="text-3xl font-bold">{suggestions.length}</p>
            <p className="text-sm text-gray-500">potential savings</p>
          </div>
        </div>

        {/* Charts Section remains the same */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
          <div className="p-5 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl mb-3">Monthly Spending</h2>
            <Line 
              data={lineChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  tooltip: {
                    callbacks: {
                      label: (context) => `$${context.raw.toFixed(2)}`
                    }
                  }
                }
              }}
            />
          </div>
          <div className="p-5 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl mb-3">Spending Distribution</h2>
            <Pie 
              data={pieChartData}
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (context) => 
                        `${context.label}: $${context.raw.toFixed(2)} (${context.formattedValue}%)`
                    }
                  }
                }
              }}
            />
          </div>
          <div className="p-5 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl mb-3">Daily Spending</h2>
            <Bar 
              data={barChartData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { precision: 0 }
                  }
                }
              }}
            />
          </div>
        </div>
        
        {/* Updated Suggestions Section */}
        <div className="h-full w-full mt-10">
          <h1 className="text-5xl text-blue-600 flex items-center gap-1">
            Suggestions <ArrowBigRightDash size={70} />
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {isLoading ? (
              // Show shimmer effect while loading
              <>
                <ShimmerCard />
                <ShimmerCard />
                <ShimmerCard />
              </>
            ) : suggestions.length > 0 ? (
              suggestions.map((item, index) => (
                <div key={index} className="p-5 bg-white rounded-xl shadow-lg border-dashed border-2 w-full md:w-1/3 lg:w-1/4">
                  <div className="flex items-center mb-2">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      item.priority === "High" ? "bg-red-500" : 
                      item.priority === "Medium" ? "bg-yellow-500" : "bg-green-500"
                    }`}></div>
                    <h2 className="text-xl font-semibold">{item.category}</h2>
                  </div>
                  <p className="text-gray-600 mb-3">{item.suggestion}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-500">Priority: {item.priority}</span>
                    <span className="text-sm font-bold text-green-600">
                      Save ${item.estimated_savings}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-blue-50 p-4 rounded-lg w-full text-center">
                <p>No suggestions available. Your spending looks optimal!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;