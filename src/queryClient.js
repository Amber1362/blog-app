import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes — data stays fresh
            retry: 1,
        }
    }
})

export default queryClient;