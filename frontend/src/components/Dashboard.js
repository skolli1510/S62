import React from 'react';
import '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <main className="container center" aria-labelledby="dashboard-title">
    
      
        
     <div className="section-container">
  <article className="section-box" aria-labelledby="summary-title">
    <h2 id="summary-title">Clean Energy Innovations</h2>
    <p>
      
The United States has seen significant growth in clean energy over the past decade, with solar and wind power leading the charge. In 2023, America's capacity to generate carbon-free electricity grew, driven by a 23% increase in solar capacity and a 16% increase in solar electricity generation compared to 2022.
Solar Energy Highlights
The U.S. produced 238,121 gigawatt-hours (GWh) of electricity from solar in 2023, more than eight times the amount generated a decade earlier.
California and Texas led the nation in solar power generation, with California producing 68,816 GWh and Texas producing 31,739 GWh.
Small-scale solar installations accounted for 34% of all solar capacity in the U.S. at the end of 2023, with nearly 8 GW of new capacity brought online.
Key Trends
Solar capacity has grown by 688% over the past decade, with an increase of 121 GW.
Utility-scale solar accounts for around 8% of the nation's capacity from all utility-scale electricity sources.
Nevada's Gemini solar facility is expected to come online in 2024, adding 690 MW of solar capacity and 380 MW of battery storage.
These developments demonstrate the nation's progress toward net-zero carbon emissions targets and underscore the importance of solar energy in the U.S. clean energy mix ¹.
    </p>
    <p>
      For more details, refer to the full report at <a href="https://www.climatecentral.org/report/solar-and-wind-power-2024" target="_blank" rel="noopener noreferrer">Climate Central</a>.
    </p>
  </article>

  <section className="section-box" aria-labelledby="tech-stack-title">
    <h2 id="tech-stack-title">Technical Aspects</h2>
    <p>
    Project Technology Stack
Backend
MongoDB: A NoSQL database for efficient data storage and retrieval.
Express: A Node.js framework for building scalable server-side applications.
Node.js: A JavaScript runtime environment for server-side logic execution.
NGINX: A reverse proxy server managing incoming requests and ensuring high performance.
Frontend
React: A JavaScript library for building interactive and dynamic user interfaces.
Security
JSON Web Tokens (JWT): Secure authentication mechanism ensuring authorized access.
Accessibility
Compliance with ADA/WCAG standards for accessible design.
Data Visualization
d3.js: A JavaScript library for creating interactive charts and data visualizations.
Key Features
Secure Authentication: JWT ensures only authorized users access sensitive data.
Data Visualization: Interactive charts and graphs provide clear insights into clean energy trends.
Accessibility: ADA/WCAG compliance ensures equal access for diverse users.
    </p>
  </section>
</div>

      

      <footer className="footer" role="contentinfo">
        &copy; 2023 Clean Energy Innovations Dashboard
      </footer>
    </main>
  );
};

export default Dashboard;

