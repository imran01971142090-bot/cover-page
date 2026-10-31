/**
 * CoverCraft – Assignment Cover Page Generator
 * Pure Vanilla JavaScript Client-Side Application
 * Compatible with GitHub Pages & Modern Web Browsers
 */

(function () {
  'use strict';

  // --- 1. DOM Elements Mapping ---
  const form = document.getElementById('coverCraftForm');
  const previewPage = document.getElementById('cover-page-preview');
  const paperWrapper = document.getElementById('paperWrapper');
  const previewViewport = document.getElementById('previewViewport');
  
  // Action Buttons
  const btnDownloadPdf = document.getElementById('btnDownloadPdf');
  const btnDownloadPdfHeader = document.getElementById('btnDownloadPdfHeader');
  const btnPrintCover = document.getElementById('btnPrintCover');
  const btnLoadSample = document.getElementById('btnLoadSample');
  const btnResetForm = document.getElementById('btnResetForm');
  const btnClearStorage = document.getElementById('btnClearStorage');
  const btnQuickToday = document.getElementById('btnQuickToday');
  const btnCopyText = document.getElementById('btnCopyText');

  // Zoom Controls
  const btnZoomIn = document.getElementById('btnZoomIn');
  const btnZoomOut = document.getElementById('btnZoomOut');
  const btnZoomFit = document.getElementById('btnZoomFit');
  const btnZoomReset = document.getElementById('btnZoomReset');
  const zoomLevelDisplay = document.getElementById('zoomLevelDisplay');

  // Logo Elements
  const logoInput = document.getElementById('logoFileInput');
  const logoDropZone = document.getElementById('logoDropZone');
  const logoPreviewCard = document.getElementById('logoPreviewCard');
  const logoThumbImg = document.getElementById('logoThumbImg');
  const logoFileName = document.getElementById('logoFileName');
  const logoFileSize = document.getElementById('logoFileSize');
  const btnRemoveLogo = document.getElementById('btnRemoveLogo');
  const btnReplaceLogo = document.getElementById('btnReplaceLogo');

  // Preview Dynamic Target Elements
  const previewLogoContainer = document.getElementById('previewLogoContainer');
  const previewLogo = document.getElementById('previewLogo');
  const previewInstName = document.getElementById('previewInstName');
  const previewInstAddr = document.getElementById('previewInstAddr');
  const previewExecInstName = document.getElementById('previewExecInstName');
  const previewExecInstAddr = document.getElementById('previewExecInstAddr');
  const previewAssignNumber = document.getElementById('previewAssignNumber');
  const previewAssignTitle = document.getElementById('previewAssignTitle');
  const previewAssignTopic = document.getElementById('previewAssignTopic');
  const previewCourseName = document.getElementById('previewCourseName');
  const previewCourseCode = document.getElementById('previewCourseCode');
  const previewStudentName = document.getElementById('previewStudentName');
  const previewStudentId = document.getElementById('previewStudentId');
  const previewRegRow = document.getElementById('previewRegRow');
  const previewRegNumber = document.getElementById('previewRegNumber');
  const previewStudentDept = document.getElementById('previewStudentDept');
  const previewDegree = document.getElementById('previewDegree');
  const previewSemester = document.getElementById('previewSemester');
  const previewSession = document.getElementById('previewSession');
  const previewTeacherName = document.getElementById('previewTeacherName');
  const previewTeacherDesignation = document.getElementById('previewTeacherDesignation');
  const previewTeacherDept = document.getElementById('previewTeacherDept');
  const previewSubmitDate = document.getElementById('previewSubmitDate');
  const previewWatermark = document.getElementById('previewWatermark');

  // Modals & Overlays
  const loadingOverlay = document.getElementById('loadingOverlay');
  const resetModal = document.getElementById('resetModal');
  const btnConfirmReset = document.getElementById('btnConfirmReset');
  const btnCancelReset = document.getElementById('btnCancelReset');
  const toastContainer = document.getElementById('toastContainer');
  const autoSaveStatus = document.getElementById('autoSaveStatus');

  // --- 2. Application State ---
  let currentLogoDataUrl = null;
  let currentZoom = 0.85; // Initial comfortable desktop zoom
  let saveDebounceTimer = null;

  // Sample Academic Data
  const sampleData = {
    institutionName: 'Stanford University of Science & Technology',
    institutionAddress: 'School of Engineering, Stanford, CA 94305',
    assignmentTitle: 'Design and Empirical Analysis of Distributed Microservice Architecture',
    assignmentTopic: 'Fault-tolerant Consensus Protocols, Scalability Benchmarks, and Latency Optimization in High-Throughput Cloud Networks',
    courseName: 'Advanced Distributed Software Systems',
    courseCode: 'CS-448B',
    assignmentNumber: 'Assignment #04',
    submissionDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    studentName: 'Alexander J. Hayes',
    studentId: 'ST-2023-8849',
    regNumber: 'REG-9912048',
    department: 'Department of Computer Science & Engineering',
    degree: 'Bachelor of Science (B.Sc.) in Computer Engineering',
    semester: '7th Semester / Senior Year',
    academicSession: '2025 – 2026',
    teacherName: 'Dr. Marcus Vance, Ph.D.',
    teacherDesignation: 'Associate Professor & Principal Investigator',
    teacherDepartment: 'Department of Computer Science & Engineering',
    template: 'classic',
    accentColor: '#1e3a8a',
    fontStyle: 'sans',
    borderStyle: 'double',
    watermarkText: ''
  };

  // --- 3. Notification & Toast Helper ---
  function showToast(message, type = 'success', duration = 3500) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="toast-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="toast-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    } else {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="toast-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `${iconSvg}<span>${escapeHtml(message)}</span>`;
    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, duration);
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // --- 4. Live Preview Update Engine ---
  function updateLivePreview() {
    const formData = getFormData();

    // 1. Institution
    const instName = formData.institutionName.trim() || 'University or College Name';
    const instAddr = formData.institutionAddress.trim();
    previewInstName.textContent = instName;
    previewExecInstName.textContent = instName;

    if (instAddr) {
      previewInstAddr.textContent = instAddr;
      previewInstAddr.style.display = 'block';
      previewExecInstAddr.textContent = instAddr;
      previewExecInstAddr.style.display = 'block';
    } else {
      previewInstAddr.style.display = 'none';
      previewExecInstAddr.style.display = 'none';
    }

    // 2. Assignment Info
    if (formData.assignmentNumber.trim()) {
      previewAssignNumber.textContent = formData.assignmentNumber.trim();
      previewAssignNumber.style.display = 'inline-block';
    } else {
      previewAssignNumber.style.display = 'none';
    }

    previewAssignTitle.textContent = formData.assignmentTitle.trim() || 'Assignment Title Goes Here';

    if (formData.assignmentTopic.trim()) {
      previewAssignTopic.textContent = formData.assignmentTopic.trim();
      previewAssignTopic.style.display = 'block';
    } else {
      previewAssignTopic.style.display = 'none';
    }

    previewCourseName.textContent = formData.courseName.trim() || 'Course Name';
    previewCourseCode.textContent = formData.courseCode.trim() ? `Course Code: ${formData.courseCode.trim()}` : '';

    // 3. Student Info
    previewStudentName.textContent = formData.studentName.trim() || 'Student Full Name';
    previewStudentId.textContent = formData.studentId.trim() || '—';

    if (formData.regNumber.trim()) {
      previewRegNumber.textContent = formData.regNumber.trim();
      previewRegRow.style.display = 'flex';
    } else {
      previewRegRow.style.display = 'none';
    }

    previewStudentDept.textContent = formData.department.trim() || 'Department Name';
    previewDegree.textContent = formData.degree.trim() || 'Degree / Program';
    previewSemester.textContent = formData.semester.trim() || 'Semester / Year';
    previewSession.textContent = formData.academicSession.trim() || 'Session';

    // 4. Instructor Info
    previewTeacherName.textContent = formData.teacherName.trim() || 'Teacher Name';
    previewTeacherDesignation.textContent = formData.teacherDesignation.trim() || 'Designation';
    previewTeacherDept.textContent = formData.teacherDepartment.trim() || 'Department Name';

    // 5. Date & Session
    previewSubmitDate.textContent = formData.submissionDate.trim() || new Date().toLocaleDateString();

    // 6. Logo Handling
    if (currentLogoDataUrl) {
      previewLogo.src = currentLogoDataUrl;
      previewLogoContainer.style.display = 'flex';
    } else {
      previewLogo.removeAttribute('src');
      previewLogoContainer.style.display = 'none';
    }

    // 7. Template Class
    previewPage.classList.remove('template-classic', 'template-modern', 'template-boxed', 'template-executive');
    previewPage.classList.add(`template-${formData.template}`);

    // 8. Border Style
    previewPage.classList.remove('border-style-double', 'border-style-single', 'border-style-none');
    previewPage.classList.add(`border-style-${formData.borderStyle}`);

    // 9. Font Style
    previewPage.style.setProperty('--academic-font', formData.fontStyle === 'serif' ? 'var(--font-serif)' : 'var(--font-sans)');

    // 10. Accent Color
    previewPage.style.setProperty('--academic-accent', formData.accentColor);

    // 11. Watermark
    if (formData.watermarkText.trim()) {
      previewWatermark.textContent = formData.watermarkText.trim();
      previewWatermark.style.display = 'block';
    } else {
      previewWatermark.style.display = 'none';
    }

    triggerAutoSave();
  }

  // --- 5. Form Data Extraction & Populating ---
  function getFormData() {
    const getValue = (id) => (document.getElementById(id) ? document.getElementById(id).value : '');
    
    // Get active template
    const activeTemplateCard = document.querySelector('.template-card.active');
    const template = activeTemplateCard ? activeTemplateCard.dataset.template : 'classic';

    // Get active color
    const activeColorSwatch = document.querySelector('.color-swatch.active');
    const accentColor = activeColorSwatch ? activeColorSwatch.dataset.color : '#1e3a8a';

    // Get active font
    const activeFontBtn = document.querySelector('#fontSegments .segment-btn.active');
    const fontStyle = activeFontBtn ? activeFontBtn.dataset.font : 'sans';

    // Get border style
    const borderStyleSelect = document.getElementById('borderStyleSelect');
    const borderStyle = borderStyleSelect ? borderStyleSelect.value : 'double';

    return {
      institutionName: getValue('institutionName'),
      institutionAddress: getValue('institutionAddress'),
      assignmentTitle: getValue('assignmentTitle'),
      assignmentTopic: getValue('assignmentTopic'),
      courseName: getValue('courseName'),
      courseCode: getValue('courseCode'),
      assignmentNumber: getValue('assignmentNumber'),
      submissionDate: getValue('submissionDate'),
      studentName: getValue('studentName'),
      studentId: getValue('studentId'),
      regNumber: getValue('regNumber'),
      department: getValue('department'),
      degree: getValue('degree'),
      semester: getValue('semester'),
      academicSession: getValue('academicSession'),
      teacherName: getValue('teacherName'),
      teacherDesignation: getValue('teacherDesignation'),
      teacherDepartment: getValue('teacherDepartment'),
      watermarkText: getValue('watermarkText'),
      template,
      accentColor,
      fontStyle,
      borderStyle
    };
  }

  function setFormData(data) {
    if (!data) return;
    const setValue = (id, val) => {
      const el = document.getElementById(id);
      if (el && val !== undefined) el.value = val;
    };

    setValue('institutionName', data.institutionName);
    setValue('institutionAddress', data.institutionAddress);
    setValue('assignmentTitle', data.assignmentTitle);
    setValue('assignmentTopic', data.assignmentTopic);
    setValue('courseName', data.courseName);
    setValue('courseCode', data.courseCode);
    setValue('assignmentNumber', data.assignmentNumber);
    setValue('submissionDate', data.submissionDate);
    setValue('studentName', data.studentName);
    setValue('studentId', data.studentId);
    setValue('regNumber', data.regNumber);
    setValue('department', data.department);
    setValue('degree', data.degree);
    setValue('semester', data.semester);
    setValue('academicSession', data.academicSession);
    setValue('teacherName', data.teacherName);
    setValue('teacherDesignation', data.teacherDesignation);
    setValue('teacherDepartment', data.teacherDepartment);
    setValue('watermarkText', data.watermarkText || '');

    // Set template
    if (data.template) {
      document.querySelectorAll('.template-card').forEach(c => {
        c.classList.toggle('active', c.dataset.template === data.template);
      });
    }

    // Set accent color
    if (data.accentColor) {
      document.querySelectorAll('.color-swatch').forEach(s => {
        s.classList.toggle('active', s.dataset.color === data.accentColor);
      });
    }

    // Set font style
    if (data.fontStyle) {
      document.querySelectorAll('#fontSegments .segment-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.font === data.fontStyle);
      });
    }

    // Set border style
    if (data.borderStyle) {
      const sel = document.getElementById('borderStyleSelect');
      if (sel) sel.value = data.borderStyle;
    }
  }

  // --- 6. Logo File Handling ---
  function handleLogoFile(file) {
    if (!file) return;

    // Validate image format
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      showToast('Please upload a valid image (PNG, JPG, JPEG, WEBP, or SVG).', 'error');
      return;
    }

    // Check size limit (max 5MB for browser safety)
    if (file.size > 5 * 1024 * 1024) {
      showToast('Logo file size must be less than 5 MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const dataUrl = e.target.result;
      setLogoData(dataUrl, file.name, (file.size / 1024).toFixed(1) + ' KB');
      showToast('University logo uploaded successfully.', 'success');
      updateLivePreview();
    };
    reader.onerror = function () {
      showToast('Failed to read the selected image file.', 'error');
    };
    reader.readAsDataURL(file);
  }

  function setLogoData(dataUrl, fileName = 'University Logo', fileSize = '') {
    currentLogoDataUrl = dataUrl;
    if (dataUrl) {
      logoThumbImg.src = dataUrl;
      logoFileName.textContent = fileName;
      logoFileSize.textContent = fileSize ? `${fileSize} · High Resolution` : 'Active';
      logoPreviewCard.classList.add('has-logo');
      logoDropZone.style.display = 'none';
      try {
        localStorage.setItem('covercraft_logo', dataUrl);
        localStorage.setItem('covercraft_logo_meta', JSON.stringify({ name: fileName, size: fileSize }));
      } catch (err) {
        console.warn('Could not store full logo data in localStorage:', err);
      }
    } else {
      currentLogoDataUrl = null;
      logoThumbImg.removeAttribute('src');
      logoPreviewCard.classList.remove('has-logo');
      logoDropZone.style.display = 'block';
      localStorage.removeItem('covercraft_logo');
      localStorage.removeItem('covercraft_logo_meta');
    }
  }

  function removeLogo() {
    setLogoData(null);
    if (logoInput) logoInput.value = '';
    showToast('University logo removed.', 'info');
    updateLivePreview();
  }

  // --- 7. LocalStorage Persistence ---
  function triggerAutoSave() {
    if (autoSaveStatus) {
      autoSaveStatus.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <span>Saving...</span>
      `;
    }

    clearTimeout(saveDebounceTimer);
    saveDebounceTimer = setTimeout(() => {
      try {
        const data = getFormData();
        localStorage.setItem('covercraft_data', JSON.stringify(data));
        if (autoSaveStatus) {
          autoSaveStatus.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Saved to browser</span>
          `;
        }
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }
    }, 400);
  }

  function restoreSavedData() {
    try {
      const saved = localStorage.getItem('covercraft_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      } else {
        // Initialize with default professional values
        setFormData(sampleData);
      }

      // Restore Logo
      const savedLogo = localStorage.getItem('covercraft_logo');
      if (savedLogo) {
        let meta = { name: 'Uploaded Logo', size: '' };
        try {
          meta = JSON.parse(localStorage.getItem('covercraft_logo_meta') || '{}');
        } catch (_) {}
        setLogoData(savedLogo, meta.name || 'Uploaded Logo', meta.size || '');
      }
    } catch (e) {
      console.error('Error restoring localStorage data:', e);
      setFormData(sampleData);
    }
  }

  function clearAllSavedData() {
    localStorage.removeItem('covercraft_data');
    localStorage.removeItem('covercraft_logo');
    localStorage.removeItem('covercraft_logo_meta');
    showToast('All browser saved information cleared.', 'info');
  }

  // --- 8. Zoom & Viewport Scaling ---
  function setZoom(scale) {
    currentZoom = Math.min(Math.max(scale, 0.4), 1.5);
    if (paperWrapper) {
      paperWrapper.style.transform = `scale(${currentZoom})`;
    }
    if (zoomLevelDisplay) {
      zoomLevelDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
    }
  }

  function autoFitZoom() {
    if (!previewViewport) return;
    const viewportWidth = previewViewport.clientWidth - 48; // padding margin
    const pageTargetWidth = 794; // base A4 pixel width
    const calculated = viewportWidth / pageTargetWidth;
    setZoom(Math.min(Math.max(calculated, 0.45), 1.0));
  }

  // --- 9. PDF Generation with html2pdf.js ---
  async function downloadCoverPagePdf() {
    // 1. Validate Essential Fields
    const formData = getFormData();
    const required = [
      { id: 'studentName', label: 'Student Name' },
      { id: 'assignmentTitle', label: 'Assignment Title' },
      { id: 'courseName', label: 'Course Name' },
      { id: 'institutionName', label: 'Institution Name' }
    ];

    let hasError = false;
    for (const req of required) {
      const el = document.getElementById(req.id);
      if (!formData[req.id] || !formData[req.id].trim()) {
        if (el) el.classList.add('is-invalid');
        hasError = true;
      } else {
        if (el) el.classList.remove('is-invalid');
      }
    }

    if (hasError) {
      showToast('Please fill in required fields (highlighted in red) before downloading.', 'error', 4500);
      const firstInvalid = document.querySelector('.form-input.is-invalid, .form-textarea.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // 2. Check html2pdf library availability
    if (typeof window.html2pdf === 'undefined') {
      showToast('PDF library is loading. Please check your internet connection or use "Print" to save as PDF.', 'error');
      return;
    }

    // 3. Show loading spinner modal
    if (loadingOverlay) loadingOverlay.classList.add('is-active');

    // 4. Clean Filename
    const safeStudent = (formData.studentName || 'Student').trim().replace(/[^a-zA-Z0-9_\-]/g, '_');
    const safeTitle = (formData.assignmentTitle || 'Assignment').trim().replace(/[^a-zA-Z0-9_\-]/g, '_').substring(0, 30);
    const filename = `${safeStudent}_${safeTitle}_CoverPage.pdf`;

    // 5. PDF Generation Configuration (High Quality A4 Portrait, Zero Margin)
    const opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    };

    try {
      // Temporarily ensure transform doesn't interfere with capture
      const currentTransform = paperWrapper.style.transform;
      paperWrapper.style.transform = 'scale(1)';

      await window.html2pdf().set(opt).from(previewPage).save();

      // Restore zoom transform
      paperWrapper.style.transform = currentTransform;

      if (loadingOverlay) loadingOverlay.classList.remove('is-active');
      showToast(`Success! Downloaded: ${filename}`, 'success', 5000);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      if (loadingOverlay) loadingOverlay.classList.remove('is-active');
      showToast('Could not generate PDF via canvas. Opening browser print dialog as fallback...', 'info', 4000);
      setTimeout(() => window.print(), 500);
    }
  }

  // --- 10. Copy Cover Information as Plain Text ---
  function copyCoverText() {
    const d = getFormData();
    const text = [
      `=========================================================`,
      `INSTITUTION: ${d.institutionName}`,
      d.institutionAddress ? `ADDRESS: ${d.institutionAddress}` : null,
      `=========================================================`,
      d.assignmentNumber ? `[ ${d.assignmentNumber} ]` : null,
      `TITLE: ${d.assignmentTitle}`,
      d.assignmentTopic ? `TOPIC: ${d.assignmentTopic}` : null,
      `COURSE: ${d.courseName} (${d.courseCode})`,
      `---------------------------------------------------------`,
      `SUBMITTED BY:`,
      `Name: ${d.studentName}`,
      `Student ID: ${d.studentId}`,
      d.regNumber ? `Registration No: ${d.regNumber}` : null,
      `Department: ${d.department}`,
      `Program/Degree: ${d.degree}`,
      `Semester: ${d.semester}`,
      `Academic Session: ${d.academicSession}`,
      `---------------------------------------------------------`,
      `SUBMITTED TO:`,
      `Teacher: ${d.teacherName}`,
      `Designation: ${d.teacherDesignation}`,
      `Department: ${d.teacherDepartment}`,
      `---------------------------------------------------------`,
      `SUBMISSION DATE: ${d.submissionDate}`,
      `=========================================================`
    ].filter(Boolean).join('\n');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Assignment cover text copied to clipboard!', 'success');
      }).catch(() => {
        showToast('Unable to copy to clipboard.', 'error');
      });
    }
  }

  // --- 11. Event Listeners Initialization ---
  function initEventListeners() {
    // Live input events on form
    if (form) {
      form.addEventListener('input', (e) => {
        if (e.target.classList.contains('is-invalid')) {
          e.target.classList.remove('is-invalid');
        }
        updateLivePreview();
      });
      form.addEventListener('change', () => updateLivePreview());
    }

    // Logo Input & Drag/Drop
    if (logoInput) {
      logoInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleLogoFile(e.target.files[0]);
        }
      });
    }

    if (btnReplaceLogo && logoInput) {
      btnReplaceLogo.addEventListener('click', () => logoInput.click());
    }

    if (btnRemoveLogo) {
      btnRemoveLogo.addEventListener('click', removeLogo);
    }

    if (logoDropZone) {
      ['dragenter', 'dragover'].forEach(eventName => {
        logoDropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          logoDropZone.classList.add('drag-over');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        logoDropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          logoDropZone.classList.remove('drag-over');
        });
      });

      logoDropZone.addEventListener('drop', (e) => {
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleLogoFile(e.dataTransfer.files[0]);
        }
      });
    }

    // Template selection cards
    document.querySelectorAll('.template-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        updateLivePreview();
      });
    });

    // Accent color swatches
    document.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        updateLivePreview();
      });
    });

    // Font style segments
    document.querySelectorAll('#fontSegments .segment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#fontSegments .segment-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateLivePreview();
      });
    });

    // Border select
    const borderSelect = document.getElementById('borderStyleSelect');
    if (borderSelect) {
      borderSelect.addEventListener('change', () => updateLivePreview());
    }

    // Quick today date button
    if (btnQuickToday) {
      btnQuickToday.addEventListener('click', () => {
        const todayStr = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        const dateInput = document.getElementById('submissionDate');
        if (dateInput) {
          dateInput.value = todayStr;
          updateLivePreview();
          showToast('Submission date updated to today.', 'info');
        }
      });
    }

    // Load Sample Data
    if (btnLoadSample) {
      btnLoadSample.addEventListener('click', () => {
        setFormData(sampleData);
        // Load elegant sample university seal
        fetch('assets/sample-seal.svg')
          .then(res => res.text())
          .then(svgText => {
            const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);
            setLogoData(dataUrl, 'Stanford_Seal.svg', '12.4 KB');
            updateLivePreview();
            showToast('Sample university academic data loaded!', 'success');
          })
          .catch(() => {
            updateLivePreview();
            showToast('Sample academic data loaded!', 'success');
          });
      });
    }

    // Reset Form Modal Trigger
    if (btnResetForm && resetModal) {
      btnResetForm.addEventListener('click', () => {
        resetModal.classList.add('is-open');
      });
    }

    if (btnCancelReset && resetModal) {
      btnCancelReset.addEventListener('click', () => {
        resetModal.classList.remove('is-open');
      });
    }

    if (btnConfirmReset && resetModal) {
      btnConfirmReset.addEventListener('click', () => {
        if (form) form.reset();
        removeLogo();
        resetModal.classList.remove('is-open');
        clearAllSavedData();
        updateLivePreview();
        showToast('Form has been completely reset.', 'info');
      });
    }

    // Clear Storage Button
    if (btnClearStorage) {
      btnClearStorage.addEventListener('click', () => {
        clearAllSavedData();
      });
    }

    // Copy Plain Text
    if (btnCopyText) {
      btnCopyText.addEventListener('click', copyCoverText);
    }

    // Download PDF Buttons
    if (btnDownloadPdf) {
      btnDownloadPdf.addEventListener('click', downloadCoverPagePdf);
    }
    if (btnDownloadPdfHeader) {
      btnDownloadPdfHeader.addEventListener('click', downloadCoverPagePdf);
    }

    // Direct Browser Print
    if (btnPrintCover) {
      btnPrintCover.addEventListener('click', () => {
        window.print();
      });
    }

    // Zoom Controls
    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => setZoom(currentZoom + 0.1));
    }
    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => setZoom(currentZoom - 0.1));
    }
    if (btnZoomFit) {
      btnZoomFit.addEventListener('click', autoFitZoom);
    }
    if (btnZoomReset) {
      btnZoomReset.addEventListener('click', () => setZoom(0.85));
    }

    // Window Resize auto-fit if on mobile/small screen
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1100) {
        autoFitZoom();
      }
    });

    // Close modal on click backdrop
    if (resetModal) {
      resetModal.addEventListener('click', (e) => {
        if (e.target === resetModal) {
          resetModal.classList.remove('is-open');
        }
      });
    }
  }

  // --- 12. Application Initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    restoreSavedData();
    updateLivePreview();

    // Set initial responsive zoom
    if (window.innerWidth < 1100) {
      autoFitZoom();
    } else {
      setZoom(0.85);
    }
  });

})();
