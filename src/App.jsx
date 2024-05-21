import { AuthProvider } from "./auth/context";
import { HomePage } from "./auth/pages/HomePage";
import "./styles.css";

export default function App() {
  return (
    <>
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    </>
  );
}
