import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

const MainPage: React.FC = () => {

    return (
        <div className={'main_page'}>
            <Sidebar/>
            <MainContent/>
        </div>
    )
}
export default MainPage