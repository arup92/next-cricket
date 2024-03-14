import CenteredArea from "@/components/customUi/CenteredArea"

const page = () => {
    return (
        <CenteredArea maxWidthClass="max-w-3xl">
            <div className="bg-white px-4 py-2 border rounded-sm">
                <h1 className="font-bold text-3xl mb-4">About Fantasy11.club</h1>
                <p className="mb-3">
                    Hey there, fellow cricket enthusiasts! Welcome to Fantasy11.club, your go-to hub for all things cricket and fantasy sports.
                </p>

                <p className="mb-3">
                    Here at Fantasy11.club, we&apos;re passionate about providing you with in-depth cricket statistics, player match data, and insights into venue teams. Whether you&apos;re a die-hard cricket fan or just getting started with fantasy leagues, we&apos;ve got everything you need to build your dream team.
                </p>

                <p className="mb-3">
                    Have questions or feedback? We&apos;re all ears! Feel free to reach out to us at <a className="text-blue-600" href="mailto:contact@fantasy11.club">contact@fantasy11.club</a>, and we&apos;ll be happy to chat.
                </p>

                <p className="mb-3">
                    So, kick back, relax, and explore Fantasy11.club for all your cricket and fantasy sports needs. Let&apos;s dive into the world of fantasy cricket together!
                </p>
            </div>
        </CenteredArea >
    )
}

export default page
