import { Routes, Route, Navigate } from "react-router-dom";
import IngestScreen from "./screens/IngestScreen";
import ProcessingScreen from "./screens/ProcessingScreen";
import EditorScreen from "./screens/EditorScreen";
import ExportScreen from "./screens/ExportScreen";
import AIPreferencesScreen from "./screens/AIPreferencesScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ingest" replace />} />
      <Route path="/ingest" element={<IngestScreen />} />
      <Route path="/processing" element={<ProcessingScreen />} />
      <Route path="/editor" element={<EditorScreen />} />
      <Route path="/export" element={<ExportScreen />} />
      <Route path="/settings" element={<AIPreferencesScreen />} />
    </Routes>
  );
}
