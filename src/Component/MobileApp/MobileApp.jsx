import logo from "../../../public/BKash-Icon2-Logo.wine.svg"
import logo2 from "../../../public/images (1).png";
import logo3 from "../../../public/Mastercard-Logo.wine.svg";
import logo4 from "../../../public/4.png";
import logo5 from "../../../public/images (2).png";
import logo6 from "../../../public/live-chat_1709519441711.jpg";
import Marquee from "react-fast-marquee";
import { FaCashRegister, FaHandHoldingUsd, FaMobileAlt, FaMoneyCheckAlt, FaPiggyBank, FaReceipt, FaRegCreditCard, FaWallet } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const MobileApp = () => {
    const [user, setUser] = useState(null);
    const [email, setEmail]= useState()
     const [showBalance, setShowBalance] = useState(false);
   
   

    useEffect(() => {
      const storedToken = localStorage.getItem("email");
      if (storedToken) {
        setEmail(storedToken);
      }
    }, []);
    console.log(email);




     const toggleBalance = () => {
       setShowBalance(!showBalance);
     };

    useEffect(() => {
      axios
        .get(`https://ph-task-lake.vercel.app/userInfo/${email || ''}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }, [email]);

    console.log("jewel", user);

    if (!user) {
      return <div className="text-2xl text-center text-red-500 mt-10">Loading...</div>;
    }

  return (
    <div>
      <div className="bg-pink-500 min-h-screen  text-white">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex lg:ml-10 items-center">
              <img
                src={user?.imageUrl}
                alt="User Avatar"
                className="rounded-full h-16"
              />
              <div className="ml-2">
                <div className="font-bold">{user?.name}</div>
                <button
                  onClick={toggleBalance}
                  className="text-sm bg-white text-pink-500 px-2 py-1 rounded"
                >
                  {showBalance ? `Balance: ${user?.Balance} BDT` : "ব্যালেন্স জানতে চাপুন"}
                </button>
              </div>
            </div>

            <div className="flex gap-3 items-center justify-center">
              <h1>বিকাশ করুন</h1>
              <img
                src={logo}
                className="h-20 lg:block hidden rounded-full w-28 text-white "
              ></img>
            </div>
          </div>

          {/* Main Menu */}
          <div className="grid lg:grid-cols-5 grid-cols-4 gap-2 p-2">
            <NavLink to={"/sendMoney"}>
              <div className="flex flex-col items-center">
                <div className="bg-white text-pink-500 p-3 rounded-full">
                  <FaMoneyCheckAlt className="w-8 h-8" />
                </div>
                <div className="mt-2 text-sm">সেন্ড মানি</div>
              </div>
            </NavLink>
            <NavLink to={"/CashOut"}>
              <div className="flex flex-col items-center">
                <div className="bg-white text-pink-500 p-3 rounded-full">
                  <FaCashRegister className="w-8 h-8" />
                </div>
                <div className="mt-2 text-sm">ক্যাশ আউট</div>
              </div>
            </NavLink>
            <div className="flex flex-col items-center">
              <div className="bg-white text-pink-500 p-3 rounded-full">
                <FaMobileAlt className="w-8 h-8" />
              </div>
              <div className="mt-2 text-sm">মোবাইল রিচার্জ</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white text-pink-500 p-3 rounded-full">
                <FaRegCreditCard className="w-8 h-8" />
              </div>
              <div className="mt-2 text-sm">পেমেন্ট</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white text-pink-500 p-3 rounded-full">
                <FaWallet className="w-8 h-8" />
              </div>
              <div className="mt-2 text-sm">অ্যাড মানি</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white text-pink-500 p-3 rounded-full">
                <FaReceipt className="w-8 h-8" />
              </div>
              <div className="mt-2 text-sm">বিল পে</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white text-pink-500 p-3 rounded-full">
                <FaHandHoldingUsd className="w-8 h-8" />
              </div>
              <div className="mt-2 text-sm">লোন</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white text-pink-500 p-3 rounded-full">
                <FaPiggyBank className="w-8 h-8" />
              </div>
              <div className="mt-2 text-sm">সেভিংস</div>
            </div>
          </div>

          {/* User Details */}
          <div className="bg-white text-pink-500 p-4 rounded mb-4">
            <div className="flex items-center justify-between ">
              <div className="text-xl">আমার বিকাশ</div>
            </div>
            <div className="flex gap-8 text-lg overflow-x-auto">
              <div className="text-sm">01848303297</div>
              <div className="text-sm">Shohel</div>
              <div className="text-sm">0184834575</div>
              <div className="text-sm">Ripon</div>
              <div className="text-sm">মীর</div>
              <div className="text-sm">01448303297</div>
              <div className="text-sm">মল্লিক</div>
              <div className="text-sm">Jewel</div>
              <div className="text-sm">01848303297</div>
              <div className="text-sm">Shohel</div>
              <div className="text-sm">0184834575</div>
              <div className="text-sm">Ripon</div>
              <div className="text-sm">মীর</div>
              <div className="text-sm">01448303297</div>
              <div className="text-sm">মল্লিক</div>
              <div className="text-sm">Jewel</div>
              <div className="text-sm">01848303297</div>
              <div className="text-sm">Shohel</div>
              <div className="text-sm">0184834575</div>
              <div className="text-sm">Ripon</div>
              <div className="text-sm">মীর</div>
              <div className="text-sm">01448303297</div>
            </div>
          </div>

          <div className="">
            <div className="bg-white lg:flex items-center justify-center gap-5 text-pink-500 p-4 rounded mb-4 text-center">
              <div className="font-bold text-2xl mb-2">
                হাজারে ১৪.৯০ টাকায় ক্যাশ আউট করুন <br />
                প্রিয় এজেন্ট নাম্বার থেকে!
              </div>
              <img src={logo6} alt="Offer" className="lg:h-48 w-auto" />
            </div>
          </div>

          {/* Offers Section */}
          <div className="mb-16">
            <div className="bg-white text-pink-500 p-4 rounded mb-4">
              <div className="text-lg font-bold mb-2">অফার</div>
              <Marquee pauseOnHover={true}>
                <div className="grid grid-cols-6 gap-10">
                  <div className="bg-gray-100 p-2 lg:h-40  rounded">
                    <img
                      src={logo2}
                      alt="Offer 1"
                      className="lg:w-52 w-full h-28 "
                    />
                    <div className="text-center font-bold mt-2">DESCO</div>
                  </div>
                  <div className="bg-gray-100 p-2 lg:h-40 rounded">
                    <img
                      src={logo3}
                      alt="Offer 2"
                      className="lg:w-52 w-full h-28"
                    />
                    <div className="text-center font-bold mt-2">Mastercard</div>
                  </div>
                  <div className="bg-gray-100 p-2 lg:h-40 rounded">
                    <img
                      src={logo4}
                      alt="Offer 3"
                      className="lg:w-52 w-full h-28"
                    />
                    <div className="text-center font-bold mt-2">BTCL</div>
                  </div>
                  <div className="bg-gray-100 p-2 lg:h-40 rounded">
                    <img
                      src={logo5}
                      alt="Offer 4"
                      className="lg:w-52 w-full h-28"
                    />
                    <div className="text-center font-bold mt-2">Akas</div>
                  </div>
                  <div className="bg-gray-100 p-2 lg:h-40 rounded">
                    <img
                      src={logo5}
                      alt="Offer 4"
                      className="lg:w-52 w-full h-28"
                    />
                    <div className="text-center font-bold mt-2">Akas</div>
                  </div>
                  <div className="bg-gray-100 p-2 lg:h-40 rounded">
                    <img
                      src={logo5}
                      alt="Offer 4"
                      className="lg:w-52 w-full h-28"
                    />
                    <div className="text-center font-bold mt-2">Akas</div>
                  </div>
                </div>
              </Marquee>
            </div>
          </div>

          {/* Bottom Navigation */}
        </div>
      </div>
    </div>
  );
};

export default MobileApp;













