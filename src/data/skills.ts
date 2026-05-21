import {
  Bot,
  Radar,
  Route,
  Brain,
  Code2,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";

export type SkillGroup = {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "robotics",
    title: "Robotics",
    icon: Bot,
    description: "Robot middleware, modeling, and runtime tooling.",
    skills: [
      "ROS 2",
      "Gazebo",
      "RViz",
      "URDF",
      "SDF",
      "Xacro",
      "TF2",
      "Nav2 concepts",
      "Odometry",
    ],
  },
  {
    id: "perception",
    title: "Perception & Sensors",
    icon: Radar,
    description: "Turning raw sensor streams into structured understanding.",
    skills: [
      "LiDAR",
      "IMU",
      "PointCloud2",
      "PCL",
      "Sensor integration",
      "ROI filtering",
      "Clustering",
      "SLAM",
    ],
  },
  {
    id: "planning-control",
    title: "Planning & Control",
    icon: Route,
    description: "From search algorithms to nonlinear optimization.",
    skills: [
      "A*",
      "Lanelet2",
      "Occupancy grids",
      "NMPC",
      "CasADi",
      "IPOPT",
      "Closed-loop control",
      "Motor control",
      "Modbus",
      "Fault handling",
    ],
  },
  {
    id: "ai-interaction",
    title: "AI & Interaction",
    icon: Brain,
    description: "Local AI pipelines designed for embedded robots.",
    skills: [
      "Local LLMs",
      "Wake-word detection",
      "STT",
      "TTS",
      "RAG",
      "Offline AI pipelines",
    ],
  },
  {
    id: "programming",
    title: "Programming",
    icon: Code2,
    description: "Languages and tools that ship robotic systems.",
    skills: [
      "C++",
      "C",
      "Python",
      "OOP",
      "Data structures",
      "Algorithms",
      "CMake",
      "Linux",
      "Git",
      "Bash",
    ],
  },
  {
    id: "simulation",
    title: "Simulation & Validation",
    icon: FlaskConical,
    description: "Testing autonomy stacks before they hit hardware.",
    skills: [
      "Gazebo",
      "SLAM",
      "FAST-LIO",
      "Robot modeling",
      "CAD-informed models",
      "SolidWorks fundamentals",
      "Collision checking",
      "Motion behavior",
      "Trajectory validation",
      "System validation",
    ],
  },
];
