import { ApiClient } from "@/lib/api-client";

export interface LoginCredentials {
    username:string,
    password:string
}

export interface AuthResponse {
      id: number;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      gender: string;
      image: string;
      accessToken: string;
      refreshToken: string;
} 

export const authService = {
    login: async (credentials:LoginCredentials):Promise<AuthResponse> =>{
        return ApiClient.post('auth/login', credentials)
        
    },

    getMe: async (token:string):Promise<Omit <AuthResponse, 'accessToken' | 'refreshToken'>> => {
        return ApiClient.get('auth/me',{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
    }
}