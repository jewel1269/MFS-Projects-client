import axios from "axios";
import { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // State to hold uploaded image
  const [imageUrl, setImageUrl] = useState(""); // State to hold uploaded image URL

  // Function to handle image upload to ImgBB
  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("key", "c08defba44209bd4d668f932824f5184"); // Replace with your ImgBB API key

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=c08defba44209bd4d668f932824f5184",
        formData
      );
      setImageUrl(response.data.data.url); // Save the image URL from ImgBB response
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const role = form.role.value;
    const password = form.password.value;
    const userInfo = { name, password, email, imageUrl, role }; // Include imageUrl in userInfo

    console.log(userInfo);
    axios
      .post("https://ph-task-lake.vercel.app/user", userInfo)
      .then((res) => {
        console.log(res);
     
        // Store the token and user data
        localStorage.setItem("email", email);
        toast.success("Registration Successful");
        if (res) {
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Registration Already Exists");
      });
  };

  return (
    <div className="lg:p-32 lg:bg-pink-700 flex justify-center">
      <ToastContainer />
      <div className="lg:w-[700px] border border-gray-800 flex flex-col items-center justify-center bg-pink-500 text-white">
        {/* Header */}
        <div className="flex justify-around items-center w-full px-4 py-2 bg-pink-700">
          <div className="flex items-center gap-2">
            <RiMenu2Fill />
            <div className="text-2xl font-bold">মেনু</div>
          </div>
          <img
            src="https://cdn.worldvectorlogo.com/logos/bkash.svg"
            alt="bKash Logo"
            className="h-12 bg-white rounded-xl"
          />
        </div>

        {/* Main Content */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center w-full px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">
              বিকাশ অ্যাকাউন্টে আপনাকে স্বাগতম
            </h1>
            <p className="text-center mb-4">
              নতুন অ্যাকাউন্ট করতে নিচের তথ্য দিন
            </p>

            <div className="bg-white text-pink-500 p-6 rounded-lg shadow-lg w-full max-w-sm">
              <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg" htmlFor="name">
                  আপনার পূর্ণ নাম
                </label>
                <input
                  className="border border-pink-500 p-2 rounded"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="আপনার পূর্ণ নাম"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg" htmlFor="role">
                  ইউজার/এজেন্ট
                </label>
                <select
                  className="border border-gray-500 p-2 rounded"
                  name="role"
                  id="role"
                >
                  <option value="user">ইউজার</option>
                  <option value="agent">এজেন্ট</option>
                </select>
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg" htmlFor="email">
                  মোবাইল নাম্বার/ইমেইল
                </label>
                <input
                  className="border border-pink-500 p-2 rounded"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="মোবাইল নাম্বার/ইমেইল"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg" htmlFor="password">
                  পাসওয়ার্ড/পিন
                </label>
                <input
                  className="border border-pink-500 p-2 rounded"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="******"
                />
              </div>
              {/* Image Upload */}
              <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg" htmlFor="image">
                  প্রোফাইল ছবি আপলোড করুন
                </label>
                <input
                  className="border border-pink-500 p-2 rounded"
                  type="file"
                  accept="image/*"
                  name="image"
                  id="image"
                  onChange={handleImageUpload} // Handle image upload
                />
                {/* Display uploaded image */}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="mt-2 rounded-2xl"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </div>
              <button className="w-full hover:bg-pink-700 hover:translate-x-1 hover:touch-pinch-zoom bg-pink-500 text-white p-2 rounded font-bold">
                রেজিস্ট্রেশন করুন
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="w-full py-4 bg-pink-700 text-center">
          <button className="text-white font-bold">
            প্রয়োজনে পার্শ্ব বিকাশ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
