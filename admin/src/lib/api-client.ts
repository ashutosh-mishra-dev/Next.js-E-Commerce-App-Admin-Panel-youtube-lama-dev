const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dummyjson.com';

export const ApiClient = {
    get: async (endpoint:string,options?:RequestInit)=>{
        const response = await fetch(`${BASE_URL}${endpoint}`,{
            ...options,
            cache: 'no-cache'
        });

        if(!response.ok) throw new Error(`Api Error: ${response.statusText}`);
        return response.json();
    },

    post: async (endpoint: string, data: unknown, options?: RequestInit)=>{
        const response = await fetch(`${BASE_URL}${endpoint}`,{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data),
            ...options
        });

        const result = await response.json(); 
        
        if(!response.ok) throw new Error(result.message || 'Something went wrong');
        return result;
    },

  //    put: async (endpoint: string, data: any, options?: RequestInit) => {
  //   const response = await fetch(`${BASE_URL}${endpoint}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data),
  //     ...options,
  //   });
  //   if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
  //   return response.json();
  // },

  // delete: async (endpoint: string, options?: RequestInit) => {
  //   const response = await fetch(`${BASE_URL}${endpoint}`, {
  //     method: 'DELETE',
  //     ...options,
  //   });
  //   if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
  //   return response.json();
  // },

};
