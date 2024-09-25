import MobileNavi from '@/components/shared/MobileNavi';
import SideBarMain from '@/components/shared/SideBarMain';
import WelcomeScreen from '@/components/sublayer/WelcomeScreen';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SideBarMain />
      <main className="root">
        {/* <WelcomeScreen /> */}
        {/* <MobileNavi /> */}
        {/* <div className="root-container"> */}
        {/* <div className="wrapper">{children}</div> */}
        {/* </div> */}
      </main>
    </>
  );
};

export default Layout;
// layout setup
