const ResumeTemplate = () => {
  return (
    <div className="resume">
      <h1>Name</h1>
      <p>PO Box 100000, Atlanta GA 30322 | 303-111-2222 | name@emory.edu | <a href="http://website.com">website.com</a></p>

      <h2>EDUCATION</h2>
      <p><strong>Emory University, Emory College, Atlanta, GA</strong> – May 2022</p>
      <p><em>Bachelor of Science in Mathematics and Computer Science</em></p>
      <p><strong>GPA:</strong> 3.89/4.00</p>

      <h2>RELEVANT TECHNICAL SKILLS</h2>
      <ul>
        <li><strong>Computing Languages and Technologies:</strong> Java, C, JUnit, Spring, Windows, Unix</li>
        <li><strong>Database Technologies:</strong> SQL, PL/SQL, Oracle, MySQL</li>
        <li><strong>Web Development:</strong> XHTML, CSS, JavaScript, AJAX, Dojo, jQuery, PHP, APEX, XML, XSL</li>
      </ul>

      <h2>HONORS</h2>
      <ul>
        <li>2020 Deborah Jackson Award Recipient</li>
        <li>Dean’s Achievement Scholar</li>
        <li>International Baccalaureate Diploma Recipient</li>
      </ul>

      <h2>WORK EXPERIENCE</h2>
      <h3>Southwest Airlines, Dallas, TX (May 2021 – Aug 2021)</h3>
      <p>Southwest.com Air Team Intern</p>
      <ul>
        <li>Developed new back-end architecture and defect fixes for southwest.com on-line interface</li>
        <li>Engaged in test-driven development practices while demonstrating agile values</li>
      </ul>

      {/* Repeat similar structure for other work experiences */}

      <h2>LEADERSHIP & COMMUNITY ENGAEMENT</h2>
      <h3>Volunteer Emory, Atlanta, GA (Aug 2018 – Present)</h3>
      <p>Student Co-Director</p>
      <ul>
        <li>Established and led weekly service trip to refurbish computers for low-income families</li>
        <li>Co-led Gandhi/Be the Change Day event</li>
      </ul>

      <h2>ADDITIONAL SKILLS & INTERESTS</h2>
      <p><strong>Languages:</strong> Fluent in Spanish; Conversational in German</p>
      <p><strong>Fine Arts:</strong> Piano (14 years – high mastery); Sketch and Charcoal Painting (8 years)</p>
      <p><strong>Interests:</strong> Soccer, Mountain Climbing, Organic Gardening, Strategic Gaming</p>
    </div>
  );
};

export default ResumeTemplate;

