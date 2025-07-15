import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axiosInstance from "../api/axiosInstance"
const fetchUserRole = async (email) => {
    const { data } = await axiosInstance.get(`/api/users/role?email=${email}`);
    return data.role;
};

const useRole = () => {
    const { user } = useAuth();

    const {
        data: role = "",
        isLoading :isRoleLoading,
        isError:isRoleError,
        error,
    } = useQuery({
        queryKey: ["userRole", user?.email],
        queryFn: () => fetchUserRole(user.email),
        enabled: !!user?.email, 
        staleTime: 5 * 60 * 1000,
    });

    return { role, isRoleLoading, isRoleError, error };
};

export default useRole;
