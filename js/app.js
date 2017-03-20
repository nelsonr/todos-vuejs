var todo = new Vue({
    el: '#todo-app',
    data: {
        todos: [],
        todosHistory: [],
        newTodo: '',
        allSelected: false
    },
    computed: {
        checkedCount: function() {
            return this.todos.filter(function(todo) {
                return todo.checked === true;
            }).length;
        },
        todosHistoryLength: function() {
            return this.todosHistory.length;
        }
    },
    methods: {
        addTodo: function(ev) {
            ev.preventDefault(),

            this.todos.push({
                text: this.newTodo,
                checked: false,
                index: this.todos.length + 1
            });

            this.newTodo = '';
            this.updateHistory(this.todos);
        },
        toggleChecked: function(index) {
            this.todos = this.todos.map(function(todo) {
                if (todo.index === index) {
                    todo.checked = !todo.checked;
                }

                return todo;
            });
        },
        selectAll: function() {
            if (this.allSelected) {
                this.todos = this.todos.map(function(todo) {
                    todo.checked = false;

                    return todo;
                });
            } else {
                this.todos = this.todos.map(function(todo) {
                    todo.checked = true;

                    return todo;
                });
            }

            this.allSelected = !this.allSelected;
        },
        removeSelected: function() {
            this.todos = this.todos.filter(function(todo) {
                return todo.checked === false;
            });

            this.updateHistory(this.todos);
        },
        updateHistory: function(todos) {
            this.todosHistory.push(JSON.parse(JSON.stringify(todos)));
        },
        undo: function() {
            this.todosHistory.pop();

            if (this.todosHistory.length === 0) {
                this.todos = [];
            } else {
                this.todos = this.todosHistory[this.todosHistory.length - 1];
            }
        }
    }
});
