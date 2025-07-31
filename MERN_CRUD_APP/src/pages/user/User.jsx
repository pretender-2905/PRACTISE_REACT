// import axios from "axios"
// import { useEffect, useState } from "react"
// import { AppRoutes } from "../../constants/constant"
// import Cookies from 'js-cookie';

// function User(){

//     const [courses, setCourses] = useState([])

//     useEffect(()=>{
//         getCourses()
//     },[])

//     const getCourses = () =>{
//         axios.get(AppRoutes.getCourse, {
//             headers: {
//                 Authorization: 'Bearer '+ Cookies.get("token")
//             }
//         }).then((res)=>{
//             console.log("courses from user.jsx=> ", res.data)
//         }).catch((err)=>{
//             console.log("error while fetching courses in user.jsx", err)
//         })
//     }
//     return(
//         <div className="text-center text-5xl md:text-7xl lg:text-9xl">
//             USER
//         </div>
//     )
// }
// export default User





import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppRoutes } from "../../constants/constant";
import Cookies from 'js-cookie';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import Card from "../../components/Card";


function User() {
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // modal state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnail: ""
    });

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = () => {
        axios.get(AppRoutes.getCourse, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get("token")
            }
        }).then((res) => {
            console.log("courses from user.jsx=> ", res.data);
            setCourses(res?.data?.data);
        }).catch((err) => {
            console.log("error while fetching courses in user.jsx", err);
        });
    };
    const addCourses = () => {
        axios.post(AppRoutes.addCourse, formData, {
            headers: {
                Authorization: 'Bearer ' + Cookies.get("token")
            }
        }).then((res) => {
            console.log("course ADDED SUCCESSFULLY", res.data);
            getCourses()
        }).catch((err) => {
            console.log("NOT ABLE TO ADD COURSES ERROR FORM USER.JSX=> ", err);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ title: "", description: "", thumbnail: "" });
    };

    return (
        <div className="text-center p-6">
            <h1 className="text-5xl md:text-7xl lg:text-9xl mb-6">USER</h1>

            {/* Open Modal Button */}
            <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mr-4 mb-3"
                onClick={() => setIsModalOpen(true)}
            >
                Add Course
            </button>

            <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                onClick={() => {
                    Cookies.remove("token", null)
                    setUser(null)
                    console.log("User logout completed successfully!")
                    navigate("/");
                }}
            >
                Logout
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
                        <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>

                        <input
                            type="text"
                            name="title"
                            placeholder="Course Title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full border px-4 py-2 rounded mb-3"
                        />

                        <textarea
                            name="description"
                            placeholder="Course Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full border px-4 py-2 rounded mb-3"
                        />

                        <input
                            type="text"
                            name="thumbnail"
                            placeholder="Thumbnail URL"
                            value={formData.thumbnail}
                            onChange={handleInputChange}
                            className="w-full border px-4 py-2 rounded mb-3"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                onClick={() => {
                                    addCourses()
                                    console.log("Submitted data: ", formData);
                                    closeModal(); // or handle submit logic here
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {courses.map((course) => (
                        <Card key={course.id} course={course} />
                    ))}
                </div>

            }
        </div>
    );
}

export default User;
