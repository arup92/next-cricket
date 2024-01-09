interface CenteredAreaProps {
    children: React.ReactNode
    maxWidthClass?: 'max-w-sm' | 'max-w-md' | 'max-w-lg' | 'max-w-xl' | 'max-w-2xl' | 'max-w-3xl' | 'max-w-4xl' | 'max-w-5xl' | 'max-w-6xl' | 'max-w-7xl'
}
const CenteredArea: React.FC<CenteredAreaProps> = ({ children, maxWidthClass = 'max-w-sm' }) => {
    return (
        <div className="flex flex-col justify-center flex-1 min-h-full px-0 md:px-6 lg:px-8">
            <div className={`sm:mx-auto sm:w-full ${maxWidthClass}`}>
                {children}
            </div>
        </div>
    )
}

export default CenteredArea
