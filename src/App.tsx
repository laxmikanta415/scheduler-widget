import { ConfigProvider } from "./context/ConfigContext";
import { WidgetStateProvider } from "./context/WidgetStateContext";
import SchedulerWidget from "./components/SchedulerWidget";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <ConfigProvider>
        <WidgetStateProvider>
          <SchedulerWidget />
        </WidgetStateProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
