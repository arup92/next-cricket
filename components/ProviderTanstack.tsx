'use client'

import { FC, ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"


interface ProvidersProps {
    children: ReactNode
}

const ProvidersTanstack: FC<ProvidersProps> = ({ children }) => {

    // Create a client
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 30
            }
        }
    })

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default ProvidersTanstack