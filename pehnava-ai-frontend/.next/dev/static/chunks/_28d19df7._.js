(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/utils/seedData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "seedOpportunities",
    ()=>seedOpportunities,
    "seedProfessors",
    ()=>seedProfessors,
    "seedStudents",
    ()=>seedStudents
]);
const seedOpportunities = ()=>{
    if (localStorage.getItem("opportunities")) return;
    const opportunities = [
        {
            id: 1763177647845,
            title: "AI Research Internship",
            description: "Work under a professor on a real research publication.",
            professor: "Dr. Rohan Sharma",
            professorId: 1,
            institute: "IIT Delhi",
            field: "AI & ML",
            type: "Internship",
            duration: "1 month",
            prerequisites: "Python, NumPy, ML Basics",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/AI_Research_Internship_1.pdf",
            professorEmail: "rohan.sharma@iitd.ac.in",
            createdAt: 1763177647844
        },
        {
            id: 1763177647846,
            title: "Blockchain Development Internship",
            description: "Hands-on project work with weekly evaluations.",
            professor: "Prof. Neha Gupta",
            professorId: 2,
            institute: "BITS Pilani",
            field: "Cybersecurity",
            type: "Research Position",
            duration: "2 months",
            prerequisites: "C++, DSA",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Blockchain_Development_Internship_2.pdf",
            professorEmail: "neha.gupta@bits-pilani.ac.in",
            createdAt: 1763177547844
        },
        {
            id: 1763177647847,
            title: "Cybersecurity Analyst Internship",
            description: "Opportunity to assist with ongoing academic research.",
            professor: "Dr. Aman Verma",
            professorId: 3,
            institute: "IIT Bombay",
            field: "Web Development",
            type: "Assistantship",
            duration: "3 months",
            prerequisites: "Java, Spring Boot",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Cybersecurity_Analyst_Internship_3.pdf",
            professorEmail: "aman.verma@iitb.ac.in",
            createdAt: 1763177447844
        },
        {
            id: 1763177647848,
            title: "Full Stack Web Developer Internship",
            description: "Build and optimize systems with real datasets.",
            professor: "Prof. Akanksha Iyer",
            professorId: 4,
            institute: "NIT Trichy",
            field: "Blockchain",
            type: "Project Internship",
            duration: "4 months",
            prerequisites: "HTML, CSS, JavaScript",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Full_Stack_Web_Developer_Internship_4.pdf",
            professorEmail: "akanksha.iyer@nitt.edu",
            createdAt: 1763177347844
        },
        {
            id: 1763177647849,
            title: "Data Science Research Assistant",
            description: "Develop and test prototype systems.",
            professor: "Dr. Sameer Kulkarni",
            professorId: 5,
            institute: "VIT Vellore",
            field: "Cloud Computing",
            type: "Industrial Training",
            duration: "6 months",
            prerequisites: "React, Next.js",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Data_Science_Research_Assistant_5.pdf",
            professorEmail: "sameer.kulkarni@vit.ac.in",
            createdAt: 1763177247844
        },
        {
            id: 1763177647850,
            title: "Machine Learning Model Training Program",
            description: "Contribute to open-source tools used in academia.",
            professor: "Prof. Devika Menon",
            professorId: 6,
            institute: "IIIT Hyderabad",
            field: "Robotics",
            type: "Virtual Internship",
            duration: "8 weeks",
            prerequisites: "TensorFlow, PyTorch",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Machine_Learning_Model_Training_Program_6.pdf",
            professorEmail: "devika.menon@iiit.ac.in",
            createdAt: 1763177147844
        },
        {
            id: 1763177647851,
            title: "Cloud Computing Virtual Internship",
            description: "Learn industry workflows through real tasks.",
            professor: "Dr. Harsh Vyas",
            professorId: 7,
            institute: "IISc Bangalore",
            field: "Data Science",
            type: "Internship",
            duration: "1 month",
            prerequisites: "Linux, Shell Scripting",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Cloud_Computing_Virtual_Internship_7.pdf",
            professorEmail: "harsh.vyas@iisc.ac.in",
            createdAt: 1763177047844
        },
        {
            id: 1763177647852,
            title: "Robotics Engineering Internship",
            description: "Research-oriented contribution for future publication.",
            professor: "Prof. Kiran Desai",
            professorId: 8,
            institute: "SRM Institute",
            field: "Quantum Computing",
            type: "Research Position",
            duration: "2 months",
            prerequisites: "SQL, MongoDB",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Robotics_Engineering_Internship_8.pdf",
            professorEmail: "kiran.desai@srmist.edu.in",
            createdAt: 1763176947844
        },
        {
            id: 1763177647853,
            title: "Autonomous Systems Research",
            description: "Work under a professor on a real research publication.",
            professor: "Dr. Rohan Sharma",
            professorId: 1,
            institute: "IIT Delhi",
            field: "Computer Vision",
            type: "Assistantship",
            duration: "3 months",
            prerequisites: "Docker, Kubernetes",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Autonomous_Systems_Research_9.pdf",
            professorEmail: "rohan.sharma@iitd.ac.in",
            createdAt: 1763176847844
        },
        {
            id: 1763177647854,
            title: "Natural Language Processing Assistant",
            description: "Hands-on project work with weekly evaluations.",
            professor: "Prof. Neha Gupta",
            professorId: 2,
            institute: "BITS Pilani",
            field: "Compiler Design",
            type: "Project Internship",
            duration: "4 months",
            prerequisites: "Technical Writing",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Natural_Language_Processing_Assistant_10.pdf",
            professorEmail: "neha.gupta@bits-pilani.ac.in",
            createdAt: 1763176747844
        },
        {
            id: 1763177647855,
            title: "Quantum Computing Research",
            description: "Opportunity to assist with ongoing academic research.",
            professor: "Dr. Aman Verma",
            professorId: 3,
            institute: "IIT Bombay",
            field: "Operating Systems",
            type: "Industrial Training",
            duration: "6 months",
            prerequisites: "Basic Electronics",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Quantum_Computing_Research_11.pdf",
            professorEmail: "aman.verma@iitb.ac.in",
            createdAt: 1763176647844
        },
        {
            id: 1763177647856,
            title: "Operating Systems Mini Internship",
            description: "Build and optimize systems with real datasets.",
            professor: "Prof. Akanksha Iyer",
            professorId: 4,
            institute: "NIT Trichy",
            field: "Networks",
            type: "Virtual Internship",
            duration: "8 weeks",
            prerequisites: "Rust or Go (optional)",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Operating_Systems_Mini_Internship_12.pdf",
            professorEmail: "akanksha.iyer@nitt.edu",
            createdAt: 1763176547844
        },
        {
            id: 1763177647857,
            title: "Open Source Contributor Program",
            description: "Develop and test prototype systems.",
            professor: "Dr. Sameer Kulkarni",
            professorId: 5,
            institute: "VIT Vellore",
            field: "VLSI",
            type: "Internship",
            duration: "1 month",
            prerequisites: "Python, NumPy, ML Basics",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Open_Source_Contributor_Program_13.pdf",
            professorEmail: "sameer.kulkarni@vit.ac.in",
            createdAt: 1763176447844
        },
        {
            id: 1763177647858,
            title: "Android App Development Internship",
            description: "Contribute to open-source tools used in academia.",
            professor: "Prof. Devika Menon",
            professorId: 6,
            institute: "IIIT Hyderabad",
            field: "Embedded Systems",
            type: "Research Position",
            duration: "2 months",
            prerequisites: "C++, DSA",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Android_App_Development_Internship_14.pdf",
            professorEmail: "devika.menon@iiit.ac.in",
            createdAt: 1763176347844
        },
        {
            id: 1763177647859,
            title: "iOS App Developer Internship",
            description: "Learn industry workflows through real tasks.",
            professor: "Dr. Harsh Vyas",
            professorId: 7,
            institute: "IISc Bangalore",
            field: "AI & ML",
            type: "Assistantship",
            duration: "3 months",
            prerequisites: "Java, Spring Boot",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/iOS_App_Developer_Internship_15.pdf",
            professorEmail: "harsh.vyas@iisc.ac.in",
            createdAt: 1763176247844
        },
        {
            id: 1763177647860,
            title: "UI/UX Design Research",
            description: "Research-oriented contribution for future publication.",
            professor: "Prof. Kiran Desai",
            professorId: 8,
            institute: "SRM Institute",
            field: "Cybersecurity",
            type: "Project Internship",
            duration: "4 months",
            prerequisites: "HTML, CSS, JavaScript",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/UI_UX_Design_Research_16.pdf",
            professorEmail: "kiran.desai@srmist.edu.in",
            createdAt: 1763176147844
        },
        {
            id: 1763177647861,
            title: "Game Development Internship",
            description: "Work under a professor on a real research publication.",
            professor: "Dr. Rohan Sharma",
            professorId: 1,
            institute: "IIT Delhi",
            field: "Web Development",
            type: "Industrial Training",
            duration: "6 months",
            prerequisites: "React, Next.js",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Game_Development_Internship_17.pdf",
            professorEmail: "rohan.sharma@iitd.ac.in",
            createdAt: 1763176047844
        },
        {
            id: 1763177647862,
            title: "AR/VR Development Program",
            description: "Hands-on project work with weekly evaluations.",
            professor: "Prof. Neha Gupta",
            professorId: 2,
            institute: "BITS Pilani",
            field: "Blockchain",
            type: "Virtual Internship",
            duration: "8 weeks",
            prerequisites: "TensorFlow, PyTorch",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/AR_VR_Development_Program_18.pdf",
            professorEmail: "neha.gupta@bits-pilani.ac.in",
            createdAt: 1763175947844
        },
        {
            id: 1763177647863,
            title: "DevOps Engineering Internship",
            description: "Opportunity to assist with ongoing academic research.",
            professor: "Dr. Aman Verma",
            professorId: 3,
            institute: "IIT Bombay",
            field: "Cloud Computing",
            type: "Internship",
            duration: "1 month",
            prerequisites: "Linux, Shell Scripting",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/DevOps_Engineering_Internship_19.pdf",
            professorEmail: "aman.verma@iitb.ac.in",
            createdAt: 1763175847844
        },
        {
            id: 1763177647864,
            title: "Database Management Internship",
            description: "Build and optimize systems with real datasets.",
            professor: "Prof. Akanksha Iyer",
            professorId: 4,
            institute: "NIT Trichy",
            field: "Robotics",
            type: "Research Position",
            duration: "2 months",
            prerequisites: "SQL, MongoDB",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Database_Management_Internship_20.pdf",
            professorEmail: "akanksha.iyer@nitt.edu",
            createdAt: 1763175747844
        },
        {
            id: 1763177647865,
            title: "Computer Vision Research",
            description: "Develop and test prototype systems.",
            professor: "Dr. Sameer Kulkarni",
            professorId: 5,
            institute: "VIT Vellore",
            field: "Data Science",
            type: "Assistantship",
            duration: "3 months",
            prerequisites: "Docker, Kubernetes",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Computer_Vision_Research_21.pdf",
            professorEmail: "sameer.kulkarni@vit.ac.in",
            createdAt: 1763175647844
        },
        {
            id: 1763177647866,
            title: "Embedded Systems Internship",
            description: "Contribute to open-source tools used in academia.",
            professor: "Prof. Devika Menon",
            professorId: 6,
            institute: "IIIT Hyderabad",
            field: "Quantum Computing",
            type: "Project Internship",
            duration: "4 months",
            prerequisites: "Technical Writing",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Embedded_Systems_Internship_22.pdf",
            professorEmail: "devika.menon@iiit.ac.in",
            createdAt: 1763175547844
        },
        {
            id: 1763177647867,
            title: "VLSI Design Internship",
            description: "Learn industry workflows through real tasks.",
            professor: "Dr. Harsh Vyas",
            professorId: 7,
            institute: "IISc Bangalore",
            field: "Computer Vision",
            type: "Industrial Training",
            duration: "6 months",
            prerequisites: "Basic Electronics",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/VLSI_Design_Internship_23.pdf",
            professorEmail: "harsh.vyas@iisc.ac.in",
            createdAt: 1763175447844
        },
        {
            id: 1763177647868,
            title: "Networking & Security Bootcamp",
            description: "Research-oriented contribution for future publication.",
            professor: "Prof. Kiran Desai",
            professorId: 8,
            institute: "SRM Institute",
            field: "Compiler Design",
            type: "Virtual Internship",
            duration: "8 weeks",
            prerequisites: "Rust or Go (optional)",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Networking_Security_Bootcamp_24.pdf",
            professorEmail: "kiran.desai@srmist.edu.in",
            createdAt: 1763175347844
        },
        {
            id: 1763177647869,
            title: "Software Testing Internship",
            description: "Work under a professor on a real research publication.",
            professor: "Dr. Rohan Sharma",
            professorId: 1,
            institute: "IIT Delhi",
            field: "Operating Systems",
            type: "Internship",
            duration: "1 month",
            prerequisites: "Python, NumPy, ML Basics",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Software_Testing_Internship_25.pdf",
            professorEmail: "rohan.sharma@iitd.ac.in",
            createdAt: 1763175247844
        },
        {
            id: 1763177647870,
            title: "Big Data & Analytics Internship",
            description: "Hands-on project work with weekly evaluations.",
            professor: "Prof. Neha Gupta",
            professorId: 2,
            institute: "BITS Pilani",
            field: "Networks",
            type: "Research Position",
            duration: "2 months",
            prerequisites: "C++, DSA",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Big_Data_Analytics_Internship_26.pdf",
            professorEmail: "neha.gupta@bits-pilani.ac.in",
            createdAt: 1763175147844
        },
        {
            id: 1763177647871,
            title: "Ethical Hacking Program",
            description: "Opportunity to assist with ongoing academic research.",
            professor: "Dr. Aman Verma",
            professorId: 3,
            institute: "IIT Bombay",
            field: "VLSI",
            type: "Assistantship",
            duration: "3 months",
            prerequisites: "Java, Spring Boot",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Ethical_Hacking_Program_27.pdf",
            professorEmail: "aman.verma@iitb.ac.in",
            createdAt: 1763175047844
        },
        {
            id: 1763177647872,
            title: "Information Security Research",
            description: "Build and optimize systems with real datasets.",
            professor: "Prof. Akanksha Iyer",
            professorId: 4,
            institute: "NIT Trichy",
            field: "Embedded Systems",
            type: "Project Internship",
            duration: "4 months",
            prerequisites: "HTML, CSS, JavaScript",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Information_Security_Research_28.pdf",
            professorEmail: "akanksha.iyer@nitt.edu",
            createdAt: 1763174947844
        },
        {
            id: 1763177647873,
            title: "Scientific Computing Internship",
            description: "Develop and test prototype systems.",
            professor: "Dr. Sameer Kulkarni",
            professorId: 5,
            institute: "VIT Vellore",
            field: "AI & ML",
            type: "Industrial Training",
            duration: "6 months",
            prerequisites: "React, Next.js",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Scientific_Computing_Internship_29.pdf",
            professorEmail: "sameer.kulkarni@vit.ac.in",
            createdAt: 1763174847844
        },
        {
            id: 1763177647874,
            title: "Backend Node.js Internship",
            description: "Contribute to open-source tools used in academia.",
            professor: "Prof. Devika Menon",
            professorId: 6,
            institute: "IIIT Hyderabad",
            field: "Cybersecurity",
            type: "Virtual Internship",
            duration: "8 weeks",
            prerequisites: "TensorFlow, PyTorch",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Backend_Node_js_Internship_30.pdf",
            professorEmail: "devika.menon@iiit.ac.in",
            createdAt: 1763174747844
        },
        {
            id: 1763177647875,
            title: "Frontend React Internship",
            description: "Learn industry workflows through real tasks.",
            professor: "Dr. Harsh Vyas",
            professorId: 7,
            institute: "IISc Bangalore",
            field: "Web Development",
            type: "Internship",
            duration: "1 month",
            prerequisites: "Linux, Shell Scripting",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Frontend_React_Internship_31.pdf",
            professorEmail: "harsh.vyas@iisc.ac.in",
            createdAt: 1763174647844
        },
        {
            id: 1763177647876,
            title: "Deep Learning Research Internship",
            description: "Research-oriented contribution for future publication.",
            professor: "Prof. Kiran Desai",
            professorId: 8,
            institute: "SRM Institute",
            field: "Blockchain",
            type: "Research Position",
            duration: "2 months",
            prerequisites: "SQL, MongoDB",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Deep_Learning_Research_Internship_32.pdf",
            professorEmail: "kiran.desai@srmist.edu.in",
            createdAt: 1763174547844
        },
        {
            id: 1763177647877,
            title: "Algorithm Optimization Program",
            description: "Work under a professor on a real research publication.",
            professor: "Dr. Rohan Sharma",
            professorId: 1,
            institute: "IIT Delhi",
            field: "Cloud Computing",
            type: "Assistantship",
            duration: "3 months",
            prerequisites: "Docker, Kubernetes",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Algorithm_Optimization_Program_33.pdf",
            professorEmail: "rohan.sharma@iitd.ac.in",
            createdAt: 1763174447844
        },
        {
            id: 1763177647878,
            title: "Compiler Design Internship",
            description: "Hands-on project work with weekly evaluations.",
            professor: "Prof. Neha Gupta",
            professorId: 2,
            institute: "BITS Pilani",
            field: "Robotics",
            type: "Project Internship",
            duration: "4 months",
            prerequisites: "Technical Writing",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Compiler_Design_Internship_34.pdf",
            professorEmail: "neha.gupta@bits-pilani.ac.in",
            createdAt: 1763174347844
        },
        {
            id: 1763177647879,
            title: "Distributed Systems Research",
            description: "Opportunity to assist with ongoing academic research.",
            professor: "Dr. Aman Verma",
            professorId: 3,
            institute: "IIT Bombay",
            field: "Data Science",
            type: "Industrial Training",
            duration: "6 months",
            prerequisites: "Basic Electronics",
            pdfBase64: "",
            pdfName: "",
            pdfUrl: "/opportunity-pdfs/Distributed_Systems_Research_35.pdf",
            professorEmail: "aman.verma@iitb.ac.in",
            createdAt: 1763174247844
        }
    ];
    localStorage.setItem("opportunities", JSON.stringify(opportunities));
};
const seedProfessors = ()=>{
    const existingProfessors = localStorage.getItem("professors");
    if (!existingProfessors) {
        const defaultProfessors = [
            {
                id: Date.now() + 1,
                name: "Dr. Rohan Sharma",
                department: "CSE",
                bio: "AI Researcher",
                specialization: "Machine Learning",
                email: "rohan@college.com",
                password: "12345"
            },
            {
                id: Date.now() + 2,
                name: "Prof. Neha Gupta",
                department: "IT",
                bio: "Cloud Architect",
                specialization: "Cloud Computing",
                email: "neha@college.com",
                password: "abcd1234"
            }
        ];
        localStorage.setItem("professors", JSON.stringify(defaultProfessors));
    }
};
const seedStudents = ()=>{
    const existingStudents = localStorage.getItem("students");
    if (!existingStudents) {
        const defaultStudents = [
            {
                id: Date.now() + 3,
                name: "Aman Verma",
                department: "CSE",
                year: "3rd Year",
                email: "aman@student.com",
                password: "12345"
            },
            {
                id: Date.now() + 4,
                name: "Priya Singh",
                department: "ECE",
                year: "2nd Year",
                email: "priya@student.com",
                password: "pass123"
            }
        ];
        localStorage.setItem("students", JSON.stringify(defaultStudents));
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$seedData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/seedData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function RootLayout({ children }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RootLayout.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$seedData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["seedOpportunities"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$seedData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["seedProfessors"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$seedData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["seedStudents"])();
        }
    }["RootLayout.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            children: children
        }, void 0, false, {
            fileName: "[project]/app/layout.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(RootLayout, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = RootLayout;
var _c;
__turbopack_context__.k.register(_c, "RootLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_28d19df7._.js.map