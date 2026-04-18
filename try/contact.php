<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contact | PRMD 2.0</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
<style>
:root {
    --primary: #2e7d32;
    --primary-dark: #1b5e20;
    --primary-light: #e8f5e9;
    --bg: #f5f7fa;
    --surface: #ffffff;
    --text: #1a1a2e;
    --text-muted: #6b7280;
    --border: #e5e7eb;
    --error: #dc3545;
    --success: #28a745;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Noto Sans SC', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
}

.main-content {
    margin-top: 70px;
    padding: 40px 20px;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
    min-height: calc(100vh - 70px);
}

/* ========== Page Header ========== */
.page-header {
    text-align: center;
    padding: 50px 20px;
    background: linear-gradient(135deg, var(--primary-light) 0%, #c8e6c9 100%);
    border-radius: 16px;
    margin-bottom: 30px;
}

.page-header h1 {
    font-size: 32px;
    font-weight: 700;
    color: var(--primary-dark);
    margin-bottom: 10px;
}

.page-header p {
    font-size: 15px;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto;
}

/* ========== Two-column Layout ========== */
.contact-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    align-items: start;
}

/* ========== Contact Info Card ========== */
.contact-card {
    background: var(--surface);
    border-radius: 12px;
    border: 1px solid var(--border);
    padding: 30px;
}

.contact-card h3 {
    font-size: 18px;
    font-weight: 700;
    color: var(--primary-dark);
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--primary-light);
    display: flex;
    align-items: center;
    gap: 10px;
}

.contact-info {
    margin-bottom: 24px;
}

.contact-info h4 {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 12px;
}

.contact-info address {
    font-size: 14px;
    line-height: 1.8;
    color: var(--text-muted);
    font-style: normal;
}

.contact-info address a {
    color: var(--primary);
    text-decoration: none;
}

.contact-info address a:hover {
    text-decoration: underline;
}

.contact-info .team-name {
    font-weight: 600;
    color: var(--text);
    margin-top: 16px;
    margin-bottom: 8px;
}

/* ========== Related Databases ========== */
.related-dbs {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
}

.related-dbs h4 {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 16px;
}

.db-links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.db-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    background: var(--primary-light);
    border: 1px solid var(--border);
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s;
}

.db-link:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(46, 125, 50, 0.15);
}

.db-link img {
    height: 24px;
    width: auto;
    max-width: 100px;
}

/* ========== Feedback Form ========== */
.feedback-card {
    background: var(--surface);
    border-radius: 12px;
    border: 1px solid var(--border);
    padding: 30px;
}

.feedback-card h3 {
    font-size: 18px;
    font-weight: 700;
    color: var(--primary-dark);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.feedback-card > p {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 24px;
    line-height: 1.6;
}

/* ========== Form Styles ========== */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 8px;
}

.form-group label .required {
    color: var(--error);
    margin-left: 2px;
}

.input-wrapper {
    position: relative;
}

.input-wrapper .input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    font-size: 14px;
    pointer-events: none;
}

.form-control {
    width: 100%;
    padding: 12px 16px;
    padding-left: 40px;
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;
    background: #fff;
}

.form-control:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
}

.form-control::placeholder {
    color: #aaa;
}

textarea.form-control {
    padding-left: 16px;
    resize: vertical;
    min-height: 120px;
}

/* ========== Validation States ========== */
.form-group.error .form-control {
    border-color: var(--error);
}

.form-group.error .form-control:focus {
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.form-group.success .form-control {
    border-color: var(--success);
}

.error-message {
    display: none;
    font-size: 12px;
    color: var(--error);
    margin-top: 6px;
}

.form-group.error .error-message {
    display: block;
}

/* ========== Submit Button ========== */
.submit-btn {
    padding: 14px 40px;
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    font-family: inherit;
}

.submit-btn:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
}

.submit-btn:active {
    transform: translateY(0);
}

/* ========== Footer ========== */
.footer {
    text-align: center;
    padding: 30px;
    color: var(--text-muted);
    font-size: 13px;
    border-top: 1px solid var(--border);
    margin-top: 40px;
}

.footer a {
    color: var(--primary);
    text-decoration: none;
}

.footer a:hover {
    text-decoration: underline;
}

/* ========== Responsive ========== */
@media (max-width: 768px) {
    .contact-layout {
        grid-template-columns: 1fr;
    }

    .main-content {
        margin-top: 120px;
        padding: 20px 15px;
    }

    .page-header {
        padding: 40px 20px;
    }

    .page-header h1 {
        font-size: 26px;
    }

    .db-links {
        justify-content: center;
    }
}
</style>
</head>
<body>

<?php include 'head.php'; ?>

