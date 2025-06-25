import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import SideBar from "./layouts/AdminSideBar";
import TemplateList from "./pages/Admin/HiddenTemplates";
import Authentication from "./pages/Authentication";
import Navbar from "./layouts/Navbar";
import PricingPage from "./pages/Pricing";
import TemplateEditor from "./pages/Admin/HiddenWidgets";
import MusicArchive from "./pages/Admin/MusicArchive";
import Empty from "./components/Empty";
import UserManagement from "./pages/Admin/UserManagement";
import { AdminProvider } from "./context/AdminContext";
import WidgetList from "./pages/Admin/WidgetList";
import AccountManagement from "./pages/User/AccountManagement";
import WeddingCardManagement from "./pages/User/WeddingCardManagement";
import WeddingCardDetail from "./pages/User/WeddingCardDetail";
import UserSideBar from "./layouts/UserSidebar";
import Home from "./pages/Home";
import Dashboard from "./pages/User/Dashboard";
import BalanceManagement from "./pages/User/BalanceManagement";
import CardTemplates from "./pages/CardTemplates";
import EmailResetPassword from "./pages/User/EmailResetPassword";
import ResetPasswordForm from "./pages/User/ResetPasswordForm";
import ResetPasswordConfirmation from "./pages/User/ResetPasswordConfirmation";
import { UserContext, UserProvider } from "./context/UserContext";
import Template from "./pages/Template";
import Coba from "./components/templates/Coba/Coba";
import Template1 from "./components/templates/template1/Template1";
import SangTrong from "./components/templates/SangTrong/SangTrong";
import Codien from "./components/templates/template3/template3";
import Template4 from "./components/templates/template4/template4";
import Template8 from "./components/templates/template8/Template5";
// import AdminBlogPost from "./pages/Admin/AdminBlogPost";
import NewsPageBuilder from "./pages/Admin/NewsPageBuilder";
import EditTemplateDocument from "./pages/Admin/EditTemplateDocument";
import NewsDisplay from "./pages/NewsDisplay";
import TemplateByAlias from "./components/templates/TemplateByAlias";
import MusicLists from "./pages/Admin/ListMusics";
import Template6 from "./components/templates/template6/template6";
import Template7 from "./components/templates/template7/Template7";
import { useContext } from "react";
import IPN from "./components/IPN";

const AdminRoute: React.FC = () => {
  // lấy user từ localStorage hoặc context
const context = useContext(UserContext);
const { user } = context;
// console.log("userdemo nè", user);
  if (user?.isadmin == null) {
    // nếu không phải admin → redirect về home
    return <Navigate to="/" replace />;
  }
  // nếu đúng: hiển thị các route con trong <Outlet>
  return <Outlet />;
};
function App() {
  const location = useLocation();

  return (
    <UserProvider>
      <AdminProvider>
        <Routes location={location}>
          {/* Admin */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<SideBar />}>
            <Route path="home" index element={<TemplateList />} />
            <Route path="template/new" element={<TemplateEditor />} />
            <Route path="template/edit/:id" element={<TemplateEditor />} />
            <Route path="music" element={<MusicArchive />} />
            <Route path="danh-sach-nhac" element={<MusicLists />} />
            <Route path="template" element={<EditTemplateDocument />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="widgets" element={<WidgetList />} />
            <Route path="blog/sua/:id" element={<NewsPageBuilder />} />
            <Route path="blog/tao-bai-viet-moi" element={<NewsPageBuilder />} />
            <Route path="*" element={<Empty />} />
          </Route>
        </Route>
          {/* User */}
          <Route path="/user" element={<UserSideBar />}>
            <Route path="account" index element={<AccountManagement />} />
            <Route path="management/page" element={<Dashboard />} />
            <Route
              path="management/balance/withdrawals"
              element={<BalanceManagement />}
            />
          </Route>

          {/* Guest */}
          <Route path="/guest" element={<Navbar />}>
            <Route path="" index element={<Home />} />
            <Route path="templates" element={<CardTemplates />} />
            <Route path="pricingnote" element={<PricingPage />} />
            <Route path="pricing" index element={<PricingPage />} />  
            <Route path="wedding-card" element={<WeddingCardManagement />} />
            <Route
              path="wedding-card/detail/:id"
              element={<WeddingCardDetail />}
            />
            <Route path="tintuc/:id" element={<NewsDisplay />} />
          </Route>

          {/* Default Home */}
          <Route path="/" element={<Navbar />}>
            <Route path="" index element={<Home />} />
          </Route>

          {/* Themes */}
          <Route path="theme/template1" element={<Template1 />} />
          <Route path="theme/coba" element={<Coba />} />
          <Route path="theme/sangtrong" element={<SangTrong />} />
          <Route path="theme/codien" element={<Codien />} />
          <Route path="theme/tinhyeu" element={<Template4 />} />
          <Route path="theme/nhenhang" element={<Template6 />} />
          <Route path="theme/hoathoa" element={<Template7 />} />
          <Route path="theme/template8" element={<Template8 />} />
          <Route path="theme/:id" element={<Template />} />
          <Route
            path="guest/template/:userId/:themeId"
            element={<Template />}
          />
          <Route path="guest/template/:alias" element={<TemplateByAlias />} />

          {/* Auth */}
          <Route path="authentication" element={<Authentication />} />
          <Route
            path="authentication/reset-password"
            element={<EmailResetPassword />}
          />
          <Route
            path="authentication/reset-password-form"
            element={<ResetPasswordForm />}
          />
          <Route
            path="authentication/reset-password/confirm"
            element={<ResetPasswordConfirmation />}
          />
            <Route path="ipn" element={<IPN />} />
        </Routes>
      </AdminProvider>
    </UserProvider>
  );
}

export default App;
