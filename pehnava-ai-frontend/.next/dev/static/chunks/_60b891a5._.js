(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/professor/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
/* --------------------
   Helpers
   -------------------- */ // Get current professor id from session storage token like "prof_123"
const getCurrentProfessorId = ()=>{
    try {
        const token = sessionStorage.getItem("professor_token");
        if (!token) return null;
        const parts = token.split("_");
        const id = Number(parts[1]);
        return Number.isFinite(id) ? id : null;
    } catch  {
        return null;
    }
};
// read opportunities from localStorage
const readOpportunitiesFromStorage = ()=>{
    try {
        const raw = localStorage.getItem("opportunities");
        if (!raw) return [];
        return JSON.parse(raw);
    } catch  {
        return [];
    }
};
// write opportunities to localStorage
const writeOpportunitiesToStorage = (arr)=>{
    localStorage.setItem("opportunities", JSON.stringify(arr));
};
// convert File -> Base64 (returns Promise<string>)
const fileToBase64 = (file)=>new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>{
            const result = reader.result;
            resolve(result.split(",")[1] ?? result); // return only base64 part if data URL
        };
        reader.onerror = (err)=>reject(err);
        reader.readAsDataURL(file);
    });
// create Blob URL and open new tab from base64 pdf
const openPdfBase64InNewTab = (base64, filename = "file.pdf")=>{
    try {
        // convert base64 to bytes
        const byteChars = atob(base64);
        const byteNumbers = new Array(byteChars.length);
        for(let i = 0; i < byteChars.length; i++){
            byteNumbers[i] = byteChars.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([
            byteArray
        ], {
            type: "application/pdf"
        });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank")?.focus();
        // revoke URL after short time (browser may keep it for next tab)
        setTimeout(()=>URL.revokeObjectURL(url), 10000);
    } catch (e) {
        console.error("Failed to open PDF", e);
    }
};
/* --------------------
   Seed data (runs only if opportunities missing)
   -------------------- */ const seedDemoOpportunities = ()=>{
    const existing = localStorage.getItem("opportunities");
    if (existing) return;
    const now = Date.now();
    const demo = [
        {
            id: now + 1,
            title: "Internship: Data Structures",
            description: "Practical data structures internship focusing on algorithms",
            professor: "Dr. A",
            professorId: 1,
            institute: "BITS Pilani",
            field: "Data Structures",
            type: "Internship",
            duration: "6 months",
            prerequisites: "C++, Algorithms",
            pdfBase64: "",
            pdfName: "",
            createdAt: now - 1000 * 60 * 60 * 24 * 3
        },
        {
            id: now + 2,
            title: "Research Assistant: Algorithms",
            description: "Work on algorithmic research and benchmarking",
            professor: "Dr. A",
            professorId: 1,
            institute: "BITS Pilani",
            field: "Algorithms",
            type: "RA",
            duration: "4 months",
            prerequisites: "C++, Competitive Programming",
            pdfBase64: "",
            pdfName: "",
            createdAt: now - 1000 * 60 * 60 * 24 * 2
        },
        {
            id: now + 3,
            title: "Internship: Machine Learning",
            description: "Hands-on ML project",
            professor: "Dr. Rohan Sharma",
            professorId: 2,
            institute: "IIT Delhi",
            field: "Machine Learning",
            type: "Internship",
            duration: "5 months",
            prerequisites: "Python, ML basics",
            pdfBase64: "",
            pdfName: "",
            createdAt: now - 1000 * 60 * 60 * 24
        }
    ];
    writeOpportunitiesToStorage(demo);
};
/* --------------------
   Component
   -------------------- */ function ProfessorDashboard() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // data state
    const [opportunities, setOpportunities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // UI state
    const [editModalOpen, setEditModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedOppId, setSelectedOppId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newPdfFile, setNewPdfFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // filters
    const [instituteFilter, setInstituteFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [sortRecentlyAdded, setSortRecentlyAdded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // alerts & toasts
    const [alert, setAlert] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: "",
        message: "",
        show: false
    });
    const showAlert = (type, message)=>{
        setAlert({
            type,
            message,
            show: true
        });
        setTimeout(()=>setAlert({
                type: "",
                message: "",
                show: false
            }), 3000);
    };
    // modal for success actions (reused)
    const [showSuccessModal, setShowSuccessModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [successModalMsg, setSuccessModalMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // current professor id
    const currentProfessorId = getCurrentProfessorId();
    /* --------------------
     Load & seed on mount
     -------------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProfessorDashboard.useEffect": ()=>{
            seedDemoOpportunities();
            fetchOpportunities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["ProfessorDashboard.useEffect"], []);
    // fetch from localStorage and apply professor filter
    const fetchOpportunities = ()=>{
        setLoading(true);
        const all = readOpportunitiesFromStorage();
        setOpportunities(all);
        setLoading(false);
    };
    /* --------------------
     Derived helpers
     -------------------- */ // list of institutes for filter options
    const instituteOptions = Array.from(new Set(readOpportunitiesFromStorage().map((o)=>o.institute || "").filter(Boolean)));
    // apply UI filters & sorting before rendering
    const displayedOpportunities = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "ProfessorDashboard.useMemo[displayedOpportunities]": ()=>{
            let list = [
                ...opportunities
            ];
            if (instituteFilter && instituteFilter !== "All") {
                list = list.filter({
                    "ProfessorDashboard.useMemo[displayedOpportunities]": (o)=>(o.institute || "").toLowerCase() === instituteFilter.toLowerCase()
                }["ProfessorDashboard.useMemo[displayedOpportunities]"]);
            }
            if (sortRecentlyAdded) {
                list.sort({
                    "ProfessorDashboard.useMemo[displayedOpportunities]": (a, b)=>b.createdAt - a.createdAt
                }["ProfessorDashboard.useMemo[displayedOpportunities]"]);
            }
            return list;
        }
    }["ProfessorDashboard.useMemo[displayedOpportunities]"], [
        opportunities,
        instituteFilter,
        sortRecentlyAdded
    ]);
    /* --------------------
     CRUD actions
     -------------------- */ // Delete opportunity (localStorage)
    const deleteOpportunity = (id)=>{
        if (!confirm("Are you sure you want to delete this opportunity?")) return;
        try {
            const all = readOpportunitiesFromStorage();
            const updated = all.filter((o)=>o.id !== id);
            writeOpportunitiesToStorage(updated);
            showAlert("success", "Opportunity deleted");
            fetchOpportunities();
        } catch (e) {
            console.error("Delete error:", e);
            showAlert("error", "Failed to delete opportunity");
        }
    };
    // Open edit modal
    const openEditModal = (id)=>{
        setSelectedOppId(id);
        setNewPdfFile(null);
        setEditModalOpen(true);
    };
    // Update PDF for selected opportunity
    const updatePdf = async ()=>{
        if (!selectedOppId) {
            showAlert("error", "No opportunity selected");
            return;
        }
        if (!newPdfFile) {
            showAlert("error", "Please pick a PDF file to upload");
            return;
        }
        // validate file type
        if (newPdfFile.type !== "application/pdf") {
            showAlert("error", "Only PDF files are allowed");
            return;
        }
        try {
            const base64 = await fileToBase64(newPdfFile);
            const all = readOpportunitiesFromStorage();
            const idx = all.findIndex((o)=>o.id === selectedOppId);
            if (idx === -1) {
                showAlert("error", "Opportunity not found");
                return;
            }
            all[idx].pdfBase64 = base64;
            all[idx].pdfName = newPdfFile.name;
            // update createdAt? keep original createdAt, but record lastUpdated could be added
            writeOpportunitiesToStorage(all);
            showAlert("success", "PDF updated successfully");
            setEditModalOpen(false);
            fetchOpportunities();
        } catch (e) {
            console.error("PDF update error:", e);
            showAlert("error", "Failed to update PDF");
        }
    };
    // View PDF
    const viewPdf = (o)=>{
        // 1️⃣ If static PDF URL exists — open it
        if (o.pdfUrl) {
            window.open(o.pdfUrl, "_blank");
            return;
        }
        // 2️⃣ Else if Base64 exists — decode and open
        if (o.pdfBase64) {
            openPdfBase64InNewTab(o.pdfBase64, o.pdfName || "opportunity.pdf");
            return;
        }
        // 3️⃣ Nothing available
        showAlert("warning", "No PDF available for this opportunity");
    };
    /* --------------------
     UI
     -------------------- */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-md flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-bold",
                        children: "ProfConnect"
                    }, void 0, false, {
                        fileName: "[project]/app/professor/dashboard/page.tsx",
                        lineNumber: 345,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>window.location.href = "/",
                                className: "bg-white text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition",
                                children: "Home"
                            }, void 0, false, {
                                fileName: "[project]/app/professor/dashboard/page.tsx",
                                lineNumber: 348,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    sessionStorage.removeItem("professor_token");
                                    window.location.href = "/";
                                },
                                className: "bg-white text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition",
                                children: "Logout"
                            }, void 0, false, {
                                fileName: "[project]/app/professor/dashboard/page.tsx",
                                lineNumber: 355,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/professor/dashboard/page.tsx",
                        lineNumber: 347,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/professor/dashboard/page.tsx",
                lineNumber: 344,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 shadow-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold",
                    children: "Professor Dashboard"
                }, void 0, false, {
                    fileName: "[project]/app/professor/dashboard/page.tsx",
                    lineNumber: 369,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/professor/dashboard/page.tsx",
                lineNumber: 368,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "p-6 flex flex-col md:flex-row md:items-center md:gap-4 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/professor/post-opportunity",
                        className: "bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition inline-block",
                        children: "Post New Opportunity"
                    }, void 0, false, {
                        fileName: "[project]/app/professor/dashboard/page.tsx",
                        lineNumber: 374,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "font-medium text-gray-700",
                                children: "Institute:"
                            }, void 0, false, {
                                fileName: "[project]/app/professor/dashboard/page.tsx",
                                lineNumber: 382,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: instituteFilter,
                                onChange: (e)=>setInstituteFilter(e.target.value),
                                className: "border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "All",
                                        children: "All"
                                    }, void 0, false, {
                                        fileName: "[project]/app/professor/dashboard/page.tsx",
                                        lineNumber: 388,
                                        columnNumber: 13
                                    }, this),
                                    instituteOptions.map((inst)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: inst,
                                            children: inst
                                        }, inst, false, {
                                            fileName: "[project]/app/professor/dashboard/page.tsx",
                                            lineNumber: 390,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/professor/dashboard/page.tsx",
                                lineNumber: 383,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 ml-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: sortRecentlyAdded,
                                        onChange: (e)=>setSortRecentlyAdded(e.target.checked),
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/professor/dashboard/page.tsx",
                                        lineNumber: 397,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-700",
                                        children: "Recently Added"
                                    }, void 0, false, {
                                        fileName: "[project]/app/professor/dashboard/page.tsx",
                                        lineNumber: 403,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/professor/dashboard/page.tsx",
                                lineNumber: 396,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/professor/dashboard/page.tsx",
                        lineNumber: 381,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/professor/dashboard/page.tsx",
                lineNumber: 373,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
                children: [
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/app/professor/dashboard/page.tsx",
                        lineNumber: 410,
                        columnNumber: 21
                    }, this),
                    !loading && displayedOpportunities.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-full bg-white p-6 rounded-2xl shadow text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: "No opportunities found."
                        }, void 0, false, {
                            fileName: "[project]/app/professor/dashboard/page.tsx",
                            lineNumber: 414,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/professor/dashboard/page.tsx",
                        lineNumber: 413,
                        columnNumber: 11
                    }, this),
                    !loading && displayedOpportunities.map((opp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "opportunity-card bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-indigo-700 mb-2",
                                    children: opp.title
                                }, void 0, false, {
                                    fileName: "[project]/app/professor/dashboard/page.tsx",
                                    lineNumber: 424,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Professor:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/professor/dashboard/page.tsx",
                                            lineNumber: 429,
                                            columnNumber: 17
                                        }, this),
                                        " ",
                                        opp.professor || "—"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/professor/dashboard/page.tsx",
                                    lineNumber: 428,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Institute:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/professor/dashboard/page.tsx",
                                            lineNumber: 433,
                                            columnNumber: 17
                                        }, this),
                                        " ",
                                        opp.institute || "—"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/professor/dashboard/page.tsx",
                                    lineNumber: 432,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Field:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/professor/dashboard/page.tsx",
                                            lineNumber: 437,
                                            columnNumber: 17
                                        }, this),
                                        " ",
                                        opp.field || "—"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/professor/dashboard/page.tsx",
                                    lineNumber: 436,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Type:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/professor/dashboard/page.tsx",
                                            lineNumber: 441,
                                            columnNumber: 17
                                        }, this),
                                        " ",
                                        opp.type || "—"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/professor/dashboard/page.tsx",
                                    lineNumber: 440,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Duration:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/professor/dashboard/page.tsx",
                                            lineNumber: 445,
                                            columnNumber: 17
                                        }, this),
                                        " ",
                                        opp.duration || "—"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/professor/dashboard/page.tsx",
                                    lineNumber: 444,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Pre-requisites:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/professor/dashboard/page.tsx",
                                            lineNumber: 449,
                                            columnNumber: 17
                                        }, this),
                                        " ",
                                        opp.prerequisites || "—"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/professor/dashboard/page.tsx",
                                    lineNumber: 448,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 mt-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>viewPdf(opp),
                                            className: "text-blue-600 hover:underline text-sm",
                                            children: "View PDF Details"
                                        }, void 0, false, {
                                            fileName: "[project]/app/professor/dashboard/page.tsx",
                                            lineNumber: 453,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "edit-btn bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-4 py-2 transition",
                                            onClick: ()=>openEditModal(opp.id),
                                            children: "Edit PDF"
                                        }, void 0, false, {
                                            fileName: "[project]/app/professor/dashboard/page.tsx",
                                            lineNumber: 460,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "delete-btn bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 transition",
                                            onClick: ()=>deleteOpportunity(opp.id),
                                            children: "Delete"
                                        }, void 0, false, {
                                            fileName: "[project]/app/professor/dashboard/page.tsx",
                                            lineNumber: 467,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/professor/dashboard/page.tsx",
                                    lineNumber: 452,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, opp.id, true, {
                            fileName: "[project]/app/professor/dashboard/page.tsx",
                            lineNumber: 420,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/professor/dashboard/page.tsx",
                lineNumber: 409,
                columnNumber: 7
            }, this),
            editModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold mb-3",
                            children: "Replace PDF"
                        }, void 0, false, {
                            fileName: "[project]/app/professor/dashboard/page.tsx",
                            lineNumber: 482,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 mb-4",
                            children: "Choose a new PDF to replace the current one."
                        }, void 0, false, {
                            fileName: "[project]/app/professor/dashboard/page.tsx",
                            lineNumber: 484,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "file",
                            accept: "application/pdf",
                            onChange: (e)=>setNewPdfFile(e.target.files?.[0] || null),
                            className: "w-full border rounded-lg px-3 py-2 mb-4"
                        }, void 0, false, {
                            fileName: "[project]/app/professor/dashboard/page.tsx",
                            lineNumber: 488,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setEditModalOpen(false);
                                        setSelectedOppId(null);
                                    },
                                    className: "px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/professor/dashboard/page.tsx",
                                    lineNumber: 496,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: updatePdf,
                                    className: "px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700",
                                    children: "Save"
                                }, void 0, false, {
                                    fileName: "[project]/app/professor/dashboard/page.tsx",
                                    lineNumber: 506,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/professor/dashboard/page.tsx",
                            lineNumber: 495,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/professor/dashboard/page.tsx",
                    lineNumber: 481,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/professor/dashboard/page.tsx",
                lineNumber: 480,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-6 left-1/2 transform -translate-x-1/2 w-full max-w-lg z-50 pointer-events-none",
                children: alert.show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `mx-auto pointer-events-auto p-3 rounded-lg flex items-center gap-2 text-white shadow-md
              ${alert.type === "success" ? "bg-green-600" : alert.type === "error" ? "bg-red-600" : "bg-yellow-500"}
            `,
                    children: [
                        alert.type === "success" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xl",
                            children: "✔️"
                        }, void 0, false, {
                            fileName: "[project]/app/professor/dashboard/page.tsx",
                            lineNumber: 531,
                            columnNumber: 42
                        }, this),
                        alert.type === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xl",
                            children: "❌"
                        }, void 0, false, {
                            fileName: "[project]/app/professor/dashboard/page.tsx",
                            lineNumber: 532,
                            columnNumber: 40
                        }, this),
                        alert.type === "warning" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xl",
                            children: "⚠️"
                        }, void 0, false, {
                            fileName: "[project]/app/professor/dashboard/page.tsx",
                            lineNumber: 533,
                            columnNumber: 42
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-medium",
                            children: alert.message
                        }, void 0, false, {
                            fileName: "[project]/app/professor/dashboard/page.tsx",
                            lineNumber: 534,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/professor/dashboard/page.tsx",
                    lineNumber: 520,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/professor/dashboard/page.tsx",
                lineNumber: 518,
                columnNumber: 7
            }, this),
            showSuccessModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30 z-60",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl p-6 w-[90%] max-w-md text-center shadow-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-green-600 text-4xl",
                                children: "✔"
                            }, void 0, false, {
                                fileName: "[project]/app/professor/dashboard/page.tsx",
                                lineNumber: 544,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/professor/dashboard/page.tsx",
                            lineNumber: 543,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-semibold mb-2",
                            children: "Success"
                        }, void 0, false, {
                            fileName: "[project]/app/professor/dashboard/page.tsx",
                            lineNumber: 546,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 mb-4",
                            children: successModalMsg || "Done"
                        }, void 0, false, {
                            fileName: "[project]/app/professor/dashboard/page.tsx",
                            lineNumber: 547,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowSuccessModal(false),
                                className: "px-4 py-2 bg-green-600 text-white rounded-lg",
                                children: "OK"
                            }, void 0, false, {
                                fileName: "[project]/app/professor/dashboard/page.tsx",
                                lineNumber: 549,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/professor/dashboard/page.tsx",
                            lineNumber: 548,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/professor/dashboard/page.tsx",
                    lineNumber: 542,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/professor/dashboard/page.tsx",
                lineNumber: 541,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/professor/dashboard/page.tsx",
        lineNumber: 342,
        columnNumber: 5
    }, this);
}
_s(ProfessorDashboard, "DOTEQcGzhqmPp3JVL2hqWtXqwZY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ProfessorDashboard;
var _c;
__turbopack_context__.k.register(_c, "ProfessorDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_60b891a5._.js.map