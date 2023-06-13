import React from "react";
import styles from "particles.module.css";

const ParticleBackground = () => {
    const particles = [];
  
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const animationDuration = Math.random() * 5 + 2;
      const particleStyle = {
        top: `${y}%`,
        left: `${x}%`,
        animationDuration: `${animationDuration}s`,
        animationDelay: `${animationDuration / 2}s`,
      };
      particles.push(
        <div key={i} className={styles.particle} style={particleStyle}></div>
      );
    }
  
    return <div className={styles.particles}>{particles}</div>;
  };
  
  export default ParticleBackground;