-- Clean up old seed data to prevent duplicates
DELETE FROM certificate_tags;
DELETE FROM student_certificates;
DELETE FROM student_grades;
DELETE FROM student_resources;
DELETE FROM approval_requests;
DELETE FROM assessments;

-- Seed student_grades (for student s4 - Jane Doe)
INSERT INTO student_grades (id, student_id, course, instructor, grade, percentage, credits, semester, academic_year, status) VALUES
(1, 's4', 'UX Design Principles', 'Dr. Alan Turing', 'A', 92, 4, 'Semester 3', '2022-2023', 'Completed'),
(2, 's4', 'Advanced Data Structures', 'Dr. Grace Hopper', 'A-', 89, 4, 'Semester 4', '2023-2024', 'Completed'),
(3, 's4', 'Strategic Management', 'LMS Admin', 'A+', 98, 3, 'Semester 5', '2023-2024', 'Completed'),
(4, 's4', 'AI Ethics & Technology', 'Dr. John McCarthy', 'B+', 87, 3, 'Semester 5', '2023-2024', 'In Progress'),
(5, 's4', 'Database Management Systems', 'Dr. Edgar Codd', 'A', 93, 4, 'Semester 2', '2022-2023', 'Completed'),
(6, 's4', 'Intro to Machine Learning', 'Dr. Yann LeCun', 'A-', 90, 4, 'Semester 4', '2023-2024', 'Completed'),
(7, 's4', 'Computer Networks', 'Dr. Vint Cerf', 'B', 84, 3, 'Semester 3', '2022-2023', 'Completed')
ON CONFLICT (id) DO NOTHING;

-- Seed student_certificates
INSERT INTO student_certificates (id, student_id, title, date, type) VALUES
('LL-48291', 's4', 'Advanced Data Structures', 'October 15, 2023', 'Specialization'),
('LL-93812', 's4', 'UX/UI Principles Mastery', 'August 02, 2023', 'Course Completion'),
('LL-30198', 's4', 'Introduction to Artificial Intelligence', 'June 24, 2023', 'External Certification'),
('LL-10492', 's4', 'Cloud Computing Fundamentals', 'April 11, 2023', 'Course Completion')
ON CONFLICT (id) DO NOTHING;

-- Seed certificate_tags
INSERT INTO certificate_tags (certificate_id, tags) VALUES
('LL-48291', 'Algorithms'),
('LL-48291', 'System Design'),
('LL-93812', 'Prototyping'),
('LL-93812', 'User Research'),
('LL-30198', 'Python'),
('LL-30198', 'Machine Learning'),
('LL-10492', 'AWS'),
('LL-10492', 'Infrastructure');

-- Seed student_resources
INSERT INTO student_resources (id, title, course_name, module_name, instructor, file_size, file_type, upload_date, last_updated, downloads, description, preview_supported) VALUES
(1, 'Advanced System Architecture Compendium V2.0', 'Advanced Data Structures', 'Module 4: Distributed Systems', 'Dr. Grace Hopper', '45.2 MB', 'PDF', '2023-10-24', '2023-11-01', 1420, 'Detailed compilation of advanced architectural patterns, microservices configurations, and high-availability setups.', true),
(2, 'React Design Patterns Starter Templates', 'UX Design Principles', 'Module 2: Advanced Prototyping', 'Dr. Alan Turing', '12.8 MB', 'ZIP', '2023-10-18', '2023-10-18', 854, 'Starter template files including routing, context state templates, and modular UI structure setups.', false),
(3, 'Introduction to Artificial Intelligence Lecture Slides', 'Strategic Management', 'Module 1: AI Foundations', 'LMS Admin', '8.4 MB', 'PPT', '2023-10-12', '2023-10-15', 620, 'Lecture decks covering the historical overview of AI, search algorithms, and intelligent agents.', true),
(4, 'Machine Learning Model Training Pipeline', 'Intro to Machine Learning', 'Module 3: Neural Networks', 'Dr. Yann LeCun', '4.2 MB', 'Code', '2023-09-30', '2023-10-02', 412, 'Python notebooks, training configs, hyperparameter logs, and model exports for CNN image classifying.', true),
(5, 'Computer Networks Cisco Command Cheat Sheet', 'Computer Networks', 'Module 2: Routing Protocols', 'Dr. Vint Cerf', '1.5 MB', 'PDF', '2023-10-05', '2023-10-05', 1105, 'Quick reference command sheets for configuring Cisco routers, switches, ACLs, and NAT tables.', true),
(6, 'Neural Networks Overview Lecture Recording', 'Intro to Machine Learning', 'Module 3: Neural Networks', 'Dr. Yann LeCun', '185.0 MB', 'Video', '2023-09-20', '2023-09-20', 98, 'Recording of the live lecture detailing feedforward propagation and gradient descent algorithms.', true)
ON CONFLICT (id) DO NOTHING;

-- Seed approval_requests
INSERT INTO approval_requests (id, type, name, course, date, cost, priority, status, provider, justification) VALUES
(1, 'Certification Claim', 'Arjun Mehta', 'Cloud Architect Certification', 'Oct 24, 2026', '$299.00 USD', 'High', 'Pending', 'Amazon Web Services', 'Required for the upcoming Modernization Project. This certification will allow the team to self-manage architectural reviews without external consulting.'),
(2, 'Course Enrollment', 'Priya Sharma', 'Full-Stack Web Bootcamp', 'Oct 23, 2026', 'Free', 'Medium', 'Approved', 'Internal Academy', 'Gaining Javascript proficiency to support front-end tasks on project SAMAS.'),
(3, 'Course Enrollment', 'Rohan Gupta', 'AWS Cloud Practitioner', 'Oct 24, 2026', 'Free', 'Low', 'Pending', 'Internal Academy', 'Expanding base knowledge in cloud services as part of yearly professional goals.'),
(4, 'Certification Claim', 'Neha Patil', 'Certified Scrum Master', 'Oct 22, 2026', '$450.00 USD', 'Medium', 'Rejected', 'Scrum Alliance', 'L&D allocation limit exceeded for the current quarter.')
ON CONFLICT (id) DO NOTHING;

-- Seed assessments
INSERT INTO assessments (id, name, course, questions, duration, pass_score, status) VALUES
(1, 'React State Management Quiz', 'Full-Stack Web Architecture', 25, '45 mins', '75%', 'Active'),
(2, 'Docker & Kubernetes Basics', 'AWS Cloud Deployments', 30, '60 mins', '80%', 'Active'),
(3, 'Conflict Resolution Assessment', 'Leadership & Empathy', 15, '30 mins', '70%', 'Draft'),
(4, 'SQL & Database Schema Design', 'Database Administration', 20, '40 mins', '75%', 'Active')
ON CONFLICT (id) DO NOTHING;
