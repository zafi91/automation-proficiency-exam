//set require
const TodosPage = require("./todos")

async function  testInsertAndDelete(){
    const toDoPage = new TodosPage();
    await toDoPage.insertAndDelete("task 1");
}

// async function  testInsertAndComplete(){
//     const toDoPage = new TodosPage();
//     await toDoPage.insertAndComplete("task 2");
// }

// async function  testInsertTwoDeleteFirst(){
//     const toDoPage = new TodosPage();
//     await toDoPage.insertTwoDeleteFirst("task 1","task 2");
//  }

async function runTest(){
    console.log("toDoTest testInsertAndDelete()")
    await testInsertAndDelete();

    // console.log("toDoTest testInsertAndComplete()")
    // await testInsertAndComplete();

    // console.log("toDoTest testInsertTwoDeleteFirst()")
    // await testInsertTwoDeleteFirst();
}

runTest()