import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center h-130 text-center px-4">
      {/* Animated 404 */}
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-8xl md:text-9xl font-extrabold text-foreground"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-lg md:text-xl mt-4 text-muted-foreground"
      >
        😵 Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      {/* Go Home Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-6"
      >
        <Button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 rounded-sm px-6 py-2 shadow-md hover:shadow-lg"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Button>
      </motion.div>
    </section>
  );
};

export default PageNotFound;