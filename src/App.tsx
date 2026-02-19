import { AppLayout } from "./cmps/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { useEffect, useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (isDark) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }
  }, [isDark]);
  return (
    <AppLayout>
      <DashboardPage
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />
    </AppLayout>
  );
}

export default App;
