import { useEffect, useState } from "react";
import StartComponent from "../../components/home/startComponent";
import AddExamModal from "../../components/modal/AddExamModal";
const AdminHome = () => {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal

  useEffect(() => {
    fetchData();
  }, [showModal]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/exam/getexamall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setData(data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (!data) {
    return null; // Render nothing until data is fetched
  }

  return (
    <div className="wrapper bg-forgot" >
      <div className="page-wrapper">
      <div className="d-flex justify-content-around align-items-center flex-wrap mt-10">
      <div className="card radius-10 border-start  border-info " style={{
    position: 'fixed',
    top: '5px', // Adjust the position as needed
    left: '20px', // Keep the element aligned to the left
    right: '20px', // Keep the element aligned to the right, making it full-width
    zIndex: 500, // Ensures it's on top of other content
  
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
                      <div className="btn btn-primary"  onClick={toggleModal}>Add New Exam</div>
                      {showModal && <AddExamModal onClose={toggleModal} />}
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
              
      {data.map((exam, index) => (
        <div style={{marginTop:"5vh"}}>
        <StartComponent
        key={exam._id}
        exam = {exam}
        />
        </div>
      ))}
      
</div>

      </div>
      
    </div>
  );
};

export default AdminHome;
