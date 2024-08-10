import MobileNavi from '@/components/shared/MobileNavi';
import SideBarMain from '@/components/shared/SideBarMain';
import WelcomeScreen from '@/components/sublayer/WelcomeScreen';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="root">
        <WelcomeScreen />
        {/* <SideBarMain />
        <MobileNavi /> */}
        {/* <div className="root-container"> */}
        {/* <div className="wrapper">{children}</div> */}
        {/* </div> */}
      </main>
    </>
  );
};

export default Layout;
// layout setup
