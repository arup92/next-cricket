interface InputProps {
    name: string
    id: string
    type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'date' | 'number' | 'range' | 'search'
}

const Input = ({ type, name, id }: InputProps) => {
    return (
        <input
            id={id}
            name={name}
            type={type}
            autoComplete={type}
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-beta sm:text-sm sm:leading-6 outline-none"
        />
    )
}

export default Input
