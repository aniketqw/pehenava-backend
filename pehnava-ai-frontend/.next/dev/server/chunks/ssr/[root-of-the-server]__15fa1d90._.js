module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/utils/seedData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/app/layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$seedData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/seedData.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function RootLayout({ children }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$seedData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["seedOpportunities"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$seedData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["seedProfessors"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$seedData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["seedStudents"])();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
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
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__15fa1d90._.js.map