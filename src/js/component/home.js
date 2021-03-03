import React, { useState, useEffect } from "react";
//include images into your bundle

//create your first component
export function Home() {
	const [todoList, setTodoList] = useState([]);
	const [todo, setTodo] = useState("");

	//create your first component
	const updateTodo = e => {
		setTodo(e.target.value);
	};

	function putTodos(arr) {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jafinolc", {
			method: "PUT",
			body: JSON.stringify(arr),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				//	console.log(resp.ok); // will be true if the response is successfull
				//	console.log(resp.status); // the status code = 200 or code = 400 etc.
				//	console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				//console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				//console.log(error);
			});
	}

	const handleAdd = () => {
		var variale = {
			label: todo,
			done: false
		};
		setTodoList([...todoList, variale]);
		setTodo("");

		putTodos([...todoList, variale]);
	};

	function deleteElem(arr, itemdel) {
		const result = arr.filter((todoList, index3) => {
			return index3 != itemdel;
		});
		setTodoList(result);
		putTodos(result);
		/*
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jafinolc", {
			method: "PUT",
			body: JSON.stringify(result),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {})
            .catch(error => {});
            */
	}

	const getTodos = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jafinolc")
			.then(response => response.json())
			.then(res => setTodoList(res));
	};

	function MouseOver(index) {
		document.getElementById(index).style.visibility = "visible";
	}

	function MouseOut(index) {
		document.getElementById(index).style.visibility = "hidden";
	}

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className="container " style={{ with: "30%", margin: "auto" }}>
			<div
				className=" text-center container mt-5 todoListMain2"
				style={{ with: "30%", margin: "auto" }}>
				<div>
					<h2>
						<em> todos</em>
					</h2>
				</div>
				<input
					type="text"
					onKeyPress={event => {
						if (event.key === "Enter") {
							handleAdd();
						}
					}}
					placeholder="enter task"
					onChange={updateTodo}
					value={todo}></input>
			</div>

			{todoList.map((item, index) => (
				<div
					key={index}
					onMouseOver={() => MouseOver(index)}
					onMouseOut={() => MouseOut(index)}
					id="demo"
					className="todoListMain container row"
					style={{ with: "30%", margin: "auto" }}
					onClick={() => deleteElem(todoList, index)}>
					<div className="d-flex justify-content-start col">
						{item.label}
					</div>
					<div className="d-flex justify-content-end col">
						<i
							style={{ visibility: "hidden" }}
							className="fas fa-trash-alt"
							id={index}></i>
					</div>
				</div>
			))}
			<p className="todoListFoo container">{todoList.length} item left</p>
		</div>
	);
}
