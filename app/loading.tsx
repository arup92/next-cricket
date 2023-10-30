export default function Loading() {
    return <div className="absolute -translate-x-2/4 -translate-y-2/4 top-[50%] left-[50%]">
        <div className="w-20 h-20 border-8 rounded-full border-custom-light animate-spin border-t-custom-alpha" />
    </div>
}