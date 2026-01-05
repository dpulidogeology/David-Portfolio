

import React, { useState, useEffect, useRef } from 'react';
import type { Experience, Project, Education, Skill } from './types';
import { CodeBracketIcon } from './components/icons/CodeBracketIcon';
import { CpuChipIcon } from './components/icons/CpuChipIcon';
import { GlobeAltIcon } from './components/icons/GlobeAltIcon';
import { AcademicCapIcon } from './components/icons/AcademicCapIcon';
import { GitHubIcon } from './components/icons/GitHubIcon';
import { LinkedInIcon } from './components/icons/LinkedInIcon';
import { ContactModal } from './components/ContactModal';
import profileImage from './assets/David-Profile.jpg';
import duckietownImage from './assets/duckietown.jpg';
import uavGncImage from './assets/thesis.png';
import dsmImage from './assets/dsm-procedural_generator.png';


// --- DATA ---
const contactInfo = {
    name: "David F. Pulido",
    title: "Guidance, Navigation & Control (GNC) Systems Engineer",
    location: "Karlsruhe, Germany",
    email: "dpulidoprojects@gmail.com",
    phone: "+4915231362028",
    linkedin: "https://www.linkedin.com/in/david-f-pulido-524790137",
    github: "https://github.com/dpulidogeology",
};

const summary = "I engineer the Guidance, Navigation & Control (GNC) systems and the Backend Infrastructure (DevOps) for autonomous UAVs and ground robots.\n\nCore Focus: 🚀 Robotics: ROS2, Gazebo, NMPC (Acados), PX4. 🌍 Geospatial: CesiumJS, GeoServer, QGIS, Python. ☁️ Infrastructure: Docker, FastAPI, CI/CD, Linux.";

const skillsData: Skill[] = [
    { name: 'Autonomous Vehicles', icon: CpuChipIcon },
    { name: 'Robot Operating System (ROS)', icon: CpuChipIcon },
    { name: 'Geospatial Data (QGIS, ArcGIS)', icon: GlobeAltIcon },
    { name: 'Web Development (JS, Python)', icon: CodeBracketIcon },
    { name: '3D Simulation (Gazebo, Three.js)', icon: CodeBracketIcon },
    { name: 'Machine Learning (YOLO)', icon: CpuChipIcon },
];

const experienceData: Experience[] = [
    { role: "Autonomous Systems Engineer for the Robot Hub Academie (Duckietown Project)", company: "IRAS", period: "Feb 2025 - Nov 2025", location: "Karlsruhe, Germany", description: ["Developing Autonomous Navigation Systems and AI algorithms for Duckiebots in the Duckietown project."] },
    { role: "Navigation Technologies", company: "Fraunhofer IOSB", period: "Sep 2024 - Oct 2025", location: "Karlsruhe, Germany", description: ["Setting up Geoserver environments for WMS and WMS-T layers using NetCDF weather data for realtime Apps and general research in navigation technologies for Multidrone missions."] },
    { role: "SAP Rural Sourcing Analytics", company: "SAP", period: "Oct 2023 - Sep 2024", location: "Karlsruhe, Germany", description: ["Researched geospatial datasets and ETL data methodology for implementing EUDR policy into SAP/HANA DB.", "Developed an AI project using high-resolution satellite imagery and ML to classify crops and count trees."] },
    { role: "Executive of Digital Innovation", company: "Coffee Rocks", period: "Feb 2021 - Sep 2022", location: "Remote", description: ["Served as IT Project Director & Researcher in Augmented Reality, Virtual Reality, Geospatial technologies, 3D modeling, remote sensing & data science projects for earth sciences applications."] },
];

const projectsData: Project[] = [
    {
        title: "FMS-CLI Robotics Manager @ IRAS",
        description: "Leading STEM initiatives and tutoring students in robotics using the Duckietown platform. Developed challenges involving autonomous navigation, lane following, and YOLO-based object detection with ROS2. Recently implemented autonomous and manual gamepad controls for a live demonstration at the Science Days Exhibition 2025.",
        tags: ["Robotics", "ROS2", "Python", "AI", "Computer Vision", "STEM"],
        imageUrl: duckietownImage,
        githubUrl: "https://github.com/dpulidogeology/DuckieFleet-FMS-CLI"
    },
    {
        title: "Real-Time UAV GNC Framework",
        description: "Developed a containerized Geodetically-Aware NMPC system capable of handling Earth's curvature for long-distance missions. Features a custom UKF-NMPC dual-loop architecture that splits state estimation from control, enabling real-time performance. Successfully validated in a 100km+ autonomous flight simulation across complex regional landscapes.",
        tags: ["Master Thesis", "NMPC", "Guidance & Navigation", "Control Systems", "Simulation", "Python"],
        imageUrl: uavGncImage,
        githubUrl: "https://github.com/dpulidogeology/realtime-geodetic-nmpc-caas-uav-framework"
    },
    {
        title: "Procedural DSM Generator",
        description: "Designed a Python-based tool to generate synthetic, geodetically accurate Digital Surface Models (DSMs) usando Fractal Brownian Motion (FBM). It enables the creation of infinite custom terrain datasets, exported as GeoTIFFs, to validate UAV flight planning and collision avoidance algorithms in simulated environments like Gazebo or PX4.",
        tags: ["Master Thesis", "NMPC", "UAV Swarms", "Control Systems", "Simulation", "Python"],
        imageUrl: dsmImage,
        githubUrl: "https://github.com/dpulidogeology/procedural-terrain-dsm-enu-generator"
    }
];

