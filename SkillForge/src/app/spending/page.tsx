"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowBigRightDash } from "lucide-react";
import Link from "next/link";

function Page() {
  const [img, setImg] = useState(null);
  const [spendings, setSpendings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
 
  const router = useRouter();

  useEffect(() => {
    const storedImg = localStorage.getItem("photo");
    setImg(storedImg);

    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/");
    }
  }, [router]);

  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://10.50.0.89:8888/api/spendings/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_uid: "PkrrbhFWbGPISmVAGivoCYpsuGb2",
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setSpendings(result.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('https://your-api-endpoint.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers like authorization if needed
          // 'Authorization': 'Bearer your-token-here'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      setSuccess(true);
      // Optionally reset the form after successful submission
      setFormData({
        category: '',
        amount: '',
        description: ''
      });
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Group spendings by month and category
  const monthlySpendings = spendings.reduce((acc, spending) => {
    const date = new Date(spending.date);
    const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = {
        total: 0,
        categories: {}
      };
    }
    
    if (!acc[monthYear].categories[spending.category]) {
      acc[monthYear].categories[spending.category] = 0;
    }
    
    acc[monthYear].categories[spending.category] += spending.amount;
    acc[monthYear].total += spending.amount;
    
    return acc;
  }, {});

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">Error: {error}</div>;

  return (
    <div className="h-screen w-full text-blue-600">
      <nav className="fixed top-0 h-20 w-full flex items-center justify-between px-10 gap-10 bg-white">
        <div>
          <h1 className="text-3xl">FinBubby</h1>
        </div>
        <div className="flex gap-10 items-center justify-center">
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
          <div className="h-10 w-10 rounded-3xl overflow-hidden">
            <img src={img || ""} alt="User" />
          </div>
        </div>
      </nav>

      <div className="h-full w-full py-20 px-10 overflow-auto">
        <h1 className="text-5xl text-blue-600 flex items-center gap-1 mb-6">
          Monthly Spending Breakdown
          <ArrowBigRightDash size={70} />
        </h1>

        {Object.entries(monthlySpendings).map(([monthYear, data]) => (
          <div key={monthYear} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-4xl font-bold">{monthYear}</h2>
              <div className="text-2xl">
                Total: <span className="font-bold">₹{data.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(data.categories).map(([category, amount]) => (
                    <tr key={category}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {((amount / data.total) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {Object.keys(monthlySpendings).length === 0 && (
          <div className="text-center py-10">No spending records found</div>
        )}

        <div className="h-72 w-80 p-10 bg-white border-2 fixed bottom-4 rounded-4xl right-10 ">
          
          <h1>Add Spendings</h1>
          
          <input 
        type="text" 
        name="category"
        className="border-2 mt-2 p-1 rounded-1xl" 
        placeholder="Category" 
        value={formData.category}
        onChange={handleInputChange}
      />
      <input 
        type="text" 
        name="amount"
        className="border-2 mt-2 p-1 rounded-1xl" 
        placeholder="Amount" 
        value={formData.amount}
        onChange={handleInputChange}
      />
      <input 
        type="text" 
        name="description"
        className="border-2 mt-2 p-1 rounded-1xl" 
        placeholder="Description" 
        value={formData.description}
        onChange={handleInputChange}
      />
         
         <button className="mt-2 bg-blue-400 text-white p-2 rounded-3xl">Submit</button>



        </div>


      </div>
    </div>
  );
}

export default Page;