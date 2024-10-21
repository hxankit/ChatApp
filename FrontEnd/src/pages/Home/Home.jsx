import SideBar from "../../Components/SideBar/SideBar"
import MessageContainer from "../../Components/messages/MessageContainer"

const HomePage = () => {
    return (
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            {/* <SideBar/> */}
            <SideBar/>
            <MessageContainer/>
        </div>
    )
}


export default HomePage