<div class="main-content">
    <!-- Page Header -->
    <div class="page-header">
        <h1>📬 Contact Us</h1>
        <p>If you have any questions, suggestions, or collaboration inquiries, please feel free to contact us. We look forward to your feedback!</p>
    </div>

    <div class="contact-layout">
        <!-- Left: Contact Information -->
        <div class="contact-card">
            <h3>📍 Contacts</h3>

            <div class="contact-info">
                <h4>Address</h4>
                <address>
                    Rice Research Institute, Guangdong Academy of Agricultural Sciences<br>
                    Guangdong Key Laboratory of New Technology for Rice Breeding<br>
                    No.3 Jinying East 1st Street, Guangzhou 510640, China
                </address>

                <p class="team-name">RNA Bioinformatics Team</p>
                <address>
                    <a href="mailto:rnainfor@gmail.com">rnainfor@gmail.com</a>
                </address>
            </div>

            <!-- Related Databases -->
            <div class="related-dbs">
                <h4>🔗 Related Databases</h4>
                <div class="db-links">
                    <a href="https://rnainformatics.org.cn/RNAmod" target="_blank" class="db-link" title="RNAmod">
                        <img src="./assets/global/img/lab/RNAmod.png" alt="RNAmod" onerror="this.style.display='none';this.parentElement.textContent='RNAmod';">
                    </a>
                    <a href="https://rnainformatics.org.cn/RiboToolkit" target="_blank" class="db-link" title="RiboToolkit">
                        <img src="./assets/global/img/lab/logo-default.png" alt="RiboToolkit" onerror="this.style.display='none';this.parentElement.textContent='RiboToolkit';">
                    </a>
                    <a href="https://rnainformatics.org.cn/RiboUORF" target="_blank" class="db-link" title="Ribo-uORF">
                        <img src="./assets/global/img/lab/logo_utr5db.png" alt="Ribo-uORF" onerror="this.style.display='none';this.parentElement.textContent='Ribo-uORF';">
                    </a>
                    <a href="http://crisprbase.maolab.org/" target="_blank" class="db-link" title="CRISPRBase">
                        <img src="./assets/global/img/lab/crisprbase.png" alt="CRISPRBase" onerror="this.style.display='none';this.parentElement.textContent='CRISPRBase';">
                    </a>
                    <a href="https://rnainformatics.org.cn/sRNAtools" target="_blank" class="db-link" title="sRNAtools">
                        <img src="./assets/global/img/lab/logo-sRNAtools.png" alt="sRNAtools" onerror="this.style.display='none';this.parentElement.textContent='sRNAtools';">
                    </a>
                    <a href="https://bioinformatics.sc.cn/PRMD/" target="_blank" class="db-link" title="PRMD">
                        <img src="./assets/global/img/lab/PRMD.png" alt="PRMD" onerror="this.style.display='none';this.parentElement.textContent='PRMD';">
                    </a>
                </div>
            </div>
        </div>

        <!-- Right: Feedback Form -->
        <div class="feedback-card">
            <h3>📝 Feedback</h3>
            <p>We want to hear from you. Use this form to enter your comments, questions, suggestions, or report problems.</p>

            <form id="feedbackForm" onsubmit="return false;">
                <div class="form-group">
                    <label>Subject <span class="required">*</span></label>
                    <div class="input-wrapper">
                        <i class="input-icon fa fa-check"></i>
                        <input type="text" class="form-control" id="subject" name="subject" placeholder="Enter subject">
                    </div>
                    <div class="error-message">Please enter a subject</div>
                </div>

                <div class="form-group">
                    <label>Name <span class="required">*</span></label>
                    <div class="input-wrapper">
                        <i class="input-icon fa fa-user"></i>
                        <input type="text" class="form-control" id="yourname" name="yourname" placeholder="Enter your name">
                    </div>
                    <div class="error-message">Please enter your name</div>
                </div>

                <div class="form-group">
                    <label>Email <span class="required">*</span></label>
                    <div class="input-wrapper">
                        <i class="input-icon fa fa-envelope"></i>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email">
                    </div>
                    <div class="error-message">Please enter a valid email address</div>
                </div>

                <div class="form-group">
                    <label>Feedback <span class="required">*</span></label>
                    <textarea class="form-control" id="comment" name="comment" rows="5" placeholder="Enter your feedback..."></textarea>
                    <div class="error-message">Please enter your feedback</div>
                </div>

                <button type="submit" class="submit-btn">Submit</button>
            </form>
        </div>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>&copy; 2024 PRMD 2.0 - Plant RNA Modification Database |
            <a href="index.php">Home</a> |
            <a href="try_browse.php">Browse</a> |
            <a href="help.php">Help</a> |
            <a href="download.php">Download</a>
        </p>
    </div>
</div>

<script>
// Form validation
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    // Clear previous error states
    document.querySelectorAll('.form-group').forEach(function(group) {
        group.classList.remove('error', 'success');
    });

    // Validate Subject
    const subject = document.getElementById('subject');
    if (!subject.value.trim()) {
        subject.closest('.form-group').classList.add('error');
        isValid = false;
    } else {
        subject.closest('.form-group').classList.add('success');
    }

    // Validate Name
    const yourname = document.getElementById('yourname');
    if (!yourname.value.trim()) {
        yourname.closest('.form-group').classList.add('error');
        isValid = false;
    } else {
        yourname.closest('.form-group').classList.add('success');
    }

    // Validate Email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.closest('.form-group').classList.add('error');
        isValid = false;
    } else {
        email.closest('.form-group').classList.add('success');
    }

    // Validate Feedback
    const comment = document.getElementById('comment');
    if (!comment.value.trim()) {
        comment.closest('.form-group').classList.add('error');
        isValid = false;
    } else {
        comment.closest('.form-group').classList.add('success');
    }

    if (isValid) {
        // Open new window and submit form
        const formData = new FormData(this);
        const params = new URLSearchParams(formData).toString();

        const popup = window.open(
            '',
            'feedbackwindow',
            'height=300,width=800,left=300,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
        );

        // Replace with actual submission URL
        // Currently using alert as placeholder
        alert('Thank you for your feedback!\n\nSubject: ' + subject.value + '\nName: ' + yourname.value + '\nEmail: ' + email.value);

        // Reset form
        this.reset();
        document.querySelectorAll('.form-group').forEach(function(group) {
            group.classList.remove('success');
        });
    }
});

// Clear error state on input
document.querySelectorAll('.form-control').forEach(function(input) {
    input.addEventListener('input', function() {
        const group = this.closest('.form-group');
        if (group.classList.contains('error')) {
            group.classList.remove('error');
        }
    });
});
</script>

</body>
</html>
