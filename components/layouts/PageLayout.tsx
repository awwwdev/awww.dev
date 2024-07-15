import { useRouter } from "next/router";
import Icon from "@/components/ui/Icon";

import ByCategoryReportsNavbar from "./ByCategoryReportsNavbar";
import ByTeacherReportsNavbar from "./ByTeacherReportsNavbar";
import MasterDataNavbar from "./MaterDataNavbar";
import PayerDashNavbar from "./PayerDashNavbar";
import ReportsNavbar from "./ReportsNavbar";
import TeacherDashNavbar from "./TeacherDashNavbar";
import UsersNavbar from "./UsersNavbar";

const PageLayout = ({ children }) => {
  const router = useRouter();

  if (router.pathname.startsWith("/payer-dashboard")) {
    return (
      <Wrapper>
        {/* <PayerDashNavbar /> */}
        {children}
      </Wrapper>
    );
  }
  if (router.pathname.startsWith("/teacher-dashboard")) {
    return <Wrapper>{children}</Wrapper>;
  }
  if (router.pathname.startsWith("/admin-dashboard/master-data")) {
    return (
      <Wrapper>
        <h1 className="H1">Master Data</h1>
        <MasterDataNavbar />
        {children}
      </Wrapper>
    );
  }
  if (router.pathname.startsWith("/admin-dashboard/reports/by-teacher")) {
    return (
      <Wrapper>
        <h1 className="H1">
          Reports
          {` `}
          <Icon name="i-ph-caret-right" />
          {` `}
          <span className="fw-200">By Teacher</span>
        </h1>
        <div className="space-y-4">
          <ReportsNavbar />
          <ByTeacherReportsNavbar />
        </div>
        {children}
      </Wrapper>
    );
  }
  if (router.pathname.startsWith("/admin-dashboard/reports/by-category")) {
    return (
      <Wrapper>
        <h1 className="H1">
          Reports
          {` `}
          <Icon name="i-ph-caret-right" />
          {` `}
          <span className="fw-200">By Category</span>
        </h1>
        <div className="space-y-4">
          <ReportsNavbar />
          <ByCategoryReportsNavbar />
        </div>
        {children}
      </Wrapper>
    );
  }
  if (router.pathname.startsWith("/admin-dashboard/reports")) {
    return (
      <Wrapper>
        <h1 className="H1">Reports</h1>
        <ReportsNavbar />
        {children}
      </Wrapper>
    );
  }
  if (router.pathname.startsWith("/admin-dashboard/users")) {
    return (
      <Wrapper>
        <h1 className="H1">User Management</h1>
        <UsersNavbar />
        {children}
      </Wrapper>
    );
  }
  return children;
};

const Wrapper = ({ children }) => {
  return <div className="space-y-8">{children}</div>;
};

export default PageLayout;
