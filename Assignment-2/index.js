const { readFileSync, writeFileSync } = require("fs");
const http = require("http");
const fs = require("fs");

let students = [];

let courses = [];

let departments = [];

http
  .createServer((req, res) => {
    const { url, method } = req;
    if (url == "/" && method == "GET") {
      res.end("This the Home page \nwe Have no data here for This section");
    } else if (url == "/addStudent" && method == "POST") {
      let info = "";
      req.on("data", (chunk) => {
        info = JSON.parse(chunk);
      });
      req.on("end", () => {
        const { name, password, email, id, department } = info;

        const isEmailExist = students.find((student) => student.email == email);
        if (isEmailExist) {
          res.end("Error :this student is aready exist");
          return;
        }
        const newStudent = { name, password, email, id, department };
        students.push(newStudent);

        fs.writeFileSync("./files/students", JSON.stringify(students));

        res.write("New Student is added");
        res.end(JSON.stringify(newStudent));
      });
    } else if (url == "/getStudents" && method == "GET") {
      const data = fs.readFileSync("./files/students");
      res.end(data);
    } else if (url == "/deleteStudent" && method == "DELETE") {
      let del = "";
      req.on("data", (chunk) => {
        del = JSON.parse(chunk);
      });
      req.on("end", () => {
        let students = JSON.parse(fs.readFileSync("./files/students"));
        const delId = del.id;
        const index = students.findIndex((student) => student.id === delId);
        if (index === -1) {
          return res.end("Student not found!");
        }
        students.splice(index, 1);
        fs.writeFileSync("./files/students", JSON.stringify(students)); // Assuming you want to persist changes to a JSON file
        res.end("Student deleted successfully");
      });
    } else if (url == "/updateStudent" && method == "PUT") {
      let updateData = "";
      req.on("data", (chunk) => {
        updateData = JSON.parse(chunk);
      });
      req.on("end", () => {
        let students = JSON.parse(fs.readFileSync("./files/students"));
        const updateId = updateData.id;
        const index = students.findIndex((student) => student.id === updateId);

        if (index === -1) {
          return res.end("Student not found!");
        }
        const { name, password, email, department } = updateData;
        students[index] = {
          ...students[index],
          name,
          password,
          email,
          department,
        };

        fs.writeFileSync("./files/students", JSON.stringify(students)); // Assuming you want to persist changes to a JSON file
        res.end("Successfull");
      });
    } else if (url == "/searchStudentById" && method == "GET") {
      let info = "";
      req.on("data", (chunk) => {
        info += chunk;
      });
      req.on("end", () => {
        const searchId = JSON.parse(info).id;
        let students = JSON.parse(fs.readFileSync("./files/students"));
        const index = students.findIndex((student) => student.id === searchId);
        if (index === -1) {
          return res.end("This person is not here!");
        }
        res.write("the student is here : ");
        res.end(JSON.stringify(students[index]));
      });
    } else if (url == "/addCourse" && method == "POST") {
      let info = "";
      req.on("data", (chunk) => {
        info += chunk;
      });
      req.on("end", () => {
        const courseData = JSON.parse(info);
        courses.push(courseData);
        fs.writeFileSync("./files/courses", JSON.stringify(courses));
        res.end("Course added successfully");
      });
    } else if (url == "/getCourses" && method == "GET") {
      const data = fs.readFileSync("./files/courses");
      res.end(data);
    } else if (url == "/deleteCourse" && method == "DELETE") {
      let del = "";
      req.on("data", (chunk) => {
        del += chunk;
      });
      req.on("end", () => {
        const courseId = JSON.parse(del).id;
        const index = courses.findIndex((course) => course.id === courseId);
        if (index === -1) {
          return res.end("Course not found!");
        }
        courses.splice(index, 1);
        fs.writeFileSync("./files/courses", JSON.stringify(courses));
        res.end("Course deleted successfully");
      });
    } else if (url == "/updateCourse" && method == "PUT") {
      let updateData = "";
      req.on("data", (chunk) => {
        updateData += chunk;
      });
      req.on("end", () => {
        const updatedCourse = JSON.parse(updateData);
        const index = courses.findIndex(
          (course) => course.id === updatedCourse.id
        );
        if (index === -1) {
          return res.end("Course not found!");
        }
        courses[index] = updatedCourse;
        fs.writeFileSync("./files/courses", JSON.stringify(courses));
        res.end("Course updated successfully");
      });
    } else if (url == "/getCourseById" && method == "GET") {
      let info = "";
      req.on("data", (chunk) => {
        info += chunk;
      });
      req.on("end", () => {
        const searchId = JSON.parse(info).id;
        let courses = JSON.parse(fs.readFileSync("./files/courses"));
        const index = courses.findIndex((course) => course.id === searchId);
        if (index === -1) {
          return res.end("Course not found!");
        }
        res.write("The course is here: ");
        res.end(JSON.stringify(courses[index]));
      });
    } else if (url == "/addDepartment" && method == "POST") {
      let info = "";
      req.on("data", (chunk) => {
        info += chunk;
      });
      req.on("end", () => {
        const departmentData = JSON.parse(info);
        departments.push(departmentData);
        fs.writeFileSync("./files/departments", JSON.stringify(departments));
        res.end("Department added successfully");
      });
    } else if (url == "/getDepartments" && method == "GET") {
      const data = fs.readFileSync("./files/departments");
      res.end(data);
    } else if (url == "/deleteDepartment" && method == "DELETE") {
      let del = "";
      req.on("data", (chunk) => {
        del += chunk;
      });
      req.on("end", () => {
        const departmentId = JSON.parse(del).id;
        const index = departments.findIndex(
          (department) => department.id === departmentId
        );
        if (index === -1) {
          return res.end("Department not found!");
        }
        departments.splice(index, 1);
        fs.writeFileSync("./files/departments", JSON.stringify(departments));
        res.end("Department deleted successfully");
      });
    } else if (url == "/updateDepartment" && method == "PUT") {
      let updateData = "";
      req.on("data", (chunk) => {
        updateData += chunk;
      });
      req.on("end", () => {
        const updatedDepartment = JSON.parse(updateData);
        const index = departments.findIndex(
          (department) => department.id === updatedDepartment.id
        );
        if (index === -1) {
          return res.end("Department not found!");
        }
        departments[index] = updatedDepartment;
        fs.writeFileSync("./files/departments", JSON.stringify(departments));
        res.end("Department updated successfully");
      });
    } else if (url == "/getDepartmentById" && method == "GET") {
      let info = "";
      req.on("data", (chunk) => {
        info += chunk;
      });
      req.on("end", () => {
        const searchId = JSON.parse(info).id;
        let departments = JSON.parse(fs.readFileSync("./files/departments"));
        const index = departments.findIndex(
          (department) => department.id === searchId
        );
        if (index === -1) {
          return res.end("Department not found!");
        }
        res.write("The department is here: ");
        res.end(JSON.stringify(departments[index]));
      });
    }
  })
  .listen(3100, () => {
    console.log("server is running!!!!");
  });
