import React, { useState, useEffect } from 'react';
import '../assets/css/WeeklyTimesheet.css';

// --- Helper Functions and Initial Data ---
const getWeekStart = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDay();
  const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(newDate.setDate(diff));
};

const getTodayDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const projectTasks = ['Project Update', 'Debugging', 'Meeting'];
const nonProjectTasks = ['Working on new technology', 'Meeting', 'Interview'];

const initialWeekData = () => {
  const data = {
    location: Array(7).fill('Office'),
    project: {},
    nonProject: {},
  };
  projectTasks.forEach(task => data.project[task] = Array(7).fill(0));
  nonProjectTasks.forEach(task => data.nonProject[task] = Array(7).fill(0));
  return data;
};


function MyTimePage() {
  const [weekOffset, setWeekOffset] = useState(0); 
  const [weekDays, setWeekDays] = useState([]);
  const [timesheetData, setTimesheetData] = useState(initialWeekData());
  const [expandedRows, setExpandedRows] = useState({ project: true, nonProject: false });
  const [selectedCategory, setSelectedCategory] = useState(Array(7).fill(null));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTimesheetData = async () => {
        setIsLoading(true);
        setError('');

        const today = new Date();
        const currentWeekStart = getWeekStart(today);
        currentWeekStart.setDate(currentWeekStart.getDate() + (weekOffset * 7));
        
        const days = Array.from({ length: 7 }).map((_, i) => {
            const day = new Date(currentWeekStart);
            day.setDate(currentWeekStart.getDate() + i);
            return day;
        });
        setWeekDays(days);

        try {
            const backendUrl = `https://localhost:7041/api/timesheet?weekStart=${currentWeekStart.toISOString()}`;
            const response = await fetch(backendUrl);

            if (!response.ok) {
                throw new Error('Failed to fetch timesheet data. Please try again.');
            }
            const data = await response.json();
            
            // --- THIS IS THE FIX ---
            // We now merge the fetched data with a default empty structure.
            // This guarantees that `timesheetData.project` will always be an object, preventing the crash.
            const emptyData = initialWeekData();
            setTimesheetData({
                location: data.locations || emptyData.location,
                project: data.project || emptyData.project,
                nonProject: data.nonProject || emptyData.nonProject
            });
            // --------------------

        } catch (err) {
            setError(err.message);
            setTimesheetData(initialWeekData());
        } finally {
            setIsLoading(false);
        }
    };

    fetchTimesheetData();
  }, [weekOffset]);

  const handlePrevWeek = () => { if (weekOffset > -2) setWeekOffset(weekOffset - 1) };
  const handleNextWeek = () => { if (weekOffset < 0) setWeekOffset(weekOffset + 1) };

  const toggleRow = (row) => setExpandedRows(prev => ({ ...prev, [row]: !prev[row] }));

  const handleSubmit = async () => {
    const dataToSubmit = {
        weekStartDate: weekDays[0].toISOString(),
        locations: timesheetData.location,
        project: timesheetData.project,
        nonProject: timesheetData.nonProject,
    };
    
    try {
        const backendUrl = `https://localhost:7041/api/timesheet`;
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSubmit)
        });

        if (!response.ok) {
            throw new Error('Failed to submit timesheet.');
        }

        alert('Timesheet submitted successfully!');
    } catch (err) {
        alert(err.message);
    }
  };

  const handleCategoryChange = (dayIndex, category) => {
    const newSelection = [...selectedCategory];
    const newData = JSON.parse(JSON.stringify(timesheetData));

    if (newSelection[dayIndex] === category) {
      newSelection[dayIndex] = null;
    } else {
      newSelection[dayIndex] = category;
      if (category === 'project') {
        nonProjectTasks.forEach(task => newData.nonProject[task][dayIndex] = 0);
      } else {
        projectTasks.forEach(task => newData.project[task][dayIndex] = 0);
      }
    }
    setTimesheetData(newData);
    setSelectedCategory(newSelection);
  };


  const handleDataChange = (category, task, dayIndex, value) => {
    const currentTotal = calculateTotalEfforts(dayIndex);
    const oldValue = parseFloat(timesheetData[category][task][dayIndex]) || 0;
    const newValue = parseFloat(value) || 0;
    
    const potentialTotal = currentTotal - oldValue + newValue;
    if (potentialTotal > 24) {
      alert("Total hours for a single day cannot exceed 24.");
      return;
    }

    setTimesheetData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData));
      newData[category][task][dayIndex] = value;
      return newData;
    });
  };

  const handleBlur = (category, task, dayIndex) => {
    setTimesheetData(prevData => {
        const newData = JSON.parse(JSON.stringify(prevData));
        const hours = parseFloat(newData[category][task][dayIndex]) || 0;
        newData[category][task][dayIndex] = hours;
        return newData;
    });
  };

  const calculateTotalEfforts = (dayIndex) => {
    if (!timesheetData || !timesheetData.project) return 0;
    let total = 0;
    for (const task in timesheetData.project) {
      total += parseFloat(timesheetData.project[task][dayIndex]) || 0;
    }
    for (const task in timesheetData.nonProject) {
      total += parseFloat(timesheetData.nonProject[task][dayIndex]) || 0;
    }
    return total;
  };

  const getDayStatus = (dayIndex) => {
    if (!weekDays || weekDays.length === 0) return 'un-captured';
    const dayOfWeek = weekDays[dayIndex].getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return 'weekly-off';
    const totalHours = calculateTotalEfforts(dayIndex);
    if (totalHours >= 9.5) return 'filled';
    if (totalHours > 0) return 'partial';
    return 'un-captured';
  }
  
  if (isLoading) {
    return (
        <div className="container" style={{paddingTop: '40px'}}>
            <h2 className="dashboard-subtitle">MY TIME</h2>
            <p className="dashboard-title">Weekly Timesheet</p>
            <p>Loading timesheet...</p>
        </div>
    );
  }
  
  if (error) {
    return (
        <div className="container" style={{paddingTop: '40px'}}>
            <h2 className="dashboard-subtitle">MY TIME</h2>
            <p className="dashboard-title">Weekly Timesheet</p>
            <p style={{color: 'red'}}>{error}</p>
        </div>
    );
  }

  return (
    <div className="container">
      <div>
        <h2 className="dashboard-subtitle">MY TIME</h2>
        <p className="dashboard-title">Weekly Timesheet</p>
      </div>

      <div className="weekly-timesheet-container">
        <div className="timesheet-header">
            <h3>My timesheet</h3>
            <div className="timesheet-nav">
                <span className={`arrow ${weekOffset <= -2 ? 'disabled' : ''}`} onClick={handlePrevWeek}>&lt;</span>
                <span className="mx-3">
                  {weekDays.length > 0 && 
                      `${weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                  }
                </span>
                <span className={`arrow ${weekOffset >= 0 ? 'disabled' : ''}`} onClick={handleNextWeek}>&gt;</span>
            </div>
        </div>

        <div className="timesheet-grid">
          {/* Header Row */}
          <div className="grid-cell grid-header"></div>
          {weekDays.map((day, index) => (
            <div key={index} className={`grid-cell grid-header day-header status-${getDayStatus(index)}`}>
              <span className="day-name">{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
              <span className="date">{day.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</span>
            </div>
          ))}

          {/* Category Selection Row */}
          <div className="grid-cell row-label">Category Selection</div>
          {weekDays.map((day, index) => {
            const isFutureDate = day > getTodayDate();
            const isWeeklyOff = getDayStatus(index) === 'weekly-off';
            return (
              <div key={index} className="grid-cell category-selection-cell">
                <div className="category-choice">
                  <input type="checkbox" id={`proj-${index}`} checked={selectedCategory[index] === 'project'} onChange={() => handleCategoryChange(index, 'project')} disabled={isFutureDate || isWeeklyOff} />
                  <label htmlFor={`proj-${index}`}>Project</label>
                </div>
                <div className="category-choice">
                  <input type="checkbox" id={`nonproj-${index}`} checked={selectedCategory[index] === 'nonProject'} onChange={() => handleCategoryChange(index, 'nonProject')} disabled={isFutureDate || isWeeklyOff} />
                  <label htmlFor={`nonproj-${index}`}>Non-Project</label>
                </div>
              </div>
            )
          })}
          
          {/* Project Category Row (Expandable) */}
          <div className="grid-cell row-label row-label-expandable" onClick={() => toggleRow('project')}>
            <span>Project</span>
            <span className={`expand-icon ${expandedRows.project ? 'expanded' : ''}`}>▶</span>
          </div>
          {Array(7).fill(null).map((_, i) => <div key={i} className="grid-cell"></div>)}

          {expandedRows.project && projectTasks.map(task => (
            <React.Fragment key={task}>
                <div className="grid-cell sub-task-label">{task}</div>
                {weekDays.map((day, index) => {
                    const isFutureDate = day > getTodayDate();
                    return(
                        <div key={index} className="grid-cell input-cell">
                            <input 
                              type="number" 
                              className="effort-input" 
                              value={timesheetData.project[task][index]} 
                              onChange={(e) => handleDataChange('project', task, index, e.target.value)}
                              onBlur={() => handleBlur('project', task, index)}
                              disabled={isFutureDate || getDayStatus(index) === 'weekly-off' || selectedCategory[index] !== 'project'} 
                              step="0.01" 
                              min="0" 
                            />
                        </div>
                    )
                })}
            </React.Fragment>
          ))}
          
          {/* Non-Project Category Row (Expandable) */}
          <div className="grid-cell row-label row-label-expandable" onClick={() => toggleRow('nonProject')}>
            <span>Non-Project</span>
            <span className={`expand-icon ${expandedRows.nonProject ? 'expanded' : ''}`}>▶</span>
          </div>
          {Array(7).fill(null).map((_, i) => <div key={i} className="grid-cell"></div>)}

          {expandedRows.nonProject && nonProjectTasks.map(task => (
            <React.Fragment key={task}>
                <div className="grid-cell sub-task-label">{task}</div>
                {weekDays.map((day, index) => {
                    const isFutureDate = day > getTodayDate();
                    return(
                        <div key={index} className="grid-cell input-cell">
                            <input 
                              type="number" 
                              className="effort-input" 
                              value={timesheetData.nonProject[task][index]} 
                              onChange={(e) => handleDataChange('nonProject', task, index, e.target.value)}
                              onBlur={() => handleBlur('nonProject', task, index)}
                              disabled={isFutureDate || getDayStatus(index) === 'weekly-off' || selectedCategory[index] !== 'nonProject'} 
                              step="0.01" 
                              min="0"
                            />
                        </div>
                    )
                })}
            </React.Fragment>
          ))}
          
          {/* Total Efforts Row */}
          <div className="grid-cell row-label">Total efforts</div>
          {weekDays.map((_, index) => (
            <div key={index} className="grid-cell total-efforts-cell">
              <div>
                <span>{calculateTotalEfforts(index).toFixed(2)}</span>
                <div className={`total-efforts-bar status-${getDayStatus(index)}`}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="timesheet-footer">
          <div className="legend-container">
             <div className="legend-item"><div className="legend-color legend-holiday"></div><span>Holiday</span></div>
             <div className="legend-item"><div className="legend-color legend-weekly-off"></div><span>Weekly Off</span></div>
             <div className="legend-item"><div className="legend-color legend-filled"></div><span>Efforts Filled</span></div>
             <div className="legend-item"><div className="legend-color legend-un-captured"></div><span>Attendance not captured</span></div>
          </div>
          <button className="submit-btn" onClick={handleSubmit}>SUBMIT</button>
        </div>
      </div>

      <div className="notes-section">
        <div className="notes-header">
          <i className="bi bi-info-circle icon"></i>
          <span>Please note:</span>
        </div>
        <ul className="notes-list">
          <li>You are required to ensure that you have taken the standard breaks as applicable.</li>
          <li>You can fill up your work location while submitting efforts.</li>
          <li>You are required to ensure that your weekly working hours do not exceed 48 hours in a calendar week.</li>
          <li>You can request for compensatory off credit by declaring your efforts put in on a holiday or weekly-off.</li>
          <li>In absence of your Efforts for day N, a leave will be auto deducted on the N+9 day.</li>
          <li>You can update your presence/absence status for up to 30 days retrospectively.</li>
        </ul>
      </div>
      
    </div>
  );
}

export default MyTimePage;