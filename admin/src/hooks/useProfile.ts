import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";

export function useProfile(){
    const accessToken = useAuthStore((state)=>state.accessToken);
    const updateUser = useAuthStore((abc)=>abc.updateUser);

    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            if(! accessToken) throw new Error("No Token Available !");
            const data = await authService.getMe(accessToken)

            updateUser(data);

            return data;
        },
        enabled:!!accessToken,
        staleTime: 5 * 60 * 1000
    });
}