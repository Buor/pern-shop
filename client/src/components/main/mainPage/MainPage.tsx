import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

const MainPage: React.FC = () => {

    return (
        <div className={'container'}>
            <div className={'main_page '}>
                <Sidebar/>
                <MainContent/>
            </div>
        </div>

    )
}
export default MainPage