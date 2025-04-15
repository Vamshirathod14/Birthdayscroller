import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate] = useState(new Date());

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/birthdays');
        setBirthdays(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching birthdays:', error);
        setLoading(false);
      }
    };
    fetchBirthdays();
  }, []);

  // Filter today's birthdays
  const todayBirthdays = birthdays.filter(birthday => {
    const birthDate = new Date(birthday.birthDate);
    return (
      birthDate.getMonth() === currentDate.getMonth() && 
      birthDate.getDate() === currentDate.getDate()
    );
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading birthdays...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          🎉 Birthday Celebration 🎉
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="developer-credit"
        >
          Developed with ❤️ by Vamshi
        </motion.p>
        
        <div className="date-display">
          {currentDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </header>

      <main className="main-content">
        {todayBirthdays.length > 0 ? (
          <div className="birthday-highlight">
            <h2>🎂 Today's Birthdays 🎂</h2>
            <div className="highlight-grid">
              <AnimatePresence>
                {todayBirthdays.map((birthday, index) => (
                  <motion.div
                    key={birthday._id}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: index * 0.15, // Staggered delay
                        duration: 0.6,
                        type: "spring",
                        stiffness: 80,
                        damping: 10
                      }
                    }}
                    whileHover={{ scale: 1.03 }}
                    exit={{ opacity: 0, y: -50 }}
                  >
                    <BirthdayCard birthday={birthday} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="no-birthdays"
          >
            <h2>No birthdays today</h2>
            <p>Check back tomorrow!</p>
          </motion.div>
        )}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Birthday Scroller | Vamshi Rathod</p>
      </footer>
    </div>
  );
}

const BirthdayCard = ({ birthday }) => {
  const birthDate = new Date(birthday.birthDate);
  
  return (
    <div className="birthday-card">
      <div className="card-image-container">
        <img 
          src={birthday.photo} 
          alt={birthday.name} 
          className="card-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
      </div>
      
      <div className="card-details">
        <h3>{birthday.name}</h3>
        <div className="detail-row">
          <span>🎓 Class:</span>
          <span>{birthday.class}-{birthday.section}</span>
        </div>
        <div className="detail-row">
          <span>🎫 Hall Ticket:</span>
          <span>{birthday.hallTicketNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default App;