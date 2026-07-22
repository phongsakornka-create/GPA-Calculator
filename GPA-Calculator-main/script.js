const subject = document.getElementById("subject");
const credit = document.getElementById("credit");
const grade = document.getElementById("grade");

const addBtn = document.getElementById("addBtn");
const calculateBtn = document.getElementById("calculateBtn");

const courseList = document.getElementById("courseList");
const result = document.getElementById("result");

let courses = [];

const gradeText = {
    4:"A",
    3.5:"B+",
    3:"B",
    2.5:"C+",
    2:"C",
    1.5:"D+",
    1:"D",
    0:"F"
};

addBtn.addEventListener("click",()=>{

    if(subject.value==="" || credit.value===""){
        alert("กรอกข้อมูลให้ครบ");
        return;
    }

    const course={
        subject:subject.value,
        credit:Number(credit.value),
        grade:Number(grade.value)
    };

    courses.push(course);

    renderTable();

    subject.value="";
    credit.value="";
});

function renderTable(){

    courseList.innerHTML="";

    courses.forEach((course,index)=>{

        courseList.innerHTML+=`
        <tr>
            <td>${course.subject}</td>
            <td>${course.credit}</td>
            <td>${gradeText[course.grade]}</td>
            <td>
                <button class="deleteBtn" data-index="${index}">
                ลบ
                </button>
            </td>
        </tr>
        `;

    });

    const deleteButtons=document.querySelectorAll(".deleteBtn");

    deleteButtons.forEach(button=>{

        button.addEventListener("click",(e)=>{

            const index=e.target.dataset.index;

            courses.splice(index,1);

            renderTable();

        });

    });

}

calculateBtn.addEventListener("click",()=>{

    let totalCredit=0;
    let totalPoint=0;

    courses.forEach(course=>{

        totalCredit+=course.credit;
        totalPoint+=course.credit*course.grade;

    });

    const gpa= totalCredit===0 ? 0 : totalPoint/totalCredit;

    result.textContent=`GPA : ${gpa.toFixed(2)}`;

});