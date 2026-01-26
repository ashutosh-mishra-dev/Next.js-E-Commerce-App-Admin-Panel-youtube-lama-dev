import { useMutation } from '@tanstack/react-query';
import { authService, LoginCredentials } from '@/services/auth.service';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      login(
        {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          image: data.image,
        },
        data.accessToken
      );
      router.replace('/');
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  return () => {
    logout();
    router.replace('/login');
  };
}