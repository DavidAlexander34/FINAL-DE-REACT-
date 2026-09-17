import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />
      {children}
    </div>
  );
}

export default Layout;