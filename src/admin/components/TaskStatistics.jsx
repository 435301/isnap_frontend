import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChartBox = ({ title, labels, data, colors }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  useEffect(() => {
    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    if (chartRef.current) {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: colors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();
    };
  }, [labels, data, colors]);

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">{title}</h5>
            <select className="form-select p-2 w-auto px-2 pe-5">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>

          <div className="chart-container text-center">
            <canvas ref={chartRef} />
          </div>

          <div className="legend mt-4">
            {labels.map((label, idx) => (
              <div
                key={idx}
                className="legend-item d-flex justify-content-between"
              >
                <div
                  key={idx}
                  className="legend-item text-center d-flex flex-column  mb-2"
                >
                  <div style={{ color: "#7B8C9D" }}>{label}</div>
                  <span>{data[idx]}%</span>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskStatistics = () => {
  return (
    <div className="row">
    <PieChartBox
  title="Task Statistics"
  labels={["New", "In Progress", "Completed"]}
  data={[50, 10, 40]}
  colors={["#007bff", "#ffc107", "#28a745"]} // Blue, Yellow, Green
/>

      <PieChartBox
        title="Team Statistics"
        labels={["New", "In Progress", "Completed"]}
        data={[30, 20, 50]}
        colors={["#007bff", "#ffc107", "#dc3545"]}
      />

      <PieChartBox
        title="Seller Statistics"
        labels={["New", "In Progress", "Completed"]}
        data={[60, 30, 10]}
        colors={["#17a2b8", "#6c757d", "#f39c12"]}
      />
    </div>
  );
};

export default TaskStatistics;
