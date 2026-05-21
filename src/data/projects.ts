export type ProjectCategory =
  | "AI"
  | "Planning"
  | "Control"
  | "Simulation"
  | "Robotics";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "youtube" | "external";
};

export type PipelineStep = {
  title: string;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  tags: string[];
  github: string[];
  demo?: string;
  youtubeId?: string;
  problem: string;
  solution: string;
  architecture: string;
  contribution: string;
  technologies: string[];
  learnings: string[];
  pipeline: PipelineStep[];
  highlights: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "local-llm-for-robots",
    title: "Local LLM for Robots",
    tagline: "Offline voice intelligence pipeline for robots",
    description:
      "A local AI interaction pipeline that combines wake-word detection, speech-to-text, a local LLM module, and text-to-speech. Robots can understand and respond to natural language without relying on cloud services.",
    categories: ["AI", "Robotics"],
    tags: [
      "Python",
      "Local LLM",
      "STT",
      "TTS",
      "Wake Word",
      "Robotics",
      "Offline AI",
    ],
    github: ["https://github.com/JossueE/Local-LLM-for-Robots"],
    demo: "https://www.youtube.com/watch?v=PP4M3LmFDbM",
    youtubeId: "PP4M3LmFDbM",
    problem:
      "Cloud-based voice assistants introduce latency, network dependency, and privacy concerns that are unacceptable for autonomous robots operating in the field. Robots need to listen, understand, and respond locally without leaking sensor or speech data.",
    solution:
      "An end-to-end offline interaction stack: a low-power wake-word listener triggers an STT module, the transcribed prompt is routed to a local LLM that reasons over robot context, and the response is synthesized through a TTS engine and surfaced through an avatar feedback layer.",
    architecture:
      "Modular Python pipeline with clearly separated stages. Each stage exposes a clean interface so STT engines, LLM backends, and TTS voices can be swapped independently. The orchestrator handles state, barge-in, and idle/awake transitions.",
    contribution:
      "Designed and implemented the full pipeline, integrated the local LLM backend, tuned the wake-word sensitivity, and built the avatar feedback layer that mirrors the robot's listening, thinking, and speaking states.",
    technologies: [
      "Python",
      "Local LLM",
      "Wake Word Detection",
      "Speech-to-Text",
      "Text-to-Speech",
      "Avatar UX",
    ],
    learnings: [
      "Designing latency-aware AI pipelines where every stage has a real-time budget.",
      "Trading off model size and quality against on-device compute constraints.",
      "Giving robots a believable conversational presence through visual feedback states.",
    ],
    pipeline: [
      {
        title: "Wake Word",
        description: "Always-on listener triggers the pipeline on demand.",
      },
      {
        title: "Speech-to-Text",
        description: "Offline transcription of the user's utterance.",
      },
      {
        title: "Local LLM",
        description: "On-device reasoning and response generation.",
      },
      {
        title: "Text-to-Speech",
        description: "Voice synthesis routed back to the robot speaker.",
      },
      {
        title: "Avatar Feedback",
        description: "Visual states convey listening, thinking, and speaking.",
      },
    ],
    highlights: [
      "Offline robot voice interaction",
      "Wake Word → STT → LLM → TTS pipeline",
      "Local LLM integration",
      "Speech pipeline for robotics",
      "Avatar feedback system",
    ],
    featured: true,
  },
  {
    id: "path-planning-nmpc",
    title: "Path Planning Dynamic & NMPC Controller",
    tagline: "From LiDAR point clouds to trajectory tracking",
    description:
      "A complete autonomous navigation stack combining dynamic path planning and nonlinear model predictive control. The planner processes LiDAR point clouds, filters regions of interest, clusters obstacles, builds occupancy grids, and generates trajectories using a tree-based A*. The NMPC controller follows the generated paths.",
    categories: ["Planning", "Control", "Robotics"],
    tags: [
      "ROS 2",
      "C++",
      "Path Planning",
      "A*",
      "Lanelet2",
      "LiDAR",
      "NMPC",
      "CasADi",
      "IPOPT",
      "Control",
    ],
    github: [
      "https://github.com/JossueE/path_planning_dynamic",
      "https://github.com/JossueE/nmpc_controller",
    ],
    demo: "https://youtu.be/mxMKJYNHC7U",
    youtubeId: "mxMKJYNHC7U",
    problem:
      "Mobile robots in dynamic environments must turn raw LiDAR streams into safe, smooth trajectories in real time, while a controller that respects vehicle dynamics actually executes them. Decoupling perception, planning, and control while keeping them coherent is the hard part.",
    solution:
      "A two-module stack on ROS 2: a planner that filters point clouds, clusters obstacles, and searches feasible trajectories with a tree-based A* over an occupancy grid, plus an NMPC controller built on CasADi and IPOPT that tracks the planned path while honoring differential-drive constraints.",
    architecture:
      "Planner: ROI filtering → Euclidean clustering → occupancy grid → tree-based A* over Lanelet2-aware routes, publishing a nav_msgs/Path. Controller: subscribes to the path, formulates a nonlinear MPC problem each cycle, solves it with IPOPT through CasADi, and emits velocity commands.",
    contribution:
      "Authored both repositories end to end: the perception-to-planning pipeline, the NMPC formulation, the ROS 2 integration, and the message contracts that let the modules be composed or used independently.",
    technologies: [
      "ROS 2",
      "C++",
      "LiDAR / PointCloud2",
      "Lanelet2",
      "A* Search",
      "CasADi",
      "IPOPT",
      "NMPC",
    ],
    learnings: [
      "Designing planner/controller interfaces around standard ROS messages keeps modules truly reusable.",
      "Tree-based local search on dynamic occupancy grids scales well when ROI filtering is aggressive enough.",
      "NMPC stays tractable when the prediction horizon, solver warm-starts, and constraints are tuned together.",
    ],
    pipeline: [
      {
        title: "ROI Filtering",
        description: "Trim LiDAR point cloud to the relevant workspace.",
      },
      {
        title: "Clustering",
        description: "Euclidean clustering isolates obstacles.",
      },
      {
        title: "Occupancy Grid",
        description: "Dynamic grid built from current obstacles.",
      },
      {
        title: "Tree-based A*",
        description: "Local trajectory search over the grid.",
      },
      {
        title: "Lanelet2 Routing",
        description: "Map-aware reasoning for global guidance.",
      },
      {
        title: "NMPC",
        description: "CasADi + IPOPT track the path on a differential drive.",
      },
    ],
    highlights: [
      "ROI point-cloud filtering",
      "Euclidean obstacle clustering",
      "Dynamic occupancy grid generation",
      "Tree-based A* local trajectory search",
      "Lanelet2-based route reasoning",
      "NMPC controller for differential-drive robots",
      "ROS 2 path following using nav_msgs/Path",
    ],
    featured: true,
  },
  {
    id: "autonomous-robot-simulation",
    title: "Autonomous Robot Simulation",
    tagline: "ROS 2 + Gazebo testbed for full autonomy stacks",
    description:
      "A ROS 2 and Gazebo simulation framework for autonomous mobile robots. It integrates simulated LiDAR, IMU, vehicle models, SLAM, localization, mapping, and path planning so autonomy pipelines can be validated in realistic virtual environments.",
    categories: ["Simulation", "Robotics"],
    tags: [
      "ROS 2",
      "Gazebo",
      "SLAM",
      "FAST-LIO",
      "LiDAR",
      "IMU",
      "URDF",
      "Xacro",
      "Simulation",
      "Robotics",
    ],
    github: ["https://github.com/JossueE/autonomous_robot_simulation"],
    demo: "https://youtu.be/dx9Jkex_jJQ",
    youtubeId: "dx9Jkex_jJQ",
    problem:
      "Iterating on robotics autonomy on a physical robot is slow and risky. There was a need for a reproducible simulated environment that mirrors the sensors and dynamics of the real platform closely enough to be trusted for planning and control work.",
    solution:
      "A modular ROS 2 Jazzy + Gazebo Harmonic project with custom URDF/Xacro robots, simulated LiDAR and IMU, FAST-LIO mapping, and SLAM/localization wired in. The same path planning and control modules used on hardware can be plugged in for testing.",
    architecture:
      "URDF/Xacro robot models drive Gazebo simulation. Sensor plugins publish LiDAR and IMU into ROS 2. FAST-LIO builds the map while a SLAM/localization stack tracks pose. The autonomy stack consumes these topics exactly as it would on a real robot.",
    contribution:
      "Built and tuned the simulation environment, robot models, sensor plugins, and the mapping/localization stack so the same autonomy code can be validated in sim and on hardware.",
    technologies: [
      "ROS 2 Jazzy",
      "Gazebo Harmonic",
      "URDF / Xacro",
      "LiDAR + IMU plugins",
      "FAST-LIO",
      "SLAM",
    ],
    learnings: [
      "Reusable robot models pay off the moment hardware and simulation start diverging.",
      "FAST-LIO works beautifully in sim but only if IMU timestamps and sensor frames are exact.",
      "A clean topic contract is the bridge that lets sim and real robot share the same autonomy stack.",
    ],
    pipeline: [
      {
        title: "URDF / Xacro Model",
        description: "Custom robot description and sensor mounting.",
      },
      {
        title: "Gazebo World",
        description: "Realistic simulated environment.",
      },
      {
        title: "LiDAR + IMU",
        description: "Sensor plugins publish into ROS 2.",
      },
      {
        title: "FAST-LIO Mapping",
        description: "Tightly-coupled LiDAR-inertial mapping.",
      },
      {
        title: "SLAM & Localization",
        description: "Track pose across the simulated world.",
      },
      {
        title: "Autonomy Validation",
        description: "Plug in planning and control modules for testing.",
      },
    ],
    highlights: [
      "ROS 2 Jazzy + Gazebo Harmonic simulation",
      "LiDAR and IMU integration",
      "Custom URDF/Xacro robot models",
      "FAST-LIO mapping",
      "SLAM and localization testing",
      "Map generation and simulation validation",
      "Integration with path planning and control modules",
    ],
    featured: true,
  },
  {
    id: "tetris-cyber-physical-system",
    title: "Tetris with Cyber-Physical System",
    tagline: "FPGA + VGA game controlled through physical inputs",
    description:
      "A cyber-physical Tetris implementation that connects software game logic with FPGA-based visual output. The system displays the game on an external VGA monitor and uses two potentiometers plus two buttons as physical controls, communicating over a single-channel half-duplex serial link.",
    categories: ["Control", "Robotics"],
    tags: [
      "VHDL",
      "FPGA",
      "Processing",
      "C++",
      "VGA",
      "Serial Communication",
      "Cyber-Physical System",
      "Embedded Systems",
    ],
    github: ["https://github.com/JossueE/Tetris-with-Cyber-Physical-System-"],
    demo: "https://www.youtube.com/watch?v=pJL0NukXaIs",
    youtubeId: "pJL0NukXaIs",
    problem:
      "A conventional software game does not exercise the full interaction between physical controls, embedded communication, and hardware display. The challenge was to build a playable Tetris system where user input, game state, and VGA output work together as one cyber-physical system.",
    solution:
      "The project combines a Tetris game implementation with an FPGA display pipeline. Two potentiometers and two buttons provide physical input, a half-duplex single-channel serial link carries control/game data, and the FPGA renders visual output to an external VGA display.",
    architecture:
      "The system is split into three layers: physical controls for player input, serial communication for exchanging state between modules, and a VHDL/FPGA display layer that drives VGA output. Processing handles the game-side logic while the hardware side manages the external display behavior.",
    contribution:
      "Developed the cyber-physical integration between software game logic, serial communication, and FPGA/VGA output, helping turn a desktop game concept into a physical embedded interaction system.",
    technologies: [
      "VHDL",
      "FPGA",
      "Processing",
      "C++",
      "VGA Output",
      "Serial Communication",
      "Potentiometers",
      "Push Buttons",
    ],
    learnings: [
      "Cyber-physical projects need clean contracts between software state, serial messages, and hardware timing.",
      "VGA output forces careful thinking about real-time display constraints and deterministic hardware behavior.",
      "Physical controls make interaction design more sensitive to noise, calibration, and response latency.",
    ],
    pipeline: [
      {
        title: "Physical Controls",
        description: "Two potentiometers and two buttons capture player input.",
      },
      {
        title: "Game Logic",
        description: "Tetris state and gameplay rules run in the software layer.",
      },
      {
        title: "Serial Link",
        description: "Half-duplex single-channel communication moves data between modules.",
      },
      {
        title: "FPGA Display",
        description: "VHDL logic prepares the visual output pipeline.",
      },
      {
        title: "VGA Output",
        description: "The game is displayed on an external monitor.",
      },
    ],
    highlights: [
      "Cyber-physical Tetris game",
      "External VGA display output",
      "FPGA-based visual pipeline",
      "Two potentiometers and two buttons as controls",
      "Half-duplex single-channel serial communication",
      "VHDL + Processing integration",
      "Presented as part of a Tecnologico de Monterrey team project",
    ],
    featured: true,
  },
  {
    id: "puzzlebot-line-follower",
    title: "Puzzlebot — Line Follower Car",
    tagline: "Team-built mobile robotics framework with external recognition",
    description:
      "A collaborative mobile robotics project focused on a flexible Puzzlebot framework: line following, computer vision, manual control, open-loop and closed-loop movement, path planning, and experimental robotics modules. The team received a LinkedIn mention from Manchester Robotics for the quality of the design, control, and project development.",
    categories: ["Robotics", "Control"],
    tags: [
      "Robotics",
      "Line Follower",
      "Computer Vision",
      "Control",
      "Path Planning",
      "Team Project",
    ],
    github: ["https://github.com/gusgarciarreal/Puzzlebot"],
    demo: "https://youtu.be/lm2Cisp2zHo",
    youtubeId: "lm2Cisp2zHo",
    problem:
      "A learning platform was needed that combined the discipline of low-level robot control with higher-level perception so a team could iterate on multiple autonomy ideas on the same robot.",
    solution:
      "A modular Puzzlebot framework where line following, vision, manual control, open-loop and closed-loop motion, and path planning experiments share a common codebase. The structure made it easy to swap modules and run new experiments quickly.",
    architecture:
      "Separated layers for low-level motion (open-loop and closed-loop), perception (computer vision and line detection), and behaviors (line follower, manual control, planning experiments). Each layer exposes clean interfaces so modules can be reused.",
    contribution:
      "Contributed to control logic, perception integration, and the project structure that allowed the team to scale features without rewriting the core. Worked closely with teammates on testing and validation.",
    technologies: [
      "Mobile Robotics",
      "Computer Vision",
      "Open-loop & Closed-loop Control",
      "Path Planning",
      "Team Engineering",
    ],
    learnings: [
      "Clean module boundaries are what let a team move fast without stepping on each other.",
      "Closed-loop control on small robots is unforgiving — every bias and delay shows up.",
      "External recognition is a strong signal that engineering quality is being noticed.",
    ],
    pipeline: [
      {
        title: "Sensing",
        description: "Camera input for line and environment cues.",
      },
      {
        title: "Computer Vision",
        description: "Detect the line and visual features.",
      },
      {
        title: "Control",
        description: "Open-loop and closed-loop motion modules.",
      },
      {
        title: "Behavior",
        description: "Line following, manual control, experiments.",
      },
      {
        title: "Path Planning",
        description: "Higher-level routing on the robot.",
      },
    ],
    highlights: [
      "Line follower implementation",
      "Manual and autonomous robot control",
      "Computer vision modules",
      "Open-loop and closed-loop movement",
      "Path planning experiments",
      "Team-based robotics development",
      "External recognition from Manchester Robotics",
    ],
    featured: true,
  },
];

export const allCategories: ProjectCategory[] = [
  "AI",
  "Planning",
  "Control",
  "Simulation",
  "Robotics",
];
