import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import useExamStore from "../../zustand/useExamStore";

const Home = () => {
  const [data, setData] = useState(null);
  const [completed, setCompleted] = useState(false);
  const { selectedExam } = useExamStore();
//   useEffect(() => {
    
//   }, []);


  if (!selectedExam) {
    return (
        <div className="d-flex justify-center align-items-center">
            No Exam Selected
        </div>
    )
  }

  const examDate = new Date(selectedExam.examdate);
  const examTime = selectedExam.examtime;
  const [hours, minutes] = examTime.split(":");
  const examDateTime = new Date(
    examDate.getFullYear(),
    examDate.getMonth(),
    examDate.getDate(),
    parseInt(hours),
    parseInt(minutes)
  );

  const handleComplete = () => {
    setCompleted(true);
  };

  return (
    <div>
    <div >
    <div className="wrapper">
        <div className="page-wrapper">
    <div className="card radius-10 border-start  border-info " style={{
    position: 'fixed',
    top: '10px', // Adjust the position as needed
    left: '20px', // Keep the element aligned to the left
    right: '20px', // Keep the element aligned to the right, making it full-width
    zIndex: 1000, // Ensures it's on top of other content
  }}>
                <div className="p-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div
                        className="d-flex align-items-center"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src="assets/images/avatars/avatar-2.png"
                          className="user-img"
                          alt="user avatar"
                        />
                        <div className="user-info ps-3">
                          <p className="user-name mb-0">Pauline Seitz</p>
                          <p className="designattion mb-0">Web Designer</p>
                        </div>
                      </div>
                    </div>
                    <div>
                    <Countdown
                        date={examDateTime}
                        renderer={({
                            completed,
                            formatted: { hours, minutes, seconds },
                        }) => {
                            if (completed) {
                            handleComplete();
                            return (
                                <button
                                className="btn btn-sm btn-success mb-2"
                                style={{ borderWidth: '2px' }}
                                >
                                Start
                                </button>
                            );
                            } else {
                            return (
                                <span className="countdown">
                                {hours > 0 ? `${hours}:` : ''}
                                {minutes < 10 ? `${minutes}` : minutes}:
                                {seconds < 10 ? `${seconds}` : seconds}
                                </span>
                            );
                            }
                        }}
                        />
                    </div>
                    <div>
                      <div
                        className="d-flex align-items-center"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src="assets/images/avatars/avatar-2.png"
                          className="user-img"
                          alt="user avatar"
                        />
                        <div className="user-info ps-3">
                          <p className="user-name mb-0">Pauline Seitz</p>
                          <p className="designattion mb-0">Web Designer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
<div  style={{maxHeight:"520px",overflowY: 'auto', marginTop:"70px",border: "1px solid #ccc", // Simple gray border
    borderRadius: "10px", // Optional: adds rounded corners
    padding: "10px", } }>      
        <p className="h2">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
       </p>
       <p className="h2">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
       </p>
       <p className="h2">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
       </p>
</div>
    </div>
   </div>
   </div>
      <div
        className="d-flex justify-content-center"
        style={{
          position: 'fixed', // Keeps the component in a fixed position
          bottom: '20px',   // Sets the component to be 100px from the bottom
          left: "20px",
          right: "20px",
          background: 'white',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px', //  
          zIndex: 9999, // Ensures it's on top of other content
          paddingTop:'15px',
        }}
      >
      <div className={completed ? 'card2 radius-10' : 'card radius-10'} >
        <div className="px-4 py-2">
          <div className="d-flex  justify-content-around">
            <Countdown
              date={examDateTime}
              renderer={({
                completed,
                formatted: { hours, minutes, seconds },
              }) => {
                if (completed) {
                  handleComplete();
                  return (
                    <button
                      className="btn btn-sm btn-success mb-2"
                      style={{ borderWidth: '2px' }}
                    >
                      Start
                    </button>
                  );
                } else {
                  return (
                    <span className="countdown">
                      {hours > 0 ? `${hours}:` : ''}
                      {minutes < 10 ? `${minutes}` : minutes}:
                      {seconds < 10 ? `${seconds}` : seconds}
                    </span>
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>  
  );
};

export default Home;
