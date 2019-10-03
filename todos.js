//set require
const SeleniumInfra = require("./seleniumInfra");

//class implementation
class TodosPage {
    constructor() {
        this.URL = "https://elevation-local-todo.herokuapp.com/";
        this.infraDriver = new SeleniumInfra();
    }


    async insertAndDelete(todoText) {
        //opens Page
        await this.openPage();
        try {
            //Insert todoText into the input text field
            await this.infraDriver.write(todoText, "id", "todo-input");


            //Clicks “Add” button
             await this.infraDriver.clickElement("id", "addToDo");

            //the last ToDo
            const isTodoFound = await this.infraDriver.isElementExists("css", ".todo:last-child");
            let newToDoElement = undefined;

            if (isTodoFound) {
                console.log("found a new div");
                newToDoElement = await this.infraDriver.findElementBy("css", ".todo:last-child");
                const newTodoText = await this.infraDriver.getTextFromElement(undefined, undefined, newToDoElement);
                if (newTodoText === todoText) {
                    console.log("New div has the same text");
                } else {
                    console.log("Error: New div does not has the same text");
                }
            } else {
                console.log("Error: Can’t find a new div");
            }

            //Click the delete red button
            await this.infraDriver.clickElement("css", "div.todo>span.delete", undefined, newToDoElement);

            const checkIfLastToDoFound = await this.infraDriver.isElementExists("css", ".todo:last-child");
            if (checkIfLastToDoFound) {
                const lastTodoText = await this.infraDriver.getTextFromElement("css", ".todo:last-child");
                if (lastTodoText !== todoText) {
                    console.log("The div was deleted")
                }else{
                    console.log("The div was not deleted")
                }
            } else {
                console.log("The div was deleted")
            }
        } catch (error) {
            console.error(`TodosPage insertAndDelete(${todoText}) ERROR:`);
            console.error(error);
        }

        //close the page
        await this.closeToDoPage();
    }

    async insertAndComplete(todoText) {
        //opens Page
        await this.openPage();
        try {
            //Insert the todoText into the input text field
            await this.infraDriver.write(todoText, "id", "todo-input");

            //Click the “Add” button
            await this.infraDriver.clickElement("id", "addToDo");

            //the last ToDo
            const isTodoFound = await this.infraDriver.isElementExists("css", ".todo:last-child");
            let newToDoElement = undefined;

            if (isTodoFound) {
                console.log("found a new div");
                newToDoElement = await this.infraDriver.findElementBy("css", ".todo:last-child");
            } else {
                console.log("Error: Can’t find a new div");
            }

            //Click the green button
            await this.infraDriver.clickElement("css", "div.todo>i.fa-check-circle", undefined, newToDoElement);

            //Validation if checked
            const completeTasksElements = await this.infraDriver.findElementListBy("css", "div.complete>span.text");

            for (let completeTaskElm of completeTasksElements) {
                const completeTaskText = await this.infraDriver.getTextFromElement(undefined, undefined, completeTaskElm);
                if (completeTaskText === todoText) {
                    console.log("the new div was checked");

                    //close the page
                    await this.closeToDoPage();
                    return;
                }
            }
            console.log("Error: the new div was NOT checked");
        } catch (error) {
            console.error(`TodosPage insertAndComplete(${todoText}) ERROR:`);
            console.error(error);
        }
        //close the page
        await this.closeToDoPage();

    }

    async addTask(task){
            //insert the todoText into the input field
            await this.infraDriver.write(task, "id", "todo-input");

            //Click the “Add” button
            await this.infraDriver.clickElement("id", "addToDo");

            //the last ToDo
            const isTodoFound = await this.infraDriver.isElementExists("css", ".todo:last-child");

            if (isTodoFound) {
                console.log("found a new div");
            } else {
                console.log("Error: Can’t find a new div");
            }
    }

    async insertTwoDeleteFirst(todoText1, todoText2) {
        //open Page
        await this.openPage();

        try {
            await this.addTask(todoText1);
            await this.addTask(todoText2);
        
            const firstToDoElement = await this.infraDriver.findElementBy("css",".todo:first-child");
            
            //Click if the delete red button is not the first task
            await this.infraDriver.clickElement("css", "div.todo>span.delete", undefined, firstToDoElement);

            //Check first task deleted
            const isFirstTaskExist = await this.infraDriver.isElementExists("css",".todo:first-child")
            if(isFirstTaskExist){
                const firstToDoElement = await this.infraDriver.findElementBy("css",".todo:first-child");
                const firstTodoText = await this.infraDriver.getTextFromElement(undefined,undefined,firstToDoElement);            
                
                if(firstTodoText !== todoText1){
                    console.log("the first div was deleted")
                    //close the page
                    await this.closeToDoPage();
                    return;
                }
            }
            console.log("Error: the first div was NOT deleted");

        } catch (error) {
            console.error(`TodosPage insertTwoDeleteFirst(${todoText1} , ${todoText2}) ERROR:`);
            console.error(error);
        }

        //close the page
        await this.closeToDoPage();
    }


    //open ToDO page
    async openPage() {
        try {
            await this.infraDriver.getURL(this.URL);
        } catch (error) {
            console.error(error);
        }
    }

    //close ToDo Page
    async closeToDoPage() {
        try {
            await this.infraDriver.close();
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = TodosPage;