const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 3, completed: false },
    { subject: 'WDD', number: 131, title: 'Web Frontend Development I', credits: 3, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 3, completed: false },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development II', credits: 3, completed: false }
];

const container = document.getElementById("course-container");
const creditSpan = document.getElementById("credits");
const buttons = document.querySelectorAll(".filter-btn");

function displayCourses(filteredCourses) {
    container.innerHTML = "";
    
    filteredCourses.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) {
            card.classList.add("completed");
        }
        card.textContent = `${course.subject} ${course.number}`;
        container.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditSpan.textContent = totalCredits;
}

function setActiveButton(activeId) {
    buttons.forEach(btn => btn.classList.remove("active"));
    document.getElementById(activeId).classList.add("active");
}

document.getElementById("all").addEventListener("click", () => {
    displayCourses(courses);
    setActiveButton("all");
});

document.getElementById("cse").addEventListener("click", () => {
    displayCourses(courses.filter(c => c.subject === 'CSE'));
    setActiveButton("cse");
});

document.getElementById("wdd").addEventListener("click", () => {
    displayCourses(courses.filter(c => c.subject === 'WDD'));
    setActiveButton("wdd");
});

displayCourses(courses);