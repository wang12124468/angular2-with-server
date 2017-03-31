import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Store } from '@ngrx/store';
import {
    ADD_TODO,
    TOGGLE_TODO,
    REMOVE_TODO,
    TOGGLE_ALL,
    CLEAR_COMPLETED,
    MODIFY_TODO

} from 'app/core/store/actions';

export interface DataRes {
    success: boolean;
    data: any;
}

@Injectable()
export class TodosService {

    constructor(
        private store$: Store<any>,
        private http: Http
    ) { }

    getTodos(): Observable<any> {
        let url = '/api/todos';
        return this.http.post(url, null).map((res: Response) => res.json().data);
    }

    addTodo(desc: string): void {
        let url = '/api/todos/add';
        let params = new URLSearchParams();
        params.append('desc', desc);
        params.append('completed', '0');
        
        this.http.post(url, params).map((res: Response) => res.json() as DataRes)
            .subscribe(
                res => {
                    if(res.success === true) {
                        console.log(res.data)
                        this.store$.dispatch({ type: ADD_TODO, payload: Object.assign({}, { desc: desc, completed: 0 }, res.data) })
                    }
                }
            );
    }

    toggleTodo(todo): void {
        let url = '/api/todos/toggle';
        let params = new URLSearchParams();
        params.append('todo', JSON.stringify(todo));
        
        this.http.post(url, params).map((res:Response) => res.json() as DataRes)
            .subscribe(
                res => {
                    if(res.success === true) {
                        console.log(res.data);
                        this.store$.dispatch({ type: TOGGLE_TODO, payload: todo });
                    }
                }
            )

        // let updatedTodo = Object.assign({}, todo, { completed: (todo.completed + 1) % 2 });
        // // 相当于网络请求
        // TODOS.map(item => item.id === todo.id ? Object.assign({}, todo, { completed: (todo.completed + 1) % 2 }) : item)
        // // 改变状态
        // this.store$.dispatch({ type: TOGGLE_TODO, payload: updatedTodo })
    }

    removeTodo(todo): void {
        let url = '/api/todos/remove';
        let params = new URLSearchParams();
        params.append('todo', JSON.stringify(todo));

        this.http.post(url, params).map((res: Response) => res.json() as DataRes)
            .subscribe(
                res => {
                    if(res.success) {
                        this.store$.dispatch({ type: REMOVE_TODO, payload: todo })
                    }
                }
            );

        // // 相当于网络请求
        // TODOS = TODOS.filter(item => item.id !== todo.id);
        // // 改变状态
        // this.store$.dispatch({ type: REMOVE_TODO, payload: todo })
    }

    modifyTodo(todo): void {
        let url = '/api/todos/modify';
        let params = new URLSearchParams();
        params.append('todo', JSON.stringify(todo));

        this.http.post(url, params).map((res: Response) => res.json() as DataRes)
            .subscribe(
                res => {
                    if(res.success) {
                        this.store$.dispatch({ type: MODIFY_TODO, payload: todo})
                    }
                }
            );
        // // 相当于网络请求
        // TODOS = TODOS.map(item => item.id === todo.id ? todo : item);
        // // 改变状态
        // this.store$.dispatch({ type: MODIFY_TODO, payload: todo })

    }

    toggleAll(): void {

        let url = '/api/todos/toggleAll';
        
        this.http.get(url).map((res: Response) => res.json() as DataRes)
            .subscribe(
                res => {
                    if(res.success) {
                        this.store$.dispatch({ type: TOGGLE_ALL })
                    }
                }
            )

        // // 相当于网络请求
        // TODOS.map(item => Object.assign({}, item, { completed: (item.completed + 1) % 2 }))
        // // 改变状态
        // this.store$.dispatch({ type: TOGGLE_ALL })
    }

    clearCompleted(): void {
        let url = '/api/todos/clearCompleted';

        this.http.get(url).map((res: Response) => res.json() as DataRes)
            .subscribe(
                res => {
                    if(res.success) {
                        this.store$.dispatch({ type: CLEAR_COMPLETED })
                    }
                }
            )
        // // 相当于网络请求
        // TODOS = TODOS.filter(item => item.completed === 0);
        // // 改变状态
        // this.store$.dispatch({ type: CLEAR_COMPLETED })
    }
}