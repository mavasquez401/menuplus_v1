import MobileNavi from '@/components/shared/MobileNavi';
import SideBarMain from '@/components/shared/SideBarMain';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="root">
        <SideBarMain />
        <MobileNavi />
        <div className="root-container">
          <div className="wrapper">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
// layout setup
