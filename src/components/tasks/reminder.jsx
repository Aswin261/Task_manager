import React, { useState, useEffect } from "react";

function ReminderForm() {
  const [reminders, setReminders] = useState([]);
  const [reminder, setReminder] = useState({
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (event) => {
    setReminder({ ...reminder, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setReminders([...reminders, reminder]);
    setReminder({ date: "", time: "", message: "" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      reminders.forEach((reminder) => {
        const now = new Date();
        const reminderDate = new Date(`${reminder.date} ${reminder.time}`);
        if (now.getTime() > reminderDate.getTime()) {
          alert(`Reminder: ${reminder.message}`);
          setReminders(reminders.filter((r) => r !== reminder));
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [reminders]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={reminder.date}
            onChange={handleChange}
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={reminder.time}
            onChange={handleChange}
          />
        </label>
        <label>
          Message:
          <input
            type="text"
            name="message"
            value={reminder.message}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Reminder</button>
      </form>
      <ul>
        {reminders.map((reminder) => (
          <li key={`${reminder.date}-${reminder.time}`}>
            {reminder.date} {reminder.time}: {reminder.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReminderForm;
