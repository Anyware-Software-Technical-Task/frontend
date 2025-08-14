import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8
    } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const Home = () => {
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: "-100px",
  });
  const testimonialsRef = useRef(null);
  const testimonialsInView = useInView(testimonialsRef, {
    once: true,
    margin: "-100px",
  });
  const contactRef = useRef(null);
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

  return (
    <div className="relative">
      {/* Hero Section with enhanced animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <HeroSection />
      </motion.div>
      
      {/* Features Section with stagger animation */}
      <motion.div
        ref={featuresRef}
        variants={staggerContainer}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
      >
        <FeaturesSection />
      </motion.div>
      
      {/* Testimonials Section with enhanced animation */}
      <motion.div
        ref={testimonialsRef}
        variants={fadeInUp}
        initial="hidden"
        animate={testimonialsInView ? "visible" : "hidden"}
      >
        <TestimonialsSection />
      </motion.div>
      
      {/* Contact Section with enhanced animation */}
      <motion.div
        ref={contactRef}
        variants={fadeInUp}
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
      >
        <ContactSection />
      </motion.div>
    
    </div>
  );
};

export default Home;
