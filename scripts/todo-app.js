(function() {
	function createAppTitle(title) {
		let appTitle = document.createElement('h2');
		appTitle.innerHTML = title;
		return appTitle;
	}

	function createTodoItemForm() {
		let form = document.createElement('form');
		let input = document.createElement('input');
		let buttonWrapper = document.createElement('div');
		let button = document.createElement('button');

		form.classList.add('input-group', 'mb-3');
		input.classList.add('form-control');
		input.placeholder = 'Введите название нового дела';
		buttonWrapper.classList.add('input-goup-append');
		button.classList.add('btn', 'btn-primary');
		button.textContent = 'Добавить дело';
		button.setAttribute('disabled','disabled');

		buttonWrapper.append(button);
		form.append(input);
		form.append(buttonWrapper);

		return {
			form,
			input,
			button
		};
	}

	function createTodoList() {
		let list = document.createElement('ul');
		list.classList.add('list-group');
		return list;
	}

	function createTodoItem(name) {
		let item = document.createElement('li');

		let buttonGroup = document.createElement('div');
		let doneButton = document.createElement('button'); 
		let deleteButton = document.createElement('button');

		item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
		item.textContent = name;

		buttonGroup.classList.add('btn-group', 'btn-group-sm');
		doneButton.classList.add('btn', 'btn-success');
		doneButton.textContent = 'Готово';
		deleteButton.classList.add('btn', 'btn-danger');
		deleteButton.textContent = 'Удалить';

		buttonGroup.append(doneButton);
		buttonGroup.append(deleteButton);
		item.append(buttonGroup);

		return {
			item,
			doneButton,
			deleteButton,
		};
	}

	function arrayExist(arrayList, todoList, title) {
		for (let i = 0; i < arrayList.length; i++) {
			let todoItem = createTodoItem(arrayList[i].name);

			if (arrayList[i].done) {
				todoItem.item.classList.add('list-group-item-success');
			}

			todoItem.doneButton.addEventListener('click', function () {
				todoItem.item.classList.toggle('list-group-item-success');
				toLocalStorage(title);
			});
	
			todoItem.deleteButton.addEventListener('click', function () {
				if (confirm('Вы уверены?')) {
					todoItem.item.remove();
					toLocalStorage(title);
				}
			});
			todoList.append(todoItem.item);
		}
	}

	function toLocalStorage(title) {
		let myStorage = window.localStorage;
		let listArr = document.getElementsByClassName('list-group-item');
		let resultArr = [];

		for (let i = 0; i < listArr.length; i++) {
			let elemObj = {
				name: listArr[i].innerText.split('\n')[0],
				done: listArr[i].classList.contains('list-group-item-success'),
			};
			resultArr.push(elemObj);
		}
		
		myStorage.setItem(title, JSON.stringify(resultArr));
		console.log(myStorage.getItem(title));
	}

	function createTodoApp(container, title = 'Список дел', arrayList = []) {
		let todoAppTitle = createAppTitle(title);
		let todoItemForm = createTodoItemForm();
		let todoList = createTodoList();

		container.append(todoAppTitle);
		container.append(todoItemForm.form);
		container.append(todoList);

		if(arrayList.length > 0 && !localStorage.getItem(title)) {
			arrayExist(arrayList, todoList, title);
		} 

		if (localStorage.getItem(title)) {
			arrayExist(JSON.parse(localStorage.getItem(title)), todoList, title);
		}

		

		todoItemForm.form.addEventListener('submit', function (e) {
			e.preventDefault();

			if (!todoItemForm.input.value) {
				return;
			}

			let todoItem = createTodoItem(todoItemForm.input.value);

			todoItem.doneButton.addEventListener('click', function () {
				todoItem.item.classList.toggle('list-group-item-success');
				toLocalStorage(title);
			});

			todoItem.deleteButton.addEventListener('click', function () {
				if (confirm('Вы уверены?')) {
					todoItem.item.remove();
					toLocalStorage(title);
				}
			});

			todoList.append(todoItem.item);
			todoItemForm.input.value ='';
			todoItemForm.button.setAttribute('disabled', 'disabled');
			toLocalStorage(title);
		});

		todoItemForm.input.addEventListener('input', function () {
			if (todoItemForm.input.value ==='') {
				todoItemForm.button.setAttribute('disabled', 'disabled');
			} else {
			todoItemForm.button.removeAttribute('disabled');
			}
		});
	}

	window.createTodoApp = createTodoApp;
})();



//console.log(document.getElementsByClassName('list-group-item')[1].classList.contains('list-group-item-success'))
//console.log(document.getElementsByClassName('list-group-item')[0].innerText)