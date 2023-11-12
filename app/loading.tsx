import CenteredArea from "@/components/customUi/CenteredArea";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
    return <CenteredArea maxWidthClass="max-w-5xl">
        <div className="flex items-center justify-center">
            <AiOutlineLoading3Quarters className="animate-spin mr-2" /> Loading...
        </div>
    </CenteredArea>
}