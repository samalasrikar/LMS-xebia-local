import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import courseService from "../services/courseService";
import moduleService from "../services/moduleService";
import subModuleService from "../services/subModuleService";
import contentService from "../services/contentService";

export default function useCurriculumBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  /* ── Navigation state from Module Management ── */
  const navState = location.state ?? {};
  const { fromModuleManagement, preselectedModuleId, preselectedSubModuleId } = navState;

  /* ── Course & Curriculum ── */
  const [loadingCourse, setLoadingCourse] = useState(!!id);
  const [loadingCurriculum, setLoadingCurriculum] = useState(!!id);

  /* ── Multi-Course State ── */
  const [loadedCourses, setLoadedCourses] = useState([]);
  const [activeCourseId, setActiveCourseId] = useState(null);

  const course = loadedCourses.find(c => c.id === activeCourseId) || null;
  const modules = course?.modules || [];
  const [expandedCourses, setExpandedCourses] = useState({});
  const [targetCourseId, setTargetCourseId] = useState(null);

  /* ── UI State ── */
  const [expandedModules, setExpandedModules] = useState({});
  const [activeSubModule, setActiveSubModule] = useState(null);
  const [treeSearch, setTreeSearch] = useState("");
  const [showNavBanner, setShowNavBanner] = useState(!!fromModuleManagement);
  const [saveStatus, setSaveStatus] = useState("saved"); // "saved" | "saving" | "unsaved"
  const [activeRightTab, setActiveRightTab] = useState("submodule"); // "submodule" | "block"
  const [selectedBlockType, setSelectedBlockType] = useState(null);
  const [blockPickerOpen, setBlockPickerOpen] = useState(false);
  const [blockSearch, setBlockSearch] = useState("");
  const [blockConfigOpen, setBlockConfigOpen] = useState(false);
  const [blockConfigType, setBlockConfigType] = useState("video");


  /* ── Notification ── */
  const [toast, setToast] = useState(null);
  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  /* ── Module modal ── */
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [submittingModule, setSubmittingModule] = useState(false);

  /* ── SubModule dialog ── */
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingSubModule, setEditingSubModule] = useState(null);
  const [parentModuleId, setParentModuleId] = useState(null);
  const [subModuleTitle, setSubModuleTitle] = useState("");
  const [subModuleDescription, setSubModuleDescription] = useState("");
  const [contentType, setContentType] = useState("video");
  const [videoUrl, setVideoUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [textContent, setTextContent] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [submittingSubModule, setSubmittingSubModule] = useState(false);
  const [videoUrlError, setVideoUrlError] = useState("");
  const [showVideoPreview, setShowVideoPreview] = useState(false);

  const videoInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  /* ── Delete ── */
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ── Course Selector Dialog ── */
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [loadingAllCourses, setLoadingAllCourses] = useState(false);
  const [courseSearch, setCourseSearch] = useState("");
  const [courseDialogTab, setCourseDialogTab] = useState("select"); // "select" | "create"
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [newCourseCategory, setNewCourseCategory] = useState("");
  const [creatingCourse, setCreatingCourse] = useState(false);
  const [expandedSubModules, setExpandedSubModules] = useState({});

  const loadAllCourses = async () => {
    setLoadingAllCourses(true);
    try {
      const data = await courseService.getAllCourses();
      setAllCourses(data || []);
    } catch (err) {
      console.error(err);
      showToast("Could not load courses.", "error");
    } finally {
      setLoadingAllCourses(false);
    }
  };

  const openCourseDialog = (tab = "select") => {
    setCourseSearch("");
    setCourseDialogTab(tab);
    setNewCourseTitle("");
    setNewCourseDescription("");
    setNewCourseCategory("");
    setCourseDialogOpen(true);
    loadAllCourses();
  };

  const handleSelectCourse = async (selectedCourse) => {
    setCourseDialogOpen(false);

    // Prevent duplicate courses from being added
    const alreadyExists = loadedCourses.some(c => c.id === selectedCourse.id);
    if (alreadyExists) {
      // Focus and expand that course instead of adding it again
      setActiveCourseId(selectedCourse.id);
      setExpandedCourses(prev => ({ ...prev, [selectedCourse.id]: true }));
      
      const existingCourse = loadedCourses.find(c => c.id === selectedCourse.id);
      if (existingCourse && existingCourse.modules?.[0]?.subModules?.[0]) {
        setActiveSubModule(existingCourse.modules[0].subModules[0]);
      }
      showToast(`Switched to "${selectedCourse.title}"`);
      return;
    }

    setLoadingCurriculum(true);
    try {
      const [allModules, allSubModules, allContents] = await Promise.all([
        moduleService.getAllModules(),
        subModuleService.getAllSubModules(),
        contentService.getAllContents(),
      ]);

      const courseModules = await loadCurriculumForCourse(selectedCourse.id, allModules, allSubModules, allContents);
      const newCourseObj = {
        ...selectedCourse,
        modules: courseModules,
      };

      setLoadedCourses(prev => [...prev, newCourseObj]);
      setActiveCourseId(selectedCourse.id);
      setExpandedCourses(prev => ({ ...prev, [selectedCourse.id]: true }));

      const expandMap = {};
      courseModules.forEach(m => { expandMap[m.id] = true; });
      setExpandedModules(prev => ({ ...expandMap, ...prev }));

      if (courseModules[0]?.subModules?.[0]) {
        setActiveSubModule(courseModules[0].subModules[0]);
      }
      showToast(`Course "${selectedCourse.title}" loaded!`);
    } catch (err) {
      console.error(err);
      showToast("Failed to load selected course curriculum.", "error");
    } finally {
      setLoadingCurriculum(false);
    }
  };

  const handleCreateAndSelectCourse = async (e) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) { showToast("Course title is required.", "error"); return; }
    setCreatingCourse(true);
    try {
      const created = await courseService.createCourse({
        title: newCourseTitle.trim(),
        description: newCourseDescription.trim(),
        category: newCourseCategory.trim(),
        status: "Draft",
      });
      showToast("Course created!");
      setCourseDialogOpen(false);
      await handleSelectCourse(created);
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to create course.", "error");
    } finally {
      setCreatingCourse(false);
    }
  };

  const toggleSubModuleExpand = (subId) =>
    setExpandedSubModules(p => ({ ...p, [subId]: !p[subId] }));

  /* ── Load Modules for Course Helper ── */
  const loadCurriculumForCourse = async (courseId, allModules, allSubModules, allContents) => {
    const courseModules = allModules.filter(m => m.courseId === Number(courseId));
    return courseModules.map(mod => ({
      ...mod,
      subModules: allSubModules
        .filter(sm => sm.moduleId === mod.id)
        .map(sm => ({ ...sm, content: allContents.find(c => c.subModuleId === sm.id) })),
    }));
  };

  const reloadAllLoadedCourses = async (coursesListToReload = loadedCourses) => {
    setLoadingCurriculum(true);
    try {
      const [allModules, allSubModules, allContents] = await Promise.all([
        moduleService.getAllModules(),
        subModuleService.getAllSubModules(),
        contentService.getAllContents(),
      ]);

      const updatedCourses = await Promise.all(
        coursesListToReload.map(async (c) => {
          const courseData = await courseService.getCourseById(c.id);
          const modulesData = await loadCurriculumForCourse(c.id, allModules, allSubModules, allContents);
          return {
            ...courseData,
            modules: modulesData,
          };
        })
      );

      setLoadedCourses(updatedCourses);

      const expandMap = {};
      updatedCourses.forEach(c => {
        c.modules.forEach(m => {
          if (expandedModules[m.id] === undefined) {
            expandMap[m.id] = true;
          }
        });
      });
      setExpandedModules(prev => ({ ...expandMap, ...prev }));
    } catch (err) {
      console.error(err);
      showToast("Could not reload curriculum data.", "error");
    } finally {
      setLoadingCurriculum(false);
    }
  };

  /* ── Data Loading ── */
  useEffect(() => {
    if (id) {
      const initLoad = async () => {
        setLoadingCourse(true);
        setLoadingCurriculum(true);
        try {
          const courseData = await courseService.getCourseById(id);
          setActiveCourseId(Number(id));
          setExpandedCourses(prev => ({ ...prev, [Number(id)]: true }));

          const [allModules, allSubModules, allContents] = await Promise.all([
            moduleService.getAllModules(),
            subModuleService.getAllSubModules(),
            contentService.getAllContents(),
          ]);

          const courseModules = await loadCurriculumForCourse(id, allModules, allSubModules, allContents);

          const initialCourse = {
            ...courseData,
            modules: courseModules,
          };
          setLoadedCourses([initialCourse]);

          const expandMap = {};
          courseModules.forEach(m => { expandMap[m.id] = true; });
          setExpandedModules(prev => ({ ...expandMap, ...prev }));

          // Pre-selection logic
          if (preselectedSubModuleId) {
            const flat = courseModules.flatMap(m => m.subModules);
            const t = flat.find(s => s.id === preselectedSubModuleId);
            if (t) { setActiveSubModule(t); return; }
          }
          if (preselectedModuleId) {
            const tm = courseModules.find(m => m.id === preselectedModuleId);
            if (tm?.subModules?.[0]) { setActiveSubModule(tm.subModules[0]); return; }
          }
          if (courseModules[0]?.subModules?.[0]) {
            setActiveSubModule(courseModules[0].subModules[0]);
          }
        } catch (err) {
          console.error(err);
          showToast("Could not load initial course and curriculum.", "error");
        } finally {
          setLoadingCourse(false);
          setLoadingCurriculum(false);
        }
      };
      initLoad();
    } else {
      setLoadingCourse(false);
      setLoadingCurriculum(false);
    }
  }, [id, preselectedModuleId, preselectedSubModuleId, showToast]);



  /* ── Module Actions ── */
  const openAddModuleModal = (courseId) => {
    setTargetCourseId(courseId || activeCourseId);
    setEditingModule(null); setModuleTitle(""); setModuleDescription(""); setIsModuleModalOpen(true);
  };
  const openEditModuleModal = (mod) => {
    setEditingModule(mod); setModuleTitle(mod.title); setModuleDescription(mod.description || ""); setIsModuleModalOpen(true);
  };
  const handleSaveModule = async (e) => {
    e.preventDefault();
    if (!moduleTitle.trim()) { showToast("Module title is required.", "error"); return; }
    setSubmittingModule(true);
    try {
      if (editingModule) {
        await moduleService.updateModule(editingModule.id, {
          title: moduleTitle.trim(),
          description: moduleDescription.trim(),
          courseId: editingModule.courseId
        });
        showToast("Module updated!");
      } else {
        await moduleService.createModule({
          title: moduleTitle.trim(),
          description: moduleDescription.trim(),
          courseId: Number(targetCourseId || activeCourseId || id)
        });
        showToast("Module created!");
      }
      setIsModuleModalOpen(false);
      await reloadAllLoadedCourses();
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to save module.", "error");
    } finally { setSubmittingModule(false); }
  };

  /* ── SubModule Actions ── */
  const openAddSubModuleDrawer = (moduleId) => {
    setEditingSubModule(null);
    setParentModuleId(moduleId);
    setSubModuleTitle("");
    setSubModuleDescription("");
    setIsDrawerOpen(true);
  };

  const openEditSubModuleDrawer = (subMod) => {
    setEditingSubModule(subMod);
    setParentModuleId(subMod.moduleId);
    setSubModuleTitle(subMod.title);
    setSubModuleDescription(subMod.description || "");
    setIsDrawerOpen(true);
  };

  const handleSaveSubModule = async (e) => {
    if (e) e.preventDefault();
    if (!subModuleTitle.trim()) { showToast("Sub-module title is required.", "error"); return; }
    setSubmittingSubModule(true);
    setSaveStatus("saving");
    try {
      if (editingSubModule) {
        await subModuleService.updateSubModule(editingSubModule.id, {
          title: subModuleTitle.trim(),
          description: subModuleDescription.trim(),
          moduleId: parentModuleId
        });
        showToast("Sub-module updated!");
      } else {
        await subModuleService.createSubModule({
          title: subModuleTitle.trim(),
          description: subModuleDescription.trim(),
          moduleId: parentModuleId
        });
        showToast("Sub-module created!");
      }
      setIsDrawerOpen(false);
      await reloadAllLoadedCourses();
      setSaveStatus("saved");
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to save sub-module.", "error");
      setSaveStatus("unsaved");
    } finally { setSubmittingSubModule(false); }
  };

  /* ── Block Actions ── */
  const openEditBlockDialog = (subMod) => {
    setActiveSubModule(subMod);
    // Reset forms
    setVideoUrl("");
    setPdfUrl("");
    setTextContent("");
    setUploadedFileName("");
    setVideoUrlError("");
    setShowVideoPreview(false);

    if (subMod.content) {
      if (subMod.content.pdfUrl) {
        setBlockConfigType("pdf");
        setPdfUrl(subMod.content.pdfUrl);
        setUploadedFileName("document.pdf");
      } else if (subMod.content.videoUrl) {
        setBlockConfigType("video");
        setVideoUrl(subMod.content.videoUrl);
      } else {
        setBlockConfigType("text");
        setTextContent(subMod.content.content || "");
      }
      setBlockConfigOpen(true);
    } else {
      setBlockPickerOpen(true);
    }
  };

  const handleSelectBlockType = (type) => {
    setBlockPickerOpen(false);
    setBlockConfigType(type);
    // Reset forms
    setVideoUrl("");
    setPdfUrl("");
    setTextContent("");
    setUploadedFileName("");
    setVideoUrlError("");
    setShowVideoPreview(false);
    setBlockConfigOpen(true);
  };

  const handleSaveBlock = async (e) => {
    if (e) e.preventDefault();
    if (!activeSubModule) return;
    setSubmittingSubModule(true);
    setSaveStatus("saving");
    try {
      const tV = blockConfigType === "video" ? videoUrl.trim() : "";
      const tP = blockConfigType === "pdf" ? pdfUrl.trim() : "";
      const tT = blockConfigType === "text" ? textContent.trim() : `Content for ${activeSubModule.title}`;

      if (activeSubModule.content) {
        await contentService.updateContent(activeSubModule.content.id, {
          title: `${activeSubModule.title} Content`,
          content: tT,
          videoUrl: tV,
          pdfUrl: tP,
          subModuleId: activeSubModule.id
        });
        showToast("Block updated!");
      } else {
        await contentService.createContent({
          title: `${activeSubModule.title} Content`,
          content: tT,
          videoUrl: tV,
          pdfUrl: tP,
          subModuleId: activeSubModule.id
        });
        showToast("Block created!");
      }
      setBlockConfigOpen(false);
      await reloadAllLoadedCourses();
      setSaveStatus("saved");
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Failed to save block.", "error");
      setSaveStatus("unsaved");
    } finally { setSubmittingSubModule(false); }
  };


  const requestDelete = (type, target) => setDeleteTarget({ type, id: target.id, title: target.title });
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === "module") await moduleService.deleteModule(deleteTarget.id);
      else await subModuleService.deleteSubModule(deleteTarget.id);
      showToast(`${deleteTarget.type === "module" ? "Module" : "Block"} deleted.`);
      if (activeSubModule?.id === deleteTarget.id) setActiveSubModule(null);
      await reloadAllLoadedCourses();
    } catch (err) { console.error(err); showToast("Deletion failed.", "error"); }
    finally { setDeleteTarget(null); }
  };

  const handlePublishCourse = async () => {
    if (!course) return;
    setSaveStatus("saving");
    try {
      await courseService.updateCourse(course.id, { ...course, status: "Published" });
      showToast("Course published!");
      await reloadAllLoadedCourses();
      setSaveStatus("saved");
    } catch (err) {
      console.error(err);
      showToast("Failed to publish course.", "error");
      setSaveStatus("unsaved");
    }
  };

  const handleDuplicateCourse = async (c) => {
    try {
      showToast("Duplicating course...");
      const duplicatedCourse = await courseService.createCourse({
        title: `${c.title} (Copy)`,
        description: c.description || "",
        category: c.category || "",
        status: "Draft",
      });

      const [allModules, allSubModules, allContents] = await Promise.all([
        moduleService.getAllModules(),
        subModuleService.getAllSubModules(),
        contentService.getAllContents(),
      ]);

      const courseModules = allModules.filter(m => m.courseId === c.id);

      for (const mod of courseModules) {
        const duplicatedMod = await moduleService.createModule({
          courseId: duplicatedCourse.id,
          title: mod.title,
          description: mod.description || "",
        });

        const modSubModules = allSubModules.filter(sm => sm.moduleId === mod.id);
        for (const sub of modSubModules) {
          const duplicatedSub = await subModuleService.createSubModule({
            moduleId: duplicatedMod.id,
            title: sub.title,
            description: sub.description || "",
          });

          const subContent = allContents.find(cont => cont.subModuleId === sub.id);
          if (subContent) {
            await contentService.createContent({
              subModuleId: duplicatedSub.id,
              type: subContent.type,
              body: subContent.body || "",
              videoUrl: subContent.videoUrl || "",
              pdfUrl: subContent.pdfUrl || "",
            });
          }
        }
      }

      showToast("Course duplicated successfully!");
      await loadAllCourses();
      await handleSelectCourse(duplicatedCourse);
    } catch (err) {
      console.error(err);
      showToast("Failed to duplicate course.", "error");
    }
  };

  const handleDuplicateModule = async (mod) => {
    try {
      showToast("Duplicating module...");
      const duplicatedMod = await moduleService.createModule({
        courseId: mod.courseId,
        title: `${mod.title} (Copy)`,
        description: mod.description || "",
      });

      const [allSubModules, allContents] = await Promise.all([
        subModuleService.getAllSubModules(),
        contentService.getAllContents(),
      ]);

      const modSubModules = allSubModules.filter(sm => sm.moduleId === mod.id);
      for (const sub of modSubModules) {
        const duplicatedSub = await subModuleService.createSubModule({
          moduleId: duplicatedMod.id,
          title: sub.title,
          description: sub.description || "",
        });

        const subContent = allContents.find(cont => cont.subModuleId === sub.id);
        if (subContent) {
          await contentService.createContent({
            subModuleId: duplicatedSub.id,
            type: subContent.type,
            body: subContent.body || "",
            videoUrl: subContent.videoUrl || "",
            pdfUrl: subContent.pdfUrl || "",
          });
        }
      }

      showToast("Module duplicated successfully!");
      await reloadAllLoadedCourses();
    } catch (err) {
      console.error(err);
      showToast("Failed to duplicate module.", "error");
    }
  };

  const handleDuplicateSubModule = async (sub) => {
    try {
      showToast("Duplicating block...");
      const duplicatedSub = await subModuleService.createSubModule({
        moduleId: sub.moduleId,
        title: `${sub.title} (Copy)`,
        description: sub.description || "",
      });

      const allContents = await contentService.getAllContents();
      const subContent = allContents.find(cont => cont.subModuleId === sub.id);
      if (subContent) {
        await contentService.createContent({
          subModuleId: duplicatedSub.id,
          type: subContent.type,
          body: subContent.body || "",
          videoUrl: subContent.videoUrl || "",
          pdfUrl: subContent.pdfUrl || "",
        });
      }

      showToast("Block duplicated successfully!");
      await reloadAllLoadedCourses();
    } catch (err) {
      console.error(err);
      showToast("Failed to duplicate block.", "error");
    }
  };

  /* ── Video helpers ── */
  const handleVideoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setVideoUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handlePdfFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setPdfUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const validateUrlFormat = (url) => {
    if (!url.trim()) { setVideoUrlError(""); return false; }
    try { new URL(url); setVideoUrlError(""); return true; }
    catch { setVideoUrlError("Please enter a valid URL (e.g. https://...)"); return false; }
  };
  const handleVideoUrlChange = (val) => {
    setVideoUrl(val); setShowVideoPreview(false); validateUrlFormat(val);
  };

  return {
    id,
    navigate,
    fromModuleManagement,
    course,
    loadingCourse,
    modules,
    loadingCurriculum,
    expandedModules,
    setExpandedModules,
    activeSubModule,
    setActiveSubModule,
    treeSearch,
    setTreeSearch,
    showNavBanner,
    setShowNavBanner,
    saveStatus,
    setSaveStatus,
    activeRightTab,
    setActiveRightTab,
    selectedBlockType,
    setSelectedBlockType,
    blockPickerOpen,
    setBlockPickerOpen,
    blockSearch,
    setBlockSearch,
    toast,
    setToast,
    showToast,
    isModuleModalOpen,
    setIsModuleModalOpen,
    editingModule,
    moduleTitle,
    setModuleTitle,
    moduleDescription,
    setModuleDescription,
    submittingModule,
    isDrawerOpen,
    setIsDrawerOpen,
    editingSubModule,
    parentModuleId,
    subModuleTitle,
    setSubModuleTitle,
    subModuleDescription,
    setSubModuleDescription,
    contentType,
    setContentType,
    videoUrl,
    setVideoUrl,
    pdfUrl,
    setPdfUrl,
    textContent,
    setTextContent,
    uploadedFileName,
    setUploadedFileName,
    submittingSubModule,
    videoUrlError,
    setVideoUrlError,
    showVideoPreview,
    setShowVideoPreview,
    videoInputRef,
    pdfInputRef,
    deleteTarget,
    setDeleteTarget,
    courseDialogOpen,
    setCourseDialogOpen,
    allCourses,
    loadingAllCourses,
    courseSearch,
    setCourseSearch,
    courseDialogTab,
    setCourseDialogTab,
    newCourseTitle,
    setNewCourseTitle,
    newCourseDescription,
    setNewCourseDescription,
    newCourseCategory,
    setNewCourseCategory,
    creatingCourse,
    expandedSubModules,
    openCourseDialog,
    handleSelectCourse,
    handleCreateAndSelectCourse,
    toggleSubModuleExpand,
    loadCourseData: reloadAllLoadedCourses,
    loadCurriculumData: reloadAllLoadedCourses,
    openAddModuleModal,
    openEditModuleModal,
    handleSaveModule,
    openAddSubModuleDrawer,
    openEditSubModuleDrawer,
    handleSaveSubModule,
    // Block config states and handlers
    blockConfigOpen,
    setBlockConfigOpen,
    blockConfigType,
    setBlockConfigType,
    openEditBlockDialog,
    handleSelectBlockType,
    handleSaveBlock,
    requestDelete,
    confirmDelete,
    handlePublishCourse,
    handleVideoFileChange,
    handlePdfFileChange,
    handleVideoUrlChange,
    handleDuplicateCourse,
    handleDuplicateModule,
    handleDuplicateSubModule,
    // Multi course props
    loadedCourses,
    setLoadedCourses,
    activeCourseId,
    setActiveCourseId,
    expandedCourses,
    setExpandedCourses,
  };
}

