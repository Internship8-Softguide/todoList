$(() => {
  var data = [
    {
      done: true,
      message: "read the book",
    },
    {
      done: false,
      message: "loss 20lb",
    },
  ];



  let todo = $("#todo");
  let todoList = $("#todoList");
  let addTodo = $("#addTodo");
  let rate = $("#rate");
  let removeCheck = $("#removeCheck");
  let selectIndex = undefined;

  const createItem = (todoData, index) => {
    let todoItem = $("<div>", { class: "todoItem" });
    let firstDiv = $("<div>");
    let secondDiv = $("<div>");
    let input = todoData.done ? $("<input>", { type: "checkbox", checked: true }) : $("<input>", { type: "checkbox", checked: false })
    let p = todoData.done ? $("<p>", { class: "done" }).text(todoData.message) : $("<p>").text(todoData.message);
    let edit = $("<i>", { class: "editTodo fa-solid fa-pen-to-square" })
    let del = $("<i>", { class: "removeTodo fa-solid fa-xmark" })

    input.on("click", () => done(index))
    del.on("click", () => delFun(index))
    edit.on("click", () => select(index))

    firstDiv.append(input)
    firstDiv.append(p)
    todoItem.append(firstDiv)
    secondDiv.append(edit)
    secondDiv.append(del)
    todoItem.append(secondDiv)
    todoList.append(todoItem);
  }

  const select = (index) => {
    selectIndex = index;
    todo.val(data[index].message)
  }

  const delFun = (index) => {
    data.splice(index, 1)
    showAllTodoList()
  }

  const done = (index) => {
    if (data[index].done === true) {
      data[index].done = false
    } else {
      data[index].done = true
    }
    showAllTodoList();
  }


  const showAllTodoList = () => {
    todoList.html("")
    data.forEach((todoData, index) => {
      createItem(todoData, index)
    })
    rate.text(`${(data.filter((val) => val.done === true)).length}  of  ${data.length}  done `)
  }


  addTodo.on("click", () => {
    if (selectIndex === undefined) {
      data.push({ done: false, message: todo.val() })
    } else {
      data[selectIndex].message = todo.val()
      data[selectIndex].done = false
      todo.val('')
      showAllTodoList()
      selectIndex = undefined
    }
    showAllTodoList();
  })


  removeCheck.on("click", () => {
    let newData = data.map((val) => {
      val.done = false
      return val
    })
    data = newData;
    showAllTodoList()
  })



  showAllTodoList();
})