const educationData: Education[] = [
    { degree: "Master of Science - MS, Geomatics", institution: "Karlsruhe University of Applied Sciences", period: "Feb 2023 - Mar 2025" },
    { degree: "Grado en Geología, Geología/Ciencias de la Tierra", institution: "Universidad EAFIT", period: "2011 - 2016" }
];

// --- STABLE FADE-IN COMPONENT ---
const FadeInSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setVisible(true);
                if (domRef.current) {
                    observer.unobserve(domRef.current);
                }
            }
        });
        if (domRef.current) {
            observer.observe(domRef.current);
        }
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={domRef}
            className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// --- SECTION COMPONENT ---
const Section: React.FC<{ id: string, title: string, children: React.ReactNode }> = ({ id, title, children }) => (
    <section id={id} className="py-24 max-w-4xl mx-auto px-4">
        <FadeInSection>
            <h2 className="text-3xl font-bold text-slate-200 mb-12 flex items-center">
                <span className="text-cyan-400 mr-3 text-2xl font-mono">0{['about', 'experience', 'projects', 'skills', 'education', 'contact'].indexOf(id) + 1}.</span>
                {title}
                <span className="ml-6 h-px flex-grow bg-slate-700"></span>
            </h2>
        </FadeInSection>
        {children}
    </section>
);

// --- Perlin Noise Implementation ---
class PerlinNoise {
    private p: number[] = [];
    private permutation: number[] = [];

    constructor() {
        this.p = Array.from({ length: 256 }, (_, i) => i);
        for (let i = this.p.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.p[i], this.p[j]] = [this.p[j], this.p[i]];
        }
        this.permutation = this.p.concat(this.p);
    }

    private fade(t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    private lerp(t: number, a: number, b: number): number {
        return a + t * (b - a);
    }

    private grad(hash: number, x: number, y: number, z: number): number {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    public perlin3(x: number, y: number, z: number): number {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;

        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);

        const u = this.fade(x);
        const v = this.fade(y);
        const w = this.fade(z);

        const A = this.permutation[X] + Y;
        const AA = this.permutation[A] + Z;
        const AB = this.permutation[A + 1] + Z;
        const B = this.permutation[X + 1] + Y;
        const BA = this.permutation[B] + Z;
        const BB = this.permutation[B + 1] + Z;

        return this.lerp(w,
            this.lerp(v,
                this.lerp(u, this.grad(this.permutation[AA], x, y, z), this.grad(this.permutation[BA], x - 1, y, z)),
                this.lerp(u, this.grad(this.permutation[AB], x, y - 1, z), this.grad(this.permutation[BB], x - 1, y - 1, z))
            ),
            this.lerp(v,
                this.lerp(u, this.grad(this.permutation[AA + 1], x, y, z - 1), this.grad(this.permutation[BA + 1], x - 1, y, z - 1)),
                this.lerp(u, this.grad(this.permutation[AB + 1], x, y - 1, z - 1), this.grad(this.permutation[BB + 1], x - 1, y - 1, z - 1))
            )
        );
    }
}


// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeExperienceTab, setActiveExperienceTab] = useState(0);
    const cornerOrbitsRef = useRef<HTMLDivElement>(null);
    const [isContactModalOpen, setContactModalOpen] = useState(false);


    // Background effect
    useEffect(() => {
        const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const noise = new PerlinNoise();

        let particles: Particle[] = [];
        let drones: Drone[] = [];
        const mouse = { x: null as number | null, y: null as number | null, radius: 150 };
        let time = 0;

        class Particle {
            x: number; y: number; size: number; speedX: number; speedY: number;
            constructor() {
                this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1; this.speedX = (Math.random() * 0.4 - 0.2);
                this.speedY = (Math.random() * 0.4 - 0.2);
            }
            update() {
                let dx = mouse.x !== null ? mouse.x - this.x : 0; let dy = mouse.y !== null ? mouse.y - this.y : 0;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius && distance > 0) {
                    let forceDirectionX = dx / distance; let forceDirectionY = dy / distance;
                    let force = (mouse.radius - distance) / mouse.radius;
                    this.x -= forceDirectionX * force * this.size * 5; this.y -= forceDirectionY * force * this.size * 5;
                }
                if (this.x > canvas.width + 10 || this.x < -10) this.x = (canvas.width + 20) % (canvas.width + 20) - 10;
                if (this.y > canvas.height + 10 || this.y < -10) this.y = (canvas.height + 20) % (canvas.height + 20) - 10;
                this.x += this.speedX; this.y += this.speedY;
            }
        }

        class Drone {
            x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; type: 'x-wing' | 'v-wing';
            constructor() {
                this.x = Math.random() * canvas.width; this.y = canvas.height + Math.random() * 100;
                this.size = Math.random() * 15 + 10; this.speedX = Math.random() * 1 - 0.5;
                this.speedY = -(Math.random() * 1.5 + 0.8); this.opacity = 0;
                this.type = Math.random() > 0.5 ? 'x-wing' : 'v-wing';
            }
            update(scroll_y: number, fadeOutFraction: number) {
                this.x += this.speedX; this.y += this.speedY;
                const droneActivationScroll = 800;
                const droneFadeInDuration = 400;
                const fadeInFraction = Math.min(1, Math.max(0, scroll_y - droneActivationScroll) / droneFadeInDuration);
                this.opacity = fadeInFraction * fadeOutFraction;
                if (this.y < -30 || this.x < -30 || this.x > canvas.width + 30) {
                    this.y = canvas.height + Math.random() * 100; this.x = Math.random() * canvas.width;
                    this.opacity = 0;
                }
            }
            draw() {
                if (this.opacity <= 0) return;
                ctx.save();
                ctx.strokeStyle = `rgba(0, 255, 255, ${this.opacity * 0.9})`;
                ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity * 0.25})`;
                ctx.lineWidth = 1.5;
                ctx.translate(this.x, this.y);

                if (this.type === 'x-wing') {
                    // Fuselage
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size * 0.8); ctx.lineTo(0, this.size * 0.8);
                    ctx.stroke();
                    // Wings
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size * 0.2); ctx.lineTo(-this.size, -this.size);
                    ctx.moveTo(0, -this.size * 0.2); ctx.lineTo(this.size, -this.size);
                    ctx.moveTo(0, this.size * 0.2); ctx.lineTo(-this.size, this.size);
                    ctx.moveTo(0, this.size * 0.2); ctx.lineTo(this.size, this.size);
                    ctx.stroke();
                } else { // V-Wing
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size);
                    ctx.lineTo(this.size, this.size);
                    ctx.lineTo(0, this.size * 0.5);
                    ctx.lineTo(-this.size, this.size);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                }
                ctx.restore();
            }
        }

        const init = () => {
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) particles.push(new Particle());
            drones = [];
            const numberOfDrones = 7;
            for (let i = 0; i < numberOfDrones; i++) drones.push(new Drone());
        };

        const drawGeologicalStrata = (scroll_y: number, fadeOutFraction: number) => {
            const scrollFraction = Math.max(0, Math.min(1, (scroll_y - 100) / 800));
            const finalOpacity = scrollFraction * fadeOutFraction;
            if (finalOpacity <= 0) return;

            const strataTime = time * 0.2;
            const density = 30;
            const lineOpacity = finalOpacity * 0.15;

            for (let i = 0; i < density; i++) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 255, 255, ${lineOpacity * (0.5 + Math.sin(i * 0.5 + strataTime) * 0.5)})`;
                ctx.lineWidth = 1.5;
                let y_offset = (i / density) * canvas.height * 1.5 - canvas.height * 0.25;

                for (let x = -10; x < canvas.width + 10; x += 10) {
                    const noiseVal = noise.perlin3(x * 0.0015, (y_offset) * 0.0015, strataTime + i * 0.1);
                    const y = y_offset + noiseVal * 80;
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
        };

        const drawTopographicLines = (scroll_y: number, fadeOutFraction: number) => {
            const scrollFraction = Math.max(0, Math.min(1, (scroll_y - 300) / 800));
            const finalOpacity = scrollFraction * fadeOutFraction;
            if (finalOpacity <= 0) return;
            const lineTime = scroll_y * 0.0005;
            const density = 15; const lineOpacity = finalOpacity * 0.25;
            for (let i = 0; i < density; i++) {
                ctx.beginPath(); ctx.strokeStyle = `rgba(0, 255, 255, ${lineOpacity})`; ctx.lineWidth = 0.5;
                for (let x = 0; x < canvas.width; x += 5) {
                    const noiseVal = noise.perlin3(x * 0.002, (i / density) * 5, lineTime);
                    const y = noiseVal * canvas.height * 0.4 + canvas.height * 0.5;
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
        };

        const drawGeoid = (scroll_y: number) => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const geoidFadeStart = scrollHeight * 0.6;
            const geoidFadeDuration = scrollHeight * 0.4;
            if (scroll_y < geoidFadeStart) return;

            const geoidFadeFraction = Math.min(1, (scroll_y - geoidFadeStart) / geoidFadeDuration);
            if (geoidFadeFraction <= 0) return;

            ctx.save();
            ctx.translate(0, canvas.height); // Center at bottom-left corner

            const baseRadius = canvas.width * 0.9;
            const geoidDistortion = baseRadius * 0.05;
            const totalLat = 40; const totalLon = 60;
            const rotX = scroll_y * 0.0002; const rotY = time * 0.05;

            const points: { x: number, y: number, z: number }[][] = [];
            for (let i = 0; i <= totalLat; i++) {
                const lat = (i / totalLat - 0.5) * Math.PI;
                const row: { x: number, y: number, z: number }[] = [];
                for (let j = 0; j <= totalLon; j++) {
                    const lon = (j / totalLon) * 2 * Math.PI;
                    const x0 = Math.cos(lon) * Math.cos(lat);
                    const y0 = Math.sin(lat);
                    const z0 = Math.sin(lon) * Math.cos(lat);
                    const noiseVal = noise.perlin3(x0 * 2.5, y0 * 2.5, z0 * 2.5 + time * 0.1);
                    const distortedRadius = baseRadius + noiseVal * geoidDistortion;
                    const yEllipsoidScale = 0.95;
                    row.push({ x: x0 * distortedRadius, y: y0 * distortedRadius * yEllipsoidScale, z: z0 * distortedRadius });
                }
                points.push(row);
            }

            const projectedPoints: { x: number, y: number, z: number, visible: boolean }[][] = [];
            for (let i = 0; i <= totalLat; i++) {
                const projectedRow: { x: number, y: number, z: number, visible: boolean }[] = [];
                for (let j = 0; j <= totalLon; j++) {
                    let { x, y, z } = points[i][j];
                    let tempX = x * Math.cos(rotY) - z * Math.sin(rotY); let tempZ = x * Math.sin(rotY) + z * Math.cos(rotY);
                    x = tempX; z = tempZ;
                    let tempY = y * Math.cos(rotX) - z * Math.sin(rotX); tempZ = y * Math.sin(rotX) + z * Math.cos(rotX);
                    y = tempY; z = tempZ;
                    projectedRow.push({ x, y, z, visible: z > -baseRadius * 0.5 });
                }
                projectedPoints.push(projectedRow);
            }

            ctx.lineWidth = 0.8;
            for (let i = 0; i < totalLat; i++) {
                for (let j = 0; j < totalLon; j++) {
                    const p1 = projectedPoints[i][j]; const p2 = projectedPoints[i + 1][j]; const p3 = projectedPoints[i][j + 1];
                    if (p1.visible && p2.visible) {
                        ctx.strokeStyle = `rgba(0, 255, 255, ${geoidFadeFraction * 0.5})`;
                        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
                    }
                    if (p1.visible && p3.visible) {
                        ctx.strokeStyle = `rgba(0, 255, 255, ${geoidFadeFraction * 0.5})`;
                        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p3.x, p3.y); ctx.stroke();
                    }
                }
            }

            // Draw orbiting satellites
            for (let i = 0; i < 5; i++) {
                const orbitRadius = baseRadius * (0.8 + i * 0.05);
                const angle = time * (0.3 + i * 0.15) + i * 2.5;
                const inclination = Math.PI / 4 * (i - 2);
                let satX = Math.cos(angle) * orbitRadius; let satZ = Math.sin(angle) * orbitRadius; let satY = Math.sin(inclination) * Math.cos(angle) * orbitRadius;
                let tempX = satX * Math.cos(rotY) - satZ * Math.sin(rotY); let tempZ = satX * Math.sin(rotY) + satZ * Math.cos(rotY);
                satX = tempX; satZ = tempZ;
                let tempY = satY * Math.cos(rotX) - satZ * Math.sin(rotX); tempZ = satY * Math.sin(rotX) + satZ * Math.cos(rotX);
                satY = tempY; satZ = tempZ;
                if (satZ > 0) {
                    const scale = (satZ + orbitRadius) / (orbitRadius * 2);
                    ctx.beginPath(); ctx.arc(satX, satY, 2 * scale, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 255, 255, ${geoidFadeFraction * (0.7 + scale * 0.3)})`; ctx.fill();
                }
            }
            ctx.restore();
        };

        let animationFrameId: number;
        const animate = () => {
            const scroll_y = window.scrollY;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.01;

            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const geoidFadeStart = scrollHeight * 0.6;
            const fadeOutDuration = scrollHeight * 0.35;
            const fadeOutFraction = Math.max(0, 1 - Math.max(0, (scroll_y - geoidFadeStart)) / fadeOutDuration);

            const particleOpacity = Math.max(0, 1 - scroll_y / 600);
            if (particleOpacity > 0) {
                for (const particle of particles) { particle.update(); }
                ctx.fillStyle = `rgba(100, 180, 255, ${particleOpacity * 0.5})`;
                for (const particle of particles) { ctx.beginPath(); ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2); ctx.fill(); }
                const maxDistance = 120;
                for (let a = 0; a < particles.length; a++) {
                    for (let b = a; b < particles.length; b++) {
                        const dx = particles[a].x - particles[b].x; const dy = particles[a].y - particles[b].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < maxDistance) {
                            const opacityValue = (1 - (distance / maxDistance)) * particleOpacity;
                            ctx.strokeStyle = `rgba(100, 180, 255, ${opacityValue})`; ctx.lineWidth = 0.5;
                            ctx.beginPath(); ctx.moveTo(particles[a].x, particles[a].y); ctx.lineTo(particles[b].x, particles[b].y); ctx.stroke();
                        }
                    }
                }
            }

            drawGeologicalStrata(scroll_y, fadeOutFraction);
            drawTopographicLines(scroll_y, fadeOutFraction);
            for (const drone of drones) { drone.update(scroll_y, fadeOutFraction); drone.draw(); }
            drawGeoid(scroll_y);
            animationFrameId = requestAnimationFrame(animate);
        };

        const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); };
        const handleMouseMove = (event: MouseEvent) => { mouse.x = event.clientX; mouse.y = event.clientY; };
        const handleMouseOut = () => { mouse.x = null; mouse.y = null; };

        window.addEventListener('resize', resizeCanvas); window.addEventListener('mousemove', handleMouseMove); window.addEventListener('mouseout', handleMouseOut);

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas); window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        }
    }, []);

    // Parallax scroll effect for corner orbits
    useEffect(() => {
        const handleScrollParallax = () => {
            if (cornerOrbitsRef.current) {
                cornerOrbitsRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
            }
        };
        window.addEventListener('scroll', handleScrollParallax);
        return () => window.removeEventListener('scroll', handleScrollParallax);
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        event.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const activeExperience = experienceData[activeExperienceTab];

    return (
        <div className="bg-[#0a192f] selection:bg-cyan-900/40">
            <canvas id="particle-canvas" className="fixed top-0 left-0 w-screen h-screen z-0" />

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setContactModalOpen(false)}
                formspreeId="YOUR_FORM_ID" // <-- IMPORTANT: Replace with your Formspree ID
            />

            {/* Corner Orbits Element */}
            <div className="corner-hero-orbits" ref={cornerOrbitsRef}>
                <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMax slice">
                    <defs>
                        <path id="corner-orbit-path-1" d="M -400,800 a 400,400 0 1,1 800,0 a 400,400 0 1,1 -800,0" />
                        <path id="corner-orbit-path-2" d="M -450,800 a 450,450 0 1,1 900,0 a 450,450 0 1,1 -900,0" />
                        <path id="corner-orbit-path-3" d="M -500,800 a 500,500 0 1,1 1000,0 a 500,500 0 1,1 -1000,0" />
                        <path id="corner-orbit-path-4" d="M -550,800 a 550,550 0 1,1 1100,0 a 550,550 0 1,1 -1100,0" />
                    </defs>

                    {/* Orbit 1: Geomatics */}
                    <g className="orbit-group corner-orbit-1" style={{ transformOrigin: '0 800px' }}>
                        <use href="#corner-orbit-path-1" fill="none" stroke="rgba(0, 255, 255, 0.7)" strokeWidth="1" strokeDasharray="4 4" />
                        <text className="orbiting-text">
                            <textPath href="#corner-orbit-path-1" className="text-path-1">
                                GEOMATICS • REMOTE SENSING • GIS • CESIUMJS • QGIS • GEOMATICS • REMOTE SENSING • GIS • CESIUMJS • QGIS
                            </textPath>
                        </text>
                    </g>

                    {/* Orbit 2: Robotics */}
                    <g className="orbit-group corner-orbit-2" style={{ transformOrigin: '0 800px' }}>
                        <use href="#corner-orbit-path-2" fill="none" stroke="rgba(0, 255, 255, 0.7)" strokeWidth="1" strokeDasharray="1 5" />
                        <text className="orbiting-text">
                            <textPath href="#corner-orbit-path-2" className="text-path-2">
                                ROBOTICS • COMPUTER VISION • UAV • ROS2 • SIMULATION • ROBOTICS • COMPUTER VISION • UAV • ROS2 • SIMULATION
                            </textPath>
                        </text>
                    </g>

                    {/* Orbit 3: Automation */}
                    <g className="orbit-group corner-orbit-3" style={{ transformOrigin: '0 800px' }}>
                        <use href="#corner-orbit-path-3" fill="none" stroke="rgba(0, 255, 255, 0.6)" strokeWidth="0.75" />
                        <text className="orbiting-text">
                            <textPath href="#corner-orbit-path-3" className="text-path-3">
                                AUTOMATION • GEOSPATIAL AI • DATA SCIENCE • THREE.JS • PYTHON • AUTOMATION • GEOSPATIAL AI • DATA SCIENCE
                            </textPath>
                        </text>
                    </g>

                    {/* Orbit 4: Digital Twins */}
                    <g className="orbit-group corner-orbit-4" style={{ transformOrigin: '0 800px' }}>
                        <use href="#corner-orbit-path-4" fill="none" stroke="rgba(0, 255, 255, 0.5)" strokeWidth="0.5" />
                        <text className="orbiting-text">
                            <textPath href="#corner-orbit-path-4" className="text-path-4">
                                DIGITAL TWINS • IOT • POINT CLOUDS • LIDAR • SLAM • DIGITAL TWINS • IOT • POINT CLOUDS • LIDAR • SLAM
                            </textPath>
                        </text>
                    </g>
                </svg>
            </div>

            <div className="relative z-10">
                {/* Left Social Bar */}
                <div className="fixed bottom-0 left-4 md:left-8 z-30 hidden md:flex flex-col items-center">
                    <div className="flex flex-col items-center space-y-4">
                        <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <GitHubIcon className="h-6 w-6 text-slate-400 hover:text-cyan-400 hover:translate-y-1 transition-all" />
                        </a>
                        <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <LinkedInIcon className="h-6 w-6 text-slate-400 hover:text-cyan-400 hover:translate-y-1 transition-all" />
                        </a>
                    </div>
                    <div className="h-24 w-px bg-slate-600 mt-6"></div>
                </div>

                {/* Right Email Bar */}
                <div className="fixed bottom-0 right-4 md:right-8 z-30 hidden md:flex flex-col items-center">
                    <a href={`mailto:${contactInfo.email}`} className="font-mono text-sm tracking-widest [writing-mode:vertical-rl] text-slate-400 hover:text-cyan-400 hover:translate-y-1 transition-all">
                        {contactInfo.email}
                    </a>
                    <div className="h-24 w-px bg-slate-600 mt-6"></div>
                </div>

                <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a192f]/80 backdrop-blur-lg shadow-2xl' : 'bg-transparent'}`}>
                    <nav className="container mx-auto flex justify-between items-center p-5 text-slate-300">
                        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="text-lg font-bold text-cyan-400 hover:text-cyan-300 transition-colors"><span className="text-xl">David Pulido</span> <span className="text-slate-500 font-normal">| GNC & Geospatial Engineer</span></a>
                        <div className="hidden md:flex items-center space-x-6">
                            {['about', 'experience', 'projects', 'contact'].map((item, i) => (
                                <a
                                    key={item}
                                    href={`#${item}`}
                                    onClick={(e) => handleNavClick(e, item)}
                                    className="hover:text-cyan-400 transition-colors"
                                >
                                    <span className="text-cyan-400 font-mono mr-1">0{i + 1}.</span> {item.charAt(0).toUpperCase() + item.slice(1)}
                                </a>
                            ))}
                        </div>
                    </nav>
                </header>

                <main className="container mx-auto px-4">
                    {/* Hero Section */}
                    <section id="home" className="flex flex-col md:flex-row items-center justify-center min-h-screen max-w-4xl mx-auto gap-12">
                        <div className="md:w-3/5">
                            <FadeInSection>
                                <p className="text-cyan-400 mb-8 font-mono">Hi, my name is</p>
                                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-200 mb-8">{contactInfo.name}</h1>
                                <h2 className="text-3xl md:text-5xl font-bold text-slate-400 mb-6 leading-relaxed">{contactInfo.title}</h2>
                                <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl font-light">Bridging the gap between Physical World Constraints &amp; Software Performance.</p>
                                <button
                                    onClick={() => setContactModalOpen(true)}
                                    className="inline-block mt-8 bg-transparent border border-cyan-400 text-cyan-400 font-medium py-3 px-8 rounded hover:bg-cyan-400/10 transition-colors duration-300"
                                >
                                    Let's Talk
                                </button>
                            </FadeInSection>
                        </div>
                        <div className="md:w-2/5 flex justify-center items-center">
                            <FadeInSection delay={200}>
                                <div className="w-64 h-64 md:w-80 md:h-80 relative flex justify-center items-center">
                                    <img
                                        src={profileImage}
                                        alt="David F. Pulido"
                                        className="w-44 h-44 md:w-56 md:h-56 rounded-full object-cover border-2 border-cyan-400/70 shadow-2xl shadow-cyan-500/10 z-10"
                                    />

                                    {/* Combined Orbits and Icons SVG */}
                                    <svg viewBox="0 0 200 200" className="w-full h-full absolute top-0 left-0 z-20 overflow-visible">
                                        {/* Orbit 1: Satellite */}
                                        <g className="orbit-group orbit-1">
                                            <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(0, 255, 255, 0.2)" strokeWidth="0.5" strokeDasharray="4 4" />
                                            <g transform="translate(100 5)" className="orbit-icon">
                                                <rect x="-10" y="-3" width="20" height="6" rx="1" fill="rgba(0, 255, 255, 0.8)" />
                                                <line x1="-12" y1="0" x2="-15" y2="-5" stroke="rgba(0, 255, 255, 0.8)" strokeWidth="1" />
                                                <line x1="12" y1="0" x2="15" y2="5" stroke="rgba(0, 255, 255, 0.8)" strokeWidth="1" />
                                                <rect x="-18" y="-9" width="4" height="18" fill="rgba(0, 255, 255, 0.5)" />
                                                <rect x="14" y="-9" width="4" height="18" fill="rgba(0, 255, 255, 0.5)" />
                                            </g>
                                        </g>

                                        {/* Orbit 2: Drone */}
                                        <g className="orbit-group orbit-2">
                                            <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(0, 255, 255, 0.2)" strokeWidth="0.5" strokeDasharray="1 5" />
                                            <g transform="translate(185 100)" className="orbit-icon">
                                                <circle cx="0" cy="0" r="4" fill="rgba(0, 255, 255, 0.8)" />
                                                <line x1="-10" y1="0" x2="10" y2="0" stroke="rgba(0, 255, 255, 0.8)" strokeWidth="1" />
                                                <line x1="0" y1="-10" x2="0" y2="10" stroke="rgba(0, 255, 255, 0.8)" strokeWidth="1" />
                                                <circle cx="-9" cy="-9" r="2" stroke="rgba(0, 255, 255, 0.8)" strokeWidth="0.5" fill="none" />
                                                <circle cx="9" cy="-9" r="2" stroke="rgba(0, 255, 255, 0.8)" strokeWidth="0.5" fill="none" />
                                                <circle cx="-9" cy="9" r="2" stroke="rgba(0, 255, 255, 0.8)" strokeWidth="0.5" fill="none" />
                                                <circle cx="9" cy="9" r="2" stroke="rgba(0, 255, 255, 0.8)" strokeWidth="0.5" fill="none" />
                                            </g>
                                        </g>

                                        {/* Orbit 3: Robotic Arm */}
                                        <g className="orbit-group orbit-3">
                                            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(0, 255, 255, 0.15)" strokeWidth="0.25" />
                                            <g transform="translate(10 100)" className="orbit-icon">
                                                <polyline points="-5,-8 -5,0 5,0 5,8" stroke="rgba(0, 255, 255, 0.8)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                                <circle cx="-5" cy="-10" r="2" fill="rgba(0, 255, 255, 0.8)" />
                                                <circle cx="5" cy="10" r="2" fill="rgba(0, 255, 255, 0.8)" />
                                                <line x1="5" y1="10" x2="10" y2="10" stroke="rgba(0, 255, 255, 0.8)" strokeWidth="1.5" strokeLinecap="round" />
                                            </g>
                                        </g>

                                        {/* Orbit 4: Geology */}
                                        <g className="orbit-group orbit-4">
                                            <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(0, 255, 255, 0.1)" strokeWidth="0.5" />
                                            <g transform="translate(100 178)" className="orbit-icon">
                                                <path d="M-10 0 Q -5 -5, 0 0 T 10 0" stroke="rgba(0, 255, 255, 0.8)" strokeWidth="1" fill="none" />
                                                <path d="M-10 4 Q -5 -1, 0 4 T 10 4" stroke="rgba(0, 255, 255, 0.8)" strokeWidth="1" fill="none" />
                                                <path d="M-10 8 Q -5 3, 0 8 T 10 8" stroke="rgba(0, 255, 255, 0.8)" strokeWidth="1" fill="none" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </FadeInSection>
                        </div>
                    </section>

                    <Section id="about" title="About Me">
                        <FadeInSection>
                            <p className="text-slate-400 max-w-xl leading-relaxed mx-auto text-center md:text-left">{summary}</p>
                        </FadeInSection>
                    </Section>

                    <Section id="experience" title="Where I've Worked">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex md:flex-col md:border-l border-b md:border-b-0 border-slate-700">
                                {experienceData.map((exp, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveExperienceTab(index)}
                                        className={`text-left px-4 py-3 whitespace-nowrap transition-all duration-300 ${activeExperienceTab === index ? 'text-cyan-400 bg-slate-800/50 border-cyan-400 md:border-l-2 border-b-2 md:border-b-0' : 'text-slate-400 hover:bg-slate-800/50 hover:text-cyan-400 md:border-l-2 border-b-2 md:border-b-0 border-transparent'}`}
                                    >
                                        {exp.company}
                                    </button>
                                ))}
                            </div>
                            <div className="min-h-[250px]">
                                <FadeInSection key={activeExperienceTab}>
                                    <h3 className="text-xl font-bold text-slate-200">{activeExperience.role} <span className="text-cyan-400">@ {activeExperience.company}</span></h3>
                                    <p className="text-slate-400 text-sm mb-4 font-mono">{activeExperience.period}</p>
                                    <ul className="space-y-2 text-slate-400">
                                        {activeExperience.description.map((item, i) => (
                                            <li key={i} className="flex">
                                                <span className="text-cyan-400 mr-3">▹</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </FadeInSection>
                            </div>
                        </div>
                    </Section>

                    <Section id="projects" title="Things I've Built">
                        <div className="grid md:grid-cols-2 gap-6">
                            {projectsData.map((project, index) => (
                                <FadeInSection key={index} delay={index * 100}>
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="block">
                                        <div className="bg-slate-800/50 rounded-md shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:ring-1 hover:ring-cyan-400/50 cursor-pointer h-full">

                                            <div className="w-full h-48 bg-slate-900">
                                                {project.videoUrl ? (
                                                    <video src={project.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                                ) : project.imageUrl ? (
                                                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                                                ) : <div className="w-full h-full flex items-center justify-center text-slate-500">No media available</div>}
                                            </div>

                                            <div className="p-6 flex flex-col flex-grow">
                                                <h3 className="font-bold text-xl text-slate-200 mb-2">{project.title}</h3>
                                                <p className="text-slate-400 mb-4 text-sm flex-grow">{project.description}</p>
                                                <div className="flex flex-wrap gap-2 font-mono text-xs text-cyan-300 mt-auto pt-4">
                                                    {project.tags.map((tag, i) => (
                                                        <span key={i} className="bg-cyan-900/50 px-2 py-1 rounded">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </FadeInSection>
                            ))}
                        </div>
                    </Section>

                    <Section id="skills" title="Core Skills">
                        <FadeInSection>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                                {skillsData.map((skill, index) => (
                                    <div key={index} className="bg-slate-800/50 p-4 rounded-md flex flex-col items-center justify-center">
                                        <skill.icon className="h-8 w-8 text-cyan-400 mb-2" />
                                        <h4 className="font-semibold text-slate-200 text-sm">{skill.name}</h4>
                                    </div>
                                ))}
                            </div>
                        </FadeInSection>
                    </Section>

                    <Section id="contact" title="Get In Touch">
                        <div className="max-w-xl mx-auto text-center">
                            <FadeInSection>
                                <p className="text-slate-400 mb-8">I'm currently seeking new opportunities and challenges. Whether you have a question or just want to say hi, my inbox is always open. I'll do my best to get back to you!</p>
                                <button
                                    onClick={() => setContactModalOpen(true)}
                                    className="inline-block bg-cyan-500 text-white font-bold py-4 px-8 rounded-lg shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:bg-cyan-600 transition-colors duration-300"
                                >
                                    Let's Talk
                                </button>
                            </FadeInSection>
                        </div>
                    </Section>
                </main>

                <footer className="text-center py-6 mt-12">
                    <p className="text-slate-500 text-sm font-mono">&copy; {new Date().getFullYear()} David F. Pulido. All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
