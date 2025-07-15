import axiosInstance from "../api/axiosInstance"
const saveUser  = async(user)=>{
    if(!user?.email) return;
    try {
        await axiosInstance.post("/api/save-user",{
            email:user.email,
            name:user.displayName || "Anonymous",
        })
    } catch (err) {
        console.error("Failed to save user",err.message)
    }
}

export default saveUser